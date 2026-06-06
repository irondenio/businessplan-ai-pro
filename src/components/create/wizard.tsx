"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronRight, ChevronLeft, Loader2, CheckCircle } from "lucide-react";
import { Step1General } from "./steps/step1-general";
import { Step2Product } from "./steps/step2-product";
import { Step3Market } from "./steps/step3-market";
import { Step4Marketing } from "./steps/step4-marketing";
import { Step5Finance } from "./steps/step5-finance";
import { cn } from "@/lib/utils";

const wizardSchema = z.object({
  projectName: z.string().min(2, "Minimum 2 caractères"),
  promoterName: z.string().min(2, "Minimum 2 caractères"),
  country: z.string().min(1, "Sélectionnez un pays"),
  sector: z.string().min(1, "Sélectionnez un secteur"),
  description: z.string().min(20, "Minimum 20 caractères"),
  productDescription: z.string().min(20, "Minimum 20 caractères"),
  valueProposition: z.string().min(10, "Minimum 10 caractères"),
  competitiveAdvantages: z.string().min(10, "Minimum 10 caractères"),
  targetCustomers: z.string().min(10, "Minimum 10 caractères"),
  marketSize: z.string().min(1, "Renseignez la taille du marché"),
  competitors: z.string().min(5, "Minimum 5 caractères"),
  geographicZone: z.string().min(2, "Minimum 2 caractères"),
  salesChannels: z.string().min(5, "Minimum 5 caractères"),
  customerAcquisition: z.string().min(5, "Minimum 5 caractères"),
  communication: z.string().min(5, "Minimum 5 caractères"),
  initialInvestment: z.number({ error: "Entrez un montant" }).min(0),
  monthlyExpenses: z.number({ error: "Entrez un montant" }).min(0),
  salesForecast: z.number({ error: "Entrez un montant" }).min(0),
  teamSize: z.number({ error: "Entrez un nombre" }).min(1),
  revenueModel: z.string().min(5, "Minimum 5 caractères"),
});

export type WizardFormData = z.infer<typeof wizardSchema>;

const steps = [
  { title: "Informations Générales", description: "Votre projet en bref" },
  { title: "Produit / Service", description: "Ce que vous offrez" },
  { title: "Marché", description: "Vos clients et concurrents" },
  { title: "Marketing", description: "Comment vous vendrez" },
  { title: "Finances", description: "Chiffres et prévisions" },
];

const stepFields: (keyof WizardFormData)[][] = [
  ["projectName", "promoterName", "country", "sector", "description"],
  ["productDescription", "valueProposition", "competitiveAdvantages"],
  ["targetCustomers", "marketSize", "competitors", "geographicZone"],
  ["salesChannels", "customerAcquisition", "communication"],
  ["initialInvestment", "monthlyExpenses", "salesForecast", "teamSize", "revenueModel"],
];

export function BusinessPlanWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      initialInvestment: 0,
      monthlyExpenses: 0,
      salesForecast: 0,
      teamSize: 1,
    },
    mode: "onChange",
  });

  const validateCurrentStep = async () => {
    const fields = stepFields[currentStep];
    const result = await form.trigger(fields);
    return result;
  };

  const handleNext = async () => {
    const valid = await validateCurrentStep();
    if (valid) setCurrentStep(s => s + 1);
  };

  const handleBack = () => setCurrentStep(s => s - 1);

  const onSubmit = async (data: WizardFormData) => {
    setIsGenerating(true);
    try {
      const createRes = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: data.projectName, formData: data }),
      });
      const { plan } = await createRes.json();

      const genRes = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessPlanId: plan.id, formData: data }),
      });

      if (genRes.ok) {
        router.push(`/plans/${plan.id}`);
      }
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">L&apos;IA génère votre business plan...</h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          GPT-4o analyse vos informations et rédige un business plan professionnel complet. Cela prend 1 à 3 minutes.
        </p>
        <div className="mt-8 space-y-2 text-sm text-gray-400 max-w-xs mx-auto">
          {["Analyse du marché...", "Rédaction du plan...", "Calcul des finances...", "Finalisation..."].map((t, i) => (
            <div key={t} className="flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", i === 0 ? "bg-blue-500 animate-pulse" : "bg-gray-200")} />
              {t}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Progress Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div className={cn(
                "flex items-center gap-2",
                i < steps.length - 1 ? "flex-1" : ""
              )}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                  i < currentStep ? "bg-green-500 text-white" :
                  i === currentStep ? "bg-blue-600 text-white" :
                  "bg-gray-100 text-gray-400"
                )}>
                  {i < currentStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <div className="hidden sm:block">
                  <p className={cn("text-xs font-medium", i === currentStep ? "text-blue-600" : "text-gray-400")}>
                    {step.title}
                  </p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className={cn("flex-1 h-0.5 mx-3 rounded", i < currentStep ? "bg-green-400" : "bg-gray-200")} />
              )}
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Étape {currentStep + 1} : {steps[currentStep].title}</h3>
          <p className="text-sm text-gray-500">{steps[currentStep].description}</p>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-6">
          {currentStep === 0 && <Step1General form={form} />}
          {currentStep === 1 && <Step2Product form={form} />}
          {currentStep === 2 && <Step3Market form={form} />}
          {currentStep === 3 && <Step4Marketing form={form} />}
          {currentStep === 4 && <Step5Finance form={form} />}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Générer mon Business Plan
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
