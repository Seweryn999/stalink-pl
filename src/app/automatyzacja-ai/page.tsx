import Image from "next/image";

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
        "Przypomnienia SMS/email zmniejszają liczbę nieodbytych wizyt.",
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

  return (
    <section
      id="automatyzacja-ai"
      className="py-24 bg-gradient-to-b from-blue-50 to-blue-100"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Nagłówek i wprowadzenie */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-blue-800 mb-6">
          Usługi Automatyzacji AI
        </h2>
        <p className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12">
          Wdrożenie inteligentnych rozwiązań AI na stronie internetowej to nie
          tylko prestiż, ale realne korzyści: skrócenie czasu obsługi klienta,
          wyższe konwersje i łatwiejsze skalowanie biznesu. Poznaj nasze
          kluczowe usługi, które działają 24/7 i odciążają Twoją firmę.
        </p>

        {/* Karty usług */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <div className="w-32 h-32 mb-4 relative">
                <Image
                  src={svc.img}
                  alt={svc.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-blue-800 mb-2">
                {svc.title}
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                {svc.description}
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
                {svc.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <a
                href="#kontakt"
                className="mt-auto px-6 py-3 bg-blue-800 text-white font-semibold rounded-full transition-all hover:bg-blue-700"
              >
                Skontaktuj się
              </a>
            </div>
          ))}
        </div>

        {/* Sekcja „Dlaczego automatyzacja?” */}
        <div className="mt-16 bg-white/50 backdrop-blur-lg rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-center text-blue-800 mb-4">
            Dlaczego automatyzacja jest kluczowa?
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 max-w-3xl mx-auto">
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

        {/* CTA końcowe */}
        <div className="mt-12 text-center">
          <a
            href="/kontakt"
            className="inline-block px-8 py-4 bg-pink-500 text-white font-bold rounded-full text-lg transition-all hover:bg-pink-400"
          >
            Umów bezpłatną konsultację
          </a>
        </div>
      </div>
    </section>
  );
}
