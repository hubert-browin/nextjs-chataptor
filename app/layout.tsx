import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Ładujemy font Inter z optymalizacją Next.js
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chataptor - Global Customer Support AI",
  description: "Przełam bariery językowe w e-commerce dzięki AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.className} font-sans antialiased bg-white text-slate-900`}>
        {children}
      </body>
    </html>
  );
}