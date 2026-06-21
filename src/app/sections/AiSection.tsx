// src/components/sections/AiFeatureSection.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AiFeatureSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      id="automatyzacja-ai"
      className="bg-[#0a0e1f] flex flex-col justify-center min-h-screen py-12 pt-20 md:pt-24 scroll-mt-20 md:scroll-mt-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants} // ✅ już działa
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Tekst i opis */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Automatyzacja AI dla nowoczesnych stron
          </h2>
          <p className="text-lg text-slate-300 mb-6">
            Zintegruj z naszą stroną inteligentne rozwiązania AI: chatbot,
            system umawiania wizyt i automatyczne zbieranie opinii. Pozwól
            technologii pracować dla Ciebie — zwiększ satysfakcję klientów,
            zoptymalizuj procesy i zyskaj przewagę nad konkurencją.
          </p>
          <ul className="text-slate-300 list-disc list-inside space-y-2 mb-8">
            <li>Chatbot 24/7 – natychmiastowe odpowiedzi i zbieranie leadów</li>
            <li>
              Rezerwacje online – eliminacja błędów i przypomnienia SMS/Email
            </li>
            <li>Opinie Google – automatyczne powiadomienia i lepsze SEO</li>
          </ul>
          <a
            href="/automatyzacja-ai"
            className="inline-block px-8 py-3 bg-cyan-500 text-[#05060f] font-semibold rounded-full transition-all hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]"
          >
            Dowiedz się więcej
          </a>
        </div>

        {/* Grafika */}
        <div className="flex-1 relative w-full h-64 md:h-80">
          <Image
            src="/images/aimain.png"
            alt="Grafika AI Automation"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </motion.section>
  );
}
