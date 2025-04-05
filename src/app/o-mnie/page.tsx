// src/app/o-mnie/page.tsx

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import StarsBackground from "../../components/ui/StarsBackground";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <StarsBackground />
      <Header />
      <section className="min-h-screen py-20 sm:py-32 lg:py-40 flex justify-center text-white bg-black">
        <div className="max-w-6xl w-full px-6 sm:px-8 lg:px-10 flex flex-col items-center gap-y-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white mb-12 animate-fadeIn">
            O mnie
          </h1>

          <div className="flex flex-col lg:flex-row gap-12 items-center w-full animate-fadeIn">
            <div className="relative group rounded-full border-4 border-gray-700 hover:shadow-[0_0_20px_5px_#3b82f6] transition-all duration-500 overflow-hidden w-72 h-72 flex-shrink-0">
              <Image
                src="/images/seweryn1.jpg"
                alt="Seweryn Stalinger"
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="text-gray-300 leading-relaxed text-lg space-y-6 max-w-3xl text-left">
              <p>
                Nazywam się <strong>Seweryn Stalinger</strong> i jestem frontend
                developerem z pasją do tworzenia nowoczesnych, responsywnych i
                wydajnych stron internetowych. Obecnie jestem na{" "}
                <strong>drugim semestrze studiów</strong> o kierunku{" "}
                <strong>Informatyka</strong>, gdzie stale rozwijam swoją wiedzę
                teoretyczną i praktyczną z zakresu programowania oraz
                projektowania aplikacji webowych.
              </p>

              <p>Posiadam certyfikaty potwierdzające moje umiejętności:</p>

              <ul className="list-disc list-inside pl-4 space-y-2">
                <li>
                  <strong>GoIT Fullstack Developer</strong> – potwierdzający
                  szeroką wiedzę z zakresu programowania frontendu i backendu.
                </li>
                <li>
                  <strong>Meta Advanced React</strong> – certyfikat od Meta
                  (Facebook), dokumentujący zaawansowane umiejętności w React.
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-12 w-full mt-12 max-w-4xl text-left animate-fadeIn">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Dlaczego używam tych technologii?
            </h2>

            <div className="space-y-8">
              <div className="group">
                <h3 className="text-2xl text-blue-400 font-semibold mb-2 group-hover:scale-105 transition-transform duration-300">
                  Next.js
                </h3>
                <p>
                  Next.js to framework oparty na React, który umożliwia
                  tworzenie aplikacji z renderingiem po stronie serwera (SSR)
                  oraz generacją statyczną (SSG). Dzięki Next.js mogę tworzyć
                  strony internetowe, które są szybkie, wydajne i doskonale
                  zoptymalizowane pod kątem SEO.
                </p>
              </div>

              <div className="group">
                <h3 className="text-2xl text-blue-400 font-semibold mb-2 group-hover:scale-105 transition-transform duration-300">
                  TypeScript
                </h3>
                <p>
                  TypeScript jest nadzbiorem JavaScript, który dodaje statyczne
                  typowanie do kodu. Pozwala na szybsze wykrywanie błędów i
                  poprawia czytelność kodu, co jest szczególnie ważne w
                  większych projektach.
                </p>
              </div>

              <div className="group">
                <h3 className="text-2xl text-blue-400 font-semibold mb-2 group-hover:scale-105 transition-transform duration-300">
                  Tailwind CSS
                </h3>
                <p>
                  Tailwind CSS umożliwia szybkie prototypowanie oraz precyzyjne
                  kontrolowanie wyglądu aplikacji. Dzięki temu mogę tworzyć
                  estetyczne i responsywne interfejsy użytkownika bez
                  konieczności pisania złożonych plików CSS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
