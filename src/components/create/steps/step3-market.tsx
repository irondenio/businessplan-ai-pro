import { UseFormReturn } from "react-hook-form";
import { WizardFormData } from "../wizard";
import { FormField } from "./form-field";

interface Props { form: UseFormReturn<WizardFormData> }

export function Step3Market({ form }: Props) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-5">
      <FormField label="Clients cibles *" error={errors.targetCustomers?.message} hint="Qui sont vos clients idéaux ? Soyez précis.">
        <textarea {...register("targetCustomers")} rows={3} placeholder="Ex: PME camerounaises de 10 à 100 employés dans les secteurs industrie et services, cherchant à moderniser leur gestion..." className="field-input resize-none" />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Taille estimée du marché *" error={errors.marketSize?.message}>
          <input {...register("marketSize")} placeholder="Ex: 500 000 entreprises, 2 milliards FCFA..." className="field-input" />
        </FormField>
        <FormField label="Zone géographique *" error={errors.geographicZone?.message}>
          <input {...register("geographicZone")} placeholder="Ex: Douala, Cameroun national, Afrique centrale..." className="field-input" />
        </FormField>
      </div>

      <FormField label="Principaux concurrents *" error={errors.competitors?.message} hint="Listez vos concurrents directs et indirects">
        <textarea {...register("competitors")} rows={3} placeholder="Ex: Concurrent A (leader avec 30% de part de marché), Concurrent B (acteur régional), produits importés non adaptés..." className="field-input resize-none" />
      </FormField>
    </div>
  );
}
