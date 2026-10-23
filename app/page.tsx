import Link from "next/link";
import { 
  PawPrint, 
  Shield, 
  Calculator, 
  Users, 
  ArrowRight, 
  FileText, 
  Stethoscope, 
  HeartHandshake 
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full shadow-sm mb-6">
            <HeartHandshake className="w-5 h-5 text-emerald-700" />
            <span className="text-sm font-semibold text-emerald-800">Compromiso Social y Salud Animal</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Servicios Veterinarios <span className="text-emerald-600">Accesibles para Todos</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Rompemos las barreras económicas en la salud animal. Nuestro sistema evalúa tu situación 
            socioeconómica de manera justa, confidencial e inclusiva, para garantizar que tu mascota 
            reciba la atención que merece, sin importar tus ingresos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/validacion"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Calculator className="w-5 h-5" />
              Solicitar Validación Socioeconómica
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/citas"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-md border border-gray-200 hover:border-emerald-300"
            >
              <Stethoscope className="w-5 h-5" />
              Agendar una Cita
            </Link>
          </div>
        </div>
      </section>

      {/* Estadísticas de Contexto (Alto Contraste) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-4xl font-extrabold text-gray-900 mb-3">46.8M</div>
              <p className="text-gray-700 font-medium leading-snug">
                Personas en situación de pobreza en México <br/>
                <span className="text-sm text-gray-500">(Fuente: CONEVAL, 2024)</span>
              </p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-4xl font-extrabold text-gray-900 mb-3">$248.93</div>
              <p className="text-gray-700 font-medium leading-snug">
                Salario Mínimo Diario de Referencia <br/>
                <span className="text-sm text-gray-500">(Fuente: CONASAMI, 2026)</span>
              </p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-4xl font-extrabold text-emerald-600 mb-3">100%</div>
              <p className="text-gray-700 font-medium leading-snug">
                Compromiso con la Inclusión Algorítmica <br/>
                <span className="text-sm text-gray-500">(Validación cualitativa sin sesgos)</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Funciona el Sistema */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Cómo funciona el sistema?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Diseñado bajo estándares de Ingeniería de Software (IEEE 29148) para garantizar 
              transparencia, trazabilidad y separación de responsabilidades.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-emerald-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-emerald-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Validación en Dos Niveles</h3>
              <p className="text-gray-600 leading-relaxed">
                Un filtro administrativo inicial y una validación especializada por una Trabajadora Social. 
                Incluye un flujo de <strong>validación cualitativa</strong> para personas sin documentos formales, 
                evitando la discriminación algorítmica.
              </p>
            </div>
            
            {/* Tarjeta 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Calculator className="w-7 h-7 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Condonaciones Progresivas</h3>
              <p className="text-gray-600 leading-relaxed">
                El sistema aplica una matriz de decisión justa basada en la capacidad real de pago per cápita. 
                A menor ingreso, mayor apoyo, garantizando que el costo nunca sea una barrera insalvable.
              </p>
            </div>
            
            {/* Tarjeta 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-purple-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expediente Clínico Centralizado</h3>
              <p className="text-gray-600 leading-relaxed">
                Núcleo del sistema que conecta todas las áreas. Trazabilidad completa de diagnósticos, 
                tratamientos y vacunas, con principio de mínimo privilegio para proteger la confidencialidad del cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Tu mascota necesita atención veterinaria?
          </h2>
          <p className="text-xl mb-10 text-emerald-100 leading-relaxed">
            No dejes que la situación económica impida que tu compañero reciba cuidados de calidad. 
            Completa el formulario de validación y descubre cómo podemos apoyarte hoy mismo.
          </p>
          <Link
            href="/validacion"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-emerald-700 font-bold text-lg rounded-xl hover:bg-emerald-50 transition-all shadow-xl transform hover:-translate-y-0.5"
          >
            <HeartHandshake className="w-6 h-6" />
            Iniciar Proceso de Validación
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer Institucional */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">VetCare Bajo Costo</h4>
              <p className="text-sm">Proyecto de Ingeniería de Software - CUGDL 2026</p>
            </div>
          </div>
          <div className="text-center md:text-right text-sm">
            <p>Desarrollado por: María del Carmen Mata Magallanes</p>
            <p className="mt-1">Profesor: Mtro. José Manuel Nava Cervantes</p>
          </div>
        </div>
      </footer>
    </div>
  );
}