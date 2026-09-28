"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3 pointer-events-auto"
            : "bg-transparent py-6 pointer-events-auto" 
        } px-6 md:px-12 flex justify-between items-center`}
      >
        <Link href="#inicio" className="flex items-center relative z-10">
          <img
            src="/media/logocrema.png"
            alt="Iglesia Iviluz"
            style={{ height: "72px", width: "auto", display: "block" }}
            className={`object-contain transition-all duration-300 ${isScrolled ? 'invert brightness-0' : ''}`}
          />
        </Link>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Abrir menú"
          className="p-2 text-white transition-opacity hover:opacity-85 relative z-10 cursor-pointer pointer-events-auto"
        >
          <Menu className={`h-8 w-8 md:h-10 md:w-10 drop-shadow-lg transition-colors duration-300 ${isScrolled ? 'text-zinc-900' : 'text-white'}`} />
        </button>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex justify-end pointer-events-auto"
          >
            <motion.div
              key="mobile-menu-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-[85vw] max-w-[400px] bg-white h-full shadow-2xl flex flex-col relative"
            >
              <div className="flex justify-between items-center p-6 border-b border-zinc-100">
                <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">Navegación</span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="p-3 rounded-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <nav className="flex flex-col px-8 py-10 gap-8 text-2xl md:text-3xl font-black text-zinc-900 tracking-tighter flex-grow overflow-y-auto">
                <Link href="#inicio" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-zinc-500 transition-colors">INICIO</Link>
                <Link href="#horarios" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-zinc-500 transition-colors">HORARIOS</Link>
                <Link href="#ministerios" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-zinc-500 transition-colors">MINISTERIOS</Link>
                <Link href="/agendar" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-zinc-500 transition-colors">VISÍTANOS</Link>
              </nav>

              <div className="p-6 border-t border-zinc-200 bg-zinc-50">
                <Link
                  href="/agendar"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full py-4 justify-center items-center bg-zinc-900 text-white text-sm font-bold tracking-wide rounded-xl hover:bg-zinc-800 transition-colors shadow-lg"
                >
                  PLANIFICA TU VISITA
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}