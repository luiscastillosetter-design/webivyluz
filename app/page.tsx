"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Schedules from "@/components/Schedules";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";
import PastoralChat from "@/components/PastoralChat";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="min-h-screen w-full bg-[#F7F7F5] relative flex flex-col">
      {/* Cabecera de Navegación Global */}
      <Header />

      {/* Hero Cinematográfico con Visión Oficial y Accesos Rápidos */}
      <Hero onOpenChat={() => setIsChatOpen(true)} />

      {/* Horarios y Servicios (Bloque conciso, sin scroll infinito) */}
      <Schedules />

      {/* Pie de Página Institucional */}
      <Footer />

      {/* Botón Flotante Discreto */}
      <FloatingChatButton onOpenChat={() => setIsChatOpen(true)} />

      {/* Modal de Consejería Pastoral con Streaming y Límite de 4 Turnos */}
      <AnimatePresence>
        {isChatOpen && (
          <PastoralChat onClose={() => setIsChatOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}