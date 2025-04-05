"use client";

import React from "react";
import Header from "../../components/ui/Header";

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col items-center px-4 py-12 md:py-20 text-white">
      <Header />
      <div className="max-w-4xl w-full px-4 space-y-10 pt-16 md:pt-20">
        <link rel="icon" href="/logo.svg" />

        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white mb-8 md:mb-12 text-center animate-pulse-slow">
          Polityka Prywatności
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed text-base md:text-lg">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              1. Informacje ogólne
            </h2>
            <p>
              Niniejsza Polityka Prywatności opisuje zasady przetwarzania danych
              osobowych przez stronę internetową STALINK.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              2. Zakres zbieranych danych osobowych
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Imię i nazwisko - w celu identyfikacji użytkownika w
                formularzach kontaktowych.
              </li>
              <li>Adres e-mail - w celu umożliwienia kontaktu zwrotnego.</li>
              <li>
                Treść wiadomości - w celu umożliwienia odpowiedzi na zapytanie.
              </li>
              <li>
                Adres IP - w celach bezpieczeństwa i diagnostyki technicznej.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              3. Cel przetwarzania danych osobowych
            </h2>
            <p className="mb-2">
              Dane osobowe są przetwarzane w następujących celach:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Odpowiadanie na zapytania użytkowników przesłane za pomocą
                formularzy kontaktowych.
              </li>
              <li>Realizacja usług oferowanych na Stronie.</li>
              <li>
                Monitorowanie ruchu na Stronie oraz analityka w celu poprawy
                jakości usług.
              </li>
              <li>Zapewnienie bezpieczeństwa Strony.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              4. Prawa użytkownika
            </h2>
            <p className="mb-2">Użytkownik ma prawo do:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Dostępu do swoich danych osobowych.</li>
              <li>Sprostowania danych osobowych.</li>
              <li>Usunięcia danych osobowych.</li>
              <li>Ograniczenia przetwarzania danych osobowych.</li>
              <li>Przenoszenia danych.</li>
              <li>Wniesienia sprzeciwu wobec przetwarzania danych.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              5. Pliki Cookies
            </h2>
            <p>
              Strona korzysta z plików cookies w celu zapewnienia poprawnego
              działania, analizy ruchu oraz optymalizacji treści.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              6. Kontakt
            </h2>
            <p>
              W razie pytań dotyczących Polityki Prywatności, prosimy o kontakt
              pod adresem e-mail:{" "}
              <a
                href="mailto:seweryn.webdev@gmail.com"
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                seweryn.webdev@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
