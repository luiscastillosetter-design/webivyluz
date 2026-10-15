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
  Sparkles, 
  GraduationCap, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  Users2
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Las 4 verdades bíblicas destacadas por el Pastor (con imágenes)
const FOUR_TRUTHS = [
  {
    number: "01",
    title: "Un Encuentro Personal",
    desc: "Tengas un encuentro personal con Él. Jesús desea tener una relación viva y cercana contigo.",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_1_3849938660733597282.webp",
  },
  {
    number: "02",
    title: "El Amor de la Cruz",
    desc: "Recibas el amor incondicional que demostró por ti en la Cruz, perdonando todo tu pasado.",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_4_3849938680899805073.webp",
  },
  {
    number: "03",
    title: "Caminar en Propósito",
    desc: "Camines en el propósito único que Él tiene diseñado para tu vida y para bendecir a tu familia.",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_3_3849938668644071469.webp",
  },
  {
    number: "04",
    title: "Compartir Salvación",
    desc: "Compartas con otros el mensaje de salvación y seas luz para transformar tu ciudad.",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_6_3849938690672513949.webp",
  },
];

// Los 4 Pasos Oficiales del Camino del Discípulo (Visión G12)
const DISCIPLE_STAGES = [
  {
    step: "1. Ganar",
    objetivo: "Alcanzar a nuevas personas mediante la predicación del evangelio y la integración inicial.",
    proceso: "Inicia con el registro de asistencia en una célula (grupo pequeño), reunión familiar o evento evangelístico. Incluye la bienvenida, la oración de entrega, la recolección de datos, llamadas, visitas y finaliza cuando la persona se inscribe y asiste a la primera clase de la Universidad de la Vida.",
    icon: Sparkles,
  },
  {
    step: "2. Consolidar",
    objetivo: "Cuidar al nuevo creyente como a un recién nacido y afirmar su fe en Jesús.",
    proceso: "Comprende el acompañamiento pastoral, el seguimiento cercano y la vivencia de un Encuentro (retiro espiritual) para lograr una transformación de vida, sanidad interior, liberación y el paso público al bautismo.",
    icon: Heart,
  },
  {
    step: "3. Discipular",
    objetivo: "Formar el carácter de Cristo en el creyente y capacitarlo como líder reproductivo.",
    proceso: "Se realiza a través de escuelas de formación (como la Escuela de Líderes / Capacitación Destino) y la integración en una célula de discipulado, donde se enseñan metas, principios bíblicos y herramientas de liderazgo.",
    icon: GraduationCap,
  },
  {
    step: "4. Enviar",
    objetivo: "Multiplicar el fruto y comisionar al líder para que gane a otros.",
    proceso: "El discípulo ya formado ejerce un liderazgo multiplicador al abrir su propia célula y guiar a nuevas personas por la misma escalera de bendición.",
    icon: Send,
  },
];

// Temas de Célula mostrados en el Video de MCI
const CELL_TOPICS = [
  "Sentimientos y Emociones",
  "Sanidad Interior",
  "Crianza de los Hijos",
  "Lectura de la Biblia",
  "Relaciones Familiares",
  "Matrimonios",
  "Propósito de Vida",
  "Vida Espiritual y Oración",
  "Finanzas con Propósito",
  "Sanidad Física",
  "Liderazgo",
  "Jóvenes y Estudiantes",
];

