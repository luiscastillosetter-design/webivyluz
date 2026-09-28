"use client";

import Image from "next/image";

interface Ministry {
  title: string;
  description: string;
  image: string;
  cta: string;
}

const ministries: Ministry[] = [
  {
    title: "COMUNIDAD",
    description:
      "No fuimos creados para hacer la vida solos. Únete a una célula y encuentra tu familia espiritual.",
    image:
      "/media/iglesiaiviluz_20260310_p_3849944592100178236_3_3849938668644071469.webp",
    cta: "Únete",
  },
  {
    title: "ADORACIÓN",
    description:
      "Levantamos un sonido que transforma atmósferas. Únete a nuestro equipo de alabanza.",
    image:
      "/media/iglesiaiviluz_20260310_p_3849944592100178236_1_3849938660733597282.webp",
    cta: "Saber más",
  },
  {
    title: "IVILUZ KIDS",
    description:
      "Formando a la próxima generación con amor, principios y la Palabra de Dios desde temprana edad.",
    image:
      "/media/iglesiaiviluz_20260310_p_3849944592100178236_5_3849938684112643248.webp",
    cta: "Saber más",
  },
  {
    title: "BAUTIZOS",
    description:
      "Tu siguiente paso de fe. Declara públicamente tu nueva vida en Cristo.",
    image: "/media/bautizos.webp",
    cta: "Únete",
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
          <div className="relative min-h-[50vh] w-full md:min-h-[60vh] md:w-1/2">
            <Image
              src={ministry.image}
              alt={ministry.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex w-full flex-col items-start justify-center bg-[#F7F7F5] p-12 md:w-1/2 lg:p-24">
            <h3 className="mb-4 text-4xl font-black tracking-tighter text-zinc-900 md:text-6xl">
              {ministry.title}
            </h3>
            <p className="mb-8 text-lg text-zinc-500">
              {ministry.description}
            </p>
            <a
              href="#contacto"
              className="border border-zinc-900 px-6 py-3 text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              {ministry.cta}
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}