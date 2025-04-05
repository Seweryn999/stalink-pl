"use client";

import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";

const Scene = dynamic(() => import("../../components/three/Scene"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0"></div>

      <Scene />

    
      
    </section>
  );
}
