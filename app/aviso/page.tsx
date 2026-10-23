import { ShieldCheck } from "lucide-react";

export default function AvisoPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-4">
          <div className="bg-emerald-100 p-3 rounded-full">
            <ShieldCheck className="w-8 h-8 text-emerald-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Aviso de Confidencialidad</h1>
        </div>
        
        <div className="prose text-gray-700 space-y-4 leading-relaxed">
          <p className="font-semibold text-gray-900">
            En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, el Sistema de Veterinaria de Bajo Costo (VetCare) se compromete a proteger la información personal y socioeconómica de sus usuarios.
          </p>
          <p>
            Todos los datos recopilados durante el proceso de validación socioeconómica, incluyendo ingresos familiares, número de dependientes y documentación oficial, serán tratados con estricta confidencialidad. Esta información se utilizará <strong>exclusivamente</strong> para determinar el nivel de condonación aplicable según la matriz de decisión institucional.
          </p>
          <p>
            El acceso a esta información sensible está restringido únicamente al personal autorizado (Secretaria y Trabajadora Social) bajo el principio de mínimo privilegio, garantizando que el personal veterinario no tenga acceso a los detalles socioeconómicos del cliente.
          </p>
          <p>
            Para cualquier duda sobre el tratamiento de sus datos, puede contactar a la administración del sistema a través de nuestros canales oficiales.
          </p>
        </div>
      </div>
    </main>
  );
}