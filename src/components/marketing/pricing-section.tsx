"use client";

import Link from "next/link";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING_PLANS } from "@/types";
import { cn } from "@/lib/utils";

const plans = [
  {
    key: "ONE_TIME" as const,
    popular: false,
    cta: "Commencer",
  },
  {
    key: "MONTHLY" as const,
    popular: true,
    cta: "S'abonner",
  },
  {
    key: "PREMIUM" as const,
    popular: false,
    cta: "Devenir Premium",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tarifs transparents</h2>
          <p className="text-xl text-gray-600">Adaptés aux entrepreneurs africains. Payez en FCFA avec CinetPay ou Flutterwave.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map(({ key, popular, cta }) => {
            const plan = PRICING_PLANS[key];
            return (
              <div
                key={key}
                className={cn(
                  "relative rounded-2xl border-2 p-8 flex flex-col",
                  popular
                    ? "border-blue-600 shadow-xl shadow-blue-100 scale-105"
                    : "border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all"
                )}
              >
                {popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    POPULAIRE
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price.toLocaleString("fr-FR")}
                  </span>
                  <span className="text-gray-500 ml-1">{plan.currency}</span>
                  {key !== "ONE_TIME" && (
                    <span className="text-gray-400 text-sm block">/mois</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={cn(
                    "w-full",
                    popular ? "bg-blue-600 hover:bg-blue-700 text-white" : "variant-outline"
                  )}
                  variant={popular ? "default" : "outline"}
                >
                  <Link href="/register">{cta}</Link>
                </Button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Paiement sécurisé par CinetPay, Flutterwave et Stripe. Remboursement garanti 7 jours.
        </p>
      </div>
    </section>
  );
}
