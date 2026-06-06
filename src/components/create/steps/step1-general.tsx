import { UseFormReturn } from "react-hook-form";
import { WizardFormData } from "../wizard";
import { SECTORS, AFRICAN_COUNTRIES } from "@/types";
import { FormField } from "./form-field";

interface Props { form: UseFormReturn<WizardFormData> }

export function Step1General({ form }: Props) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Nom du projet *" error={errors.projectName?.message}>
          <input {...register("projectName")} placeholder="Ex: AgroTech Solutions" className="field-input" />
        </FormField>
        <FormField label="Nom du promoteur *" error={errors.promoterName?.message}>
          <input {...register("promoterName")} placeholder="Votre nom complet" className="field-input" />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Pays *" error={errors.country?.message}>
          <select {...register("country")} className="field-input">
            <option value="">Sélectionner...</option>
            {AFRICAN_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </FormField>
        <FormField label="Secteur d'activité *" error={errors.sector?.message}>
          <select {...register("sector")} className="field-input">
            <option value="">Sélectionner...</option>
            {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </FormField>
      </div>

      <FormField label="Description du projet *" error={errors.description?.message} hint="Décrivez votre projet en quelques phrases (minimum 20 caractères)">
        <textarea {...register("description")} rows={4} placeholder="Décrivez brièvement votre projet, son objectif et sa vision..." className="field-input resize-none" />
      </FormField>
    </div>
  );
}
