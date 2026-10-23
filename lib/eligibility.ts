/**
 * Reglas de negocio para la validación socioeconómica del Sistema de Veterinaria de Bajo Costo.
 * Basado en la especificación IEEE 29148 y el salario mínimo vigente 2026 ($248.93 MXN diarios).
 * 
 * ALGORITMO ESCALONADO: A mayor ingreso, mayor porcentaje de pago.
 */

export interface ValidacionInput {
  ingresoMensualFamiliar: number; // Ingreso total del hogar al mes
  numeroDependientes: number;     // Número de personas que dependen de ese ingreso
  esAdultoMayor: boolean;         // 60 años o más
  tieneDiscapacidad: boolean;     // Cuenta con discapacidad
  esSituacionCalle: boolean;      // Persona en situación de calle o sin documentos formales
}

export interface ResultadoValidacion {
  porcentajeCondonacion: number;  // 0, 90, 95, etc.
  porcentajeAPagar: number;       // 100, 10, 5, etc.
  montoAPagar: number;
  nivelSocioeconomico: string;
  mensaje: string;
  ingresoDiarioPerCapita: number;
}

const SALARIO_MINIMO_DIARIO = 248.93;
const SALARIO_MINIMO_MENSUAL = 7467.90; // 248.93 × 30 días
const COSTO_BASE_CONSULTA = 600;

/**
 * Evalúa los criterios socioeconómicos y determina el nivel de condonación.
 * NUEVA LÓGICA: Sistema escalonado basado en capacidad de pago real.
 */
export function evaluarCondonacion(input: ValidacionInput): ResultadoValidacion {
  // Evitar división por cero
  const dependientesValidos = input.numeroDependientes > 0 ? input.numeroDependientes : 1;
  
  // Cálculo del ingreso diario per cápita
  const ingresoDiarioPerCapita = (input.ingresoMensualFamiliar / 30) / dependientesValidos;

  // 1. CASO ESPECIAL: Sin ingresos o situación de calle → 100% condonación
  if (input.ingresoMensualFamiliar === 0 || input.esSituacionCalle) {
    return {
      porcentajeCondonacion: 100,
      porcentajeAPagar: 0,
      montoAPagar: 0,
      nivelSocioeconomico: "Condonación Total",
      ingresoDiarioPerCapita,
      mensaje: "Se aprueba condonación del 100%. Sin capacidad de pago documentada."
    };
  }

  // 2. CASO ESPECIAL: Discapacidad sin ingresos → 100% condonación
  if (input.tieneDiscapacidad && input.ingresoMensualFamiliar < SALARIO_MINIMO_MENSUAL * 0.5) {
    return {
      porcentajeCondonacion: 100,
      porcentajeAPagar: 0,
      montoAPagar: 0,
      nivelSocioeconomico: "Condonación Total",
      ingresoDiarioPerCapita,
      mensaje: "Se aprueba condonación del 100% por discapacidad sin ingresos suficientes."
    };
  }

  // 3. SISTEMA ESCALONADO: Basado en ingreso per cápita mensual
  const ingresoMensualPerCapita = input.ingresoMensualFamiliar / dependientesValidos;
  
  // Nivel 1: Hasta 1 salario mínimo mensual → Paga 5% (95% condonación)
  if (ingresoMensualPerCapita <= SALARIO_MINIMO_MENSUAL) {
    const monto = COSTO_BASE_CONSULTA * 0.05; // 5%
    return {
      porcentajeCondonacion: 95,
      porcentajeAPagar: 5,
      montoAPagar: monto,
      nivelSocioeconomico: "Condonación Muy Alta",
      ingresoDiarioPerCapita,
      mensaje: `Se aprueba condonación del 95%. Ingreso mensual per cápita ($${ingresoMensualPerCapita.toFixed(2)}) es menor o igual a 1 salario mínimo mensual. Costo de consulta: $${monto.toFixed(2)}.`
    };
  }
  
  // Nivel 2: 1-2 salarios mínimos mensuales → Paga 10% (90% condonación)
  if (ingresoMensualPerCapita <= SALARIO_MINIMO_MENSUAL * 2) {
    const monto = COSTO_BASE_CONSULTA * 0.10; // 10%
    return {
      porcentajeCondonacion: 90,
      porcentajeAPagar: 10,
      montoAPagar: monto,
      nivelSocioeconomico: "Condonación Alta",
      ingresoDiarioPerCapita,
      mensaje: `Se aprueba condonación del 90%. Ingreso mensual per cápita ($${ingresoMensualPerCapita.toFixed(2)}) está entre 1 y 2 salarios mínimos mensuales. Costo de consulta: $${monto.toFixed(2)}.`
    };
  }
  
  // Nivel 3: 2-3 salarios mínimos mensuales → Paga 20% (80% condonación)
  if (ingresoMensualPerCapita <= SALARIO_MINIMO_MENSUAL * 3) {
    const monto = COSTO_BASE_CONSULTA * 0.20; // 20%
    return {
      porcentajeCondonacion: 80,
      porcentajeAPagar: 20,
      montoAPagar: monto,
      nivelSocioeconomico: "Condonación Moderada",
      ingresoDiarioPerCapita,
      mensaje: `Se aprueba condonación del 80%. Ingreso mensual per cápita ($${ingresoMensualPerCapita.toFixed(2)}) está entre 2 y 3 salarios mínimos mensuales. Costo de consulta: $${monto.toFixed(2)}.`
    };
  }
  
  // Nivel 4: 3-5 salarios mínimos mensuales → Paga 40% (60% condonación)
  if (ingresoMensualPerCapita <= SALARIO_MINIMO_MENSUAL * 5) {
    const monto = COSTO_BASE_CONSULTA * 0.40; // 40%
    return {
      porcentajeCondonacion: 60,
      porcentajeAPagar: 40,
      montoAPagar: monto,
      nivelSocioeconomico: "Condonación Baja",
      ingresoDiarioPerCapita,
      mensaje: `Se aprueba condonación del 60%. Ingreso mensual per cápita ($${ingresoMensualPerCapita.toFixed(2)}) está entre 3 y 5 salarios mínimos mensuales. Costo de consulta: $${monto.toFixed(2)}.`
    };
  }

  // Nivel 5: Más de 5 salarios mínimos → Pago completo (0% condonación)
  return {
    porcentajeCondonacion: 0,
    porcentajeAPagar: 100,
    montoAPagar: COSTO_BASE_CONSULTA,
    nivelSocioeconomico: "Pago Completo",
    ingresoDiarioPerCapita,
    mensaje: `No aplica a condonación. Ingreso mensual per cápita ($${ingresoMensualPerCapita.toFixed(2)}) supera 5 salarios mínimos mensuales. Costo de consulta: $${COSTO_BASE_CONSULTA}.`
  };
}