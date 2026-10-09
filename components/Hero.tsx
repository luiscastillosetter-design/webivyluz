"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, MapPin, PlayCircle, HeartHandshake, MessageCircle } from "lucide-react";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

interface HeroProps {
  onOpenChat: () => void;
}

const QUICK_ACTIONS = [
  {
    title: "Soy Nuevo",
    subtitle: "Conoce nuestra casa",
    href: "/soy-nuevo",
    icon: Sparkles,
  },
  {
    title: "Nuestras Sedes",
    subtitle: "Horarios y ubicación",
    href: "/sedes",
    icon: MapPin,
  },
  {
    title: "Ver Prédicas",
    subtitle: "Mensajes en video",
    href: "/predicas",
    icon: PlayCircle,
  },
  {
    title: "Petición de Oración",
    subtitle: "Oramos por ti",
    href: "/oracion",
    icon: HeartHandshake,
  },
];

export default function Hero({ onOpenChat }: HeroProps) {
  return (
    <section id="inicio" className="relative min-h-screen w-full bg-zinc-950 flex flex-col justify-between pt-28 pb-10 px-6 md:px-12 overflow-hidden">
      
      {/* Video Desktop (16:9 Horizontal) - Opacidad al máximo */}
      <video
        src="/media/videohero-desktop.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="hidden md:block absolute inset-0 z-0 h-full w-full object-cover object-center opacity-100 pointer-events-none"
      />

      {/* Video Móvil (9:16 Vertical) - Opacidad al máximo */}
      <video
        src="/media/videohero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="block md:hidden absolute inset-0 z-0 h-full w-full object-cover object-top opacity-100 pointer-events-none"
      />

      {/* Capa de oscurecimiento totalmente pareja al 25% (20-25% para legibilidad sin perder la cara) */}
      <div className="absolute inset-0 z-0 bg-black/25 pointer-events-none" />

      {/* Lateral izquierdo: Redes sociales discretas */}
      <div className="hidden md:flex absolute left-8 top-1/2 z-20 -translate-y-1/2 flex-col items-center gap-6">
        <a
          href="https://www.instagram.com/iglesiaiviluz/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-white/80 transition-transform duration-300 hover:scale-110 hover:text-white drop-shadow-md"
        >
          <InstagramIcon />
        </a>
        <div className="h-10 w-px bg-white/20" />
        <span 
          className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60 drop-shadow-sm rotate-180" 
          style={{ writingMode: "vertical-rl" }}
        >
          SÍGUENOS
        </span>
      </div>

      {/* Centro: Título Principal y Visión Oficial */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center text-center my-auto pt-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-1.5 backdrop-blur-md mb-6 shadow-lg"
        >
          <span className="h-2 w-2 rounded-full bg-amber-300 animate-pulse" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-white">
            Iglesia Iviluz · Barquisimeto
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] leading-[0.95]"
        >
          ILUMINANDO LAS NACIONES
        </motion.h1>

        {/* Visión oficial dictada por el Pastor */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          &ldquo;Ganar almas y formarlos como discípulos de Cristo, que vayan y sean luz en las naciones.&rdquo;
        </motion.p>

        {/* Botón rápido para abrir el chat de consejería */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <button
            type="button"
            onClick={onOpenChat}
            className="inline-flex items-center gap-2.5 rounded-full bg-accent-cream px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all duration-300 hover:bg-white hover:scale-105 shadow-2xl cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 text-zinc-950" />
            ¿Necesitas hablar con alguien?
          </button>
        </motion.div>
      </div>

      {/* Parte Inferior: Los 4 Accesos Rápidos */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 mx-auto w-full max-w-6xl pt-6"
      >
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-white/80 mb-4 drop-shadow">
          Da tu siguiente paso
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-center gap-4 rounded-2xl border border-white/20 bg-black/40 p-4 text-left backdrop-blur-xl transition-all duration-300 hover:border-accent-cream/80 hover:bg-black/60 hover:-translate-y-1 shadow-2xl"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-cream transition-colors group-hover:bg-accent-cream group-hover:text-zinc-950">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors drop-shadow-sm">
                    {action.title}
                  </h3>
                  <p className="text-xs text-zinc-200 drop-shadow-sm">
                    {action.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}