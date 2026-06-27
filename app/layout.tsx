import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToHash from "@/components/ScrollToHash";

export const metadata: Metadata = {
  title: "Aurea — Xüsusi şirniyyatlar və xonçalar",
  description:
    "Ad günü, toy, nişan və xüsusi günlər üçün əl işi şirniyyatlar, xonçalar və şirin hədiyyələr. Öz dizaynınızı seçin, biz hazırlayaq.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <ScrollToHash />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
