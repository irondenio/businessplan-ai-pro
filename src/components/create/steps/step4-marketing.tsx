import { UseFormReturn } from "react-hook-form";
import { WizardFormData } from "../wizard";
import { FormField } from "./form-field";

interface Props { form: UseFormReturn<WizardFormData> }

export function Step4Marketing({ form }: Props) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-5">
      <FormField label="Canaux de vente *" error={errors.salesChannels?.message} hint="Comment allez-vous distribuer/vendre votre produit ?">
        <textarea {...register("salesChannels")} rows={3} placeholder="Ex: Site web e-commerce, boutique physique à Douala, agents commerciaux terrain, application mobile, WhatsApp Business..." className="field-input resize-none" />
      </FormField>

      <FormField label="Acquisition clients *" error={errors.customerAcquisition?.message} hint="Comment allez-vous attirer vos premiers clients ?">
        <textarea {...register("customerAcquisition")} rows={3} placeholder="Ex: Publicité Facebook/Instagram ciblée, bouche à oreille, partenariats avec associations professionnelles, campagnes SMS, events..." className="field-input resize-none" />
      </FormField>

      <FormField label="Stratégie de communication *" error={errors.communication?.message} hint="Comment allez-vous faire connaître votre marque ?">
        <textarea {...register("communication")} rows={3} placeholder="Ex: Présence active sur réseaux sociaux, blog d'expertise, participations à des salons professionnels, relations presse, influenceurs..." className="field-input resize-none" />
      </FormField>
    </div>
  );
}
