'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'

const LINKS = [
  { href: '/#servicios', label: 'Servicios', id: 'servicios' },
  { href: '/#horarios', label: 'Horarios', id: 'horarios' },
  { href: '/planes', label: 'Planes', id: 'planes' },
  { href: '/#competencias', label: 'Competencias', id: 'competencias' },
  { href: '/#ubicacion', label: 'Ubicación', id: 'ubicacion' },
  { href: '/tienda', label: 'Tienda', id: 'tienda' },
]

export function SiteHeader({ activo, children }: { activo?: 'planes' | 'tienda' | 'inscripcion'; children?: ReactNode }) {
  const [abierto, setAbierto] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b-2 border-white/15 bg-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Kamikaze Thai Fight, inicio" onClick={() => setAbierto(false)}>
          <img src="/logoKTF.png" alt="Logo KTF" className="size-12 object-contain" />
          <span className="hidden text-sm font-black uppercase tracking-[0.18em] sm:block">
            Kamikaze<br /><span className="text-[#D4AF37]">Thai Fight</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.16em] lg:flex" aria-label="Navegación principal">
          {LINKS.map(l => (
            <Link key={l.id} href={l.href}
              className={`transition-colors hover:text-[#D4AF37] ${activo === l.id ? 'text-[#D4AF37]' : ''}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {children}
          {activo !== 'inscripcion' && (
            <Link href="/inscripcion"
              className="hidden items-center gap-2 border-2 border-[#D4AF37] bg-[#D4AF37] px-5 py-3 text-xs font-black uppercase tracking-wider text-black transition-colors hover:border-white hover:bg-white sm:flex">
              Inscribirme <ArrowRight size={16} />
            </Link>
          )}
          <button type="button" aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={abierto} aria-controls="menu-movil"
            onClick={() => setAbierto(v => !v)}
            className="border-2 border-white/30 p-3 transition-colors hover:border-[#D4AF37] lg:hidden">
            {abierto ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {abierto && (
        <nav id="menu-movil" aria-label="Menú móvil" className="border-t border-white/15 bg-black lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-2">
            {LINKS.map(l => (
              <li key={l.id} className="border-b border-white/10">
                <Link href={l.href} onClick={() => setAbierto(false)}
                  className={`block py-4 text-sm font-black uppercase tracking-[0.16em] ${activo === l.id ? 'text-[#D4AF37]' : ''}`}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Link href="/inscripcion" onClick={() => setAbierto(false)}
                className="flex items-center justify-between bg-[#D4AF37] px-5 py-4 text-sm font-black uppercase tracking-wider text-black">
                Inscribirme <ArrowRight size={18} />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
