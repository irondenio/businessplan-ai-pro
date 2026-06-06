import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const plan = await prisma.businessPlan.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!plan) {
      return NextResponse.json({ error: "Business plan non trouvé" }, { status: 404 });
    }

    return NextResponse.json({ plan });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const plan = await prisma.businessPlan.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!plan) {
      return NextResponse.json({ error: "Business plan non trouvé" }, { status: 404 });
    }

    await prisma.businessPlan.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
