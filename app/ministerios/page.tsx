"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  Music, 
  Video, 
  Users, 
  Smile, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  HeartHandshake,
  ShieldCheck,
  CheckSquare
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Las 4 Redes Generacionales Oficiales dictadas por el Pastor
const GENERATIONAL_MINISTRIES = [
  {
    id: "iviluz-kids",
    name: "Iviluz Kids",
    subtitle: "Ministerio Infantil",
    desc: "Un ambiente seguro, dinámico y lleno del amor de Dios donde los niños son formados con principios bíblicos que guardarán para siempre.",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_2_3849938664567168038.webp",
  },
  {
    id: "iviluz-teens",
    name: "Iviluz Teens",
    subtitle: "Adolescentes",
    desc: "Acompañamiento pastoral, amistades sanas y principios firmes para que los adolescentes descubran su identidad y propósito en Jesús.",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_5_3849938684112643248.webp",
  },
  {
    id: "somos-luz",
    name: "Somos Luz",
    subtitle: "Ministerio de Jóvenes",
    desc: "Jóvenes y universitarios apasionados por Dios, llamados a marcar la diferencia en sus familias, aulas de estudio y lugares de trabajo.",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_3_3849938668644071469.webp",
  },
  {
    id: "adultos",
    name: "Ministerio de Adultos",
    subtitle: "Familias & Matrimonios",
    desc: "Discipulado y contención bíblica para consolidar hogares bendecidos, matrimonios en armonía y hombres y mujeres líderes de bendición.",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_6_3849938690672513949.webp",
  },
];

// Equipos de Servicio al Señor
const SERVICE_TEAMS = [
  {
    id: "alabanza",
    name: "Alabanza y Artes",
    category: "Adoración Congregacional",
    desc: "Músicos, cantantes y adoradores consagrados a crear una atmósfera donde el Espíritu Santo ministre vidas en cada reunión.",
    icon: Music,
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_1_3849938660733597282.webp",
  },
  {
    id: "medios-protocolo",
    name: "Medios y Protocolo",
    category: "Transmisión y Hospitalidad",
    desc: "Cámaras, pantallas, sonido, redes sociales y anfitriones dedicados a hacer de cada servicio una experiencia de excelencia.",
    icon: Video,
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_4_3849938680899805073.webp",
  },
  {
    id: "buena-voluntad",
    name: "Buena Voluntad",
    category: "Acción Social",
    desc: "Brazo solidario de la iglesia que lleva alimentos, ropa y medicinas a las familias más vulnerables de Barquisimeto.",
    icon: HeartHandshake,
    image: "/media/iglesiaiviluz_20230730_p_3158569479712310690_1_3158569472179525100.webp",
  },
  {
    id: "intercesion",
    name: "Equipo de Intercesión",
    category: "Oración Continua",
    desc: "Intercesores que sostienen espiritualmente las peticiones congregacionales, familias y los servicios en clamor constante.",
    icon: Sparkles,
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_4_3849938680899805073.webp",
  },
];

