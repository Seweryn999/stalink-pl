"use client";

import Image from "next/image";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import { motion } from "framer-motion";

export default function AiServicesSection() {
  const services = [
    {
      title: "Chatbot",
      description:
        "Inteligentny chatbot dostępny 24/7 do obsługi klientów, odpowiada na pytania i automatyzuje konwersacje.",
      benefits: [
        "Natychmiastowe odpowiedzi — klienci nie czekają na maila czy telefon.",
        "Zbieranie leadów i kwalifikowanie ich automatycznie.",
        "Redukcja kosztów obsługi nawet o 50–70%.",
      ],
      img: "/images/aisection2.png",
    },
    {
      title: "System umawiania spotkań",
      description:
        "Automatyczny system rezerwacji terminów zintegrowany z kalendarzem, który przypomina o wizytach.",
      benefits: [
        "Eliminuje podwójne rezerwacje i pomyłki.",
        "Przypomnienia SMS/Email zmniejszają liczbę nieodbytych wizyt.",
        "Zwiększa lojalność klientów dzięki prostemu UX.",
      ],
      img: "/images/aisection1.png",
    },
    {
      title: "System ocen z powiadomieniami",
      description:
        "System zachęcający klientów do zostawiania opinii w Google z powiadomieniami dla właściciela o nowych ocenach.",
      benefits: [
        "Automatycznie zwiększa liczbę pozytywnych recenzji.",
        "Poprawia widoczność w Google i pozycjonowanie.",
        "Powiadomienia w czasie rzeczywistym dla właściciela.",
      ],
      img: "/images/aisection.png",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="automatyzacja-ai"
      className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <Header />

      <div className="flex-grow max-w-6xl mx-auto px-4 pt-20 pb-8">
        {/* Nagłówek i wprowadzenie */}
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-center text-blue-800 mb-4"
          variants={itemVariants}
        >
          Usługi Automatyzacji AI
        </motion.h2>
        <motion.p
          className="text-base md:text-lg text-gray-700 text-center max-w-3xl mx-auto mb-8"
          variants={itemVariants}
        >
          Wdrożenie inteligentnych rozwiązań AI na stronie internetowej to nie
          tylko prestiż, ale realne korzyści: skrócenie czasu obsługi klienta,
          wyższe konwersje i łatwiejsze skalowanie biznesu. Poznaj nasze
          kluczowe usługi, które działają 24/7 i odciążają Twoją firmę.
        </motion.p>

        {/* Karty usług */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
        >
          {services.map((svc) => (
            <motion.div
              key={svc.title}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
              variants={itemVariants}
            >
              <div className="w-24 h-24 mb-3 relative">
                <Image
                  src={svc.img}
                  alt={svc.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-1 text-center">
                {svc.title}
              </h3>
              <p className="text-gray-600 mb-2 text-center text-sm">
                {svc.description}
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1 text-left text-sm">
                {svc.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <a
                href="#kontakt"
                className="mt-auto px-4 py-2 bg-blue-500 text-white font-medium rounded-full text-sm hover:bg-blue-600"
              >
                Skontaktuj się
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Dlaczego automatyzacja */}
        <motion.div
          className="bg-white/70 backdrop-blur rounded-xl p-6 mb-12"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-center text-blue-800 mb-3">
            Dlaczego automatyzacja jest kluczowa?
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1 max-w-3xl mx-auto text-sm">
            <li>
              Obsługa 24/7: Twoi klienci nigdy nie czekają, nawet poza godzinami
              pracy.
            </li>
            <li>
              Oszczędność czasu: Automatyzując rutynowe zadania, zespół może
              skupić się na rozwoju biznesu.
            </li>
            <li>
              Większe konwersje: Natychmiastowa interakcja z użytkownikiem
              zwiększa szansę na sprzedaż.
            </li>
            <li>
              Lepsza reputacja: Zbierane na bieżąco opinie poprawiają
              pozycjonowanie i zaufanie do marki.
            </li>
            <li>
              Skalowalność: Rozwiązania AI rosną razem z Twoją firmą, bez
              konieczności zatrudniania kolejnych osób.
            </li>
          </ul>
        </motion.div>

        {/* CTA końcowe */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <a
            href="/kontakt"
            className="inline-block px-6 py-3 bg-blue-500 text-white font-bold rounded-full text-sm hover:bg-blue-600"
          >
            Umów bezpłatną konsultację
          </a>
        </motion.div>
      </div>

      <Footer />
    </motion.section>
  );
}
