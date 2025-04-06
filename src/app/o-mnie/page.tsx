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
          <link rel="icon" href="/logo.svg" />

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white mb-12">
            O mnie
          </h1>

          <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
            <div className="relative group rounded-full border-4 border-gray-700 overflow-hidden w-72 h-72 flex-shrink-0 transition-all duration-500 hover:shadow-[0_0_30px_#3b82f6] hover:scale-105">
              <Image
                src="/images/seweryn1.jpg"
                alt="Seweryn Stalinger"
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
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
                  <strong>GoIT Fullstack Developer</strong> – szeroka wiedza z
                  zakresu frontendu i backendu.
                </li>
                <li>
                  <strong>Meta Advanced React</strong> – zaawansowane
                  umiejętności w React od Meta (Facebook).
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-12 w-full mt-12 max-w-4xl text-left">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Dlaczego używam tych technologii?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative border border-gray-700 rounded-xl p-6 shadow transition-transform transform hover:scale-105 hover:border-blue-600">
                <h3 className="text-xl font-bold text-white mb-3">Next.js</h3>
                <p className="text-gray-300">
                  Strony stworzone z Next.js ładują się błyskawicznie dzięki
                  zaawansowanym technikom optymalizacji. To oznacza lepsze
                  pozycjonowanie w Google i więcej klientów na Twojej stronie.
                </p>
              </div>

              <div className="group relative border border-gray-700 rounded-xl p-6 shadow transition-transform transform hover:scale-105 hover:border-blue-600">
                <h3 className="text-xl font-bold text-white mb-3">
                  TypeScript
                </h3>
                <p className="text-gray-300">
                  TypeScript gwarantuje bezbłędne działanie strony i jej
                  stabilność. Klienci widzą profesjonalizm i jakość, co buduje
                  ich zaufanie i zwiększa szanse na sprzedaż.
                </p>
              </div>

              <div className="group relative border border-gray-700 rounded-xl p-6 shadow transition-transform transform hover:scale-105 hover:border-blue-600">
                <h3 className="text-xl font-bold text-white mb-3">
                  Tailwind CSS
                </h3>
                <p className="text-gray-300">
                  Dzięki Tailwind CSS Twoja strona jest estetyczna, nowoczesna i
                  w pełni responsywna. Piękny design przyciąga uwagę i skłania
                  do zakupów.
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
