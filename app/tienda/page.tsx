'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, ShoppingBag, Star } from 'lucide-react'
import Link from 'next/link'

// ─── Datos quemados ────────────────────────────────────────────────────────────
const PRODUCTOS = [
  // Equipamiento
  { id: 1,  nombre: 'Vendas para manos',          descripcion: 'Vendas elásticas 4.5 m, protección profesional para nudillos y muñecas.',       precio: 12, categoria: 'Equipamiento' },
  { id: 2,  nombre: 'Bucal protector',            descripcion: 'Protector bucal termoformable, ajuste personalizado.',                            precio: 5,  categoria: 'Equipamiento' },
  { id: 3,  nombre: 'Guantes de entrenamiento',   descripcion: 'Guantes de boxeo 12 oz, cuero sintético premium, color negro/dorado.',            precio: 45, categoria: 'Equipamiento' },
  { id: 4,  nombre: 'Espinilleras KTF',           descripcion: 'Espinilleras de Muay Thai, espuma de alta densidad, tallas S–XL.',               precio: 28, categoria: 'Equipamiento' },
  // Ropa
  { id: 5,  nombre: 'Short de entrenamiento',     descripcion: 'Short estilo Muay Thai, tela satinada, diseño KTF exclusivo.',                   precio: 15, categoria: 'Ropa' },
  { id: 6,  nombre: 'Camiseta sin mangas KTF',    descripcion: 'Camiseta dry-fit con logo bordado, ideal para entrenamientos intensos.',          precio: 15, categoria: 'Ropa' },
  { id: 7,  nombre: 'Hoodie KTF',                 descripcion: 'Sudadera con capucha, algodón grueso 320 g, logo frontal.',                      precio: 35, categoria: 'Ropa' },
  // Suplementos
  { id: 8,  nombre: 'Proteína Whey KTF 1 kg',    descripcion: 'Proteína de suero de leche, 24 g por porción, sabor chocolate.',                  precio: 38, categoria: 'Suplementos' },
  { id: 9,  nombre: 'Creatina monohidrato 300 g', descripcion: 'Creatina pura micronizada, mejora fuerza y recuperación.',                        precio: 22, categoria: 'Suplementos' },
  // Bebidas
  { id: 10, nombre: 'Bebida isotónica KTF',       descripcion: 'Electrolitos + vitamina C, recuperación rápida post-entrenamiento, 500 ml.',     precio: 3,  categoria: 'Bebidas' },
  { id: 11, nombre: 'Shake de proteína listo',    descripcion: 'Batido RTD 40 g de proteína, 330 ml — chocolate, vainilla o fresa.',             precio: 5,  categoria: 'Bebidas' },
  { id: 12, nombre: 'Agua alcalina 1 L',          descripcion: 'Agua alcalina pH 9.5, hidratación óptima para el entrenamiento.',                precio: 2,  categoria: 'Bebidas' },
]

const CATEGORIAS = ['Todos', 'Equipamiento', 'Ropa', 'Suplementos', 'Bebidas']

const EMOJI: Record<string, string> = {
  Equipamiento: '🥊',
  Ropa: '👕',
  Suplementos: '💪',
  Bebidas: '🥤',
}

