"use client";

import { useState, useRef, useEffect, Fragment, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, Send, LoaderCircle, Calendar } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const MARKDOWN_LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderMessageContent(content: string, onClose: () => void) {
  const parts: Array<string | { text: string; href: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  MARKDOWN_LINK_REGEX.lastIndex = 0;
  while ((match = MARKDOWN_LINK_REGEX.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }
    parts.push({ text: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return parts.map((part, index) => {
    if (typeof part === "string") {
      return <Fragment key={index}>{part}</Fragment>;
    }
    return (
      <Link
        key={index}
        href={part.href}
        onClick={onClose}
        className="font-bold underline underline-offset-2 hover:text-zinc-700 text-zinc-950"
      >
        {part.text}
      </Link>
    );
  });
}

interface PastoralChatProps {
  onClose: () => void;
}

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hola, soy parte del equipo de consejería de Iglesia Iviluz. Estoy aquí para escucharte con calma y sin juicio. ¿Qué tienes en tu corazón hoy?",
};

const MAX_USER_MESSAGES = 4;

export default function PastoralChat({ onClose }: PastoralChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Contamos cuántos mensajes ha enviado el usuario
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const isLimitReached = userMessageCount >= MAX_USER_MESSAGES;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isStreaming]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading || isStreaming || isLimitReached) return;

    const userMessage: ChatMessage = { role: "user", content: trimmedInput };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Error al contactar al servidor.");
      }

      // Preparamos la burbuja del asistente para recibir el streaming en vivo
      setIsLoading(false);
      setIsStreaming(true);
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantReply = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantReply += chunk;

        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: assistantReply,
          };
          return next;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Lo siento, tuvimos un inconveniente técnico. Por favor intenta de nuevo en unos momentos.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.96 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-zinc-900 shadow-2xl md:inset-auto md:bottom-6 md:right-6 md:h-[600px] md:w-96 md:rounded-2xl md:border md:border-zinc-800"
    >
      {/* Cabecera del Chat */}
      <div className="flex shrink-0 items-center justify-between bg-black px-5 py-4">
        <div>
          <h2 className="text-lg font-bold text-white">Consejería Iviluz</h2>
          <p className="text-[11px] text-zinc-400">
            {isLimitReached
              ? "Atención virtual completada"
              : `Orientación pastoral (${userMessageCount}/${MAX_USER_MESSAGES})`}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar chat"
          className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors duration-300 hover:text-accent-cream cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Lista de Mensajes */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-zinc-800 text-white"
                  : "bg-accent-cream text-black shadow-md"
              }`}
            >
              {renderMessageContent(message.content, onClose)}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl bg-accent-cream px-4 py-2 text-sm text-black">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Conectando con el consejero...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Pie del Chat: Input habitual o Bloqueo al alcanzar 4 turnos */}
      {isLimitReached ? (
        <div className="flex flex-col gap-3 border-t border-zinc-800 bg-zinc-950 p-4">
          <p className="text-center text-xs text-zinc-300 leading-relaxed">
            Has completado las orientaciones automáticas de esta sesión. Nuestro equipo pastoral está listo para escucharte personalmente.
          </p>
          <Link
            href="/agendar"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-xl bg-accent-cream py-3 text-xs font-bold uppercase tracking-wider text-black transition-transform duration-300 hover:scale-[1.02]"
          >
            <Calendar className="h-4 w-4" />
            Agendar Cita Pastoral
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex shrink-0 items-center gap-2 border-t border-zinc-800 bg-zinc-900 p-3"
        >
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={
              isStreaming
                ? "El pastor está respondiendo..."
                : "Escribe tu mensaje..."
            }
            disabled={isLoading || isStreaming}
            className="flex-1 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-accent-cream disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || isStreaming || !input.trim()}
            aria-label="Enviar mensaje"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-cream text-black transition-transform duration-300 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </motion.div>
  );
}