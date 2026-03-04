import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Everclean Luxury Services | White-Glove Estate Cleaning in Waterloo Region",
    template: "%s | Everclean Luxury Services",
  },
  description:
    "Waterloo Region's premier white-glove cleaning and estate care service. Museum-quality techniques, bonded professionals, and absolute discretion for distinguished homes.",
  keywords: [
    "luxury cleaning",
    "estate cleaning",
    "white glove service",
    "Waterloo Region",
    "Kitchener cleaning",
    "Waterloo cleaning",
    "high-end cleaning",
    "concierge cleaning",
  ],
  authors: [{ name: "Everclean Luxury Services" }],
  creator: "Everclean Luxury Services",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://everclean.ca"),
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Everclean Luxury Services",
    title: "Everclean Luxury Services | White-Glove Estate Cleaning",
    description:
      "Waterloo Region's premier white-glove cleaning and estate care service. Museum-quality techniques for distinguished homes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Everclean Luxury Services",
    description: "White-glove estate cleaning in Waterloo Region",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
