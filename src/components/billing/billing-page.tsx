"use client";

import { useState } from "react";
import { Check, Zap, Loader2 } from "lucide-react";
import { PRICING_PLANS } from "@/types";
import { cn } from "@/lib/utils";
import type { Subscription } from "@prisma/client";

interface Props { subscription: Subscription | null }

const plans = [
  { key: "ONE_TIME" as const, popular: false },
  { key: "MONTHLY" as const, popular: true },
  { key: "PREMIUM" as const, popular: false },
];

const paymentMethods = [
  { id: "cinetpay", label: "CinetPay", description: "Orange Money, MTN, Wave", flag: "🇨🇲" },
  { id: "flutterwave", label: "Flutterwave", description: "Mobile Money Afrique", flag: "🌍" },
  { id: "stripe", label: "Stripe", description: "Visa / Mastercard", flag: "💳" },
];

export function BillingPage({ subscription }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<"ONE_TIME" | "MONTHLY" | "PREMIUM">("MONTHLY");
  const [selectedMethod, setSelectedMethod] = useState("cinetpay");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const endpoint = selectedMethod === "cinetpay" ? "/api/payments/cinetpay" : "/api/payments/flutterwave";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan, amount: PRICING_PLANS[selectedPlan].price }),
      });
      const data = await res.json();
      if (data.paymentUrl) window.location.href = data.paymentUrl;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Abonnement</h2>
        {subscription && (
          <div className="mt-2 inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-xl text-sm font-medium">
            <Check className="w-4 h-4" />
            Plan actif : {subscription.plan}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(({ key, popular }) => {
          const plan = PRICING_PLANS[key];
          const selected = selectedPlan === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedPlan(key)}
              className={cn(
                "relative text-left rounded-2xl border-2 p-6 transition-all",
                selected ? "border-blue-600 shadow-lg shadow-blue-100" : "border-gray-200 hover:border-blue-200",
                popular ? "ring-2 ring-blue-100" : ""
              )}
            >
              {popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" /> POPULAIRE
                </div>
              )}
              <h3 className="font-bold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {plan.price.toLocaleString("fr-FR")} <span className="text-sm font-normal text-gray-400">FCFA{key !== "ONE_TIME" ? "/mois" : ""}</span>
              </p>
              <ul className="space-y-1.5 mt-4">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Mode de paiement</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                selectedMethod === method.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-200"
              )}
            >
              <span className="text-2xl">{method.flag}</span>
              <div>
                <p className="font-medium text-sm text-gray-900">{method.label}</p>
                <p className="text-xs text-gray-400">{method.description}</p>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Payer {PRICING_PLANS[selectedPlan].price.toLocaleString("fr-FR")} FCFA
        </button>

        <p className="text-center text-xs text-gray-400 mt-3">
          Paiement 100% sécurisé. Remboursement garanti 7 jours.
        </p>
      </div>
    </div>
  );
}
