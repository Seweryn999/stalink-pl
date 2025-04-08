"use client";

import { Lock } from "lucide-react";
import Image from "next/image";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import { motion } from "framer-motion";

const BBHairSpaImage = "/images/bbhairspa.png";
const TaskFlowImage = "/images/taskflow.png";
const ExpenseTrackerImage = "/images/expenseTracker.png";
const FilmotekaImage = "/images/filmoteka.png";

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <section className="min-h-screen py-20 sm:py-32 lg:py-40 flex justify-center bg-gradient-to-br from-[#d0e7ff] to-[#a0b6d0] text-[#1e3a5f]">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-y-16">
          <link rel="icon" href="/logo.svg" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#a0b6d0] to-[#6ac6f1]">
            Projekty Komercyjne
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 p-4 w-full">
            <motion.div
              className="relative bg-[#b0c4de] rounded-xl shadow-xl transition-all duration-300 overflow-hidden group mx-auto w-full max-w-[300px] border border-[#6ac6f1] hover:shadow-[0_0_20px_5px_#6ac6f1] hover:scale-105"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square relative w-full overflow-hidden rounded-t-xl">
                <Image
                  src={BBHairSpaImage}
                  alt="BB Hair Spa"
                  width={300}
                  height={300}
                  placeholder="empty"
                  priority
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative p-4 flex flex-col items-center bg-[#d0e7ff] rounded-b-xl">
                <h3 className="text-2xl font-semibold mb-4">BB Hair Spa</h3>
                <p className="text-[#1e3a5f] text-sm leading-relaxed mb-4">
                  Strona salonu fryzjerskiego oparta na Next.js, responsywna,
                  SEO-friendly, z ciemnym eleganckim stylem.
                </p>
                <a
                  href="https://seweryn999.github.io/bb-hair-spa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-6 py-2 bg-[#6ac6f1] text-white rounded-md font-medium hover:bg-[#60a5fa] transition-all duration-200"
                >
                  Zobacz więcej
                </a>
              </div>
            </motion.div>

            {["Wolne miejsce", "Wolne miejsce"].map((title, index) => (
              <motion.div
                key={index}
                className="relative bg-[#d0e7ff] rounded-xl shadow-xl transition-all duration-300 overflow-hidden group mx-auto w-full max-w-[300px] border border-[#6ac6f1] hover:shadow-[0_0_20px_5px_#6ac6f1] hover:scale-105"
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square relative w-full flex items-center justify-center bg-[#b0c4de]">
                  <Lock className="w-12 h-12 text-[#6ac6f1]" />
                </div>
                <div className="relative p-4 flex flex-col items-center bg-[#d0e7ff] rounded-b-xl">
                  <h3 className="text-2xl font-semibold text-[#1e3a5f] mt-4">
                    {title}
                  </h3>
                  <p className="text-[#1e3a5f] text-sm leading-relaxed text-center mt-4 mb-4">
                    Tutaj pojawi się nowy projekt komercyjny.
                  </p>
                  <a
                    href="/kontakt"
                    className="inline-block mt-2 px-6 py-2 bg-[#6ac6f1] text-white rounded-md font-medium hover:bg-[#60a5fa] transition-all duration-200"
                  >
                    Skontaktuj się
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-[120vh] py-40 flex justify-center items-center text-white bg-[#0e1624]">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-y-16">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#a0b6d0] to-[#6ac6f1]"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
          >
            Projekty Prywatne
          </motion.h2>

          <div className="!pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 p-4 w-full">
            {[
              {
                title: "TaskFlow AI",
                repoUrl: "https://github.com/Seweryn999/taskflow-ai",
                liveUrl: "https://seweryn999.github.io/taskflow-ai/",
                image: TaskFlowImage,
              },
              {
                title: "Finance Tracker",
                repoUrl: "https://github.com/Seweryn999/expense-tracker-nextjs",
                liveUrl:
                  "https://seweryn999.github.io/expense-tracker-nextjs/login",
                image: ExpenseTrackerImage,
              },
              {
                title: "Filmoteka-JS",
                repoUrl:
                  "https://github.com/MartaAnetaSzymanska/Project-Filmoteka-JS",
                liveUrl: "https://seweryn999.github.io/filmoteka-live/",
                image: FilmotekaImage,
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                className="relative bg-[#1e3a5f] rounded-xl shadow-lg transition-all duration-300 overflow-hidden group mx-auto w-full max-w-[250px] border border-[#6ac6f1] hover:shadow-[0_0_20px_5px_#6ac6f1] hover:scale-105"
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square relative w-full overflow-hidden rounded-t-xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={250}
                    height={250}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    placeholder="empty"
                    priority
                  />
                </div>
                <div className="relative p-4 flex flex-col items-center rounded-b-xl">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {project.title}
                  </h3>
                  <div className="flex gap-4 mt-4">
                    <a
                      href={project.repoUrl}
                      className="px-4 py-2 bg-[#6ac6f1] text-white rounded-md font-medium hover:bg-[#60a5fa] transition-all duration-200"
                    >
                      Repozytorium
                    </a>
                    <a
                      href={project.liveUrl}
                      className="px-4 py-2 bg-[#6ac6f1] text-white rounded-md font-medium hover:bg-[#60a5fa] transition-all duration-200"
                    >
                      Live
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
