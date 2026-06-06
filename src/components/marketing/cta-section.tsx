import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">
          Prêt à créer votre business plan ?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Rejoignez 2 500+ entrepreneurs africains qui ont déjà lancé leur projet avec BusinessPlan AI Pro.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-blue-50 h-14 px-8 text-base font-semibold">
            <Link href="/register">
              Créer mon business plan maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 h-14 px-8 text-base">
            <Link href="/pricing">Voir les tarifs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
