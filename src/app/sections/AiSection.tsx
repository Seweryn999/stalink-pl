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
      className="py-20 bg-gradient-to-b from-white to-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Tekst i opis */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Automatyzacja AI dla nowoczesnych stron
          </h2>
          <p className="text-lg text-gray-600">
            Zintegruj z naszą stroną inteligentne rozwiązania AI: chatbot,
            system umawiania wizyt i automatyczne zbieranie opinii. Pozwól
            technologii pracować dla Ciebie — zwiększ satysfakcję klientów,
            zoptymalizuj procesy i zyskaj przewagę nad konkurencją.
          </p>
          <ul className="text-gray-600 list-disc list-inside space-y-2">
            <li>Chatbot 24/7 – natychmiastowe odpowiedzi i zbieranie leadów</li>
            <li>
              Rezerwacje online – eliminacja błędów i przypomnienia SMS/Email
            </li>
            <li>Opinie Google – automatyczne powiadomienia i lepsze SEO</li>
          </ul>
          <a
            href="#automatyzacja-ai"
            className="inline-block mt-4 px-8 py-3 bg-blue-500 text-white font-semibold rounded-full transition-all hover:bg-blue-600"
          >
            Dowiedz się więcej
          </a>
        </div>

        {/* Grafika */}
        <div className="flex-1 relative w-full h-64 md:h-80 lg:h-96">
          <Image
            src="/images/aimain.png"
            alt="Futuristic AI network illustration"
            fill
            className="object-contain rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </motion.section>
  );
}
