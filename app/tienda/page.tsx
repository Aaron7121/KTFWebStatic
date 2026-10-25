'use client'

import { useState } from 'react'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CATEGORIAS, EMOJI, PRODUCTOS, PRODUCTOS_SON_EJEMPLO } from '@/data/productos'
import { formatUSD } from '@/lib/precios'

function ImagenProducto({ src, alt, emoji }: { src?: string; alt: string; emoji: string }) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div className="flex h-48 items-center justify-center border-b border-white/10 bg-[#0a1826] text-6xl select-none" aria-hidden="true">
        {emoji}
      </div>
    )
  }

  return (
    <div className="relative flex h-48 w-full items-center justify-center overflow-hidden border-b border-white/10 bg-[#0a1826]">
      <img
        src={src}
        alt={alt}
        onError={() => setError(true)}
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
    </div>
  )
}

export default function TiendaPage() {
  const [categoria, setCategoria] = useState<(typeof CATEGORIAS)[number]>('Todos')
  const [carrito, setCarrito] = useState<{ id: number; cantidad: number }[]>([])

  const filtrados = categoria === 'Todos' ? PRODUCTOS : PRODUCTOS.filter(p => p.categoria === categoria)

  const agregar = (id: number) =>
    setCarrito(prev =>
      prev.some(i => i.id === id) ? prev.map(i => (i.id === id ? { ...i, cantidad: i.cantidad + 1 } : i)) : [...prev, { id, cantidad: 1 }],
    )

  const totalItems = carrito.reduce((s, i) => s + i.cantidad, 0)
  const totalPrecio = carrito.reduce((s, i) => s + (PRODUCTOS.find(p => p.id === i.id)?.precio ?? 0) * i.cantidad, 0)

  return (
    <main className="min-h-screen overflow-hidden bg-[#040B14] text-white">
      <SiteHeader activo="tienda">
        {totalItems > 0 && (
          <div className="flex items-center gap-2 border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-2 text-xs font-black text-[#D4AF37]" aria-live="polite">
            <ShoppingBag size={14} /> {totalItems} · {formatUSD(totalPrecio)}
          </div>
        )}
      </SiteHeader>

      <section className="border-b-2 border-white/15 bg-black px-5 py-16 text-center lg:px-10">
        <h1 className="text-6xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-8xl">Equípate<br /><span className="italic text-[#D4AF37]">para ganar.</span></h1>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/55">Equipamiento, ropa y suplementos para tu entrenamiento.</p>
        {PRODUCTOS_SON_EJEMPLO && <p className="mt-3 text-xs text-white/35">Catálogo y precios de ejemplo. La compra online aún no está activa.</p>}
      </section>

      <div className="border-b border-white/10 px-5 py-5 lg:px-10">
        <div role="group" aria-label="Filtrar por categoría" className="mx-auto flex max-w-7xl gap-3 overflow-x-auto pb-1">
          {CATEGORIAS.map(cat => (
            <button key={cat} type="button" aria-pressed={categoria === cat} onClick={() => setCategoria(cat)}
              className={`whitespace-nowrap border-2 px-5 py-2 text-xs font-black uppercase tracking-wider transition-colors ${categoria === cat ? 'border-[#D4AF37] bg-[#D4AF37] text-black' : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'}`}>
              {EMOJI[cat] ?? '🏷️'} {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
        <p className="mb-8 text-xs font-bold uppercase tracking-widest text-white/40">{filtrados.length} producto{filtrados.length !== 1 ? 's' : ''} · {categoria}</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtrados.map(p => {
            const enCarrito = carrito.find(i => i.id === p.id)
            return (
              <article key={p.id} className="flex flex-col border-2 border-white/10 bg-[#081522] transition-colors hover:border-[#D4AF37]/40">
                <ImagenProducto src={p.imagen} alt={p.nombre} emoji={EMOJI[p.categoria] ?? '🏷️'} />
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#D4AF37]/80">{p.categoria}</span>
                  <h3 className="mb-2 text-base font-black uppercase leading-tight">{p.nombre}</h3>
                  <p className="mb-4 flex-1 text-xs leading-5 text-white/50">{p.descripcion}</p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <p className="text-2xl font-black text-[#D4AF37]">{formatUSD(p.precio)}</p>
                    <button type="button" onClick={() => agregar(p.id)} className="flex items-center gap-2 bg-[#D4AF37] px-4 py-2 text-[10px] font-black uppercase tracking-wider text-black transition-colors hover:bg-white">
                      <ShoppingBag size={13} /> {enCarrito ? `(${enCarrito.cantidad}) +1` : 'Agregar'}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <section className="border-t-2 border-white/15 bg-[#D4AF37] px-5 py-14 text-black lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.25em]">¿Listo para entrenar?</p>
            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl">Inscríbete hoy<br />y empieza a<br /><span className="italic">luchar.</span></h2>
          </div>
          <Link href="/inscripcion" className="flex items-center gap-3 border-4 border-black bg-black px-8 py-5 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black">Iniciar inscripción <ArrowRight size={20} /></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
