"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Users, Smile, HeartHandshake } from "lucide-react";

interface MinistryCard {
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
  cta: string;
}

const ministries: MinistryCard[] = [
  {
    title: "IVILUZ KIDS",
    category: "Generación Infantil",
    description:
      "Un ambiente dinámico, seguro y lleno del amor de Dios donde los niños aprenden principios bíblicos prácticos para sus vidas.",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_2_3849938664567168038.webp",
    href: "/ministerios#generacionales",
    cta: "Conocer Más",
  },
  {
    title: "IVILUZ TEENS",
    category: "Adolescentes con Propósito",
    description:
      "Acompañamiento, fe y amistad sólida para adolescentes en una etapa crucial de identidad y decisiones.",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_5_3849938684112643248.webp",
    href: "/ministerios#generacionales",
    cta: "Conocer Más",
  },
  {
    title: "SOMOS LUZ",
    category: "Ministerio de Jóvenes",
    description:
      "Un movimiento apasionado que enciende la luz de Cristo en colegios, universidades y en toda la ciudad.",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_3_3849938668644071469.webp",
    href: "/ministerios#generacionales",
    cta: "Conocer Más",
  },
  {
    title: "MINISTERIO DE ADULTOS",
    category: "Familias & Matrimonios",
    description:
      "Edificación integral para hombres, mujeres y matrimonios sobre la roca firme de la Palabra de Dios.",
    image: "/media/iglesiaiviluz_20260310_p_3849944592100178236_6_3849938690672513949.webp",
    href: "/ministerios#generacionales",
    cta: "Conocer Más",
  },
];

export default function Ministries() {
  return (
    <section id="ministerios" className="w-full bg-[#F7F7F5]">
      {ministries.map((ministry, index) => (
        <div
          key={ministry.title}
          className={`flex flex-col md:flex-row ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="relative min-h-[40vh] sm:min-h-[50vh] w-full md:w-1/2 bg-zinc-900">
            <Image
              src={ministry.image}
              alt={ministry.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-90"
            />
          </div>

          <div className="flex w-full flex-col items-start justify-center bg-[#F7F7F5] p-8 md:w-1/2 lg:p-20">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-amber-800 mb-2">
              {ministry.category}
            </span>
            <h3 className="mb-4 text-3xl font-black uppercase tracking-tight text-zinc-900 md:text-5xl">
              {ministry.title}
            </h3>
            <p className="mb-6 text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-lg">
              {ministry.description}
            </p>
            <Link
              href={ministry.href}
              className="rounded-full border border-zinc-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white"
            >
              {ministry.cta}
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}