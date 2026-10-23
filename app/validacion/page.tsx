"use client";

import { useState } from "react";
import { evaluarCondonacion, type ValidacionInput, type ResultadoValidacion } from "@/lib/eligibility";
import { Calculator, CheckCircle, AlertTriangle, Info } from "lucide-react";

export default function ValidacionPage() {
  // Estado para el formulario
  const [formData, setFormData] = useState<ValidacionInput>({
    ingresoMensualFamiliar: 0,
    numeroDependientes: 1,
    esAdultoMayor: false,
    tieneDiscapacidad: false,
    esSituacionCalle: false,
  });

  // Estado para el resultado
  const [resultado, setResultado] = useState<ResultadoValidacion | null>(null);

  // Manejador de cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  // Manejador del envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const evaluacion = evaluarCondonacion(formData);
    setResultado(evaluacion);
  };

  // Función para determinar el color de la tarjeta de resultado
  const getColorClase = (porcentaje: number) => {
    if (porcentaje === 100) return "bg-emerald-50 border-emerald-500 text-emerald-800";
    if (porcentaje === 50) return "bg-amber-50 border-amber-500 text-amber-800";
    return "bg-slate-50 border-slate-500 text-slate-800";
  };

  const getIcono = (porcentaje: number) => {
    if (porcentaje === 100) return <CheckCircle className="w-6 h-6 text-emerald-600" />;
    if (porcentaje === 50) return <AlertTriangle className="w-6 h-6 text-amber-600" />;
    return <Info className="w-6 h-6 text-slate-600" />;
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Validación Socioeconómica</h1>
          <p className="mt-2 text-gray-600">
            Complete el formulario para evaluar el nivel de condonación aplicable según la matriz de decisión (SM 2026: $248.93 diarios).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-6">
          {/* Ingreso Mensual */}
          <div>
            <label htmlFor="ingresoMensualFamiliar" className="block text-sm font-medium text-gray-700">
              Ingreso mensual total del hogar (MXN)
            </label>
            <input
              type="number"
              name="ingresoMensualFamiliar"
              id="ingresoMensualFamiliar"
              required
              min="0"
              value={formData.ingresoMensualFamiliar || ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              placeholder="Ej. 5000"
            />
          </div>

          {/* Dependientes */}
          <div>
            <label htmlFor="numeroDependientes" className="block text-sm font-medium text-gray-700">
              Número de dependientes económicos (incluyéndote)
            </label>
            <input
              type="number"
              name="numeroDependientes"
              id="numeroDependientes"
              required
              min="1"
              value={formData.numeroDependientes}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          {/* Excepciones / Validación Cualitativa */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700">Criterios de Inclusión Algorítmica (Validación Cualitativa)</p>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="esAdultoMayor"
                id="esAdultoMayor"
                checked={formData.esAdultoMayor}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="esAdultoMayor" className="ml-2 block text-sm text-gray-700">
                Adulto mayor (60 años o más)
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="tieneDiscapacidad"
                id="tieneDiscapacidad"
                checked={formData.tieneDiscapacidad}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="tieneDiscapacidad" className="ml-2 block text-sm text-gray-700">
                Persona con discapacidad
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="esSituacionCalle"
                id="esSituacionCalle"
                checked={formData.esSituacionCalle}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="esSituacionCalle" className="ml-2 block text-sm text-gray-700">
                Situación de calle / Sin documentos formales
              </label>
            </div>
          </div>

          {/* Botón de acción */}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Calculator className="w-5 h-5" />
            Calcular Nivel de Condonación
          </button>
        </form>

        {/* Tarjeta de Resultado */}
        {resultado && (
          <div className={`mt-8 p-6 rounded-xl border-l-4 shadow-sm ${getColorClase(resultado.porcentajeCondonacion)}`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {getIcono(resultado.porcentajeCondonacion)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">
                  {resultado.nivelSocioeconomico} ({resultado.porcentajeCondonacion}%)
                </h3>
                <p className="mt-2 text-sm">{resultado.mensaje}</p>
                <div className="mt-4 pt-4 border-t border-current border-opacity-20">
                  <p className="text-sm font-semibold">
                    Monto a pagar por consulta: <span className="text-xl">${resultado.montoAPagar.toFixed(2)} MXN</span>
                  </p>
                  <p className="text-xs mt-1 opacity-75">
                    Ingreso diario per cápita calculado: ${resultado.ingresoDiarioPerCapita.toFixed(2)} MXN
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}