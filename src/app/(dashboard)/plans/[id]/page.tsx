import { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { BusinessPlanView } from "@/components/plans/business-plan-view";

export const metadata: Metadata = { title: "Business Plan" };

export default async function PlanPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;

  const plan = await prisma.businessPlan.findFirst({
    where: { id, userId: session!.user!.id! },
  });

  if (!plan) notFound();

  return <BusinessPlanView plan={plan} />;
}
