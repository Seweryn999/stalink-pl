"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import Script from "next/script";

import Seweryn1Image from "/public/images/seweryn1.jpg";

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="ld-json-person"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Seweryn Stalinger",
            url: "https://twojadomena.pl/o-mnie",
            image: "https://twojadomena.pl/images/seweryn1.jpg",
            jobTitle: "Frontend Developer",
            worksFor: {
              "@type": "Organization",
              name: "STALINK",
              url: "https://twojadomena.pl",
            },
            sameAs: [],
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "Informatyka – studia",
            },
            description:
              "Frontend developer specjalizujący się w Next.js, React, TypeScript i Tailwind CSS. Tworzy szybkie, estetyczne i skuteczne strony internetowe.",
          }),
        }}
      />
      <Header />
      <section className="min-h-screen py-20 sm:py-32 lg:py-40 flex justify-center bg-gradient-to-br from-white via-blue-100 to-blue-200">
        <div className="max-w-6xl w-full px-6 sm:px-8 lg:px-10 flex flex-col items-center gap-y-16">
          <link rel="icon" href="/logo.svg" />
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-widest text-gray-800 mb-12 text-center"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
          >
            O mnie
          </motion.h1>

          <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
            <motion.div
              className="relative group rounded-full border-4 border-blue-300 overflow-hidden w-72 h-72 flex-shrink-0 transition-all duration-500 hover:shadow-xl hover:scale-105"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src={Seweryn1Image}
                alt="Seweryn Stalinger"
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                placeholder="blur"
                priority
              />
            </motion.div>

            <motion.div
              className="text-gray-700 leading-relaxed text-lg space-y-6 max-w-3xl text-left"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.4 }}
            >
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
            </motion.div>
          </div>

          <motion.div
            className="space-y-12 w-full mt-12 max-w-4xl text-left"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Dlaczego używam tych technologii?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Next.js",
                  description:
                    "Strony stworzone z Next.js ładują się błyskawicznie dzięki zaawansowanym technikom optymalizacji. To oznacza lepsze pozycjonowanie w Google i więcej klientów na Twojej stronie.",
                },
                {
                  title: "TypeScript",
                  description:
                    "TypeScript gwarantuje bezbłędne działanie strony i jej stabilność. Klienci widzą profesjonalizm i jakość, co buduje ich zaufanie i zwiększa szanse na sprzedaż.",
                },
                {
                  title: "Tailwind CSS",
                  description:
                    "Dzięki Tailwind CSS Twoja strona jest estetyczna, nowoczesna i w pełni responsywna. Piękny design przyciąga uwagę i skłania do zakupów.",
                },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  className="group relative border border-blue-300 rounded-xl p-6 shadow transition-transform transform hover:scale-105 hover:border-blue-600 bg-white"
                  variants={fadeInVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {tech.title}
                  </h3>
                  <p className="text-gray-700">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
