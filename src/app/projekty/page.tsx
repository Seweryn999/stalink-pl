import { Lock } from "lucide-react";
import Image from "next/image";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import StarsBackground from "../../components/ui/StarsBackground";

export default function ProjectsPage() {
  return (
    <>
      <StarsBackground />
      <Header />
      <section className="min-h-screen py-20 sm:py-32 lg:py-40 flex justify-center bg-black text-white">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-y-16">
          <link rel="icon" href="/logo.svg" />

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
            Projekty Komercyjne
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 p-4 w-full">
            <div className="relative bg-gray-800 rounded-xl shadow-lg transition-all duration-300 overflow-hidden group mx-auto w-full max-w-[350px]">
              <div className="aspect-square relative w-full overflow-hidden rounded-t-xl">
                <Image
                  src="/images/bbhairspa.png"
                  alt="BB Hair Spa"
                  width={350}
                  height={350}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative p-4 flex flex-col items-center bg-gray-900 rounded-b-xl">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  BB Hair Spa
                </h3>
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
                className="relative bg-transparent rounded-xl shadow-lg transition-all duration-300 overflow-hidden group mx-auto w-full max-w-[350px] border border-neutral-700 hover:border-blue-500 hover:shadow-[0_0_20px_5px_#3b82f6] hover:scale-105"
              >
                <div className="aspect-square relative w-full flex items-center justify-center">
                  <Lock className="w-12 h-12 text-white/70" />
                </div>
                <div className="relative p-4 flex flex-col items-center">
                  <h3 className="text-2xl font-semibold text-white mt-4">
                    {title}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed text-center mt-4 mb-4">
                    Tu wkrótce pojawi się nowy projekt komercyjny.
                  </p>
                  <a
                    href="/kontakt"
                    className="inline-block mt-2 px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all duration-200"
                  >
                    Skontaktuj się
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-screen py-32 flex justify-center text-white">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-y-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
            Projekty Niekomercyjne
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 p-4 w-full">
            {[
              {
                title: "TaskFlow AI",
                repoUrl: "https://github.com/Seweryn999/taskflow-ai",
                liveUrl: "https://seweryn999.github.io/taskflow-ai/",
                imageUrl: "/images/taskFlow.png",
              },
              {
                title: "Finance Tracker",
                repoUrl: "https://github.com/Seweryn999/expense-tracker-nextjs",
                liveUrl:
                  "https://seweryn999.github.io/expense-tracker-nextjs/login",
                imageUrl: "/images/expenseTracker.png",
              },
              {
                title: "Filmoteka-JS",
                repoUrl:
                  "https://github.com/MartaAnetaSzymanska/Project-Filmoteka-JS",
                liveUrl: "https://seweryn999.github.io/filmoteka-live/",
                imageUrl: "/images/filmoteka.png",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="relative bg-gray-800 rounded-xl shadow-lg transition-all duration-300 overflow-hidden group mx-auto w-full max-w-[400px]"
              >
                <div className="aspect-square relative w-full overflow-hidden rounded-t-xl">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative p-4 flex flex-col items-center rounded-b-xl">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {project.title}
                  </h3>
                  <div className="flex gap-4 mt-4">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all duration-200"
                    >
                      Repozytorium
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-all duration-200"
                    >
                      Live
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
