"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Play, 
  Clock, 
  Calendar, 
  User, 
  Search, 
  ExternalLink 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client } from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";

function YoutubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

interface Predica {
  id: string;
  title: string;
  series: string;
  speaker: string;
  date: string;
  duration: string;
  image: string;
  youtubeUrl: string;
}

const CATEGORIES = [
  "Todas",
  "Series Dominicales",
  "Somos Luz (Jóvenes)",
  "Familia y Matrimonio",
  "Universidad de la Vida",
];

const DEFAULT_PREDICAS: Predica[] = [
  {
    id: "1",
    title: "Caminando en la Luz de su Propósito",
    series: "Series Dominicales",
    speaker: "Pastor Orlando (Principal)",
    date: "Domingo reciente",
    duration: "48 min",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_1_3849938660733597282.webp",
    youtubeUrl: "https://www.youtube.com/@iglesiaiviluz",
  },
  {
    id: "2",
    title: "La Fuerza de una Familia Restaurada",
    series: "Familia y Matrimonio",
    speaker: "Pastora Ivilien",
    date: "Hace 1 semana",
    duration: "42 min",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_2_3849938664567168038.webp",
    youtubeUrl: "https://www.youtube.com/@iglesiaiviluz",
  },
  {
    id: "3",
    title: "Una Generación que No se Rinde",
    series: "Somos Luz (Jóvenes)",
    speaker: "Liderazgo Somos Luz",
    date: "Hace 2 semanas",
    duration: "39 min",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_3_3849938668644071469.webp",
    youtubeUrl: "https://www.youtube.com/@iglesiaiviluz",
  },
  {
    id: "4",
    title: "El Poder de la Oración de Fe",
    series: "Series Dominicales",
    speaker: "Pastor Orlando",
    date: "Hace 3 semanas",
    duration: "51 min",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_4_3849938680899805073.webp",
    youtubeUrl: "https://www.youtube.com/@iglesiaiviluz",
  },
  {
    id: "5",
    title: "Sanando las Heridas del Corazón",
    series: "Universidad de la Vida",
    speaker: "Pastora Ivilien",
    date: "Hace 1 mes",
    duration: "45 min",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_5_3849938684112643248.webp",
    youtubeUrl: "https://www.youtube.com/@iglesiaiviluz",
  },
  {
    id: "6",
    title: "Edificando sobre Roca Firme",
    series: "Series Dominicales",
    speaker: "Equipo Pastoral",
    date: "Hace 1 mes",
    duration: "44 min",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_6_3849938690672513949.webp",
    youtubeUrl: "https://www.youtube.com/@iglesiaiviluz",
  },
];

