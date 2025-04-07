"use client";

import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Scene = dynamic(() => import("../../components/three/Scene"), {
  ssr: false,
});

export default function HeroSection() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth - 0.5);
      setMouseY(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative w-full h-screen pt-16 overflow-hidden flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat m-0 p-0"
      style={{ backgroundImage: "url('/images/heroimg.png')" }}
    >
      {/* Wyblakła warstwa */}
      <div className="absolute inset-0 bg-white opacity-60 pointer-events-none"></div>

      {/* Rozmycie tła */}
      <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none"></div>

      {/* Ciemniejsza przezroczysta warstwa */}
      <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>

      {/* Logo 3D */}
      <Scene />

      {/* Opis technologii */}
      <motion.div
        className="absolute top-2/3 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900">
          Nowoczesne strony internetowe i aplikacje webowe
        </h2>
      </motion.div>

      {/* Gradient przechodzący do białej sekcji */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-white"></div>

      {/* Strzałka */}
      <div className="absolute bottom-8 flex justify-center">
        <button onClick={scrollToNextSection} aria-label="Przejdź niżej">
          <ChevronDown className="w-10 h-10 animate-bounce cursor-pointer text-blue-900" />
        </button>
      </div>
    </section>
  );
}
