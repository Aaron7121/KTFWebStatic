import { ArrowDownRight, ArrowRight, AtSign, Check, MapPin, Menu, Phone, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

const events = [
  { date: '12 OCT', title: 'Torneo Nacional', type: 'COMPETENCIA', detail: 'Clasificatorio Amateur 2026' },
  { date: '26 OCT', title: 'Sparring Interno', type: 'ENTRENAMIENTO', detail: 'Todos los niveles · 18:00 H' },
  { date: '09 NOV', title: 'Fight Camp', type: 'SEMINARIO', detail: 'Técnica + acondicionamiento' },
]

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#040B14] text-white">
      <header className="border-b-2 border-white/15 bg-black/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Kamikaze Thai Fight inicio">
            <img src="/logoKTF.png" alt="Logo KTF" className="size-14 object-contain" />
            <span className="hidden text-sm font-black uppercase tracking-[0.18em] sm:block">Kamikaze<br /><span className="text-[#D4AF37]">Thai Fight</span></span>
          </a>
          <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.18em] md:flex" aria-label="Navegación principal">
            <a className="transition-colors hover:text-[#D4AF37]" href="#nosotros">Quiénes somos</a>
            <a className="transition-colors hover:text-[#D4AF37]" href="#competencias">Competencias</a>
            <a className="transition-colors hover:text-[#D4AF37]" href="#ubicacion">Ubicación</a>
            <Link className="transition-colors hover:text-[#D4AF37]" href="/tienda">Tienda</Link>
          </nav>
          <Link href="/inscripcion" className="hidden items-center gap-2 border-2 border-[#D4AF37] bg-[#D4AF37] px-5 py-3 text-xs font-black uppercase tracking-wider text-black transition-colors hover:bg-white hover:border-white sm:flex">Inscribirse ahora <ArrowRight size={16} /></Link>
          <button className="border-2 border-white/30 p-3 md:hidden" aria-label="Abrir menú"><Menu size={20} /></button>
        </div>
      </header>

      <section id="inicio" className="relative border-b-2 border-white/15 bg-black">
        <div className="absolute inset-0 grid grid-cols-2 overflow-hidden" aria-hidden="true">
          <video className="h-full w-full object-cover" src="/14839863_1080_1920_30fps.mp4" autoPlay muted loop playsInline />
          <video className="h-full w-full object-cover" src="/16322171_1080_1920_30fps.mp4" autoPlay muted loop playsInline />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-28">
          <div>
            <p className="mb-7 flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37]"><span className="h-px w-10 bg-[#D4AF37]" /> Muay Thai · Fitness · Disciplina</p>
            <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.86] tracking-[-0.06em] sm:text-8xl lg:text-[9.5rem]">Forja tu<br /><span className="text-[#D4AF37] italic">espíritu.</span><br />Domina el<br /><span className="text-white/30">combate.</span></h1>
            <div className="mt-10 flex max-w-xl items-start gap-5 border-l-4 border-[#D4AF37] pl-5 text-sm leading-7 text-white/65"><Zap className="mt-1 shrink-0 text-[#D4AF37]" size={20} /><p>Entrenamiento real para gente real. Construye fuerza, velocidad y una mentalidad que no retrocede.</p></div>
          </div>
          <div id="inscripcion" className="border-2 border-[#D4AF37] bg-[#081522] p-6 sm:p-8">
            <div className="mb-10 flex items-start justify-between border-b border-white/20 pb-5"><div><p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]">Tarjeta de inscripción rápida</p><h2 className="text-3xl font-black uppercase italic">Tu primer round<br />empieza aquí.</h2></div><Shield className="text-[#D4AF37]" size={34} /></div>
            <div className="mb-8"><p className="text-xs font-bold uppercase tracking-widest text-white/50">Membresía mensual</p><p className="mt-2 text-6xl font-black tracking-tight">$45.000 <span className="text-sm font-bold text-white/50">CLP</span></p></div>
            <ul className="mb-8 flex flex-col gap-4 border-y border-white/15 py-6 text-sm text-white/75"><li className="flex items-center gap-3"><Check size={18} className="text-[#D4AF37]" /> Acceso ilimitado a clases</li><li className="flex items-center gap-3"><Check size={18} className="text-[#D4AF37]" /> Plan de acondicionamiento</li><li className="flex items-center gap-3"><Check size={18} className="text-[#D4AF37]" /> Comunidad KTF</li></ul>
            <Link href="/inscripcion" className="flex w-full items-center justify-between bg-[#D4AF37] px-5 py-5 text-sm font-black uppercase tracking-wider text-black transition-colors hover:bg-white">Iniciar inscripción <ArrowDownRight size={22} /></Link>
            <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-white/40">Sin contratos · Cancela cuando quieras</p>
          </div>
        </div>
        <div className="border-t-2 border-white/15 px-5 py-4 lg:px-10"><div className="mx-auto flex max-w-7xl items-center justify-between text-[10px] font-bold uppercase tracking-[0.25em] text-white/40"><span>Desde 2014</span><span className="hidden sm:block">Santiago · Chile</span><span>Entrena sin excusas <ArrowRight className="ml-2 inline" size={12} /></span></div></div>
      </section>

      <section id="nosotros" className="border-b-2 border-white/15 bg-[#040B14]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:px-10">
          <div><p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-[#D4AF37]">01 / La filosofía</p><h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">No venimos<br />a <span className="italic text-[#D4AF37]">jugar.</span></h2></div>
          <div className="grid gap-10 border-l-2 border-[#D4AF37] pl-6 sm:pl-10"><p className="max-w-2xl text-2xl font-bold uppercase leading-tight sm:text-4xl">El Muay Thai no te cambia la vida. Te muestra quién eres cuando la vida golpea.</p><p className="max-w-xl text-base leading-7 text-white/60">Kamikaze Thai Fight es una academia de combate y fitness nacida para quienes entienden que la disciplina no se negocia. Aquí no importa tu punto de partida: importa cuánto estás dispuesto a dar.</p><div className="grid gap-6 border-t border-white/15 pt-6 sm:grid-cols-3"><div><p className="text-4xl font-black text-[#D4AF37]">10+</p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">Años formando</p></div><div><p className="text-4xl font-black text-[#D4AF37]">300</p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">Alumnos activos</p></div><div><p className="text-4xl font-black text-[#D4AF37]">01</p><p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">Mentalidad</p></div></div></div>
        </div>
      </section>

      <section id="competencias" className="border-b-2 border-white/15 bg-black">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10"><div className="mb-12 flex flex-col justify-between gap-6 border-b-2 border-white/20 pb-8 sm:flex-row sm:items-end"><div><p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-[#D4AF37]">02 / Calendario KTF</p><h2 className="text-5xl font-black uppercase leading-none tracking-[-0.05em] sm:text-7xl">Próximos<br /><span className="text-[#D4AF37]">desafíos.</span></h2></div><p className="max-w-xs text-sm leading-6 text-white/50">El ring espera. Revisa las fechas, prepara tu equipo y llega con hambre.</p></div>
          <div className="flex flex-col">{events.map((event, index) => <article key={event.title} className="grid gap-4 border-b border-white/20 py-7 sm:grid-cols-[130px_1fr_auto] sm:items-center"><p className="text-2xl font-black text-[#D4AF37]">{event.date}</p><div><div className="mb-1 flex items-center gap-3"><span className="text-[10px] font-black uppercase tracking-widest text-white/40">0{index + 1} �� {event.type}</span>{index === 0 && <span className="bg-[#D4AF37] px-2 py-1 text-[9px] font-black text-black">PRÓXIMO</span>}</div><h3 className="text-2xl font-black uppercase sm:text-3xl">{event.title}</h3><p className="text-sm text-white/50">{event.detail}</p></div><ArrowRight className="hidden text-[#D4AF37] sm:block" size={28} /></article>)}</div>
        </div>
      </section>

      <section id="ubicacion" className="border-b-2 border-white/15 bg-[#040B14]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[1fr_1.2fr] lg:px-10"><div><p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-[#D4AF37]">03 / Encuéntranos</p><h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">El lugar<br />donde<br /><span className="italic text-[#D4AF37]">sucede.</span></h2><div className="mt-10 flex gap-4 border-t border-white/15 pt-6"><MapPin className="shrink-0 text-[#D4AF37]" /><div><p className="text-xl font-black uppercase">Av. Vicuña Mackenna 1240</p><p className="mt-2 text-sm text-white/50">Ñuñoa, Santiago · Metro Ñuble</p></div></div></div><div className="relative flex min-h-[340px] items-end overflow-hidden border-2 border-white/20 bg-[#121b22] p-6"><div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)', backgroundSize: '48px 48px' }} /><div className="relative flex items-center gap-3 border-2 border-[#D4AF37] bg-black px-4 py-3"><MapPin className="text-[#D4AF37]" size={20} /><span className="text-xs font-black uppercase tracking-wider">KTF Headquarters</span></div><p className="absolute right-5 top-5 text-[10px] font-bold uppercase tracking-widest text-white/40">MAPA / 33.46° S, 70.63° O</p></div></div></section>

      <footer id="contacto" className="bg-[#D4AF37] text-black"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-10"><div><p className="mb-3 text-xs font-black uppercase tracking-[0.25em]">Kamikaze Thai Fight</p><h2 className="max-w-xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">Tu turno<br />es ahora.</h2></div><div className="flex flex-col gap-3 text-sm font-black uppercase"><a className="flex items-center gap-3 hover:underline" href="tel:+56955555555"><Phone size={17} /> +56 9 5555 5555</a><a className="flex items-center gap-3 hover:underline" href="#inicio"><AtSign size={17} /> @kamikazethaifight</a><p className="mt-4 text-[10px] font-bold tracking-widest opacity-60">© 2026 KTF / TODOS LOS DERECHOS RESERVADOS</p></div></div></footer>
    </main>
  )
}
