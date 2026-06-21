"use client";

import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Hair Salon",
      description:
        "Strona salonu fryzjerskiego zbudowana w Next.js, responsywna i SEO-friendly.",
      imgSrc: "/images/bbhairspa.png",
      link: "/projekty",
    },
  ];

  return (
    <motion.section
      id="projects"
      className="min-h-[130vh] flex justify-center items-center bg-[#070a17] pt-16 pb-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl w-full px-8 flex flex-col items-center gap-y-16">
        <motion.h2
          className="text-center text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-widest text-white"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Projekty
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl lg:text-2xl text-slate-300 max-w-3xl leading-relaxed mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Przedstawiam moje ukończone projekty oraz miejsca na przyszłe
          realizacje.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-center">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="flex flex-col h-[420px] rounded-2xl shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] overflow-hidden group border border-cyan-400/15 bg-white/[0.03] backdrop-blur p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 * index }}
              viewport={{ once: true }}
            >
              <div className="flex-1 flex flex-col items-center mb-4">
                <Image
                  src={project.imgSrc}
                  alt={project.title}
                  width={500}
                  height={350}
                  className="object-cover w-full h-48 rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                  placeholder="empty"
                  priority
                />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm text-center mb-4">
                  {project.description}
                </p>
              </div>
              <div className="mt-auto flex justify-center pb-6">
                <Link href={project.link}>
                  <button className="px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] border-2 border-cyan-400/30 bg-white/5 text-center text-white">
                    Zobacz więcej
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}

          {["Wolne miejsce", "Wolne miejsce"].map((title, index) => (
            <motion.div
              key={index}
              className="flex flex-col h-[420px] rounded-2xl shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] overflow-hidden group border border-cyan-400/15 bg-white/[0.03] backdrop-blur p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2 * (index + projects.length),
              }}
              viewport={{ once: true }}
            >
              <div className="flex-1 flex flex-col items-center justify-center mb-4">
                <Lock className="w-14 h-14 text-cyan-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {title}
                </h3>
                <p className="text-slate-400 text-sm text-center px-4 mb-4">
                  Darmowa konsultacja w sprawie twojej własnej strony
                  internetowej.
                </p>
              </div>
              <div className="mt-auto flex justify-center pb-6">
                <Link href="#contact">
                  <button className="px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] border-2 border-cyan-400/30 bg-white/5 text-center text-white">
                    Skontaktuj się
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
