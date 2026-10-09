import { defineField, defineType } from "sanity";

export const sedeType = defineType({
  name: "sede",
  title: "Sedes y Auditorios",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre de la Sede",
      type: "string",
      description: "Ej: Auditorio Principal Iviluz, Sede Cabudare",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Etiqueta / Distintivo",
      type: "string",
      description: "Ej: Sede Central, Extensión Metropolitana",
      initialValue: "Extensión",
    }),
    defineField({
      name: "address",
      title: "Dirección Exacta",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pastors",
      title: "Pastores o Líderes a Cargo",
      type: "string",
      description: "Ej: Pastores Orlando e Ivilien / Equipo Pastoral de Zona",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "familiarSchedule",
      title: "Horarios de Servicios Familiares",
      type: "array",
      of: [{ type: "string" }],
      description: "Ej: Domingos: 8:00 AM y 10:00 AM",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youthSchedule",
      title: "Horario de Jóvenes (Somos Luz)",
      type: "string",
      description: "Ej: Sábados: 4:30 PM",
    }),
    defineField({
      name: "prayerSchedule",
      title: "Horario de Oración / Matutino",
      type: "string",
      description: "Ej: Miércoles: 6:00 PM · Matutino: 5:00 AM",
    }),
    defineField({
      name: "image",
      title: "Fotografía del Auditorio / Fachada",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "mapsUrl",
      title: "Enlace a Google Maps",
      type: "url",
      description: "Link directo para abrir en la app de mapas",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Orden de Aparición",
      type: "number",
      initialValue: 1,
    }),
  ],
  orderings: [
    {
      title: "Orden Personalizado",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});