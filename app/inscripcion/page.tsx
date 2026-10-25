'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, CreditCard, Info, Shield, User, Wallet } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { ACADEMIA } from '@/data/academia'
import { DURACIONES, INSCRIPCION, PERSONAL_TRAINING_HORA, PRECIOS, type Duracion, type ServicioId } from '@/data/precios'
import { SERVICIOS } from '@/data/servicios'
import { calcularAhorro, calcularTotal, duracionesDisponibles, formatUSD, nombreDuracion } from '@/lib/precios'

type MetodoPago = 'paypal' | 'transferencia' | 'efectivo' | 'tarjeta' | ''
type Paso = 'datos' | 'plan' | 'metodo' | 'pago' | 'exito'
type Estado = 'pagado' | 'pendiente-verificacion' | 'pendiente-pago'

const NIVELES = ['Principiante', 'Amateur', 'Semiprofecional', 'Profecional']
const PASOS: Paso[] = ['datos', 'plan', 'metodo', 'pago', 'exito']
const ETIQUETAS = ['Datos', 'Plan', 'Método', 'Confirmar', 'Listo']

const METODOS = [
  { id: 'paypal' as const, label: 'PayPal', subtitulo: 'Pago rápido con tu cuenta PayPal', logo: '/PayPal_Logo2014.png', badge: 'Recomendado', estado: 'pagado' as Estado },
  { id: 'transferencia' as const, label: 'De Una / Transferencia', subtitulo: 'Transfiere a nuestra cuenta y envía el comprobante', logo: '/icon-deuna.png', badge: null, estado: 'pendiente-verificacion' as Estado },
  { id: 'efectivo' as const, label: 'Efectivo en la academia', subtitulo: 'Paga en recepción la primera vez que vengas', logo: null, badge: null, estado: 'pendiente-pago' as Estado },
  { id: 'tarjeta' as const, label: 'Tarjeta de crédito o débito', subtitulo: 'Visa, Mastercard o American Express', logo: '/png-transparent-visa-mastercard.png', badge: null, estado: 'pagado' as Estado },
]

const INPUT = 'w-full border border-white/20 bg-white/5 px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/25 focus:border-[#D4AF37]'
const LABEL = 'mb-2 block text-[10px] font-black uppercase tracking-wider text-white/50'
const BOTON_VOLVER = 'flex items-center gap-2 border-2 border-white/20 px-5 py-4 text-xs font-black uppercase tracking-wider transition-colors hover:border-white/40'
const BOTON_PRINCIPAL = 'flex flex-1 items-center justify-between bg-[#D4AF37] px-6 py-4 text-sm font-black uppercase tracking-wider text-black transition-colors hover:bg-white disabled:opacity-60'

const esServicio = (v: string | null): v is ServicioId => SERVICIOS.some(s => s.id === v)
const esDuracion = (v: string | null): v is Duracion => DURACIONES.some(d => d.id === v)

function AvisoDemo() {
  return (
    <div role="note" className="mb-6 flex items-start gap-3 border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-3 text-xs leading-5 text-[#D4AF37]">
      <Info size={16} className="mt-0.5 shrink-0" />
      <p><strong className="font-black">Modo demostración.</strong> No se realiza ningún cobro y no se guarda ningún dato.</p>
    </div>
  )
}

function Desglose({ servicio, duracion }: { servicio: ServicioId; duracion: Duracion }) {
  const t = calcularTotal(servicio, duracion)
  const nombre = SERVICIOS.find(s => s.id === servicio)?.nombre
  if (!t) return null
  return (
    <div className="border border-white/15 bg-white/5 p-4 text-sm">
      <div className="flex justify-between py-1"><span className="text-white/70">{nombre} · {nombreDuracion(duracion)}</span><span className="font-bold tabular-nums">{formatUSD(t.plan)}</span></div>
      {t.inscripcion > 0 && (
        <div className="flex justify-between py-1"><span className="text-white/70">Inscripción (una sola vez)</span><span className="font-bold tabular-nums">{formatUSD(t.inscripcion)}</span></div>
      )}
      <div className="mt-2 flex items-baseline justify-between border-t border-white/15 pt-3">
        <span className="text-xs font-black uppercase tracking-wider text-white/50">Total a pagar hoy</span>
        <span className="text-3xl font-black tabular-nums text-[#D4AF37]">{formatUSD(t.total)}</span>
      </div>
    </div>
  )
}

