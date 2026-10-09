"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Cross, 
  Compass, 
  Share2, 
  Users, 
  Sparkles, 
  GraduationCap, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Las 4 verdades bíblicas destacadas por el Pastor
const FOUR_TRUTHS = [
  {
    number: "01",
    title: "Un Encuentro Personal",
    desc: "Jesús desea tener una relación viva y cercana contigo, sanando tus heridas y escuchando tu voz.",
    icon: Heart,
  },
  {
    number: "02",
    title: "El Amor de la Cruz",
    desc: "En la cruz recibes el perdón incondicional y la gracia que borra todo tu pasado.",
    icon: Cross,
  },
  {
    number: "03",
    title: "Caminar en Propósito",
    desc: "No estás aquí por casualidad. Dios diseñó talentos únicos en ti para transformar tu generación.",
    icon: Compass,
  },
  {
    number: "04",
    title: "Compartir Salvación",
    desc: "Llevar la luz y la esperanza que recibiste a tu familia, amigos y a toda la ciudad.",
    icon: Share2,
  },
];

// Los 4 peldaños oficiales del Camino del Discípulo
const DISCIPLE_STAGES = [
  {
    step: "Paso 1",
    name: "Ganar",
    desc: "Confesión de fe genuina, entrega de vida a Cristo y el inicio de una nueva vida.",
    icon: Sparkles,
  },
  {
    step: "Paso 2",
    name: "Consolidar",
    desc: "Universidad de la Vida (UDB), retiro de Encuentro, sanidad interior y paso al Bautismo.",
    icon: Heart,
  },
  {
    step: "Paso 3",
    name: "Discipular",
    desc: "Escuela de Líderes, crecimiento devocional profundo e integración al Equipo de 12.",
    icon: GraduationCap,
  },
  {
    step: "Paso 4",
    name: "Enviar",
    desc: "Liderazgo activo en célula, discipulado y cumplimiento de la Gran Comisión.",
    icon: Send,
  },
];

// Opciones del Buscador de Célula interactivo
const CELL_TOPICS = [
  "Sanidad Interior",
  "Matrimonio y Parejas",
  "Crianza de los Hijos",
  "Finanzas con Propósito",
  "Vida Espiritual y Oración",
  "Superación de Duelo / Ansiedad",
  "Liderazgo y Propósito",
  "Jóvenes y Estudiantes",
];

