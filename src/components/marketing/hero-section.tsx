import Link from "next/link";
import { ArrowRight, CheckCircle, Star, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Users, value: "2 500+", label: "Entrepreneurs" },
  { icon: FileText, value: "8 000+", label: "Business Plans" },
  { icon: Star, value: "4.9/5", label: "Satisfaction" },
];

const highlights = [
  "Génération IA en moins de 5 minutes",
  "Export PDF professionnel inclus",
  "Module financier automatique",
  "Adapté au marché africain",
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Propulsé par GPT-4o
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Votre Business Plan
            <span className="text-blue-600 block">en 5 minutes</span>
            <span className="text-gray-500 text-4xl md:text-5xl">grâce à l&apos;IA</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Générez un business plan professionnel, complet et bankable directement depuis votre navigateur.
            Conçu pour les entrepreneurs africains francophones.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 h-14 px-8 text-base">
              <Link href="/register">
                Créer mon business plan
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-14 px-8 text-base border-gray-300">
              <Link href="#how-it-works">Voir comment ça marche</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-gray-700 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
