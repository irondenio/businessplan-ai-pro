import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PlansList } from "@/components/plans/plans-list";

export const metadata: Metadata = { title: "Mes Business Plans" };

export default async function PlansPage() {
  const session = await auth();
  const plans = await prisma.businessPlan.findMany({
    where: { userId: session!.user!.id! },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mes Business Plans</h2>
        <p className="text-gray-500 text-sm mt-1">{plans.length} plan(s) créé(s)</p>
      </div>
      <PlansList plans={plans} />
    </div>
  );
}