export default function SoyNuevoPage() {
  // Estado del Funnel Interactivo (Paso 1: Temas, Paso 2: Detalles, Paso 3: Contacto, Paso 4: Éxito)
  const [funnelStep, setFunnelStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [howFound, setHowFound] = useState("");
  const [hasLeader, setHasLeader] = useState<"si" | "no" | "">("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactSector, setContactSector] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleFinishFunnel = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const notasDetalle = `Intereses: ${selectedTopics.join(", ")} | Medio: ${howFound} | ¿Tiene líder?: ${hasLeader}`;

      const { error } = await supabase.from("creyentes").insert([
        {
          nombre: contactName,
          telefono: contactPhone,
          sector_direccion: contactSector,
          sede: "Auditorio Principal",
          estado_discipular: "nuevo",
          notas: notasDetalle,
        },
      ]);

      if (error) {
        console.error("Error guardando en Supabase:", error);
      }
    } catch (err) {
      console.error("Error de conexión:", err);
    }

    setIsSubmitting(false);
    setFunnelStep(4);
  };
  
  return (
    <div className="min-h-screen w-full bg-[#F7F7F5] text-zinc-900 flex flex-col">
      <Header />

      {/* Hero Bienvenida: "Esta es tu casa" */}
      <section className="relative pt-36 pb-20 px-6 md:px-12 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-zinc-950/90 to-zinc-950 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-200 mb-6">
            Bienvenidos a Iglesia Iviluz
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            ESTA ES TU CASA
          </h1>
          <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Sin importar de dónde vienes ni cuál ha sido tu historia, aquí hay una familia con los brazos abiertos lista para caminar contigo.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#celulas"
              className="rounded-full bg-accent-cream px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-transform duration-300 hover:scale-105 shadow-xl"
            >
              Encontrar una Célula
            </a>
          </div>
        </div>
      </section>

      {/* Las 4 Verdades: "Jesús quiere que..." */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 mb-2">
            El Mensaje Central
          </h2>
          <p className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-900">
            Jesús quiere que...
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOUR_TRUTHS.map((truth) => {
            const Icon = truth.icon;
            return (
              <div
                key={truth.number}
                className="group relative rounded-3xl border border-zinc-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black text-zinc-300 group-hover:text-zinc-900 transition-colors">
                    {truth.number}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-800 transition-colors group-hover:bg-accent-cream group-hover:text-zinc-950">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 leading-snug mb-3">
                  {truth.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {truth.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* El Camino del Discípulo (Nomenclatura Oficial Iviluz) */}
      <section className="py-20 px-6 md:px-12 bg-white border-y border-zinc-200/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Crecimiento Espiritual
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-900 mt-2">
              El Camino del Discípulo
            </h2>
            <p className="text-sm text-zinc-500 mt-3">
              Un recorrido claro y ordenado para formar el carácter de Cristo en tu vida.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DISCIPLE_STAGES.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="rounded-3xl border border-zinc-200/70 bg-[#F7F7F5] p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-zinc-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-4">
                      {stage.step}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-xl font-black text-zinc-900 uppercase">
                        {stage.name}
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Buscador de Célula: Funnel Interactivo "Caminemos Juntos" */}
      <section id="celulas" className="py-24 px-6 md:px-12 max-w-3xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            Grupos y Células en Casa
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-zinc-900 mt-2">
            Caminemos Juntos
          </h2>
          <p className="text-sm text-zinc-500 mt-3 max-w-xl mx-auto leading-relaxed">
            Una célula es un grupo familiar semanal donde compartimos, oramos y aprendemos la Biblia en un ambiente cercano. Cuéntanos qué buscas para conectarte con la célula ideal.
          </p>
        </div>

        {/* Tarjeta del Embudo */}
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 md:p-10 shadow-xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* Paso 1: Temas de Interés */}
            {funnelStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                    Paso 1 de 3
                  </span>
                  <h3 className="text-xl font-bold text-zinc-900 mt-1">
                    ¿Qué temas te gustaría fortalecer en tu vida?
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Selecciona una o más opciones que resuenen contigo.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CELL_TOPICS.map((topic) => {
                    const isSelected = selectedTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => toggleTopic(topic)}
                        className={`p-3.5 rounded-2xl text-left text-xs font-bold transition-all border cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-zinc-900 text-white border-zinc-900 shadow-md"
                            : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-400"
                        }`}
                      >
                        {topic}
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    disabled={selectedTopics.length === 0}
                    onClick={() => setFunnelStep(2)}
                    className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-zinc-800 disabled:opacity-40 cursor-pointer"
                  >
                    Continuar
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Paso 2: Detalles de Conexión */}
            {funnelStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                    Paso 2 de 3
                  </span>
                  <h3 className="text-xl font-bold text-zinc-900 mt-1">
                    Un poco más sobre ti
                  </h3>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-2">
                      ¿Cómo conociste la Iglesia Iviluz?
                    </label>
                    <select
                      value={howFound}
                      onChange={(e) => setHowFound(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="instagram">Instagram / Redes Sociales</option>
                      <option value="transmision">Transmisión en vivo (YouTube)</option>
                      <option value="amigo">Invitación de un amigo o familiar</option>
                      <option value="presencial">Visité una reunión presencial</option>
                      <option value="otro">Otro medio</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-2">
                      ¿Cuentas actualmente con un líder o ministerio que te apoye?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setHasLeader("si")}
                        className={`p-3 rounded-xl border text-xs font-bold text-center cursor-pointer transition-colors ${
                          hasLeader === "si"
                            ? "bg-zinc-900 text-white border-zinc-900"
                            : "bg-zinc-50 text-zinc-700 border-zinc-200"
                        }`}
                      >
                        Sí tengo líder
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasLeader("no")}
                        className={`p-3 rounded-xl border text-xs font-bold text-center cursor-pointer transition-colors ${
                          hasLeader === "no"
                            ? "bg-zinc-900 text-white border-zinc-900"
                            : "bg-zinc-50 text-zinc-700 border-zinc-200"
                        }`}
                      >
                        No tengo líder
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setFunnelStep(1)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Volver
                  </button>
                  <button
                    type="button"
                    disabled={!howFound || !hasLeader}
                    onClick={() => setFunnelStep(3)}
                    className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-zinc-800 disabled:opacity-40 cursor-pointer"
                  >
                    Continuar
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Paso 3: Datos de Contacto */}
            {funnelStep === 3 && (
              <motion.form
                key="step3"
                onSubmit={handleFinishFunnel}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                    Paso 3 de 3
                  </span>
                  <h3 className="text-xl font-bold text-zinc-900 mt-1">
                    ¿Dónde te contactamos?
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Un líder de zona te escribirá cordialmente por WhatsApp para invitarte.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Tu nombre y apellido"
                      className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Teléfono WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Ej: 0412-1234567"
                      className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Sector / Zona de residencia en Barquisimeto *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactSector}
                      onChange={(e) => setContactSector(e.target.value)}
                      placeholder="Ej: Cabudare, Centro, Ruiz Pineda, etc."
                      className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setFunnelStep(2)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Volver
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !contactName || !contactPhone || !contactSector}
                    className="inline-flex items-center gap-2 rounded-full bg-accent-cream px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-zinc-900 hover:text-white disabled:opacity-40 shadow-md cursor-pointer"
                  >
                    {isSubmitting ? "Conectando..." : "Quiero mi Célula"}
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* Paso 4: Pantalla de Éxito */}
            {funnelStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-8 text-center flex flex-col items-center gap-4"
              >
                <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black uppercase text-zinc-900 tracking-tight">
                  ¡Qué alegría tenerte con nosotros!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 max-w-md leading-relaxed">
                  Hemos recibido tu interés. Un líder de Iglesia Iviluz se comunicará contigo vía WhatsApp para darte la bienvenida y coordinar los detalles de tu célula más cercana.
                </p>
                <Link
                  href="/"
                  className="mt-4 rounded-full bg-zinc-900 px-8 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800"
                >
                  Volver al Inicio
                </Link>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}