'use client'

import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, Check, Shield, User,
  Phone, Mail, Calendar, CreditCard, Wallet,
} from 'lucide-react'
import Link from 'next/link'

// ─── Constantes ────────────────────────────────────────────────────────────────
const planes = [
  { id: 'Mensual',     label: 'Mensual',     precio: '$45',  detalle: 'Acceso ilimitado · Sin contrato' },
  { id: 'Trimestral',  label: 'Trimestral',  precio: '$120', detalle: '3 meses · Ahorra \$15' },
  { id: 'Anual',       label: 'Anual',       precio: '$420', detalle: '12 meses · Ahorra \$120' },
]
const niveles = ['Principiante', 'Intermedio', 'Avanzado', 'Competidor']

type MetodoPago = 'paypal' | 'transferencia' | 'efectivo' | 'tarjeta' | ''
type Paso = 'datos' | 'plan' | 'metodo' | 'pago' | 'exito'

const METODOS = [
  {
    id: 'paypal' as MetodoPago,
    label: 'PayPal',
    subtitulo: 'Paga con tu cuenta PayPal de forma rápida y segura',
    logo: '/PayPal_Logo2014.png',
    logoBg: 'bg-white',
    badge: 'Recomendado',
  },
  {
    id: 'transferencia' as MetodoPago,
    label: 'De Una / Transferencia Bancaria',
    subtitulo: 'Transfiere directamente a nuestra cuenta y envía el comprobante',
    logo: '/icon-deuna.png',
    logoBg: 'bg-white',
    badge: null,
  },
  {
    id: 'efectivo' as MetodoPago,
    label: 'Efectivo en academia',
    subtitulo: 'Paga en recepción al presentarte por primera vez',
    logo: null,
    logoBg: '',
    badge: null,
  },
  {
    id: 'tarjeta' as MetodoPago,
    label: 'Tarjeta de crédito / débito',
    subtitulo: 'Visa, Mastercard, American Express — pago inmediato',
    logo: '/png-transparent-visa-mastercard.png',
    logoBg: 'bg-white',
    badge: null,
  },
]

