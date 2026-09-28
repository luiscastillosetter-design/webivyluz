"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  age: string;
  phone: string;
  email: string;
  instagram: string;
  inTreatment: "yes" | "no" | "";
  treatmentContext: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  address: "",
  age: "",
  phone: "",
  email: "",
  instagram: "",
  inTreatment: "",
  treatmentContext: "",
};

const inputClasses =
  "w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-accent-cream";

export default function AgendarPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          age: formData.age,
          phone: formData.phone,
          email: formData.email,
          instagram: formData.instagram,
          inTreatment: formData.inTreatment,
          treatmentContext:
            formData.inTreatment === "yes" ? formData.treatmentContext : "",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "No se pudo agendar la cita.");
      }

      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado. Intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen w-full bg-[#F9F9F7] px-6 pb-12 pt-32">
        <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-zinc-100 bg-white p-10 text-center shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
          <CheckCircle2 className="h-16 w-16 text-accent-cream" />
          <h1 className="mt-6 text-3xl font-black uppercase tracking-tighter text-zinc-900">
            ¡Solicitud enviada!
          </h1>
          <p className="mt-4 text-lg text-zinc-500">
            Tu solicitud ha sido recibida con éxito. Nuestro equipo pastoral
            se pondrá en contacto contigo muy pronto.
          </p>
          <Link
            href="/"
            className="mt-8 rounded-md bg-accent-cream px-8 py-3 text-sm font-bold tracking-wide text-zinc-900 transition-transform duration-300 hover:scale-105"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#F9F9F7] px-6 pb-12 pt-32">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 md:text-5xl">
          Agenda tu Cita Pastoral
        </h1>
        <p className="mt-4 text-lg text-zinc-500">
          Completa el siguiente formulario y un guía espiritual de nuestra
          iglesia se pondrá en contacto contigo de forma confidencial para
          coordinar tu cita.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-6 rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm md:p-10"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-sm text-zinc-600">
                Nombre
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Tu nombre"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-sm text-zinc-600">
                Apellido
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Tu apellido"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-sm text-zinc-600">
              Dirección
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={formData.address}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Tu dirección de residencia"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="age" className="text-sm text-zinc-600">
                Edad
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min={1}
                max={120}
                required
                value={formData.age}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Tu edad"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm text-zinc-600">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Ej: 0412-1234567"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-zinc-600">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="instagram" className="text-sm text-zinc-600">
              Usuario de Instagram
            </label>
            <input
              id="instagram"
              name="instagram"
              type="text"
              required
              value={formData.instagram}
              onChange={handleChange}
              className={inputClasses}
              placeholder="@tuusuario"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-zinc-600">
              ¿Estás recibiendo tratamiento psicológico o psiquiátrico
              actualmente?
            </span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-zinc-900">
                <input
                  type="radio"
                  name="inTreatment"
                  value="yes"
                  required
                  checked={formData.inTreatment === "yes"}
                  onChange={handleChange}
                  className="h-4 w-4 accent-accent-cream"
                />
                Sí
              </label>
              <label className="flex items-center gap-2 text-zinc-900">
                <input
                  type="radio"
                  name="inTreatment"
                  value="no"
                  required
                  checked={formData.inTreatment === "no"}
                  onChange={handleChange}
                  className="h-4 w-4 accent-accent-cream"
                />
                No
              </label>
            </div>
          </div>

          {formData.inTreatment === "yes" && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="treatmentContext"
                className="text-sm text-zinc-600"
              >
                Por favor, bríndanos un breve contexto para ayudarte mejor
              </label>
              <textarea
                id="treatmentContext"
                name="treatmentContext"
                rows={4}
                value={formData.treatmentContext}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Cuéntanos brevemente tu situación..."
              />
            </div>
          )}

          {errorMessage && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 flex items-center justify-center gap-2 rounded-md bg-accent-cream px-8 py-3 text-sm font-bold tracking-wide text-zinc-900 transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Agendar mi cita"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
