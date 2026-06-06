import { Metadata } from "next";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { DashboardStats } from "@/components/dashboard/stats";
import { RecentPlans } from "@/components/dashboard/recent-plans";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export const metadata: Metadata = { title: "Tableau de bord" };

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user!.id!;

  const [plansCount, plansCompleted, exportsCount, subscription] = await Promise.all([
    prisma.businessPlan.count({ where: { userId } }),
    prisma.businessPlan.count({ where: { userId, status: "COMPLETED" } }),
    prisma.export.count({ where: { userId } }),
    prisma.subscription.findUnique({ where: { userId } }),
  ]);

  const recentPlans = await prisma.businessPlan.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: 5,
    select: { id: true, title: true, status: true, createdAt: true, updatedAt: true },
  });

  const stats = {
    plansCount,
    plansCompleted,
    exportsCount,
    plan: subscription?.plan || "Aucun",
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tableau de bord</h2>
          <p className="text-gray-500 text-sm mt-1">Gérez vos business plans et suivez vos performances</p>
        </div>
        <Link
          href="/create"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Nouveau Plan
        </Link>
      </div>

      <DashboardStats stats={stats} />
      <RecentPlans plans={recentPlans} />
    </div>
  );
}
