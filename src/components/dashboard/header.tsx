"use client";

import { signOut } from "next-auth/react";
import { Bell, LogOut, User, Settings } from "lucide-react";
import { type Session } from "next-auth";

interface Props {
  user: Session["user"];
}

export function DashboardHeader({ user }: Props) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-sm font-medium text-gray-900">
          Bonjour, {user?.name?.split(" ")[0] || "Utilisateur"} 👋
        </h1>
        <p className="text-xs text-gray-500">Prêt à créer votre prochain business plan ?</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors relative">
          <Bell className="w-4 h-4 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="ml-2 w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
            title="Déconnexion"
          >
            <LogOut className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
