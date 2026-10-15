"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  HeartHandshake, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const PRAYER_TYPES = [
  "Salud y Sanidad Física",
  "Restauración Familiar y Matrimonial",
  "Finanzas, Empleo y Provisión",
  "Paz Mental, Duelo o Ansiedad",
  "Salvación de un Familiar o Amigo",
  "Crecimiento Espiritual y Dirección",
  "Protección y Liberación",
  "Otro motivo de oración",
];

export default function OracionPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Venezuela");
  const [city, setCity] = useState("Barquisimeto");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [prayerType, setPrayerType] = useState("");
  const [requestText, setRequestText] = useState("");
  const [isConfidential, setIsConfidential] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const notasCompletas = `PETICIÓN DE ORACIÓN [${prayerType}] | Ciudad: ${city}, ${country} | Género: ${gender || "N/A"} | Edo Civil: ${maritalStatus || "N/A"} | F.Nac: ${birthDate || "N/A"} | Detalle: ${requestText}`;

      await supabase.from("creyentes").insert([
        {
          nombre: fullName,
          telefono: phone || "Sin teléfono",
          email: email || null,
          sector_direccion: `${city}, ${country}`,
          sede: "Auditorio Principal",
          estado_discipular: "nuevo",
          peticion_oracion: requestText,
          notas: notasCompletas,
        },
      ]);
    } catch (err) {
      console.error(err);
    }

    setIsSubmitting(false);
    setIsSent(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F7F5] text-zinc-900 flex flex-col">
      <Header />

      {/* Cabecera Inspiracional */}
      <section className="pt-36 pb-20 px-6 md:px-12 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-zinc-950/90 to-zinc-950 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-200 mb-6">
            <HeartHandshake className="h-3.5 w-3.5" />
            Equipo de Intercesión Iviluz
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            ORAMOS POR TI
          </h1>

          <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            &ldquo;No se preocupen por nada; en cambio, oren por todo. Díganle a Dios lo que necesitan y denle gracias por todo lo que él ha hecho.&rdquo;
            <span className="block mt-2 font-bold text-accent-cream text-xs tracking-wider uppercase">
              — Filipenses 4:6 (TLA)
            </span>
          </p>
        </div>
      </section>

      {/* Formulario de Petición Conectado a Supabase */}
      <section className="py-16 px-6 md:px-12 max-w-3xl mx-auto w-full flex-grow">
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-xl">
          
          {isSent ? (
            <div className="py-12 text-center flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 mt-2">
                ¡Tu petición ha sido recibida!
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-md leading-relaxed">
                Nuestro equipo pastoral de intercesores ya tiene tu motivo en oración delante del Señor. Creemos firmemente que Dios tiene una respuesta de paz para tu vida y tu familia.
              </p>
              
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="rounded-full bg-zinc-900 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Enviar otra petición
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
                  Formulario Confidencial
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900 mt-1">
                  Déjanos tu Motivo de Oración
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Todos los datos son tratados con estricta reserva pastoral.
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
                    WhatsApp de Contacto *
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

              {/* Correo y Ubicación */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Correo Electrónico (opcional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Ciudad / Sector
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ej: Barquisimeto, Cabudare..."
                    className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                  />
                </div>
              </div>

              {/* Sexo, Estado Civil y Fecha de Nacimiento */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Sexo
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                  >
                    <option value="">Seleccionar</option>
                    <option value="femenino">Femenino</option>
                    <option value="masculino">Masculino</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Estado Civil
                  </label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                  >
                    <option value="">Seleccionar</option>
                    <option value="soltero">Soltero(a)</option>
                    <option value="casado">Casado(a)</option>
                    <option value="union_libre">Unión Libre</option>
                    <option value="divorciado">Divorciado(a)</option>
                    <option value="viudo">Viudo(a)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white"
                  />
                </div>
              </div>

              {/* Tipo de Petición */}
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  Área de tu Petición *
                </label>
                <select
                  required
                  value={prayerType}
                  onChange={(e) => setPrayerType(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white font-bold"
                >
                  <option value="">Selecciona el área de tu necesidad</option>
                  {PRAYER_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Detalle */}
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  Describe tu Petición de Oración *
                </label>
                <textarea
                  required
                  rows={4}
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  placeholder="Cuéntanos tu motivo con toda libertad para que podamos interceder específicamente por ti..."
                  className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-3 text-xs text-zinc-800 outline-none focus:border-zinc-900 focus:bg-white leading-relaxed"
                />
              </div>

              {/* Confidencialidad */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="confidential"
                  checked={isConfidential}
                  onChange={(e) => setIsConfidential(e.target.checked)}
                  className="h-4 w-4 rounded accent-zinc-900 cursor-pointer"
                />
                <label htmlFor="confidential" className="text-xs text-zinc-600 cursor-pointer">
                  Acepto compartir esta información de forma confidencial con el equipo pastoral de intercesión.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !fullName || !phone || !requestText || !prayerType}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-accent-cream py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-zinc-900 hover:text-white disabled:opacity-40 shadow-md cursor-pointer"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Enviando al equipo..." : "Presentar mi Petición"}
              </button>

            </form>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}