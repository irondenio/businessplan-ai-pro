"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Combien de temps faut-il pour générer un business plan ?",
    a: "Environ 10 à 15 minutes en tout. 10 minutes pour remplir le formulaire intelligent en 5 étapes, puis 2 à 3 minutes pour la génération par l'IA.",
  },
  {
    q: "Le business plan généré est-il vraiment professionnel ?",
    a: "Oui. L'IA rédige un document de 30+ pages avec résumé exécutif, analyse SWOT, étude de marché, stratégie marketing, module financier complet et plus. La présentation PDF est de niveau cabinet de conseil.",
  },
  {
    q: "Puis-je payer en FCFA ?",
    a: "Absolument. Nous acceptons les paiements via CinetPay (mobile money, Orange Money, MTN, Wave) et Flutterwave. Visa/Mastercard via Stripe également disponible.",
  },
  {
    q: "Puis-je modifier le business plan généré ?",
    a: "Oui. L'export Word vous permet de modifier tous les textes dans Microsoft Word ou Google Docs. L'export Excel vous permet d'ajuster les données financières.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Oui. Toutes vos données sont chiffrées en transit et au repos. Nous n'utilisons jamais vos informations commerciales pour entraîner l'IA.",
  },
  {
    q: "Quelle est la différence entre les offres Mensuel et Premium ?",
    a: "Le plan Mensuel offre des générations illimitées avec tous les exports. Le Premium ajoute le Pitch Deck IA, les prévisions financières avancées, l'accès API et le support dédié.",
  },
  {
    q: "Y a-t-il une garantie de remboursement ?",
    a: "Oui. Si vous n'êtes pas satisfait, nous vous remboursons intégralement dans les 7 jours suivant votre achat, sans question posée.",
  },
  {
    q: "Le business plan est-il adapté à mon pays africain ?",
    a: "Oui. L'IA est configurée pour prendre en compte le contexte économique, les réglementations et les spécificités de marché de plus de 20 pays africains francophones.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{q}</span>
        <ChevronDown className={cn("w-5 h-5 text-gray-400 flex-shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
          <p className="text-xl text-gray-600">Tout ce que vous devez savoir avant de commencer.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
