import Link from 'next/link'
import { MapPin, ExternalLink } from 'lucide-react'
import { ACADEMIA } from '@/data/academia'

// Íconos SVG optimizados y accesibles para redes sociales
function IconWhatsApp({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconInstagram({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function IconFacebook({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function IconTikTok({ className = 'size-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer id="contacto" className="bg-[#D4AF37] text-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em]">
            {ACADEMIA.nombre} · {ACADEMIA.eslogan}
          </p>
          <h2 className="max-w-xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl">
            Tu turno<br />es ahora.
          </h2>
          <p className="mt-4 max-w-md text-xs font-bold uppercase tracking-wider text-black/70">
            {ACADEMIA.lema} · Quito, Ecuador
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm font-black uppercase">
          {/* WhatsApp */}
          <a
            className="inline-flex items-center gap-3 transition-opacity hover:opacity-75 hover:underline"
            href={ACADEMIA.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Escribir por WhatsApp"
          >
            <IconWhatsApp className="size-4 shrink-0" />
            <span>WhatsApp {ACADEMIA.whatsappVisible}</span>
          </a>

          {/* Instagram */}
          <a
            className="inline-flex items-center gap-3 transition-opacity hover:opacity-75 hover:underline"
            href={ACADEMIA.redes.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Ir al perfil de Instagram"
          >
            <IconInstagram className="size-4 shrink-0" />
            <span>{ACADEMIA.redes.instagram.visible}</span>
          </a>

          {/* Facebook */}
          <a
            className="inline-flex items-center gap-3 transition-opacity hover:opacity-75 hover:underline"
            href={ACADEMIA.redes.facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Ir a la página de Facebook"
          >
            <IconFacebook className="size-4 shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-none">{ACADEMIA.redes.facebook.visible}</span>
          </a>

          {/* TikTok */}
          <a
            className="inline-flex items-center gap-3 transition-opacity hover:opacity-75 hover:underline"
            href={ACADEMIA.redes.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Ir al perfil de TikTok"
          >
            <IconTikTok className="size-4 shrink-0" />
            <span>{ACADEMIA.redes.tiktok.visible}</span>
          </a>

          {/* Ubicación Google Maps */}
          <a
            className="inline-flex items-center gap-3 transition-opacity hover:opacity-75 hover:underline"
            href={ACADEMIA.mapa.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Ver ubicación en Google Maps"
          >
            <MapPin size={17} className="shrink-0" />
            <span>{ACADEMIA.ciudad} — {ACADEMIA.sector}</span>
            <ExternalLink size={13} className="opacity-60" />
          </a>

          {/* Enlaces secundarios */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[10px] font-bold tracking-widest">
            <Link href="/planes" className="hover:underline">Planes</Link>
            <Link href="/inscripcion" className="hover:underline">Inscripción</Link>
            <Link href="/tienda" className="hover:underline">Tienda</Link>
          </div>
          <p className="text-[10px] font-bold tracking-widest opacity-60">© 2026 KTF · Prototipo de demostración</p>
        </div>
      </div>
    </footer>
  )
}
