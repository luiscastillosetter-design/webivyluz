import { defineField, defineType } from "sanity";

export const predicaType = defineType({
  name: "predica",
  title: "Prédicas y Series",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título de la Prédica",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "speaker",
      title: "Pastor / Predicador",
      type: "string",
      initialValue: "Pastor Orlando",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "series",
      title: "Serie o Categoría",
      type: "string",
      options: {
        list: [
          { title: "Series Dominicales", value: "Series Dominicales" },
          { title: "Somos Luz (Jóvenes)", value: "Somos Luz (Jóvenes)" },
          { title: "Familia y Matrimonio", value: "Familia y Matrimonio" },
          { title: "Universidad de la Vida", value: "Universidad de la Vida" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "Enlace del Video de YouTube",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duración aproximada (ej: 45 min)",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Fecha de la Prédica",
      type: "date",
    }),
    defineField({
      name: "thumbnail",
      title: "Imagen de Portada / Miniatura",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});