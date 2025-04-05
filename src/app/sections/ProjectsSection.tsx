import { Lock } from "lucide-react";
import Image from "next/image";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-32 sm:py-40 lg:py-52 flex justify-center"
    >
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-y-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white animate-pulse-slow">
          Projekty
        </h2>

        <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl leading-relaxed">
          Poniżej prezentuję moje ukończone projekty stworzone indywidualnie na
          potrzeby klienta.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 p-4 w-full">
          {/* Completed Project - BB Hair Spa */}
          <div className="relative bg-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden group mx-auto max-w-[400px] h-[320px]">
            <Image
              src="/images/bbhairspa.png"
              alt="BB Hair Spa"
              width={400}
              height={320}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/60 group-hover:bg-black/70 transition-colors duration-300">
              <h3 className="text-2xl font-semibold text-white">BB Hair Spa</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Strona salonu fryzjerskiego oparta na Next.js, responsywna,
                SEO-friendly, z ciemnym eleganckim stylem.
              </p>
              <a
                href="https://seweryn999.github.io/bb-hair-spa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all duration-200"
              >
                Zobacz więcej
              </a>
            </div>
          </div>

          {["Wolne miejsce", "Wolne miejsce"].map((title, index) => (
            <div
              key={index}
              className="relative bg-gray-800 rounded-xl shadow-lg transition-all duration-300 overflow-hidden group mx-auto max-w-[400px] h-[320px]"
            >
              <div className="absolute inset-0 bg-white/10 blur-xl"></div>
              <div className="absolute inset-0 rounded-xl border border-white/20"></div>

              <div className="relative p-6 space-y-4 flex flex-col items-center">
                <Lock className="w-12 h-12 text-white/70" />
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
                <p className="text-gray-400 text-base leading-relaxed text-center">
                  Darmowa konsultacja w sprawie twojej własnej strony.
                </p>
                <a
                  href="#contact"
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all duration-200"
                >
                  Skontaktuj się
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
