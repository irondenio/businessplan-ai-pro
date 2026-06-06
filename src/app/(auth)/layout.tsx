import Link from "next/link";
import { Zap } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <header className="p-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-900 w-fit">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          BusinessPlan AI Pro
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
      <footer className="p-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BusinessPlan AI Pro. Tous droits réservés.
      </footer>
    </div>
  );
}
