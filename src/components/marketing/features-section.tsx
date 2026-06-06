import { Brain, BarChart3, FileDown, Shield, Globe, Zap, TrendingUp, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "IA Générative Avancée",
    description: "GPT-4o analyse vos données et rédige un business plan professionnel, adapté à votre secteur et votre marché africain.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: BarChart3,
    title: "Module Financier Complet",
    description: "Compte de résultat, trésorerie, seuil de rentabilité, ROI. Prévisions sur 1, 3 et 5 ans calculées automatiquement.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: FileDown,
    title: "Export Premium",
    description: "Téléchargez en PDF style cabinet de conseil, Word éditable ou Excel avec graphiques financiers.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: TrendingUp,
    title: "Analyse SWOT Automatique",
    description: "Forces, faiblesses, opportunités et menaces identifiées et rédigées par l'IA pour votre projet.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Globe,
    title: "Marché Africain",
    description: "Données et analyse contextualisées pour l'Afrique francophone : Cameroun, Côte d'Ivoire, Sénégal et plus.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Zap,
    title: "5 Minutes Chrono",
    description: "Remplissez le formulaire intelligent en 5 étapes et obtenez votre business plan complet immédiatement.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Shield,
    title: "Données Sécurisées",
    description: "Vos données sont chiffrées et protégées. Accès sécurisé via authentification multi-facteurs.",
    color: "bg-teal-100 text-teal-600",
  },
  {
    icon: Users,
    title: "Pour Tous",
    description: "Entrepreneurs, startups, étudiants, porteurs de projets. Aucune compétence technique requise.",
    color: "bg-indigo-100 text-indigo-600",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une plateforme complète pour créer, gérer et exporter vos business plans professionnels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
