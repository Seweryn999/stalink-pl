"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageOpen(true);
  };

  const handleCloseModal = () => {
    setIsImageOpen(false);
  };

  return (
    <>
      <motion.section
        id="about"
        className="py-40 flex items-center justify-center relative text-center min-h-[110vh] bg-[#070a17]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-6">
          <div className="flex justify-center md:justify-start mb-8 md:mb-0">
            <motion.div
              className="w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-cyan-400/30 shadow-[0_0_40px_rgba(34,211,238,0.25)] cursor-pointer hover:shadow-[0_0_60px_rgba(34,211,238,0.4)] transition-shadow"
              onClick={handleImageClick}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/seweryn.jpg"
                alt="Seweryn Stalinger"
                width={288}
                height={288}
                className="object-cover w-full h-full"
                placeholder="empty"
                priority
              />
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col justify-center text-center md:text-left max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-wider uppercase text-white !mb-5">
              O mnie
            </h2>
            <p className="text-base md:text-2xl text-slate-300 leading-relaxed !mb-2">
              Cześć! Jestem Seweryn Stalinger, frontend developer specjalizujący
              się w Next.js, React, TypeScript i Tailwind CSS. Te technologie to
              klucz do tworzenia stron, które sprzedają:{" "}
              <span className="text-cyan-400 font-bold">Next.js</span> zapewnia
              błyskawiczne ładowanie i optymalizację pod SEO,{" "}
              <span className="text-cyan-400 font-bold">React</span> gwarantuje
              interaktywność przyciągającą klientów,{" "}
              <span className="text-cyan-400 font-bold">TypeScript</span>{" "}
              eliminuje błędy, a{" "}
              <span className="text-cyan-400 font-bold">Tailwind CSS</span>{" "}
              pozwala na szybkie projektowanie estetycznych, responsywnych
              interfejsów. Twoja strona będzie nie tylko piękna, ale i skuteczna
              w przekuwaniu odwiedzin na zyski.
            </p>

            <Link href="/o-mnie">
              <button className="!mt-2 !px-5 !py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] border-2 border-cyan-400/30 bg-white/5 text-white backdrop-blur">
                Więcej szczegółów
              </button>
            </Link>
          </motion.div>
        </div>

        {isImageOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={handleCloseModal}
          >
            <div className="relative max-w-3xl w-full p-4">
              <Image
                src="/images/seweryn.jpg"
                alt="Seweryn Stalinger - pełny rozmiar"
                width={800}
                height={800}
                className="w-full h-auto object-contain rounded-lg shadow-lg"
              />
              <button
                className="!px-2 !py-2 absolute top-2 right-2 text-white bg-cyan-500 hover:bg-cyan-600 rounded-full p-2 focus:outline-none"
                onClick={handleCloseModal}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </motion.section>
    </>
  );
}
