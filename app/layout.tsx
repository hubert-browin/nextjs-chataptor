import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Konfiguracja fontu Inter
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter', // Definiujemy zmienną CSS
  display: 'swap',
});

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
    <html lang="pl" className="scroll-smooth">
      <body className={`${inter.variable} ${inter.className} font-sans antialiased bg-white text-zinc-900`}>
        {children}
      </body>
    </html>
  );
}