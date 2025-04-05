"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AboutSection() {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageOpen(true);
  };

  const handleCloseModal = () => {
    setIsImageOpen(false);
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <button
        onClick={scrollToAbout}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-20 flex items-center justify-center hover:scale-125 transition-transform duration-300"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
      <section
        id="about"
        className="py-32 flex items-center justify-center relative text-center min-h-screen"
      >
        <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-6">
          <div className="flex justify-center md:justify-start mb-8 md:mb-0">
            <div
              className="w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-md cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src="/images/seweryn.jpg"
                alt="Seweryn Stalinger"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center text-center md:text-left">
            <div className="mb-6 md:mb-12 animate-pulse-slow"></div>
            <h2 className="text-4xl md:text-5xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
              O mnie
            </h2>
            <p className="text-base md:text-2xl text-gray-200 leading-relaxed max-w-xl mx-auto md:mx-0">
              Cześć! Jestem Seweryn Stalinger, frontend developer specjalizujący
              się w Next.js, React, TypeScript i Tailwind CSS. Te technologie to
              klucz do tworzenia stron, które sprzedają: Next.js zapewnia
              błyskawiczne ładowanie i optymalizację pod SEO, React gwarantuje
              interaktywność przyciągającą klientów, TypeScript eliminuje błędy,
              a Tailwind CSS pozwala na szybkie projektowanie estetycznych,
              responsywnych interfejsów. Twoja strona będzie nie tylko piękna,
              ale i skuteczna w przekuwaniu odwiedzin na zyski.
            </p>
          </div>
        </div>

        {/* Modal */}
        {isImageOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={handleCloseModal}
          >
            <div className="relative max-w-3xl w-full p-4">
              <img
                src="/images/seweryn.jpg"
                alt="Seweryn Stalinger - pełny rozmiar"
                className="w-full h-auto object-contain rounded-lg shadow-lg"
              />
              <button
                className="absolute top-2 right-2 text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2 focus:outline-none"
                onClick={handleCloseModal}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
