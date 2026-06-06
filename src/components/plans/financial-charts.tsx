"use client";

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { FinancialData } from "@/types";

interface Props { financial: FinancialData }

const COLORS = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B"];

const formatXAF = (v: number) =>
  v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : `${v}`;

export function FinancialCharts({ financial }: Props) {
  const revenueData = [
    { name: "An 1", CA: financial.year1.revenue, Charges: financial.year1.expenses, Résultat: financial.year1.netProfit },
    { name: "An 3", CA: financial.year3.revenue, Charges: financial.year3.expenses, Résultat: financial.year3.netProfit },
    { name: "An 5", CA: financial.year5.revenue, Charges: financial.year5.expenses, Résultat: financial.year5.netProfit },
  ];

  const monthlyData = financial.year1.incomeStatement.map((m) => ({
    name: m.month,
    CA: m.revenue,
    Charges: m.expenses,
    Résultat: m.result,
  }));

  const pieData = [
    { name: "Résultat Net", value: Math.max(0, financial.year1.netProfit) },
    { name: "Charges", value: financial.year1.expenses },
  ];

  const cashFlowData = financial.year1.cashFlowStatement.map((m) => ({
    name: m.month,
    "Cash-flow": m.result,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-4">Evolution du CA sur 5 ans</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={revenueData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={formatXAF} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => [`${v.toLocaleString("fr-FR")} FCFA`]} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="CA" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Charges" fill="#EF4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Résultat" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-4">CA mensuel - Année 1</h4>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorCA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tickFormatter={formatXAF} tick={{ fontSize: 10 }} />
            <Tooltip formatter={(v: number) => [`${v.toLocaleString("fr-FR")} FCFA`]} />
            <Area type="monotone" dataKey="CA" stroke="#3B82F6" strokeWidth={2} fill="url(#colorCA)" />
            <Area type="monotone" dataKey="Charges" stroke="#EF4444" strokeWidth={2} fill="transparent" strokeDasharray="4 2" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Répartition Année 1</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v.toLocaleString("fr-FR")} FCFA`]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Cash-flow mensuel - Année 1</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={cashFlowData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="name" tick={{ fontSize: 9 }} />
              <YAxis tickFormatter={formatXAF} tick={{ fontSize: 9 }} />
              <Tooltip formatter={(v: number) => [`${v.toLocaleString("fr-FR")} FCFA`]} />
              <Bar dataKey="Cash-flow" fill="#10B981" radius={[3, 3, 0, 0]}>
                {cashFlowData.map((entry, i) => (
                  <Cell key={i} fill={entry["Cash-flow"] >= 0 ? "#10B981" : "#EF4444"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
