import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/providers";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "BusinessPlan AI Pro - Générez votre business plan en minutes",
    template: "%s | BusinessPlan AI Pro",
  },
  description:
    "Créez un business plan professionnel et complet en quelques minutes grâce à l'intelligence artificielle. Idéal pour les entrepreneurs africains.",
  keywords: [
    "business plan",
    "plan d'affaires",
    "entrepreneur",
    "Afrique",
    "IA",
    "intelligence artificielle",
    "Cameroun",
    "startup",
  ],
  authors: [{ name: "SEAHORSE", url: "https://businessplanai.pro" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://businessplanai.pro",
    title: "BusinessPlan AI Pro",
    description: "Générez votre business plan en minutes avec l'IA",
    siteName: "BusinessPlan AI Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "BusinessPlan AI Pro",
    description: "Générez votre business plan en minutes avec l'IA",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