export default function SoyNuevoPage() {
  // Estado del Funnel de Células
  const [funnelStep, setFunnelStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [howFound, setHowFound] = useState("");
  const [hasLeader, setHasLeader] = useState<"si" | "no" | "">("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSector, setContactSector] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado del Modal de Inscripción Rápida (Universidad de la Vida / Encuentro)
  const [registerModal, setRegisterModal] = useState<"universidad" | "encuentro" | null>(null);
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics((prev) => prev.filter((t) => t !== topic));
    } else {
      if (selectedTopics.length < 3) {
        setSelectedTopics((prev) => [...prev, topic]);
      }
    }
  };

  const handleFinishFunnel = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const notasDetalle = `Temas: ${selectedTopics.join(", ")} | Vía: ${howFound} | ¿Tiene líder?: ${hasLeader}`;
      await supabase.from("creyentes").insert([
        {
          nombre: contactName,
          telefono: contactPhone,
          email: contactEmail || null,
          sector_direccion: contactSector,
          sede: "Auditorio Principal",
          estado_discipular: "nuevo",
          notas: notasDetalle,
        },
      ]);
    } catch (err) {
      console.error(err);
    }

    setIsSubmitting(false);
    setFunnelStep(4);
  };

  const handleRegisterDirect = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegSubmitting(true);

    try {
      const fase = registerModal === "universidad" ? "universidad_vida" : "asiste_celula";
      const detalle = registerModal === "universidad" 
        ? "Inscripción en línea para Universidad de la Vida" 
        : "Inscripción en línea para próximo Encuentro";

      await supabase.from("creyentes").insert([
        {
          nombre: regName,
          telefono: regPhone,
          email: regEmail || null,
          sede: "Auditorio Principal",
          estado_discipular: fase,
          notas: detalle,
        },
      ]);
      setRegSuccess(true);
    } catch (err) {
      console.error(err);
    }
    setRegSubmitting(false);
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
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#el-camino-del-discipulo"
              className="rounded-full bg-accent-cream px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-transform duration-300 hover:scale-105 shadow-xl"
            >
              El Camino del Discípulo
            </a>
            <a
              href="#celulas"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md hover:bg-white/20 transition-colors"
            >
              Encontrar una Célula
            </a>
          </div>
        </div>
      </section>

      {/* Las 4 Verdades: "Jesús quiere que..." (Con Imágenes) */}
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
          {FOUR_TRUTHS.map((truth) => (
            <div
              key={truth.number}
              className="group relative rounded-3xl border border-zinc-200/80 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-zinc-900 overflow-hidden">
                  <Image
                    src={truth.image}
                    alt={truth.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-zinc-950/80 px-2.5 py-1 text-[11px] font-black text-amber-200">
                    {truth.number}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold text-zinc-900 leading-snug mb-2">
                    {truth.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {truth.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* El Camino del Discípulo (Visión G12 - Objetivo y Proceso Oficiales) */}
      <section id="el-camino-del-discipulo" className="py-20 px-6 md:px-12 bg-white border-y border-zinc-200/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Escalera del Éxito · Visión G12
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-900 mt-2">
              El Camino del Discípulo
            </h2>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
              El recorrido integral y ordenado para formar el carácter de Cristo y multiplicar el fruto en tu vida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DISCIPLE_STAGES.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="rounded-3xl border border-zinc-200/80 bg-[#F7F7F5] p-7 sm:p-8 flex flex-col justify-between hover:border-zinc-400 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-white shrink-0 shadow-md">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                          Etapa Oficial
                        </span>
                        <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight">
                          {stage.step}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs leading-relaxed">
                      <div className="p-3.5 rounded-xl bg-white border border-zinc-200/60">
                        <span className="font-bold text-zinc-900 block mb-1 uppercase tracking-wider text-[10px] text-amber-800">
                          Objetivo:
                        </span>
                        <p className="text-zinc-600">{stage.objetivo}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-zinc-200/60">
                        <span className="font-bold text-zinc-900 block mb-1 uppercase tracking-wider text-[10px] text-zinc-700">
                          Proceso:
                        </span>
                        <p className="text-zinc-500">{stage.proceso}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bloque Destacado: Universidad de la Vida y Encuentro */}
      <section id="universidad-de-la-vida" className="py-20 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            Formación y Transformación
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-900 mt-2">
            Universidad de la Vida & Encuentro
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            El proceso donde recibes sanidad en tu corazón, afirmas tu fe y experimentas el poder transformador de Dios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tarjeta Universidad de la Vida */}
          <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-900 px-3 py-1 text-[11px] font-bold uppercase tracking-wider mb-4">
                <GraduationCap className="h-4 w-4" />
                Curso de Formación Inicial
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                Universidad de la Vida
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-3 leading-relaxed">
                Nueve semanas diseñadas para capacitarte con principios bíblicos prácticos sobre tu nueva identidad en Cristo, el perdón, la vida devocional y el poder de la Palabra.
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setRegisterModal("universidad"); setRegSuccess(false); }}
              className="mt-6 w-full rounded-full bg-zinc-900 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Inscribirme a Universidad de la Vida
            </button>
          </div>

          {/* Tarjeta Encuentro */}
          <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-900 px-3 py-1 text-[11px] font-bold uppercase tracking-wider mb-4">
                <Heart className="h-4 w-4" />
                Retiro Espiritual de 3 Días
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
                El Encuentro
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-3 leading-relaxed">
                Un fin de semana apartado de la rutina donde experimentarás la gracia de la Cruz, la sanidad de heridas del pasado, la llenura del Espíritu Santo y la preparación para el bautismo.
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setRegisterModal("encuentro"); setRegSuccess(false); }}
              className="mt-6 w-full rounded-full bg-accent-cream py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-amber-200 transition-colors cursor-pointer"
            >
              Apartar mi cupo al Encuentro
            </button>
          </div>
        </div>
      </section>

      {/* Buscador de Célula: Funnel Interactivo "Caminemos Juntos" */}
      <section id="celulas" className="py-20 px-6 md:px-12 max-w-3xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            Grupos y Células en Casa
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-zinc-900 mt-2">
            Caminemos Juntos
          </h2>
          <p className="text-sm text-zinc-500 mt-3 max-w-xl mx-auto leading-relaxed">
            Una célula es un grupo familiar semanal donde compartimos, oramos y aprendemos la Biblia en un ambiente cercano. Selecciona hasta 3 temas de tu interés para conectarte.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 md:p-10 shadow-xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* Paso 1: Escoger hasta 3 temas */}
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
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                    Paso 1 de 3 · Selecciona hasta 3 temas ({selectedTopics.length}/3)
                  </span>
                  <h3 className="text-xl font-bold text-zinc-900 mt-1">
                    ¿Qué áreas te gustaría fortalecer en tu vida?
                  </h3>
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
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                    Paso 2 de 3
                  </span>
                  <h3 className="text-xl font-bold text-zinc-900 mt-1">
                    ¿Cómo conociste la Iglesia?
                  </h3>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-2">
                      ¿Cómo llegaste a Iglesia Iviluz?
                    </label>
                    <select
                      value={howFound}
                      onChange={(e) => setHowFound(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="instagram">Instagram / Redes Sociales</option>
                      <option value="youtube">Transmisión en vivo (YouTube)</option>
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

            {/* Paso 3: Datos de Contacto (Incluye Correo) */}
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
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                    Paso 3 de 3
                  </span>
                  <h3 className="text-xl font-bold text-zinc-900 mt-1">
                    Indícanos tus datos de contacto
                  </h3>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Tu nombre completo"
                      className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Número de Teléfono WhatsApp *
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
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="tucorreo@ejemplo.com"
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
                      placeholder="Ej: Cabudare, Centro, Ruiz Pineda..."
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
                    disabled={isSubmitting || !contactName || !contactPhone || !contactEmail || !contactSector}
                    className="inline-flex items-center gap-2 rounded-full bg-accent-cream px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-zinc-900 hover:text-white disabled:opacity-40 shadow-md cursor-pointer"
                  >
                    {isSubmitting ? "Conectando..." : "Quiero mi Célula"}
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* Paso 4: Confirmación */}
            {funnelStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-8 text-center flex flex-col items-center gap-4"
              >
                <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black uppercase text-zinc-900 tracking-tight">
                  ¡Bienvenido a la Familia Iviluz!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 max-w-md leading-relaxed">
                  Hemos recibido tus datos con éxito. Un líder pastoral de tu zona se comunicará contigo vía WhatsApp para darte la bienvenida e indicarte la célula más cercana.
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

      {/* Modal de Inscripción Directa a Universidad de la Vida o Encuentro */}
      {registerModal && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setRegisterModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer"
            >
              ✕
            </button>

            {regSuccess ? (
              <div className="text-center py-6">
                <div className="h-14 w-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black uppercase text-zinc-900">
                  ¡Inscripción Recibida!
                </h3>
                <p className="text-xs text-zinc-500 mt-2">
                  El equipo pastoral de coordinación te contactará para confirmar fechas y detalles.
                </p>
                <button
                  onClick={() => setRegisterModal(null)}
                  className="mt-6 rounded-full bg-zinc-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterDirect} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                    Inscripción Oficial
                  </span>
                  <h3 className="text-lg font-black uppercase text-zinc-900 mt-0.5">
                    {registerModal === "universidad" ? "Universidad de la Vida" : "Retiro de Encuentro"}
                  </h3>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Tu nombre y apellido"
                    className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Teléfono WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="Ej: 0412-1234567"
                    className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Correo Electrónico (opcional)</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={regSubmitting || !regName || !regPhone}
                  className="w-full mt-2 rounded-xl bg-zinc-900 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 transition-all disabled:opacity-40 cursor-pointer"
                >
                  {regSubmitting ? "Registrando..." : "Completar Registro"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}