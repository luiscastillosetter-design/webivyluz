"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Heart, 
  Copy, 
  Check, 
  Building2, 
  Smartphone, 
  Coins, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DarPage() {
  const [activeTab, setActiveTab] = useState<"nacional" | "zelle" | "binance">("nacional");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F7F5] text-zinc-900 flex flex-col">
      <Header />

      {/* Cabecera Inspiracional */}
      <section className="pt-36 pb-16 px-6 md:px-12 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-zinc-950 to-zinc-950 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-200 mb-6">
            Generosidad y Gratitud
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            OFRENDAS Y DIEZMOS
          </h1>
          <p className="mt-5 text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            &ldquo;Cada uno debe dar según lo que haya decidido en su corazón, no con tristeza ni por obligación, porque Dios ama al que da con alegría.&rdquo;
            <span className="block mt-2 font-bold text-accent-cream text-xs tracking-wider uppercase">
              — 2 Corintios 9:7 (TLA)
            </span>
          </p>
        </div>
      </section>

      {/* Contenedor Principal de Métodos de Donación */}
      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto w-full flex-grow">
        
        {/* Selector de Pestañas */}
        <div className="grid grid-cols-3 gap-2.5 p-1.5 rounded-2xl bg-zinc-200/70 mb-10 max-w-xl mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab("nacional")}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "nacional"
                ? "bg-white text-zinc-950 shadow-md"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <Building2 className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Bancos Nacionales</span>
            <span className="sm:hidden">Bolívares</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("zelle")}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "zelle"
                ? "bg-white text-zinc-950 shadow-md"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <Smartphone className="h-4 w-4 shrink-0" />
            <span>Zelle (USD)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("binance")}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "binance"
                ? "bg-white text-zinc-950 shadow-md"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <Coins className="h-4 w-4 shrink-0" />
            <span>Binance / USDT</span>
          </button>
        </div>

        {/* Contenido: Bancos Nacionales */}
        {activeTab === "nacional" && (
          <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-lg">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Venezuela · Cuentas Oficiales
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900 mt-1">
                Transferencia y Pago Móvil
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Haz clic en cualquier dato para copiarlo automáticamente al portapapeles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Tarjeta Cuenta Corriente */}
              <div className="rounded-2xl border border-zinc-100 bg-[#F7F7F5] p-5 flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Cuenta Bancaria Corriente
                  </span>
                  <p className="text-sm font-bold text-zinc-900">Banco Provincial</p>
                  <p className="text-xs text-zinc-600 mt-1">Titular: Iglesia Iviluz</p>
                  <p className="text-xs font-mono text-zinc-800 mt-2 bg-white px-3 py-2 rounded-lg border border-zinc-200 select-all">
                    0108-0000-00-0000000000
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("01080000000000000000", "provincial")}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {copiedKey === "provincial" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-amber-300" />
                      ¡Cuenta Copiada!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copiar Número de Cuenta
                    </>
                  )}
                </button>
              </div>

              {/* Tarjeta Pago Móvil */}
              <div className="rounded-2xl border border-zinc-100 bg-[#F7F7F5] p-5 flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Pago Móvil Interbancario
                  </span>
                  <p className="text-sm font-bold text-zinc-900">Banco Provincial (0108)</p>
                  <div className="mt-2 flex flex-col gap-1.5 text-xs text-zinc-700">
                    <div className="flex justify-between bg-white px-3 py-1.5 rounded-lg border border-zinc-200">
                      <span className="text-zinc-500">RIF:</span>
                      <span className="font-mono font-bold">J-29402194-8</span>
                    </div>
                    <div className="flex justify-between bg-white px-3 py-1.5 rounded-lg border border-zinc-200">
                      <span className="text-zinc-500">Teléfono:</span>
                      <span className="font-mono font-bold">0414-0000000</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("J294021948", "rif")}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {copiedKey === "rif" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-amber-300" />
                      ¡RIF Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copiar Datos de Pago Móvil
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Contenido: Zelle */}
        {activeTab === "zelle" && (
          <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-lg">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Internacional / Estados Unidos
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900 mt-1">
                Ofrendas vía Zelle
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Puedes realizar tu aporte directamente desde tu aplicación bancaria estadounidense.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-100 bg-[#F7F7F5] p-6 max-w-lg mx-auto w-full text-center flex flex-col items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xl">
                Z
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Correo Electrónico Registrado en Zelle
                </span>
                <p className="text-base sm:text-lg font-mono font-bold text-zinc-900 bg-white px-4 py-2 rounded-xl border border-zinc-200 select-all">
                  iviluzchurch@gmail.com
                </p>
                <p className="text-xs text-zinc-500 mt-2">
                  Titular: Iglesia Iviluz
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopy("iviluzchurch@gmail.com", "zelle")}
                className="flex items-center justify-center gap-2 w-full max-w-xs py-3 rounded-xl bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {copiedKey === "zelle" ? (
                  <>
                    <Check className="h-4 w-4 text-amber-300" />
                    ¡Correo Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copiar Correo de Zelle
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Contenido: Binance Pay / USDT */}
        {activeTab === "binance" && (
          <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-lg">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Criptoactivos Globales
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900 mt-1">
                Binance Pay y USDT
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Envía tus diezmos u ofrendas sin comisiones intermedias a través del ecosistema Binance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Binance Pay ID */}
              <div className="rounded-2xl border border-zinc-100 bg-[#F7F7F5] p-5 flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Binance Pay ID (Cero Comisión)
                  </span>
                  <p className="text-sm font-bold text-zinc-900">Identificador Oficial</p>
                  <p className="text-xs font-mono font-bold text-zinc-900 mt-2 bg-white px-3 py-2 rounded-lg border border-zinc-200 select-all">
                    800294021
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("800294021", "payid")}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {copiedKey === "payid" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-amber-300" />
                      ¡ID Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copiar Pay ID
                    </>
                  )}
                </button>
              </div>

              {/* Billetera USDT TRC20 */}
              <div className="rounded-2xl border border-zinc-100 bg-[#F7F7F5] p-5 flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Red USDT (TRC-20)
                  </span>
                  <p className="text-sm font-bold text-zinc-900">Dirección de Billetera</p>
                  <p className="text-[11px] font-mono text-zinc-700 mt-2 bg-white px-3 py-2 rounded-lg border border-zinc-200 truncate select-all">
                    TYD9xK8...LzQp2M4x91
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("TYD9xK8IviluzChurchOficialLzQp2M4x91", "trc20")}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {copiedKey === "trc20" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-amber-300" />
                      ¡Dirección Copiada!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copiar Billetera TRC-20
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Tarjeta de Destino a Acción Social: Buena Voluntad */}
        <div className="mt-12 rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
              <Heart className="h-6 w-6 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">
                ¿Deseas apoyar a familias vulnerables?
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Conoce <strong>Buena Voluntad</strong>, el brazo de acción social y ayuda comunitaria de Iglesia Iviluz.
              </p>
            </div>
          </div>
          <Link
            href="/buena-voluntad"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Ver Buena Voluntad
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Nota de Transparencia */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-400 text-center">
          <ShieldCheck className="h-4 w-4 text-zinc-500" />
          <span>Todas las donaciones son administradas con estricta mayordomía y transparencia.</span>
        </div>

      </section>

      <Footer />
    </div>
  );
}