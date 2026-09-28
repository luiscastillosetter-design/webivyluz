import Link from "next/link";
import { Mail, MapPin, FileText } from "lucide-react";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.29-1.39a9.9 9.9 0 0 0 4.7 1.2h.01c5.46 0 9.9-4.45 9.9-9.9C21.96 6.45 17.5 2 12.04 2zm0 18.11h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.53 3.69-8.22 8.24-8.22 2.2 0 4.27.86 5.82 2.42a8.16 8.16 0 0 1 2.41 5.81c0 4.53-3.69 8.25-8.22 8.25zm4.51-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.45-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.04 0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.19 3.7.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.66-1.17.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Horarios", href: "#horarios" },
  { label: "Ministerios", href: "#ministerios" },
  { label: "Visítanos", href: "/agendar" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-white px-6 py-16 md:px-12 relative z-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/logonegro.png"
            alt="Iglesia Iviluz"
            style={{ height: "64px", width: "auto", display: "block" }}
            className="object-contain"
          />
          <p className="text-sm text-zinc-500 mt-2">
            Iluminando las naciones desde Barquisimeto, Lara.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">
            Enlaces rápidos
          </h3>
          <nav className="flex flex-col gap-3 mt-1">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-500 transition-colors duration-300 hover:text-zinc-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">
            Información institucional
          </h3>
          <div className="flex flex-col gap-4 mt-1 text-sm text-zinc-500">
            <a
              href="mailto:iviluzchurch@gmail.com"
              className="flex items-center gap-3 transition-colors duration-300 hover:text-zinc-900"
            >
              <Mail className="h-4 w-4 shrink-0" />
              iviluzchurch@gmail.com
            </a>
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 shrink-0" />
              RIF: J294021948
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="leading-relaxed">Calle 47 entre avenidas 19 y 20 local s/n sector oeste Barquisimeto Lara Zona postal 3001</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">
            Síguenos
          </h3>
          <div className="flex gap-4 mt-1">
            <Link
              href="https://www.instagram.com/iglesiaiviluz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 text-zinc-900 transition-colors duration-300 hover:bg-zinc-900 hover:text-white"
            >
              <InstagramIcon />
            </Link>
            <Link
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 text-zinc-900 transition-colors duration-300 hover:bg-zinc-900 hover:text-white"
            >
              <WhatsAppIcon />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl border-t border-zinc-100 pt-8 text-center text-xs text-zinc-400">
        © 2026 Iglesia Iviluz. Todos los derechos reservados.
      </div>
    </footer>
  );
}