// ─── Página ────────────────────────────────────────────────────────────────────
export default function TiendaPage() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [carrito, setCarrito] = useState<{ id: number; cantidad: number }[]>([])

  const productosFiltrados = categoriaActiva === 'Todos'
    ? PRODUCTOS
    : PRODUCTOS.filter(p => p.categoria === categoriaActiva)

  const agregar = (id: number) =>
    setCarrito(prev => {
      const existe = prev.find(i => i.id === id)
      return existe
        ? prev.map(i => i.id === id ? { ...i, cantidad: i.cantidad + 1 } : i)
        : [...prev, { id, cantidad: 1 }]
    })

  const totalItems  = carrito.reduce((s, i) => s + i.cantidad, 0)
  const totalPrecio = carrito.reduce((s, i) => {
    const p = PRODUCTOS.find(p => p.id === i.id)
    return s + (p?.precio ?? 0) * i.cantidad
  }, 0)

  return (
    <main className="min-h-screen overflow-hidden bg-[#040B14] text-white">

      {/* ── Header ────────────────────────────────────────────────────────────── */}
      <header className="border-b-2 border-white/15 bg-black/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">

          <Link href="/" className="flex items-center gap-3">
            <img src="/logoKTF.png" alt="Logo KTF" className="size-14 object-contain" />
            <span className="hidden text-sm font-black uppercase tracking-[0.18em] sm:block">
              Kamikaze<br /><span className="text-[#D4AF37]">Thai Fight</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.18em] md:flex">
            <Link className="transition-colors hover:text-[#D4AF37]" href="/#nosotros">Quiénes somos</Link>
            <Link className="transition-colors hover:text-[#D4AF37]" href="/#competencias">Competencias</Link>
            <Link className="text-[#D4AF37]" href="/tienda">Tienda</Link>
          </nav>

          <div className="flex items-center gap-3">
            {totalItems > 0 && (
              <div className="flex items-center gap-2 border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-2 text-xs font-black text-[#D4AF37]">
                <ShoppingBag size={14} /> {totalItems} · ${totalPrecio.toFixed(2)}
              </div>
            )}
            <Link href="/inscripcion"
              className="hidden items-center gap-2 border-2 border-[#D4AF37] bg-[#D4AF37] px-5 py-3 text-xs font-black uppercase tracking-wider text-black transition-colors hover:bg-white hover:border-white sm:flex">
              Inscribirse <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="border-b-2 border-white/15 bg-black px-5 py-16 text-center lg:px-10">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37]">
          <span className="mr-3 inline-block h-px w-8 align-middle bg-[#D4AF37]" />
          Tienda oficial KTF
          <span className="ml-3 inline-block h-px w-8 align-middle bg-[#D4AF37]" />
        </p>
        <h1 className="text-6xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-8xl">
          Equípate<br /><span className="italic text-[#D4AF37]">para ganar.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/50">
          Equipamiento, ropa y suplementos para tu entrenamiento. Todo lo que necesitas para rendir al máximo.
        </p>
      </section>

      {/* ── Filtros ───────────────────────────────────────────────────────────── */}
      <div className="border-b border-white/10 bg-[#040B14] px-5 py-5 lg:px-10">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto pb-1">
          {CATEGORIAS.map(cat => (
            <button key={cat} onClick={() => setCategoriaActiva(cat)}
              className={`whitespace-nowrap border-2 px-5 py-2 text-xs font-black uppercase tracking-wider transition-colors
                ${categoriaActiva === cat
                  ? 'border-[#D4AF37] bg-[#D4AF37] text-black'
                  : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'}`}>
              {EMOJI[cat] ?? '🏷️'} {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grilla de productos ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
        <p className="mb-8 text-xs font-bold uppercase tracking-widest text-white/30">
          {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''} · {categoriaActiva}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productosFiltrados.map(producto => {
            const enCarrito = carrito.find(i => i.id === producto.id)
            return (
              <article key={producto.id}
                className="group flex flex-col border-2 border-white/10 bg-[#081522] transition-colors hover:border-[#D4AF37]/40">

                {/* Imagen / emoji placeholder */}
                <div className="flex h-44 items-center justify-center border-b border-white/10 bg-[#0a1826] text-6xl">
                  {EMOJI[producto.categoria] ?? '📦'}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]/70">
                      {producto.categoria}
                    </span>
                    <Star size={12} className="text-white/20" />
                  </div>
                  <h3 className="mb-2 text-base font-black uppercase leading-tight">{producto.nombre}</h3>
                  <p className="mb-4 flex-1 text-xs leading-5 text-white/45">{producto.descripcion}</p>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <p className="text-2xl font-black text-[#D4AF37]">${producto.precio}</p>
                    <button onClick={() => agregar(producto.id)}
                      className="flex items-center gap-2 bg-[#D4AF37] px-4 py-2 text-[10px] font-black uppercase tracking-wider text-black transition-colors hover:bg-white">
                      <ShoppingBag size={13} />
                      {enCarrito ? `(${enCarrito.cantidad}) +1` : 'Agregar'}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* ── Banner inscripción ────────────────────────────────────────────────── */}
      <section className="border-t-2 border-white/15 bg-[#D4AF37] px-5 py-14 text-black lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.25em]">¿Listo para entrenar?</p>
            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl">
              Inscríbete hoy<br />y empieza a<br /><span className="italic">luchar.</span>
            </h2>
          </div>
          <Link href="/inscripcion"
            className="flex items-center gap-3 border-4 border-black bg-black px-8 py-5 text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black">
            Iniciar inscripción <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-black/20 bg-[#D4AF37] px-5 py-6 text-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[10px] font-bold uppercase tracking-[0.25em]">
          <Link href="/" className="flex items-center gap-2 hover:underline">
            <ArrowLeft size={12} /> Volver al inicio
          </Link>
          <span>© 2026 KTF · Todos los derechos reservados</span>
        </div>
      </footer>

    </main>
  )
}
