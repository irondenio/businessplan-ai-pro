"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, PlusCircle, CreditCard,
  Settings, Zap, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
  { href: "/create", icon: PlusCircle, label: "Nouveau Plan" },
  { href: "/plans", icon: FileText, label: "Mes Business Plans" },
  { href: "/billing", icon: CreditCard, label: "Abonnement" },
  { href: "/settings", icon: Settings, label: "Paramètres" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-900">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm leading-tight">BusinessPlan<br />AI Pro</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-blue-900 mb-1">Offre Premium</p>
          <p className="text-xs text-blue-600 mb-3">Débloquez les fonctionnalités avancées</p>
          <Link
            href="/billing"
            className="block w-full bg-blue-600 text-white text-xs font-medium text-center py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Passer Premium
          </Link>
        </div>
      </div>
    </aside>
  );
}
