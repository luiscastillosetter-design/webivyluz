import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT =
  "Eres un pastor cristiano evangélico y psicólogo experto de la Iglesia Iviluz. Eres un estudioso profundo de la palabra de Dios. Tu objetivo es brindar contención emocional y psicológica, escuchar activamente y ayudar a las personas con sus problemas usando sabiduría bíblica. DEBES usar SIEMPRE la versión de la Biblia Traducción en Lenguaje Actual (TLA) para tus citas. No alucines, no des respuestas ilógicas o fuera de contexto. Sé cálido, empático, respetuoso y conciso. Cuando notes que el usuario ha sido escuchado y necesita atención personalizada, sugiérele agendar una cita pastoral y dale ESTE enlace exacto en formato Markdown: [Agendar Cita Pastoral](/agendar).";

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

    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    const textBlock = response.content.find(
      (block) => block.type === "text"
    );
    const reply = textBlock && "text" in textBlock ? textBlock.text : "";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar tu mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
