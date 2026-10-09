"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  MessageCircle, 
  ArrowLeft 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const COUNSELING_TOPICS = [
  "Orientación Matrimonial y Parejas",
  "Restauración Familiar y Hijos",
  "Duelo, Ansiedad o Crisis Emocional",
  "Crecimiento Espiritual y Discipulado",
  "Finanzas y Decisiones Laborales",
  "Jóvenes y Proyecto de Vida",
  "Otro motivo pastoral",
];

export default function AgendarPage() {
  const [modality, setModality] = useState<"presencial" | "virtual">("presencial");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [preferredDay, setPreferredDay] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F7F5] text-zinc-900 flex flex-col">
      <Header />

      {/* Hero Principal */}
      <section className="pt-36 pb-20 px-6 md:px-12 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-zinc-950/90 to-zinc-950 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-200 mb-6">
            <Calendar className="h-3.5 w-3.5" />
            Cuidado y Orientación Pastoral
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            CONSEJERÍA PASTORAL
          </h1>

          <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            &ldquo;Donde no hay dirección sabia, el pueblo cae; pero en la multitud de consejeros está la victoria.&rdquo;
            <span className="block mt-2 font-bold text-accent-cream text-xs tracking-wider uppercase">
              — Proverbios 11:14
            </span>
          </p>

          <p className="mt-4 text-xs text-zinc-400 max-w-xl mx-auto">
            Un espacio confidencial, libre de juicios, guiado por principios bíblicos y la sabiduría del Espíritu Santo para acompañarte en tu proceso.
          </p>
        </div>
      </section>

      {/* Formulario de Agendamiento */}
      <section className="py-16 px-6 md:px-12 max-w-3xl mx-auto w-full flex-grow">
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-xl">
          
          {isSent ? (
            <div className="py-12 text-center flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 mt-2">
                ¡Solicitud de cita recibida!
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-md leading-relaxed">
                El equipo pastoral revisará tu solicitud y se comunicará contigo vía WhatsApp en las próximas 24 horas para confirmar la fecha, hora y modalidad definitiva de tu cita.
              </p>
              
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="rounded-full bg-zinc-900 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Agendar otra cita
                </button>
                <Link
                  href="/"
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-7 py-3 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:bg-zinc-100 transition-colors"
                >
                  Volver al Inicio
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                  Agenda tu sesión
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900 mt-1">
                  Paso 1: Elige la Modalidad
                </h2>
              </div>

              {/* Selector Presencial / Virtual */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setModality("presencial")}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    modality === "presencial"
                      ? "bg-zinc-900 text-white border-zinc-900 shadow-lg"
                      : "bg-[#F7F7F5] text-zinc-800 border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <MapPin className={`h-6 w-6 ${modality === "presencial" ? "text-amber-300" : "text-zinc-600"}`} />
                    {modality === "presencial" && <CheckCircle2 className="h-4 w-4 text-amber-300" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wide">
                      Presencial en Sede Central
                    </h3>
                    <p className={`text-xs mt-1 ${modality === "presencial" ? "text-zinc-300" : "text-zinc-500"}`}>
                      Calle 47, Barquisimeto. En oficinas pastorales privadas.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setModality("virtual")}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    modality === "virtual"
                      ? "bg-zinc-900 text-white border-zinc-900 shadow-lg"
                      : "bg-[#F7F7F5] text-zinc-800 border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Video className={`h-6 w-6 ${modality === "virtual" ? "text-amber-300" : "text-zinc-600"}`} />
                    {modality === "virtual" && <CheckCircle2 className="h-4 w-4 text-amber-300" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wide">
                      Virtual (Meet o WhatsApp)
                    </h3>
                    <p className={`text-xs mt-1 ${modality === "virtual" ? "text-zinc-300" : "text-zinc-500"}`}>
                      Para personas fuera de Barquisimeto o con dificultad de traslado.
                    </p>
                  </div>
                </button>
              </div>

              {/* Datos Personales */}
              <div className="pt-2 border-t border-zinc-100 flex flex-col gap-4">
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                  Paso 2: Información de Contacto
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Tu nombre completo"
                      className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      WhatsApp para contacto *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej: 0412-1234567"
                      className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                  />
                </div>
              </div>

              {/* Motivo y Preferencias de Horario */}
              <div className="pt-2 border-t border-zinc-100 flex flex-col gap-4">
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                  Paso 3: Detalles de la Cita
                </h3>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Área o Motivo Principal *
                  </label>
                  <select
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                  >
                    <option value="">Selecciona el motivo</option>
                    {COUNSELING_TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Día de preferencia
                    </label>
                    <select
                      value={preferredDay}
                      onChange={(e) => setPreferredDay(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                    >
                      <option value="">Cualquier día de la semana</option>
                      <option value="martes">Martes</option>
                      <option value="miercoles">Miércoles</option>
                      <option value="jueves">Jueves</option>
                      <option value="viernes">Viernes</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Franja horaria preferida
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                    >
                      <option value="">Cualquier horario</option>
                      <option value="manana">Mañanas (9:00 AM - 12:00 PM)</option>
                      <option value="tarde">Tardes (2:00 PM - 5:30 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Comentario adicional o breve resumen
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Escribe brevemente cualquier detalle importante que desees que los pastores conozcan antes de la cita..."
                    className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white leading-relaxed"
                  />
                </div>
              </div>

              {/* Botón de Envío */}
              <button
                type="submit"
                disabled={isSubmitting || !fullName || !phone || !email || !topic}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-accent-cream py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-zinc-900 hover:text-white transition-all disabled:opacity-40 shadow-md cursor-pointer"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Enviando solicitud..." : "Solicitar Cita de Consejería"}
              </button>

            </form>
          )}

        </div>

        {/* Banner de Ayuda Inmediata */}
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900">
                ¿Necesitas orientación bíblica ahora mismo?
              </h4>
              <p className="text-[11px] text-zinc-500">
                Puedes conversar con nuestro asistente pastoral en línea las 24 horas del día.
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="shrink-0 rounded-full bg-zinc-900 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-zinc-800 transition-colors"
          >
            Ir al Chat Pastoral
          </Link>
        </div>

        {/* Nota de Confidencialidad */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-400 text-center">
          <ShieldCheck className="h-4 w-4 text-zinc-500" />
          <span>Toda la información es estrictamente confidencial bajo sigilo pastoral.</span>
        </div>

      </section>

      <Footer />
    </div>
  );
}