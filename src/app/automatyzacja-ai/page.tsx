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

  // 🔷 TU JEST POPRAWKA
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const openChat = () => {
    if (typeof window !== "undefined" && window.voiceflow?.chat?.open) {
      window.voiceflow.chat.open();
    } else {
      console.error("Voiceflow chat is not initialized yet.");
    }
  };

  return (
    <>
      <Header />

      <motion.section
        id="automatyzacja-ai"
        className="bg-gradient-to-b from-blue-50 to-blue-100/60 flex flex-col justify-center min-h-screen py-12 pt-20 md:pt-24 scroll-mt-20 md:scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="flex-grow flex flex-col justify-center max-w-6xl mx-auto px-4 space-y-12">
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6">
              Usługi Automatyzacji AI
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Wdrożenie inteligentnych rozwiązań AI na stronie internetowej to
              nie tylko prestiż, ale realne korzyści: skrócenie czasu obsługi
              klienta, wyższe konwersje i łatwiejsze skalowanie biznesu. Poznaj
              nasze kluczowe usługi, które działają 24/7 i odciążają Twoją
              firmę.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={containerVariants}
          >
            {services.map((svc) => (
              <motion.div
                key={svc.title}
                className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform transform hover:scale-105"
                variants={itemVariants}
              >
                <div className="w-24 h-24 mb-4 relative">
                  <Image
                    src={svc.img}
                    alt={svc.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2 text-center">
                  {svc.title}
                </h3>
                <p className="text-gray-600 mb-4 text-center">
                  {svc.description}
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1 text-left text-sm">
                  {svc.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <button
                  onClick={openChat}
                  className="mt-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 text-sm"
                >
                  Skontaktuj się
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <section className="bg-gradient-to-b from-blue-100/60 to-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Dlaczego automatyzacja jest kluczowa?
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-base">
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
        </div>
      </section>

      <section className="bg-blue-500/90 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white space-y-6">
          <h3 className="text-3xl font-bold">Zacznij automatyzować już dziś</h3>
          <p className="text-lg">
            Porozmawiajmy o tym, jak możemy wdrożyć inteligentne rozwiązania AI
            w Twojej firmie. Umów bezpłatną konsultację i odkryj nowe
            możliwości.
          </p>
          <button
            onClick={openChat}
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition"
          >
            Umów konsultację
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
