import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "VetCare Bajo Costo - Sistema de Veterinaria Accesible",
  description: "Sistema de veterinaria de bajo costo con validación socioeconómica algorítmica. Condonaciones del 100% y 50% según criterios de ingresos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-gray-50 min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
            <p>© 2026 VetCare Bajo Costo - Proyecto de Ingeniería de Software</p>
            <p className="mt-1 text-xs">
              Algoritmo basado en el Salario Mínimo 2026 ($248.93 MXN diarios) - CONASAMI
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}