"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function PortalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg("Credenciales incorrectas. Verifica tu correo y contraseña.");
        setLoading(false);
        return;
      }

      if (data.user) {
        router.push("/portal");
      }
    } catch (err: any) {
      setErrorMsg("Ocurrió un error al intentar iniciar sesión.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex flex-col justify-center items-center px-4 py-8 text-zinc-100">
      <div className="w-full max-w-sm">
        {/* Cabecera */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300 border border-amber-400/20 mb-4">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            Portal Iviluz
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Sistema de Consolidación y Gestión Pastoral
          </p>
        </div>

        {/* Tarjeta de Login */}
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-300 leading-tight">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pastor@iglesiaiviluz.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-amber-300 transition-all disabled:opacity-50 cursor-pointer shadow-lg font-mono"
            >
              {loading ? (
                <span>Verificando acceso...</span>
              ) : (
                <>
                  <span>Ingresar al Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-[11px] text-zinc-500">
            Acceso restringido a pastores y líderes de célula autorizados.
          </p>
        </div>
      </div>
    </div>
  );
}