import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Ładujemy font Inter z optymalizacją Next.js
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chataptor - preview",
  description: "Sprzedawaj globalnie, obsługuj lokalnie. Platforma AI dla e-commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
