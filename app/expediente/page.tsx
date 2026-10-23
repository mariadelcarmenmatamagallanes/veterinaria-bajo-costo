"use client";

import { useState } from "react";
import { FileText, Dog, Stethoscope, Syringe, Plus, X, Calendar, User, Activity } from "lucide-react";

// Interfaces para tipado fuerte
interface RegistroClinico {
  fecha: string;
  tipo: "Diagnóstico" | "Vacuna" | "Tratamiento";
  descripcion: string;
  veterinario: string;
}

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: string;
  dueno: string;
  historial: RegistroClinico[];
}

// Datos simulados (Mock Data)
const mascotasIniciales: Mascota[] = [
  {
    id: 1, nombre: "Firulais", especie: "Perro", raza: "Labrador", edad: "3 años", dueno: "Juan Pérez",
    historial: [
      { fecha: "2026-08-15", tipo: "Vacuna", descripcion: "Vacuna Séxtuple (Refuerzo anual)", veterinario: "Dr. Ramírez" },
      { fecha: "2026-05-10", tipo: "Diagnóstico", descripcion: "Otitis leve en oído derecho. Se recetan gotas óticas.", veterinario: "Dra. López" },
    ]
  },
  {
    id: 2, nombre: "Michi", especie: "Gato", raza: "Mestizo", edad: "1 año", dueno: "Ana López",
    historial: [
      { fecha: "2026-09-20", tipo: "Diagnóstico", descripcion: "Desparasitación interna y externa.", veterinario: "Dr. Ramírez" },
    ]
  },
  {
    id: 3, nombre: "Rocky", especie: "Perro", raza: "Bulldog Francés", edad: "5 años", dueno: "Carlos Ruiz",
    historial: [
      { fecha: "2026-10-01", tipo: "Tratamiento", descripcion: "Curación de herida superficial en pata trasera.", veterinario: "Dra. López" },
      { fecha: "2026-07-12", tipo: "Vacuna", descripcion: "Vacuna Antirrábica", veterinario: "Dr. Ramírez" },
    ]
  },
];

export default function ExpedientePage() {
  const [mascotas, setMascotas] = useState<Mascota[]>(mascotasIniciales);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState<Mascota | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevoRegistro, setNuevoRegistro] = useState({ tipo: "Diagnóstico" as const, descripcion: "" });

  // Abrir modal con los datos de la mascota
  const abrirExpediente = (mascota: Mascota) => {
    setMascotaSeleccionada(mascota);
    setModalAbierto(true);
  };

  // Agregar un nuevo registro al historial
  const agregarRegistro = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mascotaSeleccionada || !nuevoRegistro.descripcion.trim()) return;

    const nuevoReg: RegistroClinico = {
      fecha: new Date().toISOString().split("T")[0], // Fecha de hoy
      tipo: nuevoRegistro.tipo,
      descripcion: nuevoRegistro.descripcion,
      veterinario: "Dr. Ramírez (Demo)",
    };

    // Actualizar el estado local
    const mascotasActualizadas = mascotas.map((m) =>
      m.id === mascotaSeleccionada.id
        ? { ...m, historial: [nuevoReg, ...m.historial] }
        : m
    );
    
    setMascotas(mascotasActualizadas);
    setMascotaSeleccionada({ ...mascotaSeleccionada, historial: [nuevoReg, ...mascotaSeleccionada.historial] });
    setNuevoRegistro({ tipo: "Diagnóstico", descripcion: "" });
  };

  // Color según el tipo de registro
  const getTipoColor = (tipo: RegistroClinico["tipo"]) => {
    if (tipo === "Vacuna") return "bg-blue-100 text-blue-800 border-blue-200";
    if (tipo === "Tratamiento") return "bg-purple-100 text-purple-800 border-purple-200";
    return "bg-emerald-100 text-emerald-800 border-emerald-200";
  };

  const getTipoIcono = (tipo: RegistroClinico["tipo"]) => {
    if (tipo === "Vacuna") return <Syringe className="w-4 h-4 text-blue-600" />;
    if (tipo === "Tratamiento") return <Activity className="w-4 h-4 text-purple-600" />;
    return <Stethoscope className="w-4 h-4 text-emerald-600" />;
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="w-8 h-8 text-emerald-600" />
            Expediente Clínico Digital
          </h1>
          <p className="mt-2 text-gray-600">
            Historial médico centralizado. Trazabilidad completa de diagnósticos, tratamientos y vacunas.
          </p>
        </div>

        {/* Grid de Mascotas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mascotas.map((mascota) => (
            <div key={mascota.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Dog className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{mascota.nombre}</h3>
                  <p className="text-sm text-gray-500">{mascota.especie} • {mascota.raza} • {mascota.edad}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" /> Dueño: <span className="font-medium text-gray-900">{mascota.dueno}</span>
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" /> Registros: <span className="font-medium text-gray-900">{mascota.historial.length}</span>
                </p>
              </div>

              <button
                onClick={() => abrirExpediente(mascota)}
                className="w-full py-2 px-4 bg-emerald-50 text-emerald-700 font-medium rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Ver Expediente
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal del Expediente */}
      {modalAbierto && mascotaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8 relative flex flex-col max-h-[90vh]">
            {/* Header del Modal */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Dog className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{mascotaSeleccionada.nombre}</h2>
                  <p className="text-sm text-gray-500">{mascotaSeleccionada.especie} • {mascotaSeleccionada.raza} • Dueño: {mascotaSeleccionada.dueno}</p>
                </div>
              </div>
              <button onClick={() => setModalAbierto(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Contenido del Modal (Scrollable) */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Formulario para agregar nuevo registro */}
              <form onSubmit={agregarRegistro} className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Agregar Nuevo Registro Clínico
                </h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={nuevoRegistro.tipo}
                    onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, tipo: e.target.value as any })}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Diagnóstico">Diagnóstico</option>
                    <option value="Vacuna">Vacuna</option>
                    <option value="Tratamiento">Tratamiento</option>
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="Descripción del registro..."
                    value={nuevoRegistro.descripcion}
                    onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, descripcion: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                  <button type="submit" className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700">
                    Guardar
                  </button>
                </div>
              </form>

              {/* Timeline del Historial */}
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Historial Clínico</h4>
              <div className="space-y-4">
                {mascotaSeleccionada.historial.map((reg, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-full ${reg.tipo === "Vacuna" ? "bg-blue-100" : reg.tipo === "Tratamiento" ? "bg-purple-100" : "bg-emerald-100"}`}>
                        {getTipoIcono(reg.tipo)}
                      </div>
                      {index < mascotaSeleccionada.historial.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getTipoColor(reg.tipo)}`}>
                          {reg.tipo}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {reg.fecha}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800">{reg.descripcion}</p>
                      <p className="text-xs text-gray-500 mt-1">Atendido por: {reg.veterinario}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}