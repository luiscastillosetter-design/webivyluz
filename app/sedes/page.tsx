"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ExternalLink, Calendar, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Sede {
  name: string;
  badge?: string;
  address: string;
  pastors: string;
  familiarSchedule: string[];
  youthSchedule?: string;
  prayerSchedule?: string;
  image: string;
  mapsUrl: string;
}

const SEDES_DATA: Sede[] = [
  {
    name: "Auditorio Principal Iviluz",
    badge: "Sede Central",
    address: "Calle 47 entre avenidas 19 y 20, sector oeste, Barquisimeto, Lara (Zona postal 3001)",
    pastors: "Pastores Orlando e Ivilien (Fundadores)",
    familiarSchedule: ["Domingos: 8:00 AM y 10:00 AM"],
    youthSchedule: "Domingos: 2:30 PM (Somos Luz)",
    prayerSchedule: "Miércoles: 6:00 PM · Matutino: Lunes a Viernes 5:00 AM",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_1_3849938660733597282.webp",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Calle+47+entre+avenidas+19+y+20+Barquisimeto+Lara",
  },
  {
    name: "Sede Cabudare",
    badge: "Extensión Metropolitana",
    address: "Av. Intercomunal Barquisimeto - Cabudare, sector La Mata",
    pastors: "Equipo Pastoral de Zona",
    familiarSchedule: ["Domingos: 9:30 AM"],
    youthSchedule: "Sábados: 4:30 PM",
    prayerSchedule: "Jueves: 6:00 PM",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_2_3849938664567168038.webp",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cabudare+Lara+Venezuela",
  },
  {
    name: "Sede Zona Norte",
    badge: "Extensión",
    address: "Sector El Cují, Av. Principal, Barquisimeto Norte",
    pastors: "Equipo Pastoral de Zona",
    familiarSchedule: ["Domingos: 9:00 AM"],
    youthSchedule: "Sábados: 5:00 PM",
    prayerSchedule: "Miércoles: 6:00 PM",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_3_3849938668644071469.webp",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=El+Cuji+Barquisimeto+Lara",
  },
  {
    name: "Sede Zona Oeste",
    badge: "Extensión",
    address: "Av. Florencio Jiménez, sector Pueblo Nuevo",
    pastors: "Equipo Pastoral de Zona",
    familiarSchedule: ["Domingos: 10:00 AM"],
    youthSchedule: "Sábados: 4:00 PM",
    prayerSchedule: "Martes: 6:00 PM",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_4_3849938680899805073.webp",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Florencio+Jimenez+Barquisimeto",
  },
];

export default function SedesPage() {
  return (
    <div className="min-h-screen w-full bg-[#F7F7F5] text-zinc-900 flex flex-col">
      <Header />

      {/* Cabecera de la sección (Estilo MCI Bogotá) */}
      <section className="pt-36 pb-14 px-6 md:px-12 bg-white border-b border-zinc-200/60">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            Nuestra Presencia
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-zinc-900 mt-2">
            Encuentra tu Sede Iviluz
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-500 max-w-2xl leading-relaxed">
            Nuestra sede central está ubicada en Barquisimeto y contamos con auditorios y puntos de reunión para que tú y tu familia se conecten en la sede más cercana.
          </p>
        </div>
      </section>

      {/* Cuadrícula de Sedes */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SEDES_DATA.map((sede) => (
            <div
              key={sede.name}
              className="flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                {/* Fotografía del auditorio / reunión */}
                <div className="relative h-52 w-full bg-zinc-900 overflow-hidden">
                  <Image
                    src={sede.image}
                    alt={sede.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {sede.badge && (
                    <span className="absolute top-3 left-3 rounded-full bg-zinc-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-cream backdrop-blur-md">
                      {sede.badge}
                    </span>
                  )}
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6">
                  <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900 leading-tight">
                    {sede.name}
                  </h2>
                  
                  {/* Dirección */}
                  <div className="mt-3 flex items-start gap-2 text-xs text-zinc-600">
                    <MapPin className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                    <span className="leading-relaxed">{sede.address}</span>
                  </div>

                  {/* Pastores */}
                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-zinc-700">
                    <Users className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                    <span>{sede.pastors}</span>
                  </div>

                  {/* Horarios Desglosados */}
                  <div className="mt-5 border-t border-zinc-100 pt-4 flex flex-col gap-2.5 text-xs">
                    <div>
                      <span className="font-bold text-amber-800 uppercase tracking-wider text-[10px] block mb-0.5">
                        Servicios Familiares
                      </span>
                      {sede.familiarSchedule.map((line) => (
                        <p key={line} className="text-zinc-600 font-medium">{line}</p>
                      ))}
                    </div>

                    {sede.youthSchedule && (
                      <div>
                        <span className="font-bold text-zinc-800 uppercase tracking-wider text-[10px] block mb-0.5">
                          Jóvenes
                        </span>
                        <p className="text-zinc-600 font-medium">{sede.youthSchedule}</p>
                      </div>
                    )}

                    {sede.prayerSchedule && (
                      <div>
                        <span className="font-bold text-zinc-500 uppercase tracking-wider text-[10px] block mb-0.5">
                          Oración y Formación
                        </span>
                        <p className="text-zinc-500">{sede.prayerSchedule}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botón directo a Google Maps */}
              <div className="p-6 pt-0">
                <a
                  href={sede.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-100 py-3 text-xs font-bold uppercase tracking-wider text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Ver Ubicación en Maps
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Franja de invitación a Planificar la Visita */}
      <section className="bg-zinc-900 text-white py-12 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl font-bold uppercase tracking-tight">
              ¿Nos visitas por primera vez?
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Queremos recibirte con un anfitrión especial para guiarte junto a tu familia.
            </p>
          </div>
          <Link
            href="/soy-nuevo"
            className="shrink-0 rounded-full bg-accent-cream px-7 py-3 text-xs font-bold uppercase tracking-wider text-zinc-950 hover:bg-white transition-colors"
          >
            Planifica tu visita
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}