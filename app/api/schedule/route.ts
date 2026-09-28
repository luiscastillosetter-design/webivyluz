import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface ScheduleRequestBody {
  firstName: string;
  lastName: string;
  address: string;
  age: number | string;
  phone: string;
  email: string;
  instagram: string;
  inTreatment: "yes" | "no";
  treatmentContext?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ScheduleRequestBody = await request.json();

    const {
      firstName,
      lastName,
      address,
      age,
      phone,
      email,
      instagram,
      inTreatment,
      treatmentContext,
    } = body;

    const requiredFields: Array<[string, unknown]> = [
      ["firstName", firstName],
      ["lastName", lastName],
      ["address", address],
      ["age", age],
      ["phone", phone],
      ["email", email],
      ["instagram", instagram],
      ["inTreatment", inTreatment],
    ];

    const missingFields = requiredFields
      .filter(([, value]) => value === undefined || value === null || value === "")
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Faltan campos obligatorios: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Simulación de inserción en base de datos.
    console.log("Nueva solicitud de cita pastoral recibida:", {
      firstName,
      lastName,
      address,
      age,
      phone,
      email,
      instagram,
      inTreatment,
      treatmentContext: treatmentContext || null,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Cita agendada" });
  } catch (error) {
    console.error("Error en /api/schedule:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ocurrió un error al procesar tu solicitud. Intenta de nuevo.",
      },
      { status: 500 }
    );
  }
}
