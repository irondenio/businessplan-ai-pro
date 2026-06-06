import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Amina Koné",
    role: "Fondatrice, AgriTech CI",
    country: "Côte d'Ivoire",
    avatar: "AK",
    text: "J'ai généré mon business plan en 10 minutes. La banque a été impressionnée par la qualité et la profondeur de l'analyse. Mon prêt a été accordé !",
    stars: 5,
  },
  {
    name: "Jean-Marc Mbeki",
    role: "Entrepreneur, Dakar",
    country: "Sénégal",
    avatar: "JM",
    text: "Le module financier est exceptionnel. Les prévisions sur 5 ans avec les graphiques ont convaincu mes investisseurs. Un outil indispensable.",
    stars: 5,
  },
  {
    name: "Fatou Diallo",
    role: "Étudiante MBA, Douala",
    country: "Cameroun",
    avatar: "FD",
    text: "Pour mon projet de fin d'études, j'avais besoin d'un business plan professionnel. BusinessPlan AI Pro a dépassé mes attentes en termes de qualité.",
    stars: 5,
  },
  {
    name: "Olivier Nguema",
    role: "DG, StartupHub Libreville",
    country: "Gabon",
    avatar: "ON",
    text: "Nous accompagnons plus de 50 startups par an. BusinessPlan AI Pro est maintenant notre outil de référence pour les business plans. Gain de temps énorme.",
    stars: 5,
  },
  {
    name: "Marie-Claire Talla",
    role: "Consultante RH",
    country: "Cameroun",
    avatar: "MT",
    text: "L'analyse SWOT générée est pertinente et bien rédigée. L'export PDF a une présentation vraiment professionnelle, digne d'un cabinet de conseil.",
    stars: 5,
  },
  {
    name: "Ibrahima Bah",
    role: "Promoteur immobilier",
    country: "Guinée",
    avatar: "IB",
    text: "Très adapté au contexte africain. Les analyses de marché tiennent compte des réalités locales. Je recommande vivement pour tout entrepreneur africain.",
    stars: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-gray-600">
            Plus de 2 500 entrepreneurs africains ont déjà utilisé BusinessPlan AI Pro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role} · {t.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
