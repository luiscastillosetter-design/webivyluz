"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Users, 
  MessageCircle, 
  HeartHandshake, 
  LogOut, 
  MapPin, 
  ShieldAlert,
  Search,
  Sparkles,
  UserCheck,
  UserPlus,
  X,
  Send,
  Filter
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
  lider_id?: string | null;
  estado_discipular: string;
  peticion_oracion?: string;
  notas?: string;
  created_at: string;
}

interface Consejeria {
  id: string;
  nombre: string;
  telefono: string;
  motivo: string;
  modalidad: string;
  fecha_solicitada?: string;
  estado: string;
  notas_pastorales?: string;
  created_at: string;
}

// Fases Oficiales de la Visión G12 / Camino del Discípulo
const ESTADOS_DISCIPULARES = [
  { val: "nuevo", label: "1. Ganar (Nuevo)" },
  { val: "universidad_vida", label: "2. Univ. de la Vida" },
  { val: "encuentro", label: "3. Retiro de Encuentro" },
  { val: "bautizado", label: "4. Bautizado" },
  { val: "discipular", label: "5. Discipular (Escuela)" },
  { val: "enviado", label: "6. Enviar (Líder Célula)" },
];

export default function PortalDashboard() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [lideresDisponibles, setLideresDisponibles] = useState<Perfil[]>([]);
  const [creyentes, setCreyentes] = useState<Creyente[]>([]);
  const [consejerias, setConsejerias] = useState<Consejeria[]>([]);
  const [activeTab, setActiveTab] = useState<"discipulos" | "consejeria">("discipulos");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [nuevoAviso, setNuevoAviso] = useState<string | null>(null);

  // Estado para Modal de "+ Registrar Nuevo Ganado"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNombre, setNewNombre] = useState("");
  const [newTelefono, setNewTelefono] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newSector, setNewSector] = useState("");
  const [newFase, setNewFase] = useState("nuevo");
  const [newNotas, setNewNotas] = useState("");
  const [savingNew, setSavingNew] = useState(false);

  useEffect(() => {
    let creyentesChannel: any;
    let consejeriaChannel: any;

    async function loadDataAndSubscribe() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/portal/login");
        return;
      }

      const { data: perfilData } = await supabase
        .from("perfiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const userProfile: Perfil = perfilData || {
        id: user.id,
        nombre: user.email || "Pastor / Líder",
        rol: "lider",
        sede: "Auditorio Principal",
      };
      setPerfil(userProfile);

      // Si es Super Admin, cargar lista de todos los líderes para reasignar
      if (userProfile.rol === "admin") {
        const { data: lideresData } = await supabase
          .from("perfiles")
          .select("*")
          .order("nombre", { ascending: true });
        if (lideresData) setLideresDisponibles(lideresData);
      }

      // Cargar creyentes: Aislamiento estricto si no es Super Admin
      let query = supabase.from("creyentes").select("*").order("created_at", { ascending: false });

      if (userProfile.rol !== "admin") {
        // El líder/pastor de circuito solo ve los suyos o los asignados a su circuito
        query = query.or(`lider_id.eq.${userProfile.id},sede.eq.${userProfile.sede}`);
      }

      const { data: creyentesData } = await query;
      if (creyentesData) {
        setCreyentes(creyentesData);
      }

      // Cargar consejerías
      if (userProfile.rol === "admin") {
        const { data: consData } = await supabase
          .from("consejeria")
          .select("*")
          .order("created_at", { ascending: false });
        if (consData) setConsejerias(consData);
      }

      setLoading(false);

      // Suscripción Realtime para Creyentes con filtro de seguridad
      creyentesChannel = supabase
        .channel("realtime-creyentes")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "creyentes" },
          (payload) => {
            const nuevo = payload.new as Creyente;
            if (
              userProfile.rol === "admin" ||
              nuevo.lider_id === userProfile.id ||
              nuevo.sede === userProfile.sede
            ) {
              setCreyentes((prev) => [nuevo, ...prev]);
              setNuevoAviso(`¡Nuevo creyente registrado: ${nuevo.nombre}!`);
              setTimeout(() => setNuevoAviso(null), 5000);
            }
          }
        )
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "creyentes" },
          (payload) => {
            const actualizado = payload.new as Creyente;
            setCreyentes((prev) =>
              prev.map((c) => (c.id === actualizado.id ? actualizado : c))
            );
          }
        )
        .subscribe();

      // Suscripción Realtime para Consejería
      if (userProfile.rol === "admin") {
        consejeriaChannel = supabase
          .channel("realtime-consejeria")
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "consejeria" },
            (payload) => {
              const nueva = payload.new as Consejeria;
              setConsejerias((prev) => [nueva, ...prev]);
              setNuevoAviso(`¡Nueva solicitud de consejería: ${nueva.nombre}!`);
              setTimeout(() => setNuevoAviso(null), 5000);
            }
          )
          .subscribe();
      }
    }

    loadDataAndSubscribe();

    return () => {
      if (creyentesChannel) supabase.removeChannel(creyentesChannel);
      if (consejeriaChannel) supabase.removeChannel(consejeriaChannel);
    };
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

  const handleAssignLider = async (id: string, nuevoLiderId: string) => {
    const liderFinal = nuevoLiderId === "" ? null : nuevoLiderId;
    const { error } = await supabase
      .from("creyentes")
      .update({ lider_id: liderFinal })
      .eq("id", id);

    if (!error) {
      setCreyentes((prev) =>
        prev.map((c) => (c.id === id ? { ...c, lider_id: liderFinal } : c))
      );
    }
  };

  const handleSaveNuevoGanado = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNombre || !newTelefono || !perfil) return;
    setSavingNew(true);

    const payload = {
      nombre: newNombre,
      telefono: newTelefono,
      email: newEmail || null,
      sector_direccion: newSector || null,
      sede: perfil.sede || "Auditorio Principal",
      lider_id: perfil.rol === "admin" ? null : perfil.id,
      estado_discipular: newFase,
      notas: newNotas ? `Registro manual: ${newNotas}` : "Registrado manualmente en célula",
    };

    const { data, error } = await supabase.from("creyentes").insert([payload]).select();

    if (!error && data) {
      setCreyentes((prev) => [data[0], ...prev]);
      setIsModalOpen(false);
      setNewNombre("");
      setNewTelefono("");
      setNewEmail("");
      setNewSector("");
      setNewNotas("");
      setNewFase("nuevo");
    }
    setSavingNew(false);
  };

  const openWhatsApp = (telefono: string, nombre: string) => {
    let cleanPhone = telefono.replace(/[^0-9]/g, "");

    if (cleanPhone.startsWith("0")) {
      cleanPhone = "58" + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith("58") && cleanPhone.length === 10) {
      cleanPhone = "58" + cleanPhone;
    }

    const mensaje = encodeURIComponent(
      `¡Hola ${nombre}! Te saludamos de parte de Iglesia Iviluz. Es una gran bendición poder conectar contigo. ¿Cómo podemos acompañarte y orar por ti hoy?`
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
      {nuevoAviso && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-zinc-950 px-4 py-2 rounded-full shadow-2xl text-xs font-bold flex items-center gap-2 border border-amber-500 animate-bounce">
          <Sparkles className="h-4 w-4" />
          {nuevoAviso}
        </div>
      )}

      {/* Cabecera Principal */}
      <header className="sticky top-0 z-30 bg-zinc-950 text-white px-4 py-3.5 shadow-md flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
            {perfil?.rol === "admin" ? "Super Admin Pastoral" : `Pastor de Circuito · ${perfil?.sede}`}
          </span>
          <h1 className="text-sm font-black uppercase tracking-tight text-white">
            {perfil?.nombre}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Botón "+ Registrar Nuevo Ganado" */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-zinc-950 hover:bg-amber-300 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Nuevo Ganado</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Selector de Pestañas (Super Admin) */}
      {perfil?.rol === "admin" && (
        <div className="bg-white border-b border-zinc-200 px-4 py-2 flex gap-2">
          <button
            onClick={() => setActiveTab("discipulos")}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
              activeTab === "discipulos"
                ? "bg-zinc-900 text-white shadow-sm"
                : "bg-zinc-100 text-zinc-600"
            }`}
          >
            Creyentes ({creyentes.length})
          </button>
          <button
            onClick={() => setActiveTab("consejeria")}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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

      {/* Buscador y Estado */}
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

      {/* Lista de Creyentes */}
      {activeTab === "discipulos" && (
        <main className="px-4 max-w-lg mx-auto space-y-3">
          {filteredCreyentes.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-zinc-200/80 shadow-sm">
              <Users className="h-10 w-10 text-zinc-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-zinc-600">No hay creyentes asignados en esta lista</p>
              <p className="text-[11px] text-zinc-400 mt-1">
                Puedes registrar a un nuevo creyente ganado pulsando el botón superior &quot;Nuevo Ganado&quot;.
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
                    {c.email && (
                      <p className="text-[11px] text-zinc-400">
                        {c.email}
                      </p>
                    )}
                  </div>

                  {/* Botón WhatsApp */}
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

                {c.notas && (
                  <div className="rounded-xl bg-amber-50/60 border border-amber-200/60 p-2.5 text-[11px] text-amber-900 leading-relaxed">
                    <span className="font-bold block text-[10px] uppercase text-amber-800">
                      Notas / Proceso:
                    </span>
                    {c.notas}
                  </div>
                )}

                {/* Asignación de Líder (Solo Super Admin) */}
                {perfil?.rol === "admin" && (
                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      <UserCheck className="h-3 w-3 text-zinc-400" />
                      <span>Líder Asignado:</span>
                    </div>
                    <select
                      value={c.lider_id || ""}
                      onChange={(e) => handleAssignLider(c.id, e.target.value)}
                      className="text-xs font-semibold py-1.5 px-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-700 focus:outline-none cursor-pointer max-w-[170px] truncate"
                    >
                      <option value="">(Sin asignar)</option>
                      {lideresDisponibles.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Selector de Estado Discipular Oficial G12 */}
                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Fase Camino del Discípulo:
                  </span>
                  <select
                    value={c.estado_discipular}
                    onChange={(e) => handleUpdateEstado(c.id, e.target.value)}
                    className="text-xs font-bold py-1.5 px-2.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800 focus:outline-none cursor-pointer"
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

      {/* Lista de Consejerías (Super Admin) */}
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
                      {item.modalidad}
                    </span>
                  </div>

                  <button
                    onClick={() => openWhatsApp(item.telefono, item.nombre)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    <MessageCircle className="h-4 w-4 fill-current" />
                    <span>WhatsApp</span>
                  </button>
                </div>

                <div className="text-xs font-mono text-zinc-500">
                  {item.telefono}
                </div>

                <div className="rounded-xl bg-zinc-50 border border-zinc-200/60 p-2.5 text-xs text-zinc-700">
                  <span className="font-bold text-[10px] uppercase text-zinc-400 block mb-0.5">
                    Motivo: {item.motivo}
                  </span>
                  {item.notas_pastorales}
                </div>
              </div>
            ))
          )}
        </main>
      )}

      {/* Modal: "+ Registrar Nuevo Ganado" */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <form onSubmit={handleSaveNuevoGanado} className="space-y-3.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                  Consolidación Inmediata
                </span>
                <h3 className="text-lg font-black uppercase text-zinc-900 mt-0.5">
                  Registrar Nuevo Ganado
                </h3>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Nombre y Apellido *</label>
                <input
                  type="text"
                  required
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  placeholder="Nombre completo"
                  className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-2.5 text-xs text-zinc-800 outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Teléfono WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={newTelefono}
                  onChange={(e) => setNewTelefono(e.target.value)}
                  placeholder="Ej: 0412-1234567"
                  className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-2.5 text-xs text-zinc-800 outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Sector de Residencia</label>
                <input
                  type="text"
                  value={newSector}
                  onChange={(e) => setNewSector(e.target.value)}
                  placeholder="Ej: Cabudare, Centro, Ruiz Pineda..."
                  className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-2.5 text-xs text-zinc-800 outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Fase Inicial</label>
                <select
                  value={newFase}
                  onChange={(e) => setNewFase(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-2.5 text-xs text-zinc-800 outline-none focus:border-zinc-900 font-bold"
                >
                  {ESTADOS_DISCIPULARES.map((est) => (
                    <option key={est.val} value={est.val}>
                      {est.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Notas de la Célula / Entrega</label>
                <textarea
                  rows={2}
                  value={newNotas}
                  onChange={(e) => setNewNotas(e.target.value)}
                  placeholder="Ej: Entregó su vida en la célula del miércoles..."
                  className="w-full rounded-xl border border-zinc-200 bg-[#F7F7F5] p-2.5 text-xs text-zinc-800 outline-none focus:border-zinc-900"
                />
              </div>

              <button
                type="submit"
                disabled={savingNew || !newNombre || !newTelefono}
                className="w-full mt-2 rounded-xl bg-zinc-900 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 transition-all disabled:opacity-40 cursor-pointer"
              >
                {savingNew ? "Guardando..." : "Guardar Creyente"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}