// ─── Componente principal ──────────────────────────────────────────────────────
export default function InscripcionPage() {
  const [paso, setPaso]               = useState<Paso>('datos')
  const [cargando, setCargando]       = useState(false)
  const [error, setError]             = useState('')
  const [inscripcionId, setInscripcionId] = useState<number | null>(null)
  const [metodo, setMetodo]           = useState<MetodoPago>('')

  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', telefono: '',
    edad: '', nivel: 'Principiante', plan: 'Mensual',
    // tarjeta
    tarjeta: '', vencimiento: '', cvv: '', titular: '',
  })

  const set = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  // ── Simular inscripción (prototipo estático — sin backend) ────────────────
  const registrarEstudiante = async (): Promise<number> => {
    // Simulamos una pequeña espera para que se sienta real
    await new Promise(r => setTimeout(r, 900))
    return Math.floor(Math.random() * 9000) + 1000
  }

  // ── Paso 1 → Datos ────────────────────────────────────────────────────────
  const avanzarDatos = (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!form.nombre || !form.apellido || !form.email) {
      setError('Por favor completa los campos obligatorios.'); return
    }
    setPaso('plan')
  }

  // ── Paso 2 → Plan ─────────────────────────────────────────────────────────
  const avanzarPlan = (e: React.FormEvent) => {
    e.preventDefault(); setPaso('metodo')
  }

  // ── Paso 3 → Método ───────────────────────────────────────────────────────
  const avanzarMetodo = (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!metodo) { setError('Elige un método de pago.'); return }
    setPaso('pago')
  }

  // ── Paso 4 → Pago (según método) ─────────────────────────────────────────
  const finalizarPago = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')

    if (metodo === 'tarjeta') {
      if (!form.tarjeta || !form.vencimiento || !form.cvv || !form.titular) {
        setError('Completa todos los datos de la tarjeta.'); return
      }
    }

    setCargando(true)
    try {
      const id = await registrarEstudiante()
      setInscripcionId(id)
      setPaso('exito')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  // ── Indicador de pasos ────────────────────────────────────────────────────
  const PASOS: Paso[] = ['datos', 'plan', 'metodo', 'pago', 'exito']
  const LABELS        = ['Datos', 'Plan', 'Pago', 'Confirmar', 'Listo']
  const pasoActual    = PASOS.indexOf(paso)
  const planSeleccionado = planes.find(p => p.id === form.plan)
  const metodoDatos   = METODOS.find(m => m.id === metodo)

  return (
    <main className="min-h-screen overflow-hidden bg-[#040B14] text-white">

      {/* ── Header ── */}
      <header className="border-b-2 border-white/15 bg-black/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logoKTF.png" alt="Logo KTF" className="size-14 object-contain" />
            <span className="hidden text-sm font-black uppercase tracking-[0.18em] sm:block">
              Kamikaze<br /><span className="text-[#D4AF37]">Thai Fight</span>
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>
        </div>
      </header>

      {/* ── Stepper ── */}
      <div className="border-b border-white/10 bg-black/40">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-0 px-5 py-5 overflow-x-auto">
          {LABELS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className={`flex items-center gap-2 px-3 py-1 text-xs font-black uppercase tracking-wider transition-colors ${i <= pasoActual ? 'text-[#D4AF37]' : 'text-white/25'}`}>
                <span className={`flex size-6 items-center justify-center border-2 text-[10px] font-black transition-colors ${i < pasoActual ? 'border-[#D4AF37] bg-[#D4AF37] text-black' : i === pasoActual ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-white/20 text-white/25'}`}>
                  {i < pasoActual ? <Check size={12} /> : i + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </div>
              {i < LABELS.length - 1 && <span className="h-px w-4 bg-white/15" />}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-16 lg:px-10">

        {/* ══════════════════════════════════════════════════════════════════════
            PASO 1 — DATOS PERSONALES
        ══════════════════════════════════════════════════════════════════════ */}
        {paso === 'datos' && (
          <form onSubmit={avanzarDatos} className="border-2 border-[#D4AF37] bg-[#081522] p-8">
            <div className="mb-8 flex items-start justify-between border-b border-white/20 pb-6">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]">Paso 1 de 4</p>
                <h1 className="text-4xl font-black uppercase italic">Tus datos</h1>
                <p className="mt-2 text-sm text-white/50">Completa tu información para comenzar.</p>
              </div>
              <User className="text-[#D4AF37]" size={34} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-white/50">Nombre *</label>
                <input required value={form.nombre} onChange={e => set('nombre', e.target.value)}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/25"
                  placeholder="Juan" />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-white/50">Apellido *</label>
                <input required value={form.apellido} onChange={e => set('apellido', e.target.value)}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/25"
                  placeholder="Pérez" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-white/50">
                  <Mail size={11} className="mr-1 inline" />Email *
                </label>
                <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/25"
                  placeholder="juan@ejemplo.com" />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-white/50">
                  <Phone size={11} className="mr-1 inline" />Teléfono
                </label>
                <input value={form.telefono} onChange={e => set('telefono', e.target.value)}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/25"
                  placeholder="+593 99 999 9999" />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-white/50">
                  <Calendar size={11} className="mr-1 inline" />Edad
                </label>
                <input type="number" min={10} max={70} value={form.edad} onChange={e => set('edad', e.target.value)}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/25"
                  placeholder="25" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-white/50">Nivel actual</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {niveles.map(n => (
                    <button key={n} type="button" onClick={() => set('nivel', n)}
                      className={`border-2 py-2 text-xs font-black uppercase tracking-wider transition-colors ${form.nivel === n ? 'border-[#D4AF37] bg-[#D4AF37] text-black' : 'border-white/20 text-white/50 hover:border-white/40'}`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && <p className="mt-5 text-sm font-bold text-red-400">{error}</p>}
            <button type="submit" className="mt-8 flex w-full items-center justify-between bg-[#D4AF37] px-6 py-4 text-sm font-black uppercase tracking-wider text-black transition-colors hover:bg-white">
              Continuar — Elegir plan <ArrowRight size={20} />
            </button>
          </form>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            PASO 2 — ELEGIR PLAN
        ══════════════════════════════════════════════════════════════════════ */}
        {paso === 'plan' && (
          <form onSubmit={avanzarPlan} className="border-2 border-[#D4AF37] bg-[#081522] p-8">
            <div className="mb-8 flex items-start justify-between border-b border-white/20 pb-6">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]">Paso 2 de 4</p>
                <h1 className="text-4xl font-black uppercase italic">Elige tu plan</h1>
                <p className="mt-2 text-sm text-white/50">Sin contratos. Cancela cuando quieras.</p>
              </div>
              <Shield className="text-[#D4AF37]" size={34} />
            </div>

            <div className="flex flex-col gap-4">
              {planes.map(p => (
                <button key={p.id} type="button" onClick={() => set('plan', p.id)}
                  className={`flex items-center justify-between border-2 p-5 text-left transition-colors ${form.plan === p.id ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/20 hover:border-white/40'}`}>
                  <div>
                    <p className="text-lg font-black uppercase">{p.label}</p>
                    <p className="text-xs text-white/50">{p.detalle}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-3xl font-black text-[#D4AF37]">{p.precio}</p>
                    {form.plan === p.id && <Check className="text-[#D4AF37]" size={22} />}
                  </div>
                </button>
              ))}
            </div>

            <ul className="mt-6 flex flex-col gap-3 border-y border-white/15 py-5 text-sm text-white/70">
              {['Acceso ilimitado a clases', 'Plan de acondicionamiento personalizado', 'Comunidad KTF exclusiva', 'Descuentos en productos de la tienda'].map(b => (
                <li key={b} className="flex items-center gap-3"><Check size={16} className="text-[#D4AF37]" /> {b}</li>
              ))}
            </ul>

            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setPaso('datos')}
                className="flex items-center gap-2 border-2 border-white/20 px-5 py-4 text-xs font-black uppercase tracking-wider hover:border-white/40 transition-colors">
                <ArrowLeft size={16} /> Volver
              </button>
              <button type="submit" className="flex flex-1 items-center justify-between bg-[#D4AF37] px-6 py-4 text-sm font-black uppercase tracking-wider text-black transition-colors hover:bg-white">
                Elegir método de pago <ArrowRight size={20} />
              </button>
            </div>
          </form>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            PASO 3 — MÉTODO DE PAGO
        ══════════════════════════════════════════════════════════════════════ */}
        {paso === 'metodo' && (
          <form onSubmit={avanzarMetodo} className="border-2 border-[#D4AF37] bg-[#081522] p-8">
            <div className="mb-8 flex items-start justify-between border-b border-white/20 pb-6">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]">Paso 3 de 4</p>
                <h1 className="text-4xl font-black uppercase italic">¿Cómo pagas?</h1>
                <p className="mt-2 text-sm text-white/50">Elige el método que más te convenga.</p>
              </div>
              <Wallet className="text-[#D4AF37]" size={34} />
            </div>

            {/* Resumen plan seleccionado */}
            <div className="mb-6 flex items-center justify-between border border-white/10 bg-white/5 px-5 py-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-white/40">Plan seleccionado</p>
                <p className="mt-1 text-base font-black uppercase">{planSeleccionado?.label}</p>
              </div>
              <p className="text-3xl font-black text-[#D4AF37]">{planSeleccionado?.precio}</p>
            </div>

            {/* Cards de método */}
            <div className="flex flex-col gap-4">
              {METODOS.map(m => (
                <button key={m.id} type="button" onClick={() => setMetodo(m.id)}
                  className={`group relative flex items-center gap-5 border-2 p-5 text-left transition-all ${metodo === m.id ? 'border-[#D4AF37] bg-[#D4AF37]/8' : 'border-white/15 hover:border-white/35'}`}>

                  {/* Logo / ícono */}
                  <div className={`flex size-16 shrink-0 items-center justify-center border-2 p-2 transition-colors ${metodo === m.id ? 'border-[#D4AF37]' : 'border-white/15'} ${m.logoBg}`}>
                    {m.logo
                      ? <img src={m.logo} alt={m.label} className="h-full w-full object-contain" />
                      : <span className="text-3xl">💵</span>
                    }
                  </div>

                  {/* Texto */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-black uppercase tracking-wide">{m.label}</p>
                      {m.badge && (
                        <span className="bg-[#D4AF37] px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-black">
                          {m.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-5 text-white/45">{m.subtitulo}</p>
                  </div>

                  {/* Check */}
                  <div className={`flex size-6 shrink-0 items-center justify-center border-2 transition-colors ${metodo === m.id ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-white/20'}`}>
                    {metodo === m.id && <Check size={14} className="text-black" />}
                  </div>
                </button>
              ))}
            </div>

            {error && <p className="mt-5 text-sm font-bold text-red-400">{error}</p>}

            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setPaso('plan')}
                className="flex items-center gap-2 border-2 border-white/20 px-5 py-4 text-xs font-black uppercase tracking-wider hover:border-white/40 transition-colors">
                <ArrowLeft size={16} /> Volver
              </button>
              <button type="submit" className="flex flex-1 items-center justify-between bg-[#D4AF37] px-6 py-4 text-sm font-black uppercase tracking-wider text-black transition-colors hover:bg-white">
                Continuar <ArrowRight size={20} />
              </button>
            </div>
          </form>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            PASO 4 — FORMULARIO SEGÚN MÉTODO
        ══════════════════════════════════════════════════════════════════════ */}
        {paso === 'pago' && (
          <form onSubmit={finalizarPago} className="border-2 border-[#D4AF37] bg-[#081522] p-8">

            {/* Header dinámico */}
            <div className="mb-8 flex items-start justify-between border-b border-white/20 pb-6">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]">Paso 4 de 4</p>
                <h1 className="text-4xl font-black uppercase italic">
                  {metodo === 'paypal'       && 'PayPal'}
                  {metodo === 'transferencia' && 'Transferencia'}
                  {metodo === 'efectivo'      && 'Efectivo'}
                  {metodo === 'tarjeta'       && 'Datos de tarjeta'}
                </h1>
                <p className="mt-2 text-sm text-white/50">
                  {metodo === 'paypal'       && '🔒 Serás redirigido a PayPal para completar el pago.'}
                  {metodo === 'transferencia' && 'Realiza la transferencia y envía el comprobante.'}
                  {metodo === 'efectivo'      && 'Paga directamente en recepción al iniciar.'}
                  {metodo === 'tarjeta'       && '🔒 Entorno de prueba — no se realizan cargos reales.'}
                </p>
              </div>
              <div className="flex size-16 shrink-0 items-center justify-center border-2 border-[#D4AF37] p-2 bg-white">
                {metodoDatos?.logo
                  ? <img src={metodoDatos.logo} alt={metodoDatos.label} className="h-full w-full object-contain" />
                  : <span className="text-4xl">💵</span>
                }
              </div>
            </div>

            {/* Resumen siempre visible */}
            <div className="mb-6 border border-white/15 bg-white/5 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-white/40">Resumen</p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="font-black uppercase">{form.nombre} {form.apellido}</p>
                  <p className="text-xs text-white/50">{form.email} · Nivel {form.nivel}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase text-white/40">{planSeleccionado?.label}</p>
                  <p className="text-2xl font-black text-[#D4AF37]">{planSeleccionado?.precio}</p>
                </div>
              </div>
            </div>

            {/* ── PAYPAL ─────────────────────────────────────────────────── */}
            {metodo === 'paypal' && (
              <div className="flex flex-col gap-4">
                <div className="border border-[#003087]/40 bg-[#003087]/10 p-5">
                  <p className="mb-3 text-xs font-black uppercase tracking-wider text-[#4a90d9]">
                    🅿️ Simulación PayPal
                  </p>
                  <p className="text-sm leading-6 text-white/60">
                    En producción, al pulsar <strong className="text-white">«Pagar con PayPal»</strong> serías redirigido al sitio oficial de PayPal para autenticarte y autorizar el cobro de forma segura.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-white/50">Email PayPal *</label>
                    <input required type="email" placeholder="tu@paypal.com"
                      className="w-full border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/25" />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-white/50">Contraseña PayPal *</label>
                    <input required type="password" placeholder="••••••••"
                      className="w-full border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/25" />
                  </div>
                </div>
              </div>
            )}

            {/* ── TRANSFERENCIA BANCARIA ─────────────────────────────────── */}
            {metodo === 'transferencia' && (
              <div className="flex flex-col gap-4">
                <div className="border border-[#1a7a4a]/40 bg-[#1a7a4a]/10 p-5">
                  <p className="mb-3 text-xs font-black uppercase tracking-wider text-green-400">
                    🏦 Datos bancarios KTF
                  </p>
                  <div className="grid gap-2 text-sm">
                    {[
                      ['Banco',   'Banco Pichincha'],
                      ['Cuenta',  '2200123456'],
                      ['Tipo',    'Cuenta de Ahorros'],
                      ['RUC/CI',  '1234567890001'],
                      ['Titular', 'Kamikaze Thai Fight S.A.S.'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline gap-3">
                        <span className="w-16 shrink-0 text-[10px] font-black uppercase text-white/35">{k}</span>
                        <span className="font-bold text-white/80">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-white/50">
                    Número de comprobante / referencia *
                  </label>
                  <input required placeholder="Ej: TRF-20261015-001"
                    className="w-full border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/25" />
                </div>
                <p className="text-xs text-white/40 leading-5">
                  Después de confirmar, envía el comprobante a <strong className="text-white/60">pagos@kamikazethaifight.com</strong> con el asunto «Inscripción – {form.nombre} {form.apellido}».
                </p>
              </div>
            )}

            {/* ── EFECTIVO ───────────────────────────────────────────────── */}
            {metodo === 'efectivo' && (
              <div className="flex flex-col gap-4">
                <div className="border border-[#7a5c1a]/40 bg-[#7a5c1a]/10 p-5">
                  <p className="mb-3 text-xs font-black uppercase tracking-wider text-yellow-400">
                    💵 Pago en academia
                  </p>
                  <ul className="flex flex-col gap-3 text-sm text-white/65">
                    {[
                      '📍 Preséntate en recepción con este número de pre-inscripción.',
                      '🕐 Horario de caja: Lun – Vie 09:00 – 20:00 · Sáb 09:00 – 14:00',
                      '💰 Trae el valor exacto en efectivo.',
                      '🧾 Recibirás un recibo físico firmado.',
                    ].map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div className="border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-[10px] font-black uppercase tracking-wider text-white/35">Tu código de pre-inscripción</p>
                  <p className="mt-2 font-mono text-3xl font-black tracking-[0.2em] text-[#D4AF37]">
                    KTF-{String(Date.now()).slice(-6)}
                  </p>
                  <p className="mt-2 text-xs text-white/40">Muéstralo en recepción · Válido 72 horas</p>
                </div>
              </div>
            )}

            {/* ── TARJETA ────────────────────────────────────────────────── */}
            {metodo === 'tarjeta' && (
              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-white/50">Titular de la tarjeta *</label>
                  <input required value={form.titular} onChange={e => set('titular', e.target.value)}
                    className="w-full border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/25"
                    placeholder="JUAN PEREZ" />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-white/50">Número de tarjeta *</label>
                  <input required maxLength={19} value={form.tarjeta}
                    onChange={e => set('tarjeta', e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                    className="w-full border border-white/20 bg-white/5 px-4 py-3 font-mono text-sm outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/25"
                    placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-white/50">Vencimiento (MM/AA) *</label>
                    <input required maxLength={5} value={form.vencimiento}
                      onChange={e => { const v = e.target.value.replace(/\D/g,'').slice(0,4); set('vencimiento', v.length > 2 ? v.slice(0,2)+'/'+v.slice(2) : v) }}
                      className="w-full border border-white/20 bg-white/5 px-4 py-3 font-mono text-sm outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/25"
                      placeholder="12/28" />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-wider text-white/50">CVV *</label>
                    <input required maxLength={4} type="password" value={form.cvv}
                      onChange={e => set('cvv', e.target.value.replace(/\D/g,''))}
                      className="w-full border border-white/20 bg-white/5 px-4 py-3 font-mono text-sm outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/25"
                      placeholder="•••" />
                  </div>
                </div>
                <div className="flex items-center gap-4 border border-white/10 bg-white/5 px-4 py-3">
                  <CreditCard size={18} className="shrink-0 text-white/30" />
                  <p className="text-[11px] text-white/40">Aceptamos Visa, Mastercard y American Express.</p>
                </div>
              </div>
            )}

            {error && <p className="mt-5 text-sm font-bold text-red-400">{error}</p>}

            <div className="mt-7 flex gap-3">
              <button type="button" onClick={() => setPaso('metodo')}
                className="flex items-center gap-2 border-2 border-white/20 px-5 py-4 text-xs font-black uppercase tracking-wider hover:border-white/40 transition-colors">
                <ArrowLeft size={16} /> Volver
              </button>
              <button type="submit" disabled={cargando}
                className="flex flex-1 items-center justify-between bg-[#D4AF37] px-6 py-4 text-sm font-black uppercase tracking-wider text-black transition-colors hover:bg-white disabled:opacity-60">
                {cargando ? 'Procesando...' : metodo === 'efectivo' ? 'Confirmar pre-inscripción' : 'Confirmar inscripción'}
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            PASO 5 — ÉXITO
        ══════════════════════════════════════════════════════════════════════ */}
        {paso === 'exito' && (
          <div className="border-2 border-[#D4AF37] bg-[#081522] p-10 text-center">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center border-2 border-[#D4AF37] bg-[#D4AF37]/10">
              <Check size={40} className="text-[#D4AF37]" />
            </div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37]">
              Inscripción #{inscripcionId} confirmada
            </p>
            <h1 className="text-5xl font-black uppercase italic leading-tight">¡Bienvenido<br />a KTF!</h1>

            {/* Detalle según método */}
            <div className="mx-auto mt-6 max-w-md border border-white/10 bg-white/5 p-4 text-left text-sm">
              <p className="mb-2 text-[10px] font-black uppercase tracking-wider text-white/35">
                Método de pago: {metodoDatos?.label}
              </p>
              <p className="leading-6 text-white/55">
                {metodo === 'paypal'       && 'El cobro fue procesado vía PayPal. Recibirás la confirmación en tu email.'}
                {metodo === 'transferencia' && 'Recuerda enviar el comprobante a pagos@kamikazethaifight.com para activar tu membresía.'}
                {metodo === 'efectivo'      && 'Preséntate en recepción con tu código de pre-inscripción para completar el pago y activar tu membresía.'}
                {metodo === 'tarjeta'       && 'El cobro fue procesado exitosamente. Recibirás la confirmación en tu email.'}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/" className="flex items-center justify-center gap-2 border-2 border-white/20 px-6 py-4 text-xs font-black uppercase tracking-wider hover:border-white/40 transition-colors">
                <ArrowLeft size={16} /> Volver al inicio
              </Link>
              <Link href="/tienda" className="flex items-center justify-center gap-2 bg-[#D4AF37] px-6 py-4 text-xs font-black uppercase tracking-wider text-black transition-colors hover:bg-white">
                Ver tienda <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
