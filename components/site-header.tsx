"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope, Home, ClipboardList, Calendar, FileText, PawPrint } from "lucide-react";

export default function SiteHeader() {
  const pathname = usePathname();

  // Función para determinar si un enlace está activo
  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/validacion", label: "Validación", icon: ClipboardList },
    { href: "/citas", label: "Citas", icon: Calendar },
    { href: "/expediente", label: "Expediente", icon: FileText },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y nombre */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">VetCare</h1>
              <p className="text-xs text-gray-500 leading-tight">Bajo Costo</p>
            </div>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Botón de acción */}
          <Link
            href="/validacion"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Stethoscope className="w-4 h-4" />
            Solicitar Validación
          </Link>

          {/* Navegación móvil (botón simple) */}
          <nav className="md:hidden flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`p-2 rounded-lg ${
                    active ? "bg-emerald-50 text-emerald-700" : "text-gray-600"
                  }`}
                  title={link.label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}