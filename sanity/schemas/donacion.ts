import { defineField, defineType } from "sanity";

export const donacionType = defineType({
  name: "donacion",
  title: "Cuentas para Ofrendar",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título de la Configuración",
      type: "string",
      initialValue: "Cuentas Oficiales Iglesia Iviluz",
      validation: (Rule) => Rule.required(),
    }),
    
    // Bloque Bancos Nacionales
    defineField({
      name: "bankName",
      title: "Banco Nacional",
      type: "string",
      initialValue: "Banco Provincial (0108)",
    }),
    defineField({
      name: "accountNumber",
      title: "Número de Cuenta Bancaria (20 dígitos)",
      type: "string",
      description: "Ej: 0108-0000-00-0000000000",
    }),
    defineField({
      name: "rif",
      title: "RIF Oficial de la Iglesia",
      type: "string",
      initialValue: "J-29402194-8",
    }),
    defineField({
      name: "pagoMovilPhone",
      title: "Teléfono Pago Móvil",
      type: "string",
      description: "Ej: 0414-0000000",
    }),

    // Bloque Zelle
    defineField({
      name: "zelleEmail",
      title: "Correo Electrónico de Zelle",
      type: "string",
      description: "Ej: iviluzchurch@gmail.com",
    }),
    defineField({
      name: "zelleHolder",
      title: "Titular de la Cuenta Zelle",
      type: "string",
      initialValue: "Iglesia Iviluz",
    }),

    // Bloque Cripto / Binance
    defineField({
      name: "binancePayId",
      title: "Binance Pay ID (Cero comisiones)",
      type: "string",
      description: "Ej: 800294021",
    }),
    defineField({
      name: "usdtWallet",
      title: "Dirección de Billetera USDT (TRC-20)",
      type: "string",
      description: "Dirección TRC20 completa",
    }),
  ],
});