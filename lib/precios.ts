import {
  DURACIONES,
  INSCRIPCION,
  PRECIOS,
  type Duracion,
  type ServicioId,
} from '@/data/precios'

export const formatUSD = (n: number) =>
  Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2).replace('.', ',')}`

export const getPrecio = (s: ServicioId, d: Duracion): number | undefined => PRECIOS[s][d]

/** Duraciones que realmente existen para un servicio, en orden. */
export const duracionesDisponibles = (s: ServicioId): Duracion[] =>
  DURACIONES.filter(d => PRECIOS[s][d.id] !== undefined).map(d => d.id)

export const getMeses = (d: Duracion) => DURACIONES.find(x => x.id === d)?.meses ?? 0

/** Cuánto se ahorra frente a pagar mes a mes. 0 si no aplica. */
export function calcularAhorro(s: ServicioId, d: Duracion): number {
  const meses = getMeses(d)
  const mensual = PRECIOS[s].mensual
  const precio = PRECIOS[s][d]
  if (meses <= 1 || mensual === undefined || precio === undefined) return 0
  return Math.max(0, mensual * meses - precio)
}

export function precioPorMes(s: ServicioId, d: Duracion): number | undefined {
  const meses = getMeses(d)
  const precio = PRECIOS[s][d]
  if (meses < 1 || precio === undefined) return undefined
  return precio / meses
}

/** Total del primer pago: plan + inscripción (la clase diaria no paga inscripción). */
export function calcularTotal(s: ServicioId, d: Duracion) {
  const plan = PRECIOS[s][d]
  if (plan === undefined) return null
  const inscripcion = d === 'diario' ? 0 : INSCRIPCION
  return { plan, inscripcion, total: plan + inscripcion }
}

/** Menor mensualidad disponible, para el "Desde $X/mes". */
export const precioDesdeMensual = () =>
  Math.min(...Object.values(PRECIOS).map(p => p.mensual ?? Infinity))

export const nombreDuracion = (d: Duracion) => DURACIONES.find(x => x.id === d)?.label ?? d
