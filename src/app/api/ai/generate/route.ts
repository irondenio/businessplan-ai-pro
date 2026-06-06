import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateBusinessPlan, calculateFinancials } from "@/lib/ai";
import { BusinessPlanFormData } from "@/types";
import { z } from "zod";

const generateSchema = z.object({
  businessPlanId: z.string(),
  formData: z.object({
    projectName: z.string().min(1),
    promoterName: z.string().min(1),
    country: z.string().min(1),
    sector: z.string().min(1),
    description: z.string().min(10),
    productDescription: z.string().min(10),
    valueProposition: z.string().min(10),
    competitiveAdvantages: z.string().min(10),
    targetCustomers: z.string().min(10),
    marketSize: z.string().min(1),
    competitors: z.string().min(1),
    geographicZone: z.string().min(1),
    salesChannels: z.string().min(1),
    customerAcquisition: z.string().min(1),
    communication: z.string().min(1),
    initialInvestment: z.number().min(0),
    monthlyExpenses: z.number().min(0),
    salesForecast: z.number().min(0),
    teamSize: z.number().min(1),
    revenueModel: z.string().min(1),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = generateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides", details: parsed.error }, { status: 400 });
    }

    const { businessPlanId, formData } = parsed.data;

    const plan = await prisma.businessPlan.findFirst({
      where: { id: businessPlanId, userId: session.user.id },
    });

    if (!plan) {
      return NextResponse.json({ error: "Business plan non trouvé" }, { status: 404 });
    }

    await prisma.businessPlan.update({
      where: { id: businessPlanId },
      data: { status: "GENERATING" },
    });

    const [generatedContent, financialData] = await Promise.all([
      generateBusinessPlan(formData as BusinessPlanFormData),
      Promise.resolve(calculateFinancials(formData as BusinessPlanFormData)),
    ]);

    const updatedPlan = await prisma.businessPlan.update({
      where: { id: businessPlanId },
      data: {
        status: "COMPLETED",
        generatedContent,
        financialData,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "GENERATE_BUSINESS_PLAN",
        entity: "BusinessPlan",
        entityId: businessPlanId,
      },
    });

    return NextResponse.json({ success: true, plan: updatedPlan });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
