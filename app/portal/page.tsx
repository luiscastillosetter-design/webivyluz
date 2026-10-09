"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Users, 
  MessageCircle, 
  HeartHandshake, 
  LogOut, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldAlert,
  Search,
  UserPlus
} from "lucide-react";

interface Perfil {
  id: string;
  nombre: string;
  rol: "admin" | "lider";
  sede: string;
}

interface Creyente {
  id: string;
  nombre: string;
  telefono: string;
  email?: string;
  sector_direccion?: string;
  sede: string;
  lider_id?: string;
  estado_discipular: string;
  peticion_oracion?: string;
  created_at: string;
}

interface Consejeria {
  id: string;
  nombre: string;
  telefono: string;
  motivo: string;
  modalidad: string;
  fecha_solicitada: string;
  estado: string;
  created_at: string;
}

const ESTADOS_DISCIPULARES = [
  { val: "nuevo", label: "Nuevo" },
  { val: "contactado", label: "Contactado" },
  { val: "asiste_celula", label: "En Célula" },
  { val: "universidad_vida", label: "Univ. de la Vida" },
  { val: "bautizado", label: "Bautizado" },
];

export default function PortalDashboard() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [creyentes, setCreyentes] = useState<Creyente[]>([]);
  const [consejerias, setConsejerias] = useState<Consejeria[]>([]);
  const [activeTab, setActiveTab] = useState<"discipulos" | "consejeria">("discipulos");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadData() {
      // 1. Verificar sesión activa
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/portal/login");
        return;
      }

      // 2. Cargar perfil
      const { data: perfilData } = await supabase
        .from("perfiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (perfilData) {
        setPerfil(perfilData);
      } else {
        // Perfil por defecto si aún no está insertado en tabla
        setPerfil({ id: user.id, nombre: user.email || "Usuario", rol: "lider", sede: "Principal" });
      }

      // 3. Cargar creyentes (RLS filtrará automáticamente por el ID del líder o traerá todos si es admin)
      const { data: creyentesData } = await supabase
        .from("creyentes")
        .select("*")
        .order("created_at", { ascending: false });

      if (creyentesData) {
        setCreyentes(creyentesData);
      }

      // 4. Si es Admin, cargar consejerías privadas
      if (perfilData?.rol === "admin") {
        const { data: consData } = await supabase
          .from("consejeria")
          .select("*")
          .order("created_at", { ascending: false });
        if (consData) setConsejerias(consData);
      }

      setLoading(false);
    }

    loadData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/portal/login");
  };

  const handleUpdateEstado = async (id: string, nuevoEstado: string) => {
    const { error } = await supabase
      .from("creyentes")
      .update({ estado_discipular: nuevoEstado })
      .eq("id", id);

    if (!error) {
      setCreyentes((prev) =>
        prev.map((c) => (c.id === id ? { ...c, estado_discipular: nuevoEstado } : c))
      );
    }
  };

  const openWhatsApp = (telefono: string, nombre: string) => {
    const cleanPhone = telefono.replace(/[^0-9]/g, "");
    const mensaje = encodeURIComponent(
      `¡Hola ${nombre}! Te saludamos de parte de los Pastores de la Iglesia Iviluz. Es una gran bendición poder conectar contigo. ¿Cómo podemos orar por ti hoy?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${mensaje}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center text-xs tracking-widest uppercase font-mono">
        Cargando Portal Discipular...
      </div>
    );
  }

  const filteredCreyentes = creyentes.filter(
    (c) =>
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telefono.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#F4F4F2] text-zinc-900 pb-20">
      {/* Barra Superior Móvil */}
      <header className="sticky top-0 z-30 bg-zinc-950 text-white px-4 py-3.5 shadow-md flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
            {perfil?.rol === "admin" ? "Super Admin Pastoral" : "Líder de Célula"}
          </span>
          <h1 className="text-sm font-black uppercase tracking-tight text-white">
            {perfil?.nombre}
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          title="Cerrar sesión"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </header>

      {/* Selector de Pestañas (Solo si es Super Admin) */}
      {perfil?.rol === "admin" && (
        <div className="bg-white border-b border-zinc-200 px-4 py-2 flex gap-2">
          <button
            onClick={() => setActiveTab("discipulos")}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              activeTab === "discipulos"
                ? "bg-zinc-900 text-white shadow-sm"
                : "bg-zinc-100 text-zinc-600"
            }`}
          >
            Creyentes ({creyentes.length})
          </button>
          <button
            onClick={() => setActiveTab("consejeria")}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "consejeria"
                ? "bg-amber-400 text-zinc-950 shadow-sm"
                : "bg-zinc-100 text-zinc-600"
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            Consejería ({consejerias.length})
          </button>
        </div>
      )}

      {/* Buscador Rápido */}
      {activeTab === "discipulos" && (
        <div className="p-4 max-w-lg mx-auto">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o teléfono..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-zinc-200/80 text-xs text-zinc-800 shadow-sm focus:outline-none focus:border-zinc-900"
            />
          </div>
        </div>
      )}

      {/* Lista Móvil de Creyentes */}
      {activeTab === "discipulos" && (
        <main className="px-4 max-w-lg mx-auto space-y-3">
          {filteredCreyentes.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-zinc-200/80 shadow-sm">
              <Users className="h-10 w-10 text-zinc-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-zinc-600">No hay creyentes asignados aún</p>
              <p className="text-[11px] text-zinc-400 mt-1">
                Los nuevos creyentes que se registren en la web aparecerán aquí automáticamente.
              </p>
            </div>
          ) : (
            filteredCreyentes.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-zinc-200/80 p-4 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-black uppercase text-zinc-900">
                      {c.nombre}
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">
                      {c.telefono}
                    </p>
                  </div>

                  {/* Botón WhatsApp Inmediato */}
                  <button
                    onClick={() => openWhatsApp(c.telefono, c.nombre)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    <MessageCircle className="h-4 w-4 fill-current" />
                    <span>WhatsApp</span>
                  </button>
                </div>

                {c.sector_direccion && (
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <MapPin className="h-3 w-3 text-zinc-400 shrink-0" />
                    <span>{c.sector_direccion}</span>
                  </div>
                )}

                {c.peticion_oracion && (
                  <div className="rounded-xl bg-amber-50/60 border border-amber-200/60 p-2.5 text-[11px] text-amber-900 leading-relaxed">
                    <span className="font-bold block text-[10px] uppercase text-amber-800">
                      Petición / Motivo:
                    </span>
                    {c.peticion_oracion}
                  </div>
                )}

                {/* Selector de Estado Discipular */}
                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Fase:
                  </span>
                  <select
                    value={c.estado_discipular}
                    onChange={(e) => handleUpdateEstado(c.id, e.target.value)}
                    className="text-xs font-bold py-1.5 px-2.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800 focus:outline-none"
                  >
                    {ESTADOS_DISCIPULARES.map((est) => (
                      <option key={est.val} value={est.val}>
                        {est.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          )}
        </main>
      )}

      {/* Lista de Consejerías (Vista Exclusiva de Super Admin / Pastores) */}
      {activeTab === "consejeria" && perfil?.rol === "admin" && (
        <main className="px-4 max-w-lg mx-auto space-y-3">
          {consejerias.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-zinc-200/80 shadow-sm">
              <HeartHandshake className="h-10 w-10 text-zinc-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-zinc-600">No hay solicitudes de consejería</p>
            </div>
          ) : (
            consejerias.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-zinc-200/80 p-4 shadow-sm space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-black uppercase text-zinc-900">
                      {item.nombre}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full inline-block mt-1">
                      {item.modalidad} · {item.fecha_solicitada || "Por convenir"}
                    </span>
                  </div>

                  <button
                    onClick={() => openWhatsApp(item.telefono, item.nombre)}
                    className="p-2 rounded-xl bg-emerald-600 text-white"
                  >
                    <MessageCircle className="h-4 w-4 fill-current" />
                  </button>
                </div>

                <div className="rounded-xl bg-zinc-50 border border-zinc-200/60 p-2.5 text-xs text-zinc-700">
                  <span className="font-bold text-[10px] uppercase text-zinc-400 block mb-0.5">
                    Motivo Confidencial:
                  </span>
                  {item.motivo}
                </div>
              </div>
            ))
          )}
        </main>
      )}
    </div>
  );
}