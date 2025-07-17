"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AiFeatureSection() {
  const container = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      id="ai-automation"
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Tekst i opis */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Automatyzacja <span className="text-blue-600">AI</span> dla
            nowoczesnych stron
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-lg">
            Zintegruj z naszą stroną inteligentne rozwiązania AI: chatbot,
            system umawiania wizyt i automatyczne zbieranie opinii. Pozwól
            technologii pracować dla Ciebie — zwiększ satysfakcję klientów,
            zoptymalizuj procesy i zyskaj przewagę nad konkurencją.
          </p>
          <ul className="text-gray-700 list-disc list-inside space-y-2 text-base">
            <li>Chatbot 24/7 – natychmiastowe odpowiedzi i zbieranie leadów</li>
            <li>
              Rezerwacje online – eliminacja błędów i przypomnienia SMS/Email
            </li>
            <li>Opinie Google – automatyczne powiadomienia i lepsze SEO</li>
          </ul>
          <a
            href="#automatyzacja-ai"
            className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition"
          >
            Dowiedz się więcej
          </a>
        </div>

        {/* Grafika */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <Image
              src="/images/aimain.png"
              alt="Futuristic AI network illustration"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
