"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
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

const TITLE_WORDS = ["ILUMINANDO", "LAS", "NACIONES"];

const wordVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.3 + index * 0.15,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

interface HeroProps {
  onOpenChat: () => void;
}

export default function Hero({ onOpenChat }: HeroProps) {
  return (
    <section id="inicio" className="relative h-screen min-h-screen w-full bg-zinc-900 z-10 overflow-hidden">
      
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#F7F7F5] to-zinc-700 animate-pulse pointer-events-none" />

      <video
        src="/media/videohero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover object-top transition-opacity duration-1000 pointer-events-none"
      />

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70 pointer-events-none" />

      {/* Lado izquierdo: Redes Sociales */}
      <div className="absolute left-4 md:left-10 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <a
            href="https://www.instagram.com/iglesiaiviluz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white transition-transform duration-300 hover:scale-110 drop-shadow-md"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://wa.me/" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-white transition-transform duration-300 hover:scale-110 drop-shadow-md"
          >
            <WhatsAppIcon />
          </a>
        </div>
        <span 
          className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/95 drop-shadow-sm rotate-180" 
          style={{ writingMode: "vertical-rl" }}
        >
          SÍGUENOS
        </span>
      </div>

      {/* Lado derecho: DESCUBRE */}
      <div className="absolute right-4 md:right-10 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-4">
        <ChevronDown className="h-5 w-5 text-white animate-bounce drop-shadow-md" />
        <span 
          className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/95 drop-shadow-sm rotate-180" 
          style={{ writingMode: "vertical-rl" }}
        >
          DESCUBRE
        </span>
      </div>

      {/* Título Central */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-12 text-center pointer-events-none">
        <h1 className="flex flex-wrap items-center justify-center gap-x-3 md:gap-x-4 text-4xl font-black uppercase leading-tight tracking-tighter text-white md:text-8xl drop-shadow-2xl">
          {TITLE_WORDS.map((word, index) => (
            <span key={word} className="overflow-hidden py-1 md:py-2">
              <motion.span
                custom={index}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}