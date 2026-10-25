// Horarios de la academia (ContextoNegocioKTF.md).

export const HORARIOS = {
  gym: {
    manana: '7:00 – 11:00 AM',
    tarde: '4:00 – 8:00 PM',
  },
  muayThai: {
    manana: ['7:00 – 8:00 AM', '8:00 – 9:00 AM', '9:00 – 10:00 AM'],
    tarde: ['4:00 – 5:00 PM', '5:00 – 6:00 PM', '6:00 – 7:00 PM', '7:00 – 8:00 PM'],
  },
  personalizado: {
    desde: '5:00 AM',
    hasta: '9:00 PM',
    horasAtencion: 16,
  },
} as const
