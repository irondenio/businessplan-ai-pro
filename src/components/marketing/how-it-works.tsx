import { ClipboardList, Cpu, Download } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Remplissez le formulaire",
    description: "Répondez aux 5 étapes de notre assistant intelligent : votre projet, votre marché, vos finances. 10 minutes suffisent.",
    color: "bg-blue-600",
  },
  {
    step: "02",
    icon: Cpu,
    title: "L'IA génère votre plan",
    description: "Notre IA analyse vos données et rédige automatiquement un business plan professionnel de 30+ pages avec module financier.",
    color: "bg-indigo-600",
  },
  {
    step: "03",
    icon: Download,
    title: "Téléchargez et partagez",
    description: "Exportez en PDF premium, Word éditable ou Excel financier. Prêt pour vos investisseurs, banques ou concours.",
    color: "bg-purple-600",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comment ça fonctionne ?
          </h2>
          <p className="text-xl text-gray-600">
            Trois étapes simples pour votre business plan professionnel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300" />

          {steps.map((step) => (
            <div key={step.step} className="text-center relative">
              <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
