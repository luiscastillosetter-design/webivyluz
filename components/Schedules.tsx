"use client";

import { MapPin } from "lucide-react";
import type { ReactNode } from "react";

interface ScheduleCard {
  title: string;
  lines: string[];
  icon?: ReactNode;
  cta?: { label: string; href: string };
}

const cards: ScheduleCard[] = [
  {
    title: "Domingos",
    lines: [
      "Servicios Familiares: 8:00am y 10:00am",
      "Servicio de Jóvenes: 2:30pm",
    ],
  },
  {
    title: "Miércoles",
    lines: ["Servicio de Oración: 6:00pm"],
  },
  {
    title: "Lunes a Viernes",
    lines: ["Servicio Matutino: 5:00am"],
    cta: { label: "Acceder al Matutino", href: "#matutino" },
  },
  {
    title: "Ubicación",
    lines: [
      "Calle 47 entre avenidas 19 y 20 local s/n sector oeste Barquisimeto Lara Zona postal 3001",
    ],
    icon: <MapPin className="h-5 w-5 text-accent-cream" />,
  },
];

export default function Schedules() {
  return (
    <section
      id="horarios"
      className="w-full bg-white px-6 py-24 md:px-12"
    >
      <h2
        className="text-center text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-6xl"
      >
        ACOMPÁÑANOS
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="rounded-3xl border border-zinc-100 bg-white p-8 text-zinc-900 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
          >
            <h3 className="flex items-center gap-2 text-2xl font-bold uppercase tracking-tight">
              {card.icon}
              {card.title}
            </h3>
            <div className="mt-4 flex flex-col gap-2 text-zinc-500">
              {card.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            {card.cta && (
              <a
                href={card.cta.href}
                className="mt-6 inline-block rounded-md bg-accent-cream px-5 py-2 text-sm font-bold text-zinc-900 transition-transform duration-300 hover:scale-105"
              >
                {card.cta.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}