"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Schedules from "@/components/Schedules";
import Ministries from "@/components/Ministries";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";
import PastoralChat from "@/components/PastoralChat";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="min-h-screen w-full bg-[#F7F7F5] relative flex flex-col">
      <Header />
      <Hero onOpenChat={() => setIsChatOpen(true)} />
      <Schedules />
      <Ministries />
      <Footer />
      <FloatingChatButton onOpenChat={() => setIsChatOpen(true)} />
      <AnimatePresence>
        {isChatOpen && (
          <PastoralChat onClose={() => setIsChatOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}