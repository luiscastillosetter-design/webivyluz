import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Iglesia Iviluz",
  description: "Iglesia Iviluz - Barquisimeto, Lara",
};

// Aquí estaba el error. Cambiamos el tipado para asegurar compatibilidad total.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F7F7F5] text-zinc-900 font-sans">
        {children}
      </body>
    </html>
  );
}