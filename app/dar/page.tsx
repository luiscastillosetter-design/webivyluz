"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Heart, 
  Copy, 
  Check, 
  Building2, 
  Smartphone, 
  Globe2, 
  Coins, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";

interface BankAccounts {
  bankName: string;
  accountNumber: string;
  rif: string;
  pagoMovilPhone: string;
  zelleEmail: string;
  zelleHolder: string;
  binancePayId: string;
  usdtWallet: string;
}

const DEFAULT_ACCOUNTS: BankAccounts = {
  bankName: "Banco Provincial (0108)",
  accountNumber: "0108-0000-00-0000000000",
  rif: "J-29402194-8",
  pagoMovilPhone: "0414-0000000",
  zelleEmail: "donaciones@iglesiaiviluz.com",
  zelleHolder: "Iglesia Iviluz Oficial",
  binancePayId: "800294021",
  usdtWallet: "TLvxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
};

export default function DarPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<BankAccounts>(DEFAULT_ACCOUNTS);

  useEffect(() => {
    async function fetchDonaciones() {
      try {
        const query = `*[_type == "donacion"][0] {
          bankName,
          accountNumber,
          rif,
          pagoMovilPhone,
          zelleEmail,
          zelleHolder,
          binancePayId,
          usdtWallet
        }`;
        const data = await client.fetch(query);
        if (data) {
          setAccounts({
            bankName: data.bankName || DEFAULT_ACCOUNTS.bankName,
            accountNumber: data.accountNumber || DEFAULT_ACCOUNTS.accountNumber,
            rif: data.rif || DEFAULT_ACCOUNTS.rif,
            pagoMovilPhone: data.pagoMovilPhone || DEFAULT_ACCOUNTS.pagoMovilPhone,
            zelleEmail: data.zelleEmail || DEFAULT_ACCOUNTS.zelleEmail,
            zelleHolder: data.zelleHolder || DEFAULT_ACCOUNTS.zelleHolder,
            binancePayId: data.binancePayId || DEFAULT_ACCOUNTS.binancePayId,
            usdtWallet: data.usdtWallet || DEFAULT_ACCOUNTS.usdtWallet,
          });
        }
      } catch (err) {
        console.warn("Usando cuentas bancarias predeterminadas:", err);
      }
    }

    fetchDonaciones();
  }, []);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F7F5] text-zinc-900 flex flex-col">
      <Header />

      {/* Hero Principal */}
      <section className="pt-36 pb-20 px-6 md:px-12 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-zinc-950/90 to-zinc-950 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-200 mb-6">
            <Heart className="h-3.5 w-3.5 fill-current" />
            Generosidad que Transforma
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            DAR Y DIEZMAR
          </h1>

          <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            &ldquo;Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.&rdquo;
            <span className="block mt-2 font-bold text-accent-cream text-xs tracking-wider uppercase">
              — 2 Corintios 9:7
            </span>
          </p>
        </div>
      </section>

      {/* Métodos de Donación */}
      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto w-full flex-grow">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            Canales Habilitados
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-900 mt-2">
            Cuentas Oficiales de la Casa
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2">
            Haz clic en cualquier dato para copiarlo directamente a tu portapapeles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Transferencia Nacional */}
          <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Venezuela · Bolívares
                  </span>
                  <h3 className="text-lg font-black uppercase text-zinc-900 tracking-tight">
                    Transferencia Bancaria
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-zinc-400 block text-[11px]">Banco:</span>
                  <span className="font-bold text-zinc-800">{accounts.bankName}</span>
                </div>

                <div>
                  <span className="text-zinc-400 block text-[11px]">Número de Cuenta:</span>
                  <button
                    onClick={() => copyToClipboard(accounts.accountNumber, "acc")}
                    className="flex items-center justify-between w-full p-3 mt-1 rounded-xl bg-[#F7F7F5] hover:bg-zinc-100 font-mono text-zinc-900 text-xs transition-colors cursor-pointer text-left"
                  >
                    <span>{accounts.accountNumber}</span>
                    {copiedKey === "acc" ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                        <Check className="h-3.5 w-3.5" /> Copiado
                      </span>
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    )}
                  </button>
                </div>

                <div>
                  <span className="text-zinc-400 block text-[11px]">RIF Titular:</span>
                  <button
                    onClick={() => copyToClipboard(accounts.rif, "rif")}
                    className="flex items-center justify-between w-full p-3 mt-1 rounded-xl bg-[#F7F7F5] hover:bg-zinc-100 font-mono text-zinc-900 text-xs transition-colors cursor-pointer text-left"
                  >
                    <span>{accounts.rif}</span>
                    {copiedKey === "rif" ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                        <Check className="h-3.5 w-3.5" /> Copiado
                      </span>
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 text-[11px] text-zinc-400">
              A nombre de: Iglesia Cristiana Iviluz
            </div>
          </div>

          {/* Pago Móvil */}
          <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Venezuela · Inmediato
                  </span>
                  <h3 className="text-lg font-black uppercase text-zinc-900 tracking-tight">
                    Pago Móvil Interbancario
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-zinc-400 block text-[11px]">Banco Destino:</span>
                  <span className="font-bold text-zinc-800">{accounts.bankName}</span>
                </div>

                <div>
                  <span className="text-zinc-400 block text-[11px]">Teléfono Afiliado:</span>
                  <button
                    onClick={() => copyToClipboard(accounts.pagoMovilPhone, "pm-tel")}
                    className="flex items-center justify-between w-full p-3 mt-1 rounded-xl bg-[#F7F7F5] hover:bg-zinc-100 font-mono text-zinc-900 text-xs transition-colors cursor-pointer text-left"
                  >
                    <span>{accounts.pagoMovilPhone}</span>
                    {copiedKey === "pm-tel" ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                        <Check className="h-3.5 w-3.5" /> Copiado
                      </span>
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    )}
                  </button>
                </div>

                <div>
                  <span className="text-zinc-400 block text-[11px]">RIF:</span>
                  <button
                    onClick={() => copyToClipboard(accounts.rif, "pm-rif")}
                    className="flex items-center justify-between w-full p-3 mt-1 rounded-xl bg-[#F7F7F5] hover:bg-zinc-100 font-mono text-zinc-900 text-xs transition-colors cursor-pointer text-left"
                  >
                    <span>{accounts.rif}</span>
                    {copiedKey === "pm-rif" ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                        <Check className="h-3.5 w-3.5" /> Copiado
                      </span>
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 text-[11px] text-zinc-400">
              Disponible 24/7 desde cualquier entidad bancaria
            </div>
          </div>

          {/* Zelle */}
          <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
                  <Globe2 className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Internacional · USD
                  </span>
                  <h3 className="text-lg font-black uppercase text-zinc-900 tracking-tight">
                    Zelle Oficial
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-zinc-400 block text-[11px]">Correo Zelle:</span>
                  <button
                    onClick={() => copyToClipboard(accounts.zelleEmail, "zelle")}
                    className="flex items-center justify-between w-full p-3 mt-1 rounded-xl bg-[#F7F7F5] hover:bg-zinc-100 font-mono text-zinc-900 text-xs transition-colors cursor-pointer text-left"
                  >
                    <span>{accounts.zelleEmail}</span>
                    {copiedKey === "zelle" ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                        <Check className="h-3.5 w-3.5" /> Copiado
                      </span>
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    )}
                  </button>
                </div>

                <div>
                  <span className="text-zinc-400 block text-[11px]">Titular:</span>
                  <span className="font-bold text-zinc-800">{accounts.zelleHolder}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 text-[11px] text-zinc-400">
              Coloca en nota: &ldquo;Ofrenda Iviluz&rdquo;
            </div>
          </div>

          {/* Cripto / Binance Pay */}
          <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Coins className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Binance Pay & USDT
                  </span>
                  <h3 className="text-lg font-black uppercase text-zinc-900 tracking-tight">
                    Criptoactivos
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-zinc-400 block text-[11px]">Binance Pay ID (0% comisión):</span>
                  <button
                    onClick={() => copyToClipboard(accounts.binancePayId, "binance")}
                    className="flex items-center justify-between w-full p-3 mt-1 rounded-xl bg-[#F7F7F5] hover:bg-zinc-100 font-mono text-zinc-900 text-xs transition-colors cursor-pointer text-left"
                  >
                    <span>{accounts.binancePayId}</span>
                    {copiedKey === "binance" ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                        <Check className="h-3.5 w-3.5" /> Copiado
                      </span>
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-zinc-400" />
                    )}
                  </button>
                </div>

                <div>
                  <span className="text-zinc-400 block text-[11px]">Billetera USDT (Red TRC-20):</span>
                  <button
                    onClick={() => copyToClipboard(accounts.usdtWallet, "usdt")}
                    className="flex items-center justify-between w-full p-3 mt-1 rounded-xl bg-[#F7F7F5] hover:bg-zinc-100 font-mono text-zinc-900 text-xs transition-colors cursor-pointer text-left truncate"
                  >
                    <span className="truncate">{accounts.usdtWallet}</span>
                    {copiedKey === "usdt" ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px] shrink-0 ml-2">
                        <Check className="h-3.5 w-3.5" /> Copiado
                      </span>
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-zinc-400 shrink-0 ml-2" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 text-[11px] text-zinc-400">
              Verifica siempre que la red sea Tron (TRC-20)
            </div>
          </div>

        </div>

        {/* Nota de Transparencia */}
        <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 flex items-center gap-4 shadow-sm">
          <ShieldCheck className="h-8 w-8 text-amber-800 shrink-0" />
          <p className="text-xs text-zinc-500 leading-relaxed">
            Cada aporte es administrado con integridad para sustentar el avance de la obra, el mantenimiento de los templos y los programas de acción social en las comunidades a través de <strong>Buena Voluntad</strong>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}