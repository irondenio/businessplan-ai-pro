import { UseFormReturn } from "react-hook-form";
import { WizardFormData } from "../wizard";
import { FormField } from "./form-field";

interface Props { form: UseFormReturn<WizardFormData> }

export function Step5Finance({ form }: Props) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-5">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700 mb-2">
        Les montants sont en FCFA. Le module financier calculera automatiquement vos prévisions sur 1, 3 et 5 ans.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Investissement initial (FCFA) *" error={errors.initialInvestment?.message} hint="Total des dépenses de démarrage">
          <input
            {...register("initialInvestment", { valueAsNumber: true })}
            type="number"
            min={0}
            placeholder="Ex: 5 000 000"
            className="field-input"
          />
        </FormField>
        <FormField label="Charges mensuelles (FCFA) *" error={errors.monthlyExpenses?.message} hint="Loyer, salaires, fournisseurs, etc.">
          <input
            {...register("monthlyExpenses", { valueAsNumber: true })}
            type="number"
            min={0}
            placeholder="Ex: 800 000"
            className="field-input"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Prévisions de ventes/mois (FCFA) *" error={errors.salesForecast?.message} hint="Chiffre d'affaires mensuel estimé">
          <input
            {...register("salesForecast", { valueAsNumber: true })}
            type="number"
            min={0}
            placeholder="Ex: 1 200 000"
            className="field-input"
          />
        </FormField>
        <FormField label="Effectif (nombre de personnes) *" error={errors.teamSize?.message}>
          <input
            {...register("teamSize", { valueAsNumber: true })}
            type="number"
            min={1}
            placeholder="Ex: 5"
            className="field-input"
          />
        </FormField>
      </div>

      <FormField label="Modèle de revenus *" error={errors.revenueModel?.message} hint="Comment génères-vous vos revenus ?">
        <textarea {...register("revenueModel")} rows={3} placeholder="Ex: Abonnement mensuel SaaS + vente à l'acte. Frais d'installation uniques + maintenance annuelle. Commission de 10% sur chaque transaction..." className="field-input resize-none" />
      </FormField>
    </div>
  );
}
