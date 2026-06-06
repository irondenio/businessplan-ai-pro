import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BillingPage } from "@/components/billing/billing-page";

export const metadata: Metadata = { title: "Abonnement" };

export default async function BillingRoute() {
  const session = await auth();
  const subscription = await prisma.subscription.findUnique({
    where: { userId: session!.user!.id! },
  });

  return <BillingPage subscription={subscription} />;
}
