import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EMJ Consulting - Visa & Immigration Services",
    template: "%s | EMJ Consulting"
  },
  description: "Votre partenaire de confiance pour tous vos besoins en visa et immigration. Plus de 10 ans d'expérience, 98% de taux de réussite, 30+ destinations.",
  keywords: ["visa", "immigration", "voyage", "consultation", "Canada", "France", "USA", "étudiant", "touristique", "affaires"],
  authors: [{ name: "EMJ Consulting" }],
  creator: "EMJ Consulting",
  publisher: "EMJ Consulting",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: "https://emj-consulting.com",
    title: "EMJ Consulting - Visa & Immigration Services",
    description: "Votre partenaire de confiance pour tous vos besoins en visa et immigration",
    siteName: "EMJ Consulting",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMJ Consulting - Visa & Immigration Services",
    description: "Votre partenaire de confiance pour tous vos besoins en visa et immigration",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
