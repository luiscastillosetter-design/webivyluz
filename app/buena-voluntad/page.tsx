"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Heart, 
  Utensils, 
  Shirt, 
  Stethoscope, 
  Users2, 
  MessageCircle, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  HandHeart 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CAUSES = [
  {
    title: "Alimentación Solidaria",
    desc: "Bolsas de alimentos no perecederos y jornadas de alimentación para familias vulnerables y comedores comunitarios.",
    icon: Utensils,
  },
  {
    title: "Ropa y Calzado",
    desc: "Recolección y entrega de prendas de vestir y calzado en óptimas condiciones para niños, jóvenes y adultos mayores.",
    icon: Shirt,
  },
  {
    title: "Salud y Medicinas",
    desc: "Banco de medicamentos esenciales, insumos médicos y jornadas de atención primaria para personas de bajos recursos.",
    icon: Stethoscope,
  },
  {
    title: "Acompañamiento Familiar",
    desc: "Visitas pastorales, soporte emocional y atención integral a madres solteras, abuelos y niños en situaciones de riesgo.",
    icon: Users2,
  },
];

export default function BuenaVoluntadPage() {
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [donationType, setDonationType] = useState("");
  const [details, setDetails] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F7F5] text-zinc-900 flex flex-col">
      <Header />

      {/* Hero Buena Voluntad */}
      <section className="pt-36 pb-20 px-6 md:px-12 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-zinc-950/90 to-zinc-950 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-200 mb-6">
            <Heart className="h-3.5 w-3.5 fill-current" />
            Brazo Social · Iglesia Iviluz
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            BUENA VOLUNTAD
          </h1>

          <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Nuestra misión es extender el amor de Jesús de forma tangible a las comunidades más vulnerables de Barquisimeto y el estado Lara.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#donar-especie"
              className="rounded-full bg-accent-cream px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-transform duration-300 hover:scale-105 shadow-xl cursor-pointer"
            >
              Coordinar Donación
            </a>
            <Link
              href="/dar"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md hover:bg-white/20 transition-colors"
            >
              Donar Fondos
            </Link>
          </div>
        </div>
      </section>

      {/* Áreas de Impacto */}
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            Amor en Acción
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-900 mt-2">
            Nuestras Áreas de Ayuda
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            Cada aporte llega directamente a las manos de quienes más lo necesitan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAUSES.map((cause) => {
            const Icon = cause.icon;
            return (
              <div
                key={cause.title}
                className="rounded-3xl border border-zinc-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-800 mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 leading-snug mb-3">
                    {cause.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {cause.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Formulario / Contacto con el Coordinador de Buena Voluntad */}
      <section id="donar-especie" className="py-16 px-6 md:px-12 max-w-3xl mx-auto w-full">
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-xl">
          
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Coordinación Directa
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 mt-1">
              Contactar al Coordinador
            </h2>
            <p className="text-xs text-zinc-500 mt-2 max-w-lg mx-auto">
              Si tienes ropa, alimentos, medicinas o deseas poner tus manos al servicio del programa, completa tus datos y nuestro equipo se comunicará contigo.
            </p>
          </div>

          {isSent ? (
            <div className="py-8 text-center flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black uppercase text-zinc-900 tracking-tight">
                ¡Gracias por tu corazón generoso!
              </h3>
              <p className="text-xs text-zinc-500 max-w-md leading-relaxed">
                El coordinador de Buena Voluntad se pondrá en contacto contigo muy pronto para acordar los detalles de entrega o recepción.
              </p>
              <button
                type="button"
                onClick={() => setIsSent(false)}
                className="mt-4 rounded-full bg-zinc-900 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 transition-colors"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Ej: 0412-1234567"
                    className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  ¿Qué tipo de donación o apoyo deseas coordinar? *
                </label>
                <select
                  required
                  value={donationType}
                  onChange={(e) => setDonationType(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="alimentos">Alimentos no perecederos / Insumos de cocina</option>
                  <option value="ropa">Ropa, calzado y cobijas</option>
                  <option value="medicinas">Medicamentos e insumos de salud</option>
                  <option value="voluntariado">Deseo ser voluntario en las jornadas</option>
                  <option value="otro">Otro tipo de donación</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  Detalles adicionales de tu donación
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Cuéntanos brevemente qué tienes disponible o en qué zona te encuentras..."
                  className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={!contactName || !contactPhone || !donationType}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-accent-cream py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-zinc-900 hover:text-white disabled:opacity-40 shadow-md cursor-pointer"
              >
                <HandHeart className="h-4 w-4" />
                Contactar a Coordinación
              </button>

            </form>
          )}

        </div>
      </section>

      {/* Centro de Acopio Físico */}
      <section className="bg-white border-t border-zinc-200/60 py-12 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-3">
          <MapPin className="h-5 w-5 text-amber-800" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
            Centro de Acopio Principal
          </h4>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Calle 47 entre avenidas 19 y 20, sector oeste, Barquisimeto, Lara.
            <br />
            Recepción de donaciones: Domingos de 8:00 AM a 12:00 PM y Miércoles de 5:00 PM a 7:30 PM.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}