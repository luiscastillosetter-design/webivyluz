"use client";

import { MapPin, Play, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

interface ScheduleCard {
  title: string;
  lines: string[];
  icon?: ReactNode;
  cta?: { label: string; href: string; external?: boolean };
}

const cards: ScheduleCard[] = [
  {
    title: "Domingos",
    lines: [
      "Servicios Familiares: 8:00 AM y 10:00 AM",
      "Servicio de Jóvenes (Somos Luz): 2:30 PM",
    ],
    cta: { label: "Planifica tu Visita", href: "/soy-nuevo" },
  },
  {
    title: "Miércoles",
    lines: [
      "Servicio de Oración: 6:00 PM",
      "Reuniones de Célula en los Hogares",
    ],
    cta: { label: "Motivo de Oración", href: "/oracion" },
  },
  {
    title: "Lunes a Viernes",
    lines: [
      "Servicio Matutino: 5:00 AM",
      "Transmisión Devocional en Vivo",
    ],
    cta: {
      label: "Ver en YouTube",
      href: "https://www.youtube.com/@iglesiaiviluz",
      external: true,
    },
  },
  {
    title: "Ubicación Central",
    lines: [
      "Calle 47 entre avenidas 19 y 20, sector oeste, Barquisimeto, Lara.",
    ],
    icon: <MapPin className="h-5 w-5 text-amber-700" />,
    cta: { label: "Ver todas las Sedes", href: "/sedes" },
  },
];

export default function Schedules() {
  return (
    <section id="horarios" className="w-full bg-white px-6 py-20 md:px-12 border-t border-zinc-200/60">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            Nuestros Horarios
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-zinc-900 mt-2">
            Acompáñanos
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-[#F7F7F5] p-7 text-zinc-900 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl"
            >
              <div>
                <h3 className="flex items-center gap-2 text-xl font-black uppercase tracking-tight">
                  {card.icon}
                  {card.title}
                </h3>
                <div className="mt-4 flex flex-col gap-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {card.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              {card.cta && (
                <a
                  href={card.cta.href}
                  target={card.cta.external ? "_blank" : undefined}
                  rel={card.cta.external ? "noopener noreferrer" : undefined}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-accent-cream hover:text-zinc-950"
                >
                  {card.cta.external && <Play className="h-3 w-3 fill-current" />}
                  <span>{card.cta.label}</span>
                  {card.cta.external && <ExternalLink className="h-3 w-3 opacity-60" />}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}