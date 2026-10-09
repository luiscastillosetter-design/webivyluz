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
  HeartHandshake 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Ministry {
  id: string;
  name: string;
  category: string;
  desc: string;
  icon: typeof Sparkles;
  image: string;
}

const MINISTRIES_DATA: Ministry[] = [
  {
    id: "somos-luz",
    name: "Somos Luz (Jóvenes)",
    category: "Generación de Relevo",
    desc: "Un movimiento apasionado de jóvenes y adolescentes que llevan la luz de Cristo a sus colegios, universidades y calles.",
    icon: Sparkles,
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_3_3849938668644071469.webp",
  },
  {
    id: "ivikids",
    name: "Ivikids (Infantil)",
    category: "Próximas Generaciones",
    desc: "Un ambiente seguro, dinámico y lleno del amor de Dios donde los niños aprenden principios bíblicos prácticos para sus vidas.",
    icon: Smile,
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_2_3849938664567168038.webp",
  },
  {
    id: "alabanza",
    name: "Alabanza y Artes",
    category: "Adoración Congregacional",
    desc: "Músicos, cantantes y servidores consagrados que guían a la congregación a experimentar la presencia manifiesta del Señor.",
    icon: Music,
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_1_3849938660733597282.webp",
  },
  {
    id: "medios-protocolo",
    name: "Medios y Protocolo",
    category: "Excelencia y Transmisión",
    desc: "Cámaras, pantallas, sonido, redes sociales y anfitriones dedicados a hacer de cada servicio una experiencia inolvidable.",
    icon: Video,
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_4_3849938680899805073.webp",
  },
];

export default function MinisteriosPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedMinistry, setSelectedMinistry] = useState("");
  const [skills, setSkills] = useState("");
  const [isServing, setIsServing] = useState(false);
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
            <Users className="h-3.5 w-3.5" />
            Cuerpo de Cristo en Acción
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            NUESTROS MINISTERIOS
          </h1>

          <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Cada área de servicio existe para formar discípulos y extender la luz del Evangelio en cada etapa de la vida.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#quiero-servir"
              className="rounded-full bg-accent-cream px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-white hover:scale-105 transition-all shadow-xl cursor-pointer"
            >
              Quiero Ser Voluntario
            </a>
          </div>
        </div>
      </section>

      {/* Catálogo de Ministerios */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            Espacios de Formación
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-900 mt-2">
            Encuentra tu lugar para crecer
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MINISTRIES_DATA.map((ministry) => {
            const Icon = ministry.icon;
            return (
              <div
                key={ministry.id}
                className="group rounded-3xl border border-zinc-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full bg-zinc-900 overflow-hidden">
                    <Image
                      src={ministry.image}
                      alt={ministry.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-accent-cream text-zinc-950 flex items-center justify-center shadow-lg">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 block">
                          {ministry.category}
                        </span>
                        <h3 className="text-lg font-black uppercase text-white tracking-tight">
                          {ministry.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {ministry.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href="#quiero-servir"
                    onClick={() => setSelectedMinistry(ministry.name)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 hover:text-zinc-900 transition-colors"
                  >
                    Servir en este ministerio
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Formulario "Quiero Servir" */}
      <section id="quiero-servir" className="py-16 px-6 md:px-12 max-w-3xl mx-auto w-full flex-grow">
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-xl">
          
          {isSent ? (
            <div className="py-12 text-center flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 mt-2">
                ¡Gracias por tu disposición a servir!
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-md leading-relaxed">
                Hemos recibido tu postulación. El líder de este ministerio se comunicará contigo vía WhatsApp para invitarte a la siguiente reunión de equipo.
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
                <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900 mt-1">
                  Quiero Servir: Mis Talentos en Acción
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  &ldquo;Cada uno ponga al servicio de los demás el don que ha recibido.&rdquo; (1 Pedro 4:10)
                </p>
              </div>

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

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  ¿En qué ministerio te gustaría integrarte? *
                </label>
                <select
                  required
                  value={selectedMinistry}
                  onChange={(e) => setSelectedMinistry(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                >
                  <option value="">Selecciona un área</option>
                  {MINISTRIES_DATA.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                  <option value="Buena Voluntad">Buena Voluntad (Acción Social)</option>
                  <option value="Intercesión">Equipo de Intercesión y Oración</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  Cuéntanos tus talentos, experiencia o por qué deseas servir *
                </label>
                <textarea
                  required
                  rows={3}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Ej: Toco la guitarra, tengo experiencia cuidando niños, sé manejar cámaras, me gusta recibir a la gente..."
                  className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !fullName || !phone || !selectedMinistry || !skills}
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