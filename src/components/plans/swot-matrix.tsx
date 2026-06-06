import { GeneratedBusinessPlan } from "@/types";

interface Props {
  swot: GeneratedBusinessPlan["swotAnalysis"];
}

const quadrants = [
  { key: "strengths", label: "Forces", bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "bg-green-100 text-green-700" },
  { key: "weaknesses", label: "Faiblesses", bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-red-100 text-red-700" },
  { key: "opportunities", label: "Opportunités", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
  { key: "threats", label: "Menaces", bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", badge: "bg-orange-100 text-orange-700" },
] as const;

export function SwotMatrix({ swot }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {quadrants.map(({ key, label, bg, border, text, badge }) => (
        <div key={key} className={`${bg} border ${border} rounded-xl p-4`}>
          <h4 className={`font-semibold ${text} text-sm mb-3`}>{label}</h4>
          <ul className="space-y-1.5">
            {swot[key].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                <span className={`w-5 h-5 ${badge} rounded-md flex items-center justify-center flex-shrink-0 font-bold text-xs`}>
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
