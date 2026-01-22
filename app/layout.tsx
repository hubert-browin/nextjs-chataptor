import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Konfiguracja fontu Inter z odpowiednimi wagami i subsetem
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
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
      {/* Zmieniamy text-slate-900 na text-zinc-900 dla bardziej neutralnego odcienia */}
      <body className={`${inter.className} font-sans antialiased bg-white text-zinc-900`}>
        {children}
      </body>
    </html>
  );
}