import type { ServicioId } from './precios'

export interface Servicio {
  id: ServicioId
  nombre: string
  resumen: string
  incluye: string[]
  icono: 'muay-thai' | 'gym' | 'combo' | 'coach'
  destacado?: boolean
}

export const SERVICIOS: Servicio[] = [
  {
    id: 'muay-thai',
    nombre: 'Solo Muay Thai',
    resumen: 'Clases de una hora, guiadas, en 7 horarios al día.',
    incluye: ['Clases de mañana y de tarde', 'Técnica, golpeo y condición física', 'Para todos los niveles'],
    icono: 'muay-thai',
  },
  {
    id: 'gym',
    nombre: 'Solo Gym',
    resumen: 'Acceso a nuestras instalaciones en los horarios del gimnasio.',
    incluye: ['Mañana: 7:00 – 11:00 AM', 'Tarde: 4:00 – 8:00 PM', 'Sala de pesas y cardio'],
    icono: 'gym',
  },
  {
    id: 'muay-thai-gym',
    nombre: 'Muay Thai & Gym',
    resumen: 'El plan completo: combate y fuerza en una sola membresía.',
    incluye: ['Todas las clases de Muay Thai', 'Gym en ambos horarios', 'El mejor precio en planes largos'],
    icono: 'combo',
    destacado: true,
  },
  {
    id: 'gym-coach',
    nombre: 'Gym + Coach',
    resumen: 'Entrenamiento guiado: un coach arma y supervisa tu rutina.',
    incluye: ['Rutina guiada por un coach', 'Cualquier horario de atención', 'Solo mensualidad'],
    icono: 'coach',
  },
]

export const COACHING_PERSONALIZADO = [
  { titulo: 'Competencia deportiva', detalle: 'Preparación técnica y física para competir.' },
  { titulo: 'Acondicionamiento físico', detalle: 'Resistencia, fuerza y movilidad a tu medida.' },
  { titulo: 'Defensa personal', detalle: 'Técnicas prácticas para protegerte.' },
  { titulo: 'Control de peso', detalle: 'Entrenamiento enfocado en tu meta.' },
]
