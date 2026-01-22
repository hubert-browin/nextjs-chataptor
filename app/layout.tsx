import type { Metadata } from "next";
import "./globals.css";

// Używamy domyślnego fontu systemowego lub zdefiniowanego w Tailwind CSS
// Usunięto import next/font/google, który powodował błędy kompilacji

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
      <body className="font-sans antialiased bg-white text-zinc-900">{children}</body>
    </html>
  );
}