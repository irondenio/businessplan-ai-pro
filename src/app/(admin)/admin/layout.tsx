import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { LayoutDashboard, Users, CreditCard, FileText, Activity, Zap } from "lucide-react";

const adminNav = [
  { href: "/admin", icon: LayoutDashboard, label: "Vue d'ensemble" },
  { href: "/admin/users", icon: Users, label: "Utilisateurs" },
  { href: "/admin/plans", icon: FileText, label: "Business Plans" },
  { href: "/admin/payments", icon: CreditCard, label: "Paiements" },
  { href: "/admin/logs", icon: Activity, label: "Journal" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const userRole = (session.user as { role?: string }).role;
  if (userRole !== "ADMIN") redirect("/dashboard");

  return (
    <div className="flex h-screen bg-gray-900">
      <aside className="w-64 bg-gray-950 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2 font-bold text-white">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {adminNav.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link href="/dashboard" className="text-xs text-gray-500 hover:text-gray-300">
            Retour au Dashboard utilisateur
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
