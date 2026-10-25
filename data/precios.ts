// Fuente única de precios (USD). Viene de ContextoNegocioKTF.md.
// Si un servicio no tiene un plan, simplemente no se define y la web lo oculta.

export type ServicioId = 'muay-thai' | 'gym' | 'muay-thai-gym' | 'gym-coach'
export type Duracion = 'diario' | 'mensual' | 'trimestral' | 'semestral' | 'anual'

export const DURACIONES: { id: Duracion; label: string; meses: number; detalle: string }[] = [
  { id: 'diario', label: 'Diario', meses: 0, detalle: 'Una clase o un día' },
  { id: 'mensual', label: 'Mensual', meses: 1, detalle: '1 mes' },
  { id: 'trimestral', label: 'Trimestral', meses: 3, detalle: '3 meses' },
  { id: 'semestral', label: 'Semestral', meses: 6, detalle: '6 meses' },
  { id: 'anual', label: 'Anual', meses: 12, detalle: '12 meses' },
]

export const PRECIOS: Record<ServicioId, Partial<Record<Duracion, number>>> = {
  'muay-thai': { diario: 4, mensual: 35, trimestral: 90, semestral: 150, anual: 300 },
  gym: { diario: 3, mensual: 25, trimestral: 60, semestral: 130, anual: 250 },
  'muay-thai-gym': { diario: 4, mensual: 45, trimestral: 105, semestral: 180, anual: 360 },
  // Entrenamiento guiado con coach: por ahora solo existe la mensualidad.
  'gym-coach': { mensual: 35 },
}

/** Se cobra una sola vez, en el primer pago (no aplica a clase diaria). */
export const INSCRIPCION = 10
/** Precio por hora de clase personalizada. */
export const PERSONAL_TRAINING_HORA = 10