function Formulario() {
  const params = useSearchParams()
  const servicioInicial = params.get('servicio')
  const planInicial = params.get('plan')
  const sInit: ServicioId = esServicio(servicioInicial) ? servicioInicial : 'muay-thai-gym'
  const dInit: Duracion = esDuracion(planInicial) && duracionesDisponibles(sInit).includes(planInicial) ? planInicial : 'mensual'

  const [paso, setPaso] = useState<Paso>('datos')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')
  const [metodo, setMetodo] = useState<MetodoPago>('')
  const [codigo, setCodigo] = useState('')
  const [comprobante, setComprobante] = useState('')
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', telefono: '', edad: '', nivel: 'Principiante',
    servicio: sInit as ServicioId, duracion: dInit as Duracion,
    tarjeta: '', vencimiento: '', cvv: '', titular: '',
  })

  const set = <K extends keyof typeof form>(campo: K, valor: (typeof form)[K]) => setForm(prev => ({ ...prev, [campo]: valor }))

  const elegirServicio = (id: ServicioId) => {
    setForm(prev => ({ ...prev, servicio: id, duracion: duracionesDisponibles(id).includes(prev.duracion) ? prev.duracion : 'mensual' }))
  }

  const pasoActual = PASOS.indexOf(paso)
  const servicio = SERVICIOS.find(s => s.id === form.servicio)!
  const total = calcularTotal(form.servicio, form.duracion)
  const metodoDatos = METODOS.find(m => m.id === metodo)
  const estadoFinal: Estado = metodoDatos?.estado ?? 'pagado'

  const avanzarDatos = (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!form.nombre.trim() || !form.apellido.trim() || !form.email.trim()) { setError('Completa nombre, apellido y correo.'); return }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) { setError('Escribe un correo válido, por ejemplo nombre@correo.com.'); return }
    setPaso('plan')
  }

  const avanzarMetodo = (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!metodo) { setError('Elige un método de pago para continuar.'); return }
    if (!codigo) setCodigo(`KTF-${Math.floor(100000 + Math.random() * 900000)}`)
    setPaso('pago')
  }

  const finalizar = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (metodo === 'tarjeta') {
      const digitos = form.tarjeta.replace(/\D/g, '')
      const mes = Number(form.vencimiento.slice(0, 2))
      if (!form.titular.trim()) { setError('Escribe el nombre que aparece en la tarjeta.'); return }
      if (digitos.length < 13) { setError('El número de tarjeta debe tener al menos 13 dígitos.'); return }
      if (form.vencimiento.length !== 5 || mes < 1 || mes > 12) { setError('Escribe el vencimiento como MM/AA, por ejemplo 12/28.'); return }
      if (form.cvv.length < 3) { setError('El CVV tiene 3 o 4 dígitos.'); return }
    }
    if (metodo === 'transferencia' && !comprobante.trim()) { setError('Escribe el número de referencia de tu transferencia.'); return }
    setCargando(true)
    await new Promise(r => setTimeout(r, 900)) // simulación: no hay backend
    setCargando(false)
    setPaso('exito')
  }

  return (
    <>
      <div className="border-b border-white/10 bg-black/40">
        <ol className="mx-auto flex max-w-3xl items-center justify-center overflow-x-auto px-5 py-5" aria-label="Progreso de la inscripción">
          {ETIQUETAS.map((label, i) => (
            <li key={label} className="flex items-center" aria-current={i === pasoActual ? 'step' : undefined}>
              <div className={`flex items-center gap-2 px-3 py-1 text-xs font-black uppercase tracking-wider ${i <= pasoActual ? 'text-[#D4AF37]' : 'text-white/30'}`}>
                <span className={`flex size-6 items-center justify-center border-2 text-[10px] ${i < pasoActual ? 'border-[#D4AF37] bg-[#D4AF37] text-black' : i === pasoActual ? 'border-[#D4AF37]' : 'border-white/20'}`}>
                  {i < pasoActual ? <Check size={12} /> : i + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </div>
              {i < ETIQUETAS.length - 1 && <span className="h-px w-4 bg-white/15" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-16 lg:px-10">
        {/* Paso 1: datos */}
        {paso === 'datos' && (
          <form onSubmit={avanzarDatos} noValidate className="border-2 border-[#D4AF37] bg-[#081522] p-6 sm:p-8">
            <div className="mb-8 flex items-start justify-between border-b border-white/20 pb-6">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]">Paso 1 de 4</p>
                <h1 className="text-4xl font-black uppercase italic">Tus datos</h1>
                <p className="mt-2 text-sm text-white/50">Cuéntanos quién eres para comenzar.</p>
              </div>
              <User className="text-[#D4AF37]" size={34} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div><label htmlFor="nombre" className={LABEL}>Nombre *</label><input id="nombre" autoComplete="given-name" value={form.nombre} onChange={e => set('nombre', e.target.value)} className={INPUT} placeholder="Juan" /></div>
              <div><label htmlFor="apellido" className={LABEL}>Apellido *</label><input id="apellido" autoComplete="family-name" value={form.apellido} onChange={e => set('apellido', e.target.value)} className={INPUT} placeholder="Pérez" /></div>
              <div className="sm:col-span-2"><label htmlFor="email" className={LABEL}>Correo *</label><input id="email" type="email" autoComplete="email" value={form.email} onChange={e => set('email', e.target.value)} className={INPUT} placeholder="juan@ejemplo.com" /></div>
              <div><label htmlFor="telefono" className={LABEL}>Teléfono</label><input id="telefono" type="tel" autoComplete="tel" value={form.telefono} onChange={e => set('telefono', e.target.value)} className={INPUT} placeholder="+593 99 999 9999" /></div>
              <div><label htmlFor="edad" className={LABEL}>Edad</label><input id="edad" type="number" min={10} max={70} value={form.edad} onChange={e => set('edad', e.target.value)} className={INPUT} placeholder="25" /></div>
              <fieldset className="sm:col-span-2">
                <legend className={LABEL}>Nivel actual</legend>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {NIVELES.map(n => (
                    <button key={n} type="button" aria-pressed={form.nivel === n} onClick={() => set('nivel', n)}
                      className={`border-2 py-2 text-xs font-black uppercase tracking-wider transition-colors ${form.nivel === n ? 'border-[#D4AF37] bg-[#D4AF37] text-black' : 'border-white/20 text-white/50 hover:border-white/40'}`}>{n}</button>
                  ))}
                </div>
              </fieldset>
            </div>
            {error && <p role="alert" className="mt-5 text-sm font-bold text-red-400">{error}</p>}
            <button type="submit" className={`mt-8 w-full ${BOTON_PRINCIPAL}`}>Continuar: elegir plan <ArrowRight size={20} /></button>
          </form>
        )}

        {/* Paso 2: servicio y plan */}
        {paso === 'plan' && (
          <form onSubmit={e => { e.preventDefault(); setPaso('metodo') }} className="border-2 border-[#D4AF37] bg-[#081522] p-6 sm:p-8">
            <div className="mb-8 flex items-start justify-between border-b border-white/20 pb-6">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]">Paso 2 de 4</p>
                <h1 className="text-4xl font-black uppercase italic">Elige tu plan</h1>
                <p className="mt-2 text-sm text-white/50">Primero el servicio, después la duración.</p>
              </div>
              <Shield className="text-[#D4AF37]" size={34} />
            </div>

            <fieldset className="mb-8">
              <legend className={LABEL}>Servicio</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {SERVICIOS.map(s => (
                  <button key={s.id} type="button" aria-pressed={form.servicio === s.id} onClick={() => elegirServicio(s.id)}
                    className={`flex items-center justify-between border-2 p-4 text-left transition-colors ${form.servicio === s.id ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/20 hover:border-white/40'}`}>
                    <span><span className="block font-black uppercase">{s.nombre}</span><span className="text-xs text-white/50">desde {formatUSD(PRECIOS[s.id].mensual ?? 0)}/mes</span></span>
                    {form.servicio === s.id && <Check className="text-[#D4AF37]" size={20} />}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs leading-5 text-white/45">{servicio.resumen}</p>
            </fieldset>

            <fieldset className="mb-8">
              <legend className={LABEL}>Duración</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {duracionesDisponibles(form.servicio).map(d => {
                  const info = DURACIONES.find(x => x.id === d)!
                  const ahorro = calcularAhorro(form.servicio, d)
                  return (
                    <button key={d} type="button" aria-pressed={form.duracion === d} onClick={() => set('duracion', d)}
                      className={`flex items-center justify-between border-2 p-4 text-left transition-colors ${form.duracion === d ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/20 hover:border-white/40'}`}>
                      <span><span className="block font-black uppercase">{info.label}</span><span className="text-xs text-white/50">{ahorro > 0 ? `Ahorras ${formatUSD(ahorro)}` : info.detalle}</span></span>
                      <span className="text-2xl font-black text-[#D4AF37]">{formatUSD(PRECIOS[form.servicio][d] ?? 0)}</span>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <Desglose servicio={form.servicio} duracion={form.duracion} />
            <p className="mt-4 text-xs leading-5 text-white/45">
              ¿Quieres clases personalizadas? Son {formatUSD(PERSONAL_TRAINING_HORA)} por hora y se reservan por WhatsApp. La inscripción de {formatUSD(INSCRIPCION)} no aplica a la clase diaria.
            </p>

            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setPaso('datos')} className={BOTON_VOLVER}><ArrowLeft size={16} /> Volver</button>
              <button type="submit" className={BOTON_PRINCIPAL}>Continuar: método de pago <ArrowRight size={20} /></button>
            </div>
          </form>
        )}

        {/* Paso 3: método */}
        {paso === 'metodo' && (
          <form onSubmit={avanzarMetodo} className="border-2 border-[#D4AF37] bg-[#081522] p-6 sm:p-8">
            <div className="mb-8 flex items-start justify-between border-b border-white/20 pb-6">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]">Paso 3 de 4</p>
                <h1 className="text-4xl font-black uppercase italic">¿Cómo pagas?</h1>
                <p className="mt-2 text-sm text-white/50">Elige el método que prefieras.</p>
              </div>
              <Wallet className="text-[#D4AF37]" size={34} />
            </div>
            <AvisoDemo />
            <div className="mb-6"><Desglose servicio={form.servicio} duracion={form.duracion} /></div>
            <div className="flex flex-col gap-4">
              {METODOS.map(m => (
                <button key={m.id} type="button" aria-pressed={metodo === m.id} onClick={() => setMetodo(m.id)}
                  className={`flex items-center gap-5 border-2 p-5 text-left transition-colors ${metodo === m.id ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/15 hover:border-white/35'}`}>
                  <div className={`flex size-16 shrink-0 items-center justify-center border-2 p-2 ${metodo === m.id ? 'border-[#D4AF37]' : 'border-white/15'} ${m.logo ? 'bg-white' : ''}`}>
                    {m.logo ? <img src={m.logo} alt="" className="h-full w-full object-contain" /> : <span className="text-3xl" aria-hidden="true">💵</span>}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-black uppercase tracking-wide">{m.label}</p>
                      {m.badge && <span className="bg-[#D4AF37] px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-black">{m.badge}</span>}
                    </div>
                    <p className="mt-1 text-xs leading-5 text-white/50">{m.subtitulo}</p>
                  </div>
                  <div className={`flex size-6 shrink-0 items-center justify-center border-2 ${metodo === m.id ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-white/20'}`}>
                    {metodo === m.id && <Check size={14} className="text-black" />}
                  </div>
                </button>
              ))}
            </div>
            {error && <p role="alert" className="mt-5 text-sm font-bold text-red-400">{error}</p>}
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setPaso('plan')} className={BOTON_VOLVER}><ArrowLeft size={16} /> Volver</button>
              <button type="submit" className={BOTON_PRINCIPAL}>Continuar <ArrowRight size={20} /></button>
            </div>
          </form>
        )}

        {/* Paso 4: confirmar según método */}
        {paso === 'pago' && metodoDatos && (
          <form onSubmit={finalizar} noValidate className="border-2 border-[#D4AF37] bg-[#081522] p-6 sm:p-8">
            <div className="mb-8 flex items-start justify-between gap-4 border-b border-white/20 pb-6">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]">Paso 4 de 4</p>
                <h1 className="text-4xl font-black uppercase italic">
                  {metodo === 'paypal' && 'PayPal'}{metodo === 'transferencia' && 'Transferencia'}{metodo === 'efectivo' && 'Efectivo'}{metodo === 'tarjeta' && 'Datos de tarjeta'}
                </h1>
                <p className="mt-2 text-sm text-white/50">
                  {metodo === 'paypal' && 'En la versión real, aquí pasarías al sitio de PayPal.'}
                  {metodo === 'transferencia' && 'Transfiere y registra el número de referencia.'}
                  {metodo === 'efectivo' && 'Paga en recepción con tu código de pre-inscripción.'}
                  {metodo === 'tarjeta' && 'Usa cualquier número de prueba, por ejemplo 4242 4242 4242 4242.'}
                </p>
              </div>
              <div className={`flex size-16 shrink-0 items-center justify-center border-2 border-[#D4AF37] p-2 ${metodoDatos.logo ? 'bg-white' : ''}`}>
                {metodoDatos.logo ? <img src={metodoDatos.logo} alt={metodoDatos.label} className="h-full w-full object-contain" /> : <span className="text-4xl" aria-hidden="true">💵</span>}
              </div>
            </div>

            <AvisoDemo />

            <div className="mb-6 border border-white/15 bg-white/5 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-white/40">Inscripción de</p>
              <p className="mt-1 font-black uppercase">{form.nombre} {form.apellido}</p>
              <p className="text-xs text-white/50">{form.email} · Nivel {form.nivel.toLowerCase()}</p>
            </div>
            <div className="mb-6"><Desglose servicio={form.servicio} duracion={form.duracion} /></div>

            {metodo === 'paypal' && (
              <div className="border border-[#4a90d9]/40 bg-[#003087]/10 p-5 text-sm leading-6 text-white/65">
                Al pulsar <strong className="text-white">Pagar con PayPal</strong> verás la confirmación como si el pago hubiera sido aprobado. En producción, PayPal te pediría iniciar sesión en su propio sitio; esta web nunca recibe tu contraseña.
              </div>
            )}

            {metodo === 'transferencia' && (
              <div className="flex flex-col gap-4">
                <div className="border border-[#1a7a4a]/40 bg-[#1a7a4a]/10 p-5">
                  <p className="mb-3 text-xs font-black uppercase tracking-wider text-green-400">Datos bancarios (ejemplo)</p>
                  <dl className="grid gap-2 text-sm">
                    {([['Banco', ACADEMIA.banco.banco], ['Cuenta', ACADEMIA.banco.cuenta], ['Tipo', ACADEMIA.banco.tipo], ['RUC', ACADEMIA.banco.identificacion], ['Titular', ACADEMIA.banco.titular]] as const).map(([k, v]) => (
                      <div key={k} className="flex items-baseline gap-3"><dt className="w-16 shrink-0 text-[10px] font-black uppercase text-white/40">{k}</dt><dd className="font-bold text-white/85">{v}</dd></div>
                    ))}
                  </dl>
                </div>
                <div>
                  <label htmlFor="comprobante" className={LABEL}>Número de referencia *</label>
                  <input id="comprobante" value={comprobante} onChange={e => setComprobante(e.target.value)} className={INPUT} placeholder="Ej: TRF-20261101-001" />
                </div>
                <p className="text-xs leading-5 text-white/45">Tu membresía se activa cuando verifiquemos el pago. Envía el comprobante a <strong className="text-white/65">{ACADEMIA.correoPagos}</strong> con el asunto «Inscripción – {form.nombre} {form.apellido}».</p>
              </div>
            )}

            {metodo === 'efectivo' && (
              <div className="flex flex-col gap-4">
                <ul className="flex flex-col gap-3 border border-[#7a5c1a]/40 bg-[#7a5c1a]/10 p-5 text-sm text-white/70">
                  <li>Preséntate en recepción con tu código de pre-inscripción.</li>
                  <li>Lleva el valor exacto: <strong className="text-white">{total ? formatUSD(total.total) : ''}</strong>.</li>
                  <li>Recibirás un recibo firmado.</li>
                </ul>
                <div className="border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-[10px] font-black uppercase tracking-wider text-white/40">Tu código de pre-inscripción</p>
                  <p className="mt-2 font-mono text-3xl font-black tracking-[0.2em] text-[#D4AF37]">{codigo}</p>
                  <p className="mt-2 text-xs text-white/45">Válido por 72 horas</p>
                </div>
              </div>
            )}

            {metodo === 'tarjeta' && (
              <div className="grid gap-5">
                <div><label htmlFor="titular" className={LABEL}>Titular de la tarjeta *</label><input id="titular" autoComplete="cc-name" value={form.titular} onChange={e => set('titular', e.target.value)} className={INPUT} placeholder="JUAN PEREZ" /></div>
                <div><label htmlFor="tarjeta" className={LABEL}>Número de tarjeta *</label>
                  <input id="tarjeta" inputMode="numeric" autoComplete="cc-number" maxLength={19} value={form.tarjeta}
                    onChange={e => set('tarjeta', e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim())}
                    className={`${INPUT} font-mono`} placeholder="4242 4242 4242 4242" /></div>
                <div className="grid grid-cols-2 gap-5">
                  <div><label htmlFor="venc" className={LABEL}>Vencimiento (MM/AA) *</label>
                    <input id="venc" inputMode="numeric" autoComplete="cc-exp" maxLength={5} value={form.vencimiento}
                      onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 4); set('vencimiento', v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v) }}
                      className={`${INPUT} font-mono`} placeholder="12/28" /></div>
                  <div><label htmlFor="cvv" className={LABEL}>CVV *</label>
                    <input id="cvv" inputMode="numeric" autoComplete="cc-csc" maxLength={4} type="password" value={form.cvv}
                      onChange={e => set('cvv', e.target.value.replace(/\D/g, ''))} className={`${INPUT} font-mono`} placeholder="•••" /></div>
                </div>
                <div className="flex items-center gap-4 border border-white/10 bg-white/5 px-4 py-3"><CreditCard size={18} className="shrink-0 text-white/30" /><p className="text-[11px] text-white/45">Aceptamos Visa, Mastercard y American Express.</p></div>
              </div>
            )}

            {error && <p role="alert" className="mt-5 text-sm font-bold text-red-400">{error}</p>}

            <div className="mt-7 flex gap-3">
              <button type="button" onClick={() => setPaso('metodo')} className={BOTON_VOLVER}><ArrowLeft size={16} /> Volver</button>
              <button type="submit" disabled={cargando} className={BOTON_PRINCIPAL}>
                {cargando ? 'Procesando...'
                  : metodo === 'paypal' ? 'Pagar con PayPal (simulado)'
                  : metodo === 'tarjeta' ? `Pagar ${total ? formatUSD(total.total) : ''} (simulado)`
                  : metodo === 'transferencia' ? 'Ya transferí, registrar inscripción'
                  : 'Reservar pre-inscripción'}
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        )}

        {/* Paso 5: listo */}
        {paso === 'exito' && (
          <div className="border-2 border-[#D4AF37] bg-[#081522] p-8 text-center sm:p-10" role="status">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center border-2 border-[#D4AF37] bg-[#D4AF37]/10"><Check size={40} className="text-[#D4AF37]" /></div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37]">
              {estadoFinal === 'pagado' ? 'Pago aprobado (simulado)' : estadoFinal === 'pendiente-verificacion' ? 'Pendiente de verificación' : 'Pendiente de pago'}
            </p>
            <h1 className="text-5xl font-black uppercase italic leading-tight">
              {estadoFinal === 'pagado' ? <>¡Bienvenido<br />a KTF!</> : <>Pre-inscripción<br />registrada</>}
            </h1>

            <div className="mx-auto mt-6 max-w-md border border-white/10 bg-white/5 p-5 text-left text-sm">
              <p className="text-[10px] font-black uppercase tracking-wider text-white/40">Código {codigo}</p>
              <p className="mt-2 font-black uppercase">{form.nombre} {form.apellido}</p>
              <p className="text-white/60">{servicio.nombre} · {nombreDuracion(form.duracion)} · {total ? formatUSD(total.total) : ''}</p>
              <p className="mt-4 leading-6 text-white/55">
                {estadoFinal === 'pagado' && `Tu membresía queda activa. Te enviaremos la confirmación a ${form.email}.`}
                {estadoFinal === 'pendiente-verificacion' && `Tu membresía se activa cuando verifiquemos la transferencia. Envía el comprobante a ${ACADEMIA.correoPagos}.`}
                {estadoFinal === 'pendiente-pago' && 'Preséntate en recepción con tu código dentro de 72 horas para pagar y activar tu membresía.'}
              </p>
            </div>
            <p className="mt-4 text-xs text-white/35">Modo demostración: no se realizó ningún cobro.</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/" className="flex items-center justify-center gap-2 border-2 border-white/20 px-6 py-4 text-xs font-black uppercase tracking-wider transition-colors hover:border-white/40"><ArrowLeft size={16} /> Volver al inicio</Link>
              <Link href="/tienda" className="flex items-center justify-center gap-2 bg-[#D4AF37] px-6 py-4 text-xs font-black uppercase tracking-wider text-black transition-colors hover:bg-white">Ver tienda <ArrowRight size={16} /></Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default function InscripcionPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#040B14] text-white">
      <SiteHeader activo="inscripcion" />
      <Suspense fallback={<p className="px-5 py-16 text-center text-sm text-white/50">Cargando inscripción...</p>}>
        <Formulario />
      </Suspense>
    </main>
  )
}
