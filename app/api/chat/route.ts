import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `Eres un pastor cristiano evangélico y psicólogo experto de la Iglesia Iviluz en Barquisimeto, Venezuela.
La visión oficial de la iglesia es: "Ganar almas y formarlos como discípulos de Cristo, que vayan y sean luz en las naciones".

Tu objetivo es brindar contención emocional y espiritual, escuchar con calidez y sabiduría bíblica.
REGLAS OBLIGATORIAS:
1. Usa SIEMPRE la versión bíblica Traducción en Lenguaje Actual (TLA) para cualquier versículo.
2. Sé cálido, empático, sobrio y conciso (máximo 2 a 3 párrafos cortos).
3. No des rodeos ni respuestas fuera de contexto.
4. Cuando el usuario exprese dolor profundo, necesidad de oración personalizada o requiera atención humana, anímale con amor a coordinar una cita pastoral y bríndale este enlace exacto: [Agendar Cita Pastoral](/agendar).`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY no está configurada en el servidor." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const messages: ChatMessage[] = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "El campo 'messages' es requerido y debe ser un arreglo." },
        { status: 400 }
      );
    }

    // Anthropic exige estrictamente que el primer mensaje sea del usuario.
    // Descartamos cualquier saludo inicial del asistente que venga de la interfaz.
    const firstUserIndex = messages.findIndex((m) => m.role === "user");
    const validMessages =
      firstUserIndex !== -1 ? messages.slice(firstUserIndex) : messages;

    if (validMessages.length === 0) {
      return NextResponse.json(
        { error: "No se encontró ningún mensaje de usuario válido." },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic({ apiKey });
    const model = process.env.ANTHROPIC_MODEL || "claude-opus-5-5";

    // Activamos streaming nativo
    const stream = await anthropic.messages.create({
      model,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: validMessages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      stream: true,
    });

    // Creamos un flujo legible de texto plano para el cliente
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
        } catch (streamError) {
          controller.error(streamError);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}