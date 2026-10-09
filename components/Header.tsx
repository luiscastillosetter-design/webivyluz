"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Soy Nuevo", href: "/soy-nuevo" },
  { label: "Sedes", href: "/sedes" },
  { label: "Prédicas", href: "/predicas" },
  { label: "Ministerios", href: "/ministerios" },
  { label: "Oración", href: "/oracion" },
  { label: "Consejería", href: "/agendar" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-[100] w-full transition-all duration-300 ${
          isScrolled
            ? "bg-black/75 backdrop-blur-md border-b border-white/10 shadow-2xl py-2.5 text-accent-cream"
            : "bg-transparent py-4 text-accent-cream"
        } px-6 md:px-12 flex justify-between items-center`}
      >
        {/* Logo (Conserva su color crema natural y tamaño estilizado) */}
        <Link href="/" className="flex items-center relative z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/logocrema.png"
            alt="Iglesia Iviluz"
            style={{ height: isScrolled ? "75px" : "95px", width: "auto", display: "block" }}
            className="object-contain transition-all duration-300"
          />
        </Link>

        {/* Enlaces Desktop en tono crema */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-accent-cream hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Acciones: Botón Dar y Menú Hamburguesa */}
        <div className="flex items-center gap-4">
          <Link
            href="/dar"
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md bg-accent-cream text-zinc-950 hover:bg-white hover:scale-105"
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            Dar
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú"
            className="p-2 transition-opacity hover:opacity-85 relative z-10 cursor-pointer"
          >
            <Menu className="h-7 w-7 md:h-8 md:w-8 text-accent-cream hover:text-white transition-colors duration-300" />
          </button>
        </div>
      </header>

      {/* Menú Lateral Desplegable */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex justify-end"
          >
            <motion.div
              key="mobile-menu-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-[85vw] max-w-[380px] bg-white h-full shadow-2xl flex flex-col relative"
            >
              <div className="flex justify-between items-center p-6 border-b border-zinc-100">
                <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">
                  Navegación Iviluz
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="p-2.5 rounded-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col px-8 py-8 gap-6 text-xl font-black text-zinc-900 tracking-tight flex-grow overflow-y-auto">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-amber-600 transition-colors"
                >
                  INICIO
                </Link>
                <Link
                  href="/soy-nuevo"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-amber-600 transition-colors"
                >
                  SOY NUEVO
                </Link>
                <Link
                  href="/sedes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-amber-600 transition-colors"
                >
                  SEDES Y HORARIOS
                </Link>
                <Link
                  href="/predicas"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-amber-600 transition-colors"
                >
                  PRÉDICAS
                </Link>
                <Link
                  href="/ministerios"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-amber-600 transition-colors"
                >
                  MINISTERIOS
                </Link>
                <Link
                  href="/oracion"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-amber-600 transition-colors"
                >
                  PETICIONES DE ORACIÓN
                </Link>
                <Link
                  href="/buena-voluntad"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-amber-600 transition-colors"
                >
                  BUENA VOLUNTAD
                </Link>
                <Link
                  href="/agendar"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-amber-600 transition-colors"
                >
                  CONSEJERÍA PASTORAL
                </Link>
              </nav>

              <div className="p-6 border-t border-zinc-200 bg-zinc-50 flex flex-col gap-3">
                <Link
                  href="/dar"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full py-3.5 justify-center items-center gap-2 bg-zinc-900 text-white text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-zinc-800 transition-colors shadow-md"
                >
                  <Heart className="h-4 w-4 fill-current text-accent-cream" />
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