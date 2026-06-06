import Link from "next/link";
import { Zap } from "lucide-react";

const links = {
  Produit: [
    { href: "/features", label: "Fonctionnalités" },
    { href: "/pricing", label: "Tarifs" },
    { href: "/blog", label: "Blog" },
  ],
  Support: [
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/docs", label: "Documentation" },
  ],
  Légal: [
    { href: "/privacy", label: "Confidentialité" },
    { href: "/terms", label: "CGU" },
    { href: "/cookies", label: "Cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              BusinessPlan AI Pro
            </Link>
            <p className="text-sm leading-relaxed">
              La plateforme de référence pour créer des business plans professionnels en Afrique francophone.
            </p>
            <div className="mt-4 text-xs text-gray-500">
              Propulsé par SEAHORSE · Douala, Cameroun
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} BusinessPlan AI Pro. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Paiement sécurisé par</span>
            <span className="text-gray-400 font-medium">CinetPay</span>
            <span className="text-gray-400 font-medium">Flutterwave</span>
            <span className="text-gray-400 font-medium">Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
