"use client";

import { useState } from "react";
import { Calendar, Clock, User, Dog, CheckCircle, XCircle, AlertCircle, Plus, X } from "lucide-react";

interface Cita {
  id: number;
  dueno: string;
  mascota: string;
  especie: string;
  fecha: string;
  hora: string;
  motivo: string;
  estado: "Pendiente" | "Confirmada" | "Atendida" | "Cancelada";
}

const citasIniciales: Cita[] = [
  { id: 1, dueno: "Juan Pérez", mascota: "Firulais", especie: "Perro", fecha: "2026-10-23", hora: "09:00", motivo: "Vacunación anual", estado: "Confirmada" },
  { id: 2, dueno: "Ana López", mascota: "Michi", especie: "Gato", fecha: "2026-10-23", hora: "10:30", motivo: "Revisión general", estado: "Pendiente" },
  { id: 3, dueno: "Carlos Ruiz", mascota: "Rocky", especie: "Perro", fecha: "2026-10-23", hora: "11:45", motivo: "Urgencia - Cojera", estado: "Pendiente" },
  { id: 4, dueno: "María García", mascota: "Luna", especie: "Conejo", fecha: "2026-10-23", hora: "12:00", motivo: "Corte de uñas", estado: "Atendida" },
];

export default function CitasPage() {
  const [citas, setCitas] = useState<Cita[]>(citasIniciales);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevaCita, setNuevaCita] = useState({
    dueno: "",
    mascota: "",
    especie: "Perro",
    fecha: "",
    hora: "",
    motivo: "",
  });

  const cambiarEstado = (id: number, nuevoEstado: Cita["estado"]) => {
    setCitas((prev) =>
      prev.map((cita) => (cita.id === id ? { ...cita, estado: nuevoEstado } : cita))
    );
  };

  const getEstadoColor = (estado: Cita["estado"]) => {
    switch (estado) {
      case "Confirmada": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Atendida": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Cancelada": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevaCita((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cita: Cita = {
      id: citas.length + 1,
      ...nuevaCita,
      estado: "Pendiente",
    };
    setCitas((prev) => [...prev, cita]);
    setNuevaCita({ dueno: "", mascota: "", especie: "Perro", fecha: "", hora: "", motivo: "" });
    setModalAbierto(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-emerald-600" />
              Agenda de Citas
            </h1>
            <p className="mt-2 text-gray-600">Gestión diaria de consultas y servicios veterinarios.</p>
          </div>
          <button
            onClick={() => setModalAbierto(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Nueva Cita
          </button>
        </div>

        {/* Resumen */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Hoy</p>
            <p className="text-2xl font-bold text-gray-900">{citas.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Pendientes</p>
            <p className="text-2xl font-bold text-amber-600">{citas.filter(c => c.estado === "Pendiente").length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Confirmadas</p>
            <p className="text-2xl font-bold text-blue-600">{citas.filter(c => c.estado === "Confirmada").length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Atendidas</p>
            <p className="text-2xl font-bold text-emerald-600">{citas.filter(c => c.estado === "Atendida").length}</p>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mascota / Dueño</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Motivo</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {citas.map((cita) => (
                  <tr key={cita.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-100 p-2 rounded-lg">
                          <Dog className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{cita.mascota} <span className="text-xs text-gray-500">({cita.especie})</span></p>
                          <p className="text-sm text-gray-500 flex items-center gap-1"><User className="w-3 h-3" /> {cita.dueno}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 font-medium">{cita.fecha}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {cita.hora}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{cita.motivo}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEstadoColor(cita.estado)}`}>
                        {cita.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {cita.estado !== "Atendida" && (
                        <button
                          onClick={() => cambiarEstado(cita.id, "Atendida")}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                          title="Marcar como Atendida"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      {cita.estado === "Pendiente" && (
                        <button
                          onClick={() => cambiarEstado(cita.id, "Confirmada")}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Confirmar Cita"
                        >
                          <AlertCircle className="w-5 h-5" />
                        </button>
                      )}
                      {cita.estado !== "Cancelada" && (
                        <button
                          onClick={() => cambiarEstado(cita.id, "Cancelada")}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Cancelar Cita"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Nueva Cita */}
        {modalAbierto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setModalAbierto(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-emerald-600" />
                Agendar Nueva Cita
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del dueño</label>
                  <input
                    type="text"
                    name="dueno"
                    required
                    value={nuevaCita.dueno}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la mascota</label>
                    <input
                      type="text"
                      name="mascota"
                      required
                      value={nuevaCita.mascota}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Ej. Firulais"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Especie</label>
                    <select
                      name="especie"
                      value={nuevaCita.especie}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option>Perro</option>
                      <option>Gato</option>
                      <option>Conejo</option>
                      <option>Ave</option>
                      <option>Otro</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                    <input
                      type="date"
                      name="fecha"
                      required
                      value={nuevaCita.fecha}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                    <input
                      type="time"
                      name="hora"
                      required
                      value={nuevaCita.hora}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Motivo de la cita</label>
                  <input
                    type="text"
                    name="motivo"
                    required
                    value={nuevaCita.motivo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Ej. Vacunación, revisión general..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalAbierto(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Agendar Cita
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}