export default function PredicasPage() {
  const [predicas, setPredicas] = useState<Predica[]>(DEFAULT_PREDICAS);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchPredicas() {
      try {
        const query = `*[_type == "predica"] | order(date desc) {
          _id,
          title,
          series,
          speaker,
          date,
          duration,
          youtubeUrl,
          thumbnail
        }`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          const formatted: Predica[] = data.map((item: any) => ({
            id: item._id,
            title: item.title,
            series: item.series || "Series Dominicales",
            speaker: item.speaker || "Pastor Orlando",
            date: item.date || "Fecha reciente",
            duration: item.duration || "45 min",
            image: item.thumbnail ? urlForImage(item.thumbnail) : "/media/iglesiaiviluz_20260310_p_3849944592100178236_1_3849938660733597282.webp",
            youtubeUrl: item.youtubeUrl || "https://www.youtube.com/@iglesiaiviluz",
          }));
          setPredicas(formatted);
        }
      } catch (err) {
        console.warn("Usando prédicas predeterminadas:", err);
      }
    }

    fetchPredicas();
  }, []);

  const filteredPredicas = predicas.filter((item) => {
    const matchesCat =
      selectedCategory === "Todas" || item.series === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredPredica = predicas[0] || DEFAULT_PREDICAS[0];

  return (
    <div className="min-h-screen w-full bg-[#F7F7F5] text-zinc-900 flex flex-col">
      <Header />

      {/* Cabecera Principal */}
      <section className="pt-36 pb-16 px-6 md:px-12 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-zinc-950/90 to-zinc-950 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-200 mb-6">
            <YoutubeIcon className="h-4 w-4" />
            Mediateca de Enseñanzas
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
            PRÉDICAS Y SERIES
          </h1>

          <p className="mt-5 text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Mensajes bíblicos que edifican tu fe, renuevan tu mente y te enseñan a vivir el propósito de Dios en cada área de tu vida.
          </p>
        </div>
      </section>

      {/* Prédica Destacada */}
      <section className="py-12 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="relative rounded-3xl bg-white border border-zinc-200/80 overflow-hidden shadow-xl flex flex-col lg:flex-row">
          
          <div className="relative lg:w-3/5 h-64 sm:h-80 lg:h-auto min-h-[300px] bg-zinc-900 group">
            <Image
              src={featuredPredica.image}
              alt={featuredPredica.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <a
                href={featuredPredica.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-accent-cream text-zinc-950 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110 hover:bg-white"
                aria-label="Ver prédica en YouTube"
              >
                <Play className="h-7 w-7 sm:h-8 sm:w-8 fill-current ml-1" />
              </a>
            </div>
            <span className="absolute top-4 left-4 rounded-full bg-zinc-950/80 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-200 backdrop-blur-md">
              Mensaje Destacado
            </span>
          </div>

          <div className="lg:w-2/5 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                {featuredPredica.series}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 mt-2 leading-tight">
                {featuredPredica.title}
              </h2>
              
              <div className="mt-4 flex flex-col gap-2 text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-zinc-400" />
                  <span className="font-semibold">{featuredPredica.speaker}</span>
                </div>
                <div className="flex items-center gap-4 text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {featuredPredica.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {featuredPredica.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-100">
              <a
                href={featuredPredica.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-zinc-900 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 transition-colors shadow-md"
              >
                <Play className="h-4 w-4 fill-current" />
                Ver en YouTube
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Filtros de Categorías y Buscador */}
      <section className="py-6 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-zinc-200">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar prédica o pastor..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-zinc-200 bg-white text-xs text-zinc-800 outline-none focus:border-zinc-900"
            />
          </div>
        </div>
      </section>

      {/* Cuadrícula de Prédicas */}
      <section className="py-8 px-6 md:px-12 max-w-6xl mx-auto w-full flex-grow">
        {filteredPredicas.length === 0 ? (
          <div className="py-16 text-center text-zinc-400 text-sm">
            No se encontraron mensajes con esos criterios de búsqueda.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPredicas.map((predica) => (
              <div
                key={predica.id}
                className="group flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-48 w-full bg-zinc-900 overflow-hidden">
                    <Image
                      src={predica.image}
                      alt={predica.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="h-12 w-12 rounded-full bg-accent-cream text-zinc-950 flex items-center justify-center shadow-lg">
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/80 px-2 py-0.5 text-[10px] font-bold text-white">
                      {predica.duration}
                    </span>
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      {predica.series}
                    </span>
                    <h3 className="text-base font-bold text-zinc-900 leading-snug mt-1 group-hover:text-amber-800 transition-colors">
                      {predica.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {predica.speaker}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href={predica.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-zinc-100 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    Reproducir Mensaje
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Banner de Suscripción a YouTube */}
      <section className="bg-zinc-900 text-white py-14 px-6 md:px-12 text-center mt-12">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-xl">
            <YoutubeIcon className="h-8 w-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Canal Oficial en YouTube
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Suscríbete para recibir notificaciones cada vez que transmitamos en vivo nuestros servicios de los domingos o publiquemos una nueva serie.
          </p>
          <a
            href="https://www.youtube.com/@iglesiaiviluz"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent-cream px-8 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-white transition-transform hover:scale-105 shadow-lg"
          >
            Suscribirme al Canal
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}