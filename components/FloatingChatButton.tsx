"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

interface FloatingChatButtonProps {
  onOpenChat: () => void;
}

export default function FloatingChatButton({
  onOpenChat,
}: FloatingChatButtonProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="floating-chat-button"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 z-[90] rounded-2xl border border-zinc-700 bg-zinc-950 p-5 text-white shadow-2xl backdrop-blur-xl md:bottom-8 md:left-auto md:right-8 md:w-96 pointer-events-auto"
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar tarjeta"
            className="absolute right-3 top-3 text-zinc-400 transition-colors duration-300 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="pr-6 text-lg font-bold text-white leading-tight">
            ¿Necesitas ayuda o contención?
          </p>
          <p className="mt-2 text-xs text-zinc-300">
            Habla con nosotros de forma confidencial
          </p>
          <button
            type="button"
            onClick={onOpenChat}
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-200 transition-colors duration-300 hover:text-white cursor-pointer"
          >
            Hablar ahora
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}