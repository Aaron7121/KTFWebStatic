'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HORARIOS } from '@/data/horarios'
import { PERSONAL_TRAINING_HORA } from '@/data/precios'
import { formatUSD, getPrecio } from '@/lib/precios'

const TABS = [
  { id: 'muay-thai', label: 'Muay Thai' },
  { id: 'gym', label: 'Gym' },
  { id: 'personalizado', label: 'Personalizado' },
] as const

type TabId = (typeof TABS)[number]['id']

function Bloque({ titulo, slots }: { titulo: string; slots: readonly string[] }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]">{titulo}</h3>
      <ul className="flex flex-col border-t border-white/15">
        {slots.map(s => (
          <li key={s} className="flex items-center justify-between border-b border-white/15 py-4 text-xl font-black tabular-nums sm:text-2xl">
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function HorariosTabs() {
  const [tab, setTab] = useState<TabId>('muay-thai')

  return (
    <div>
      <div role="tablist" aria-label="Tipo de horario" className="mb-10 flex flex-wrap gap-3">
        {TABS.map(t => (
          <button key={t.id} role="tab" type="button" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`border-2 px-6 py-3 text-xs font-black uppercase tracking-wider transition-colors ${
              tab === t.id ? 'border-[#D4AF37] bg-[#D4AF37] text-black' : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'muay-thai' && (
          <div>
            <div className="grid gap-10 md:grid-cols-2">
              <Bloque titulo="Mañana" slots={HORARIOS.muayThai.manana} />
              <Bloque titulo="Tarde y noche" slots={HORARIOS.muayThai.tarde} />
            </div>
            <p className="mt-8 max-w-xl text-sm leading-6 text-white/55">
              Cada clase dura una hora. Desde {formatUSD(getPrecio('muay-thai', 'diario') ?? 0)} la clase diaria o {formatUSD(getPrecio('muay-thai', 'mensual') ?? 0)} al mes.
            </p>
          </div>
        )}

        {tab === 'gym' && (
          <div>
            <div className="grid gap-10 md:grid-cols-2">
              <Bloque titulo="Mañana" slots={[HORARIOS.gym.manana]} />
              <Bloque titulo="Tarde" slots={[HORARIOS.gym.tarde]} />
            </div>
            <p className="mt-8 max-w-xl text-sm leading-6 text-white/55">
              Gym desde {formatUSD(getPrecio('gym', 'mensual') ?? 0)} al mes, o {formatUSD(getPrecio('gym-coach', 'mensual') ?? 0)} con coach que guía tu rutina.
            </p>
          </div>
        )}

        {tab === 'personalizado' && (
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <div>
              <p className="text-6xl font-black tabular-nums tracking-tight sm:text-7xl">
                {HORARIOS.personalizado.desde}<br />
                <span className="text-white/35">a {HORARIOS.personalizado.hasta}</span>
              </p>
              <p className="mt-6 max-w-sm text-sm leading-6 text-white/55">
                Reserva tu hora con un coach en cualquier momento del día. {formatUSD(PERSONAL_TRAINING_HORA)} por hora de clase.
              </p>
            </div>
            <Link href="/#personalizado"
              className="flex items-center justify-between border-2 border-[#D4AF37] px-6 py-5 text-sm font-black uppercase tracking-wider text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-black">
              Ver tipos de coaching <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
