import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chataptor - Global Support Platform",
  description: "Sprzedawaj globalnie, obsługuj lokalnie. Hybrydowe tłumaczenia AI dla e-commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