export default function MinisteriosPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [skills, setSkills] = useState("");
  // Requisitos espirituales pedidos por el Pastor
  const [stepsCompleted, setStepsCompleted] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const toggleStep = (step: string) => {
    setStepsCompleted((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulación lista para Supabase en Tarea 3
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
            <Users className="h-3.5 w-3.5" />
            Cuerpo de Cristo en Barquisimeto
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            NUESTROS MINISTERIOS
          </h1>

          <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Una casa donde cada generación tiene su lugar de formación, crecimiento y servicio al Señor.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#quiero-servir"
              className="rounded-full bg-accent-cream px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-white hover:scale-105 transition-all shadow-xl cursor-pointer"
            >
              Quiero Servir: Mis Talentos
            </a>
          </div>
        </div>
      </section>

      {/* 1. Redes Generacionales (Niños, Teens, Jóvenes, Adultos) */}
      <section id="generacionales" className="py-20 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            Cada Etapa de la Vida
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-900 mt-2">
            Redes Generacionales
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            Espacios adaptados para discipular y formar a toda la familia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GENERATIONAL_MINISTRIES.map((m) => (
            <div
              key={m.id}
              className="group rounded-3xl border border-zinc-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full bg-zinc-900 overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 block">
                      {m.subtitle}
                    </span>
                    <h3 className="text-xl font-black uppercase text-white tracking-tight">
                      {m.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Áreas de Servicio Eclesiástico */}
      <section className="py-20 px-6 md:px-12 bg-white border-y border-zinc-200/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
              Servicio con Excelencia
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-900 mt-2">
              Equipos de Servicio
            </h2>
            <p className="text-sm text-zinc-500 mt-2">
              Poniendo nuestros dones al servicio de la iglesia y la ciudad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_TEAMS.map((team) => {
              const Icon = team.icon;
              return (
                <div
                  key={team.id}
                  className="rounded-3xl border border-zinc-200/80 bg-[#F7F7F5] p-6 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-white mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                      {team.category}
                    </span>
                    <h3 className="text-lg font-black uppercase text-zinc-900 tracking-tight mb-2">
                      {team.name}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {team.desc}
                    </p>
                  </div>

                  <div className="pt-6">
                    <a
                      href="#quiero-servir"
                      onClick={() => setSelectedArea(team.name)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-amber-800 transition-colors"
                    >
                      Servir aquí
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Formulario "Quiero Servir: Mis Talentos en Acción" */}
      <section id="quiero-servir" className="py-20 px-6 md:px-12 max-w-3xl mx-auto w-full">
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-xl">
          
          {isSent ? (
            <div className="py-12 text-center flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 mt-2">
                ¡Postulación Recibida!
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-md leading-relaxed">
                Gracias por tu disposición a servir. El coordinador del área se comunicará contigo vía WhatsApp para acordar los pasos de inducción.
              </p>
              
              <Link
                href="/"
                className="mt-6 rounded-full bg-zinc-900 px-8 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 transition-colors"
              >
                Volver al Inicio
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                  Voluntariado Iviluz
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 mt-1">
                  Quiero Servir: Mis Talentos al Servicio de Dios
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  &ldquo;Cada uno según el don que ha recibido, minístrelo a los otros.&rdquo; (1 Pedro 4:10)
                </p>
              </div>

              {/* Datos Personales */}
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
                    Teléfono WhatsApp *
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

              {/* Selección del Área */}
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  ¿En qué ministerio o equipo deseas servir? *
                </label>
                <select
                  required
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                >
                  <option value="">Selecciona un área</option>
                  <option value="Iviluz Kids">Iviluz Kids (Maestros y Cuidado de Niños)</option>
                  <option value="Iviluz Teens">Iviluz Teens (Liderazgo de Adolescentes)</option>
                  <option value="Somos Luz">Somos Luz (Equipo de Jóvenes)</option>
                  <option value="Ministerio de Adultos">Ministerio de Adultos y Familias</option>
                  <option value="Alabanza y Artes">Alabanza y Artes (Música, Canto, Danza)</option>
                  <option value="Medios y Protocolo">Medios y Protocolo (Cámaras, Sonido, Anfitriones)</option>
                  <option value="Buena Voluntad">Buena Voluntad (Acción Social y Donaciones)</option>
                  <option value="Intercesión">Equipo de Intercesión y Oración</option>
                </select>
              </div>

              {/* Pasos Espirituales Completados (Requisito pedido por el Pastor) */}
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-2">
                  ¿Cuáles de estos pasos de formación ya has realizado en la iglesia?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    "Retiro de Encuentro con Dios",
                    "Paso público al Bautismo",
                    "Universidad de la Vida",
                    "Escuela de Líderes / Capacitación Destino",
                  ].map((step) => {
                    const checked = stepsCompleted.includes(step);
                    return (
                      <button
                        key={step}
                        type="button"
                        onClick={() => toggleStep(step)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left flex items-center justify-between transition-colors cursor-pointer ${
                          checked
                            ? "bg-zinc-900 text-white border-zinc-900"
                            : "bg-[#F7F7F5] text-zinc-700 border-zinc-200 hover:border-zinc-400"
                        }`}
                      >
                        <span>{step}</span>
                        {checked && <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Talentos / Experiencia */}
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  Cuéntanos tus talentos, habilidades o por qué deseas servir *
                </label>
                <textarea
                  required
                  rows={3}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Ej: Toco algún instrumento, tengo experiencia con niños, manejo diseño o redes, me gusta atender a las personas..."
                  className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !fullName || !phone || !selectedArea || !skills}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-accent-cream py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-zinc-900 hover:text-white transition-all disabled:opacity-40 shadow-md cursor-pointer"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Enviando postulación..." : "Postularme al Ministerio"}
              </button>

            </form>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}