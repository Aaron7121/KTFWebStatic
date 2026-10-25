import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PlanesExplorer } from '@/components/planes-explorer'
import { DURACIONES, INSCRIPCION, PERSONAL_TRAINING_HORA, PRECIOS, type ServicioId } from '@/data/precios'
import { SERVICIOS } from '@/data/servicios'
import { formatUSD } from '@/lib/precios'

export const metadata: Metadata = {
  title: 'Planes y precios · Kamikaze Thai Fight',
  description: 'Planes de Muay Thai, gym y entrenamiento guiado en Quito. Mensual, trimestral, semestral y anual.',
}

export default async function PlanesPage({ searchParams }: { searchParams: Promise<{ servicio?: string }> }) {
  const { servicio } = await searchParams
  const inicial: ServicioId = SERVICIOS.some(s => s.id === servicio) ? (servicio as ServicioId) : 'muay-thai-gym'

  return (
    <main className="min-h-screen overflow-hidden bg-[#040B14] text-white">
      <SiteHeader activo="planes" />

      <section className="border-b-2 border-white/15 bg-black px-5 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-6xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-8xl">Planes y<br /><span className="italic text-[#D4AF37]">precios.</span></h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/55">
            Cuanto más largo el plan, menos pagas por mes. Todos los precios en dólares. La inscripción de {formatUSD(INSCRIPCION)} se paga una sola vez, junto con tu primer plan.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
        <PlanesExplorer inicial={inicial} />
      </section>

      <section className="border-t-2 border-white/15 bg-black">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
          <h2 className="mb-8 text-3xl font-black uppercase sm:text-4xl">Todos los precios</h2>
          <div className="overflow-x-auto border-2 border-white/15">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <caption className="sr-only">Precios por servicio y duración, en dólares</caption>
              <thead>
                <tr className="border-b-2 border-white/15 bg-[#081522] text-xs font-black uppercase tracking-wider text-[#D4AF37]">
                  <th scope="col" className="px-4 py-4">Servicio</th>
                  {DURACIONES.map(d => <th key={d.id} scope="col" className="px-4 py-4">{d.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {SERVICIOS.map(s => (
                  <tr key={s.id} className="border-b border-white/10 last:border-0">
                    <th scope="row" className="px-4 py-4 font-black uppercase">{s.nombre}</th>
                    {DURACIONES.map(d => {
                      const p = PRECIOS[s.id][d.id]
                      return <td key={d.id} className={`px-4 py-4 tabular-nums ${p === undefined ? 'text-white/25' : 'font-bold'}`}>{p === undefined ? '—' : formatUSD(p)}</td>
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className="mt-8 grid gap-px border-2 border-white/15 bg-white/15 sm:grid-cols-2">
            <div className="bg-black px-6 py-5"><dt className="text-xs font-black uppercase tracking-wider text-[#D4AF37]">Inscripción</dt><dd className="mt-1 text-sm text-white/75">{formatUSD(INSCRIPCION)}, una sola vez. No aplica a la clase diaria.</dd></div>
            <div className="bg-black px-6 py-5"><dt className="text-xs font-black uppercase tracking-wider text-[#D4AF37]">Personal training</dt><dd className="mt-1 text-sm text-white/75">{formatUSD(PERSONAL_TRAINING_HORA)} por hora de clase. Se reserva por WhatsApp.</dd></div>
          </dl>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
