import Link from 'next/link'
import { ArrowRight, Check, Dumbbell, ExternalLink, Flame, MapPin, Phone, Shield, Swords, UserCheck, Zap } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HorariosTabs } from '@/components/horarios-tabs'
import { ACADEMIA } from '@/data/academia'
import { EVENTOS, EVENTOS_SON_EJEMPLO } from '@/data/eventos'
import { HORARIOS } from '@/data/horarios'
import { INSCRIPCION, PERSONAL_TRAINING_HORA, PRECIOS } from '@/data/precios'
import { COACHING_PERSONALIZADO, SERVICIOS } from '@/data/servicios'
import { formatUSD, precioDesdeMensual } from '@/lib/precios'

const ICONOS = { 'muay-thai': Swords, gym: Dumbbell, combo: Flame, coach: UserCheck } as const

export default function Page() {
  const clasesMuayThai = HORARIOS.muayThai.manana.length + HORARIOS.muayThai.tarde.length

  return (
    <main className="min-h-screen overflow-hidden bg-[#040B14] text-white">
      <SiteHeader />

      {/* Hero */}
      <section id="inicio" className="relative border-b-2 border-white/15 bg-black">
        <div className="absolute inset-0 grid grid-cols-2 overflow-hidden" aria-hidden="true">
          <video className="h-full w-full object-cover" src="/14839863_1080_1920_30fps.mp4" autoPlay muted loop playsInline />
          <video className="h-full w-full object-cover" src="/16322171_1080_1920_30fps.mp4" autoPlay muted loop playsInline />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-28">
          <div>
            <p className="mb-7 flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37]">
              <span className="h-px w-10 bg-[#D4AF37]" /> Muay Thai y fitness en {ACADEMIA.ciudad}
            </p>
            <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.86] tracking-[-0.06em] sm:text-8xl lg:text-[9.5rem]">
              Forja tu<br /><span className="italic text-[#D4AF37]">espíritu.</span><br />Domina el<br /><span className="text-white/30">combate.</span>
            </h1>
            <div className="mt-10 flex max-w-xl items-start gap-5 border-l-4 border-[#D4AF37] pl-5 text-sm leading-7 text-white/70">
              <Zap className="mt-1 shrink-0 text-[#D4AF37]" size={20} />
              <p>Entrenamiento real para gente real. Construye fuerza, velocidad y una mentalidad que no retrocede.</p>
            </div>
          </div>

          <div className="border-2 border-[#D4AF37] bg-[#081522] p-6 sm:p-8">
            <div className="mb-8 flex items-start justify-between border-b border-white/20 pb-5">
              <h2 className="text-3xl font-black uppercase italic">Tu primer round<br />empieza aquí.</h2>
              <Shield className="shrink-0 text-[#D4AF37]" size={34} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">Membresías desde</p>
            <p className="mt-2 text-6xl font-black tracking-tight">
              {formatUSD(precioDesdeMensual())} <span className="text-sm font-bold text-white/50">al mes</span>
            </p>
            <ul className="my-7 flex flex-col gap-3 border-y border-white/15 py-5 text-sm text-white/75">
              <li className="flex items-center gap-3"><Check size={18} className="text-[#D4AF37]" /> Muay Thai, gym o los dos</li>
              <li className="flex items-center gap-3"><Check size={18} className="text-[#D4AF37]" /> Mensual, trimestral, semestral o anual</li>
              <li className="flex items-center gap-3"><Check size={18} className="text-[#D4AF37]" /> Inscripción única de {formatUSD(INSCRIPCION)}</li>
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/inscripcion" className="flex flex-1 items-center justify-between bg-[#D4AF37] px-5 py-4 text-sm font-black uppercase tracking-wider text-black transition-colors hover:bg-white">
                Inscribirme <ArrowRight size={20} />
              </Link>
              <Link href="/planes" className="flex items-center justify-center border-2 border-white/25 px-5 py-4 text-sm font-black uppercase tracking-wider transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]">
                Ver planes
              </Link>
            </div>
          </div>
        </div>
        <div className="relative border-t-2 border-white/15 bg-black/60 px-5 py-4 lg:px-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
            <span>{ACADEMIA.ciudad} · {ACADEMIA.pais}</span>
            <span className="hidden sm:block">Atención personalizada {HORARIOS.personalizado.desde} a {HORARIOS.personalizado.hasta}</span>
            <span>{ACADEMIA.lema}</span>
          </div>
        </div>
      </section>

      {/* Filosofía */}
      <section id="nosotros" className="border-b-2 border-white/15">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:px-10">
          <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">No venimos<br />a <span className="italic text-[#D4AF37]">jugar.</span></h2>
          <div className="grid gap-10 border-l-2 border-[#D4AF37] pl-6 sm:pl-10">
            <p className="max-w-2xl text-2xl font-bold uppercase leading-tight sm:text-4xl">El Muay Thai no te cambia la vida. Te muestra quién eres cuando la vida golpea.</p>
            <p className="max-w-xl text-base leading-7 text-white/60">
              {ACADEMIA.nombre} es una academia de combate y fitness para quienes entienden que la disciplina no se negocia. No importa tu punto de partida: importa cuánto estás dispuesto a dar.
            </p>
            <div className="grid gap-6 border-t border-white/15 pt-6 sm:grid-cols-3">
              <div><p className="text-4xl font-black text-[#D4AF37]">{clasesMuayThai}</p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">Clases de Muay Thai al día</p></div>
              <div><p className="text-4xl font-black text-[#D4AF37]">{HORARIOS.personalizado.horasAtencion} h</p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">De atención personalizada</p></div>
              <div><p className="text-4xl font-black text-[#D4AF37]">{COACHING_PERSONALIZADO.length}</p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">Tipos de coaching</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="border-b-2 border-white/15 bg-black">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
          <div className="mb-12 flex flex-col justify-between gap-6 border-b-2 border-white/20 pb-8 sm:flex-row sm:items-end">
            <h2 className="text-5xl font-black uppercase leading-none tracking-[-0.05em] sm:text-7xl">Elige cómo<br /><span className="text-[#D4AF37]">entrenar.</span></h2>
            <p className="max-w-xs text-sm leading-6 text-white/55">Cuatro servicios. Precios mensuales aquí; trimestral, semestral y anual en la página de planes.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {SERVICIOS.map(s => {
              const Icono = ICONOS[s.icono]
              return (
                <article key={s.id} className={`flex flex-col border-2 p-6 ${s.destacado ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/15 bg-[#081522]'}`}>
                  <div className="mb-5 flex items-start justify-between">
                    <Icono className="text-[#D4AF37]" size={32} />
                    {s.destacado && <span className="bg-[#D4AF37] px-2 py-1 text-[10px] font-black text-black">El más completo</span>}
                  </div>
                  <h3 className="text-xl font-black uppercase">{s.nombre}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{s.resumen}</p>
                  <p className="mt-6 text-5xl font-black tracking-tight text-[#D4AF37]">{formatUSD(PRECIOS[s.id].mensual ?? 0)}<span className="ml-1 text-sm font-bold text-white/45">/mes</span></p>
                  <ul className="my-5 flex flex-1 flex-col gap-2 border-t border-white/10 pt-4 text-sm text-white/70">
                    {s.incluye.map(i => <li key={i} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#D4AF37]" /> {i}</li>)}
                  </ul>
                  <Link href={`/planes?servicio=${s.id}`} className="flex items-center justify-between border-2 border-white/25 px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]">
                    Ver planes <ArrowRight size={16} />
                  </Link>
                </article>
              )
            })}
          </div>

          <dl className="mt-8 grid gap-px border-2 border-white/15 bg-white/15 sm:grid-cols-3">
            {[
              ['Clase diaria', `Muay Thai ${formatUSD(PRECIOS['muay-thai'].diario ?? 0)} · Gym ${formatUSD(PRECIOS.gym.diario ?? 0)}`],
              ['Personal training', `${formatUSD(PERSONAL_TRAINING_HORA)} por hora de clase`],
              ['Inscripción', `${formatUSD(INSCRIPCION)}, una sola vez`],
            ].map(([t, d]) => (
              <div key={t} className="bg-black px-6 py-5"><dt className="text-xs font-black uppercase tracking-wider text-[#D4AF37]">{t}</dt><dd className="mt-1 text-sm text-white/75">{d}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      {/* Horarios */}
      <section id="horarios" className="border-b-2 border-white/15">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
          <h2 className="mb-12 text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">Horarios.<br /><span className="italic text-[#D4AF37]">Sin excusas.</span></h2>
          <HorariosTabs />
        </div>
      </section>

      {/* Personalizado */}
      <section id="personalizado" className="border-b-2 border-white/15 bg-black">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl">Un coach<br />solo para <span className="italic text-[#D4AF37]">ti.</span></h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
              Entrenamiento personalizado todo el día, de {HORARIOS.personalizado.desde} a {HORARIOS.personalizado.hasta}. Te ayudamos a alcanzar tus objetivos personales. {formatUSD(PERSONAL_TRAINING_HORA)} por hora de clase.
            </p>
            <a href={ACADEMIA.whatsappLink} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 bg-[#D4AF37] px-6 py-4 text-sm font-black uppercase tracking-wider text-black transition-colors hover:bg-white">
              Reservar por WhatsApp <ArrowRight size={18} />
            </a>
          </div>
          <ul className="grid gap-px border-2 border-white/15 bg-white/15 sm:grid-cols-2">
            {COACHING_PERSONALIZADO.map(c => (
              <li key={c.titulo} className="bg-[#081522] p-6">
                <h3 className="text-lg font-black uppercase">{c.titulo}</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">{c.detalle}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Competencias */}
      <section id="competencias" className="border-b-2 border-white/15">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
          <div className="mb-12 flex flex-col justify-between gap-6 border-b-2 border-white/20 pb-8 sm:flex-row sm:items-end">
            <h2 className="text-5xl font-black uppercase leading-none tracking-[-0.05em] sm:text-7xl">Próximos<br /><span className="text-[#D4AF37]">desafíos.</span></h2>
            <p className="max-w-xs text-sm leading-6 text-white/55">El ring espera. Revisa las fechas, prepara tu equipo y llega con hambre.</p>
          </div>
          <div className="flex flex-col">
            {EVENTOS.map((e, i) => (
              <article key={e.titulo} className="grid gap-4 border-b border-white/20 py-7 sm:grid-cols-[130px_1fr_auto] sm:items-center">
                <p className="text-2xl font-black text-[#D4AF37]">{e.fecha}</p>
                <div>
                  <div className="mb-1 flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/45">{e.tipo}</span>
                    {i === 0 && <span className="bg-[#D4AF37] px-2 py-1 text-[9px] font-black text-black">PRÓXIMO</span>}
                  </div>
                  <h3 className="text-2xl font-black uppercase sm:text-3xl">{e.titulo}</h3>
                  <p className="text-sm text-white/50">{e.detalle}</p>
                </div>
                <ArrowRight className="hidden text-[#D4AF37] sm:block" size={28} />
              </article>
            ))}
          </div>
          {EVENTOS_SON_EJEMPLO && <p className="mt-6 text-xs text-white/35">Fechas de ejemplo. El calendario real se publica pronto.</p>}
        </div>
      </section>

      {/* Ubicación */}
      <section id="ubicacion" className="border-b-2 border-white/15">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:px-10">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-[#D4AF37]">
              Sede Principal · {ACADEMIA.ciudad}
            </p>
            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">
              El lugar<br />donde<br /><span className="italic text-[#D4AF37]">sucede.</span>
            </h2>

            <div className="mt-8 flex gap-4 border-t border-white/15 pt-6">
              <MapPin className="shrink-0 text-[#D4AF37]" size={28} />
              <div>
                <p className="text-xl font-black uppercase">{ACADEMIA.ciudad}, {ACADEMIA.pais}</p>
                <p className="mt-1 text-sm font-semibold text-white/80">{ACADEMIA.sector}</p>
                <p className="mt-2 text-xs text-white/50">{ACADEMIA.mapa.referencia}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={ACADEMIA.mapa.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#D4AF37] bg-[#D4AF37] px-6 py-4 text-xs font-black uppercase tracking-wider text-black transition-colors hover:border-white hover:bg-white"
              >
                <MapPin size={16} /> Abrir en Google Maps <ExternalLink size={14} />
              </a>
              <a
                href={ACADEMIA.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 bg-transparent px-6 py-4 text-xs font-black uppercase tracking-wider text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Phone size={16} /> WhatsApp: {ACADEMIA.whatsappVisible}
              </a>
            </div>
          </div>

          {/* Mapa funcional embebido */}
          <div className="relative flex flex-col overflow-hidden border-2 border-white/20 bg-[#121b22] shadow-2xl">
            <div className="relative aspect-[4/3] w-full min-h-[360px] sm:min-h-[420px]">
              <iframe
                title="Ubicación de KTF Club de Artes Marciales & Fitness en Google Maps"
                src={ACADEMIA.mapa.embedUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Barra inferior del mapa */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#D4AF37] bg-black px-5 py-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-[#D4AF37]" size={20} />
                <span className="text-xs font-black uppercase tracking-wider">
                  KTF · {ACADEMIA.ciudad} ({ACADEMIA.sector})
                </span>
              </div>
              <a
                href={ACADEMIA.mapa.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#D4AF37] hover:underline"
              >
                Ver en pantalla completa <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
