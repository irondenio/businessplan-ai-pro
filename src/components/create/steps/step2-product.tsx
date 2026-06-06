import { UseFormReturn } from "react-hook-form";
import { WizardFormData } from "../wizard";
import { FormField } from "./form-field";

interface Props { form: UseFormReturn<WizardFormData> }

export function Step2Product({ form }: Props) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-5">
      <FormField label="Description du produit/service *" error={errors.productDescription?.message} hint="Expliquez en détail ce que vous proposez">
        <textarea {...register("productDescription")} rows={4} placeholder="Décrivez en détail votre produit ou service : caractéristiques, fonctionnement, avantages pour les clients..." className="field-input resize-none" />
      </FormField>

      <FormField label="Proposition de valeur *" error={errors.valueProposition?.message} hint="Pourquoi les clients vous choisiront plutôt que la concurrence ?">
        <textarea {...register("valueProposition")} rows={3} placeholder="Ex: Nous offrons la livraison de repas sains en 30 minutes via une app mobile, garantissant fraîcheur et qualité à prix abordable..." className="field-input resize-none" />
      </FormField>

      <FormField label="Avantages concurrentiels *" error={errors.competitiveAdvantages?.message} hint="Listez vos points forts face à la concurrence">
        <textarea {...register("competitiveAdvantages")} rows={3} placeholder="Ex: Prix 20% moins cher, livraison 2x plus rapide, partenariats exclusifs avec fournisseurs locaux, technologie propriétaire..." className="field-input resize-none" />
      </FormField>
    </div>
  );
}
