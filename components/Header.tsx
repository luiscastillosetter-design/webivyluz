"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Menu, 
  X, 
  Heart, 
  User, 
  Sparkles, 
  GraduationCap, 
  Users, 
  Calendar, 
  HeartHandshake, 
  MapPin, 
  PlayCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Los 5 accesos directos principales (idénticos al Hero)
const MAIN_QUICK_LINKS = [
  { label: "Soy Nuevo", href: "/soy-nuevo", icon: Sparkles },
  { label: "Nuestros Ministerios", href: "/ministerios", icon: Users },
  { label: "Nuestras Sedes", href: "/sedes", icon: MapPin },
  { label: "Ver Prédicas", href: "/predicas", icon: PlayCircle },
  { label: "Petición de Oración", href: "/oracion", icon: HeartHandshake },
];

const MENU_CATEGORIES = [
  {
    category: "Crecimiento y Discipulado",
    items: [
      {
        title: "Soy Nuevo / El Camino del Discípulo",
        desc: "Conoce nuestra casa, los 4 pasos de fe y encuentra tu célula familiar.",
        href: "/soy-nuevo",
        icon: Sparkles,
      },
      {
        title: "Universidad de la Vida & Encuentro",
        desc: "Proceso de transformación, sanidad interior, retiro y paso al bautismo.",
        href: "/soy-nuevo#universidad-de-la-vida",
        icon: GraduationCap,
      },
      {
        title: "Grupos y Células en Casa",
        desc: "Encuentra tu grupo pequeño por sector y conecta con tu familia espiritual.",
        href: "/soy-nuevo#celulas",
        icon: Users,
      },
    ],
  },
  {
    category: "Vida de Iglesia y Servicio",
    items: [
      {
        title: "Nuestros Ministerios",
        desc: "Iviluz Kids, Iviluz Teens, Somos Luz y Ministerio de Adultos.",
        href: "/ministerios",
        icon: Users,
      },
      {
        title: "Quiero Servir",
        desc: "Pon tus talentos y dones al servicio de Dios en nuestras áreas.",
        href: "/ministerios#quiero-servir",
        icon: Sparkles,
      },
      {
        title: "Nuestras Sedes y Horarios",
        desc: "Auditorio central y extensiones con dirección exacta y Google Maps.",
        href: "/sedes",
        icon: MapPin,
      },
      {
        title: "Prédicas y Series",
        desc: "Enseñanzas bíblicas y transmisiones dominicales en YouTube.",
        href: "/predicas",
        icon: PlayCircle,
      },
    ],
  },
  {
    category: "Cuidado Pastoral y Acción Social",
    items: [
      {
        title: "Peticiones de Oración",
        desc: "Nuestro equipo pastoral de intercesión ora continuamente por ti.",
        href: "/oracion",
        icon: HeartHandshake,
      },
      {
        title: "Consejería Pastoral",
        desc: "Agenda una sesión confidencial presencial o virtual con los pastores.",
        href: "/agendar",
        icon: Calendar,
      },
      {
        title: "Buena Voluntad",
        desc: "Brazo de acción social: alimentos, ropa y medicinas a comunidades.",
        href: "/buena-voluntad",
        icon: Heart,
      },
    ],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-[100] w-full transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md shadow-lg py-2.5 text-accent-cream"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 text-accent-cream"
        } px-6 md:px-12 flex justify-between items-center`}
      >
        {/* Logo Institucional */}
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/logocrema.png"
            alt="Iglesia Iviluz"
            style={{ height: isScrolled ? "70px" : "88px", width: "auto", display: "block" }}
            className="object-contain transition-all duration-300"
          />
        </Link>

        {/* Acciones Superiores Estilo Life.Church: LOG IN + Dar + Botón MENÚ */}
        <div className="flex items-center gap-3 md:gap-5">
          <Link
            href="/portal/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-cream/90 hover:text-white transition-colors py-2 px-3 rounded-full hover:bg-white/10"
            title="Portal de Gestión Pastoral"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Log In</span>
          </Link>

          <Link
            href="/dar"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider bg-accent-cream text-zinc-950 hover:bg-white transition-all shadow-md"
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>Dar</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir Menú"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-widest text-accent-cream hover:bg-white/20 hover:text-white transition-all cursor-pointer"
          >
            <Menu className="h-4 w-4" />
            <span>Menú</span>
          </button>
        </div>
      </header>

      {/* Menú Desplegable Estilo Life.Church */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mega-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/75 backdrop-blur-md flex justify-end"
          >
            <motion.div
              key="mega-menu-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between text-zinc-900"
            >
              {/* Encabezado del Menú */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-zinc-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block">
                    Iglesia Iviluz · Visión G12
                  </span>
                  <h2 className="text-sm font-black uppercase tracking-tight text-zinc-900">
                    Directorio de Áreas
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Cerrar Menú"
                  className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Contenido con Scroll */}
              <div className="px-6 py-6 overflow-y-auto space-y-6 flex-1">
                {/* 1. Bloque de los 5 Accesos Rápidos Directos */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-2.5">
                    Accesos Rápidos
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {MAIN_QUICK_LINKS.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-900 hover:text-white text-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span>{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Directorio Desglosado por Categorías */}
                {MENU_CATEGORIES.map((cat) => (
                  <div key={cat.category} className="space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                      {cat.category}
                    </span>
                    <div className="space-y-1.5">
                      {cat.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-[#F7F7F5] transition-all border border-transparent hover:border-zinc-200/80"
                          >
                            <div className="h-9 w-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white shrink-0 transition-colors mt-0.5">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="text-xs font-black uppercase text-zinc-900 group-hover:text-amber-800 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-[11px] text-zinc-500 leading-snug mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pie del Menú */}
              <div className="p-5 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between gap-3">
                <Link
                  href="/portal/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 py-3 text-center rounded-xl bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                >
                  Portal Pastoral
                </Link>
                <Link
                  href="/dar"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 py-3 text-center rounded-xl bg-accent-cream text-zinc-950 text-xs font-bold uppercase tracking-wider hover:bg-amber-200 transition-colors"
                >
                  Ofrendar / Donar
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}