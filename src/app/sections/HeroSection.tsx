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
    <section className="relative w-full h-screen pt-16 overflow-hidden flex flex-col items-center justify-center m-0 p-0 bg-[#05060f]">
      {/* Nebula glow accents */}
      <div
        className="nebula-glow absolute -top-32 left-1/4 w-[40rem] h-[40rem] rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none"
        style={{ transform: `translate(${mouseX * -20}px, ${mouseY * -20}px)` }}
      />
      <div
        className="nebula-glow absolute bottom-0 right-1/4 w-[35rem] h-[35rem] rounded-full bg-violet-500/20 blur-[120px] pointer-events-none"
        style={{
          animationDelay: "2s",
          transform: `translate(${mouseX * 20}px, ${mouseY * 20}px)`,
        }}
      />

      {/* Logo 3D */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translate(${mouseX * 14}px, ${mouseY * 10}px)`,
        }}
      >
        <Scene />
      </div>

      {/* Opis technologii */}
      <motion.div
        className="absolute top-2/3 text-center z-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          Nowoczesne strony internetowe{" "}
          <span className="text-cyan-400">i automatyzacja AI</span>
        </h1>
      </motion.div>

      {/* Gradient przechodzący do kolejnej sekcji */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-[#0a0e1f] z-10"></div>

      {/* Strzałka */}
      <div className="absolute bottom-8 flex justify-center z-10">
        <button onClick={scrollToNextSection} aria-label="Przejdź niżej">
          <ChevronDown className="w-10 h-10 animate-bounce cursor-pointer text-cyan-400" />
        </button>
      </div>
    </section>
  );
}
