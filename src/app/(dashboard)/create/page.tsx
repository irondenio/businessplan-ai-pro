import { Metadata } from "next";
import { BusinessPlanWizard } from "@/components/create/wizard";

export const metadata: Metadata = { title: "Créer un Business Plan" };

export default function CreatePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Créer un nouveau business plan</h2>
        <p className="text-gray-500 text-sm mt-1">Répondez aux questions de l&apos;assistant IA en 5 étapes</p>
      </div>
      <BusinessPlanWizard />
    </div>
  );
}
