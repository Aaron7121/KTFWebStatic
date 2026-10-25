'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { SERVICIOS } from '@/data/servicios'
import { DURACIONES, INSCRIPCION, type ServicioId } from '@/data/precios'
import { calcularAhorro, calcularTotal, duracionesDisponibles, formatUSD, getPrecio, precioPorMes } from '@/lib/precios'

export function PlanesExplorer({ inicial }: { inicial: ServicioId }) {
  const [servicioId, setServicioId] = useState<ServicioId>(inicial)
  const servicio = SERVICIOS.find(s => s.id === servicioId)!
  const duraciones = duracionesDisponibles(servicioId)

  return (
    <div>
      <div role="tablist" aria-label="Servicio" className="mb-10 flex flex-wrap gap-3">
        {SERVICIOS.map(s => (
          <button key={s.id} role="tab" type="button" aria-selected={servicioId === s.id} onClick={() => setServicioId(s.id)}
            className={`border-2 px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors ${
              servicioId === s.id ? 'border-[#D4AF37] bg-[#D4AF37] text-black' : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
            }`}>
            {s.nombre}
          </button>
        ))}
      </div>

      <div className="mb-8 grid gap-6 border-l-4 border-[#D4AF37] pl-5 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="text-3xl font-black uppercase sm:text-4xl">{servicio.nombre}</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">{servicio.resumen}</p>
        </div>
        <ul className="flex flex-col gap-1 text-sm text-white/70">
          {servicio.incluye.map(i => (
            <li key={i} className="flex items-center gap-2"><Check size={14} className="text-[#D4AF37]" /> {i}</li>
          ))}
        </ul>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {duraciones.map(d => {
          const info = DURACIONES.find(x => x.id === d)!
          const precio = getPrecio(servicioId, d)!
          const total = calcularTotal(servicioId, d)!
          const ahorro = calcularAhorro(servicioId, d)
          const porMes = precioPorMes(servicioId, d)
          return (
            <article key={d} className="flex flex-col border-2 border-white/15 bg-[#081522] p-6">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-black uppercase">{info.label}</h3>
                  <p className="text-xs text-white/45">{info.detalle}</p>
                </div>
                {ahorro > 0 && (
                  <span className="bg-[#D4AF37] px-2 py-1 text-[10px] font-black text-black">Ahorras {formatUSD(ahorro)}</span>
                )}
              </div>
              <p className="text-6xl font-black tracking-tight text-[#D4AF37]">{formatUSD(precio)}</p>
              <p className="mt-1 h-5 text-xs text-white/45">
                {porMes !== undefined && info.meses > 1 ? `≈ ${formatUSD(Math.round(porMes * 100) / 100)} al mes` : ''}
              </p>
              <div className="mt-5 flex-1 border-t border-white/10 pt-4 text-sm text-white/60">
                {total.inscripcion > 0 ? (
                  <p>+ {formatUSD(INSCRIPCION)} de inscripción (solo la primera vez)<br />
                    <span className="font-black text-white">Pagas hoy {formatUSD(total.total)}</span></p>
                ) : (
                  <p>Sin inscripción.<br /><span className="font-black text-white">Pagas hoy {formatUSD(total.total)}</span></p>
                )}
              </div>
              <Link href={`/inscripcion?servicio=${servicioId}&plan=${d}`}
                className="mt-5 flex items-center justify-between bg-[#D4AF37] px-5 py-4 text-sm font-black uppercase tracking-wider text-black transition-colors hover:bg-white">
                Elegir {info.label.toLowerCase()} <ArrowRight size={18} />
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
