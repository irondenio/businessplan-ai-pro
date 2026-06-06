import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const paymentSchema = z.object({
  plan: z.enum(["ONE_TIME", "MONTHLY", "PREMIUM"]),
  amount: z.number().min(1000),
});

const PLAN_AMOUNTS = {
  ONE_TIME: 10000,
  MONTHLY: 25000,
  PREMIUM: 50000,
};

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = paymentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const { plan } = parsed.data;
    const amount = PLAN_AMOUNTS[plan];
    const transactionId = `BP_${Date.now()}_${session.user.id.slice(0, 8)}`;

    const cinetpayPayload = {
      apikey: process.env.CINETPAY_API_KEY,
      site_id: process.env.CINETPAY_SITE_ID,
      transaction_id: transactionId,
      amount,
      currency: "XAF",
      description: `BusinessPlan AI Pro - ${plan}`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing/success`,
      notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/cinetpay/notify`,
      customer_name: session.user.name || "Client",
      customer_email: session.user.email || "",
      channels: "ALL",
      metadata: JSON.stringify({ userId: session.user.id, plan }),
    };

    const res = await fetch("https://api-checkout.cinetpay.com/v2/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cinetpayPayload),
    });

    const data = await res.json();

    if (data.code === "201") {
      await prisma.payment.create({
        data: {
          userId: session.user.id,
          amount,
          currency: "XAF",
          status: "PENDING",
          provider: "CINETPAY",
          providerPaymentId: transactionId,
          description: `Plan ${plan}`,
          metadata: { plan },
        },
      });

      return NextResponse.json({ paymentUrl: data.data.payment_url });
    }

    return NextResponse.json({ error: "Erreur CinetPay", details: data }, { status: 500 });
  } catch (error) {
    console.error("CinetPay error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
