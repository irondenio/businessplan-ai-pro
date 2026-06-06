import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" });

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.CheckoutSession;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan as "ONE_TIME" | "MONTHLY" | "PREMIUM" | undefined;

      if (userId && plan) {
        await prisma.payment.create({
          data: {
            userId,
            amount: (session.amount_total || 0) / 100,
            currency: session.currency?.toUpperCase() || "XAF",
            status: "COMPLETED",
            provider: "STRIPE",
            providerPaymentId: session.id,
          },
        });

        if (plan !== "ONE_TIME") {
          await prisma.subscription.upsert({
            where: { userId },
            create: { userId, plan, status: "ACTIVE", stripeCustomerId: session.customer as string },
            update: { plan, status: "ACTIVE", stripeCustomerId: session.customer as string },
          });
        }
      }
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: { status: "CANCELED" },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
