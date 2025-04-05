"use client";

import { useEffect, useRef, useCallback } from "react";

export default function StarsBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const generateStars = useCallback(() => {
    const totalStars = 88;
    const starsArray: string[] = [];

    for (let i = 0; i < totalStars; i++) {
      const size = (Math.random() * 3).toFixed(2);
      const left = (Math.random() * 100).toFixed(2);
      const top = (Math.random() * 100).toFixed(2);
      const delay = (Math.random() * 2).toFixed(2);

      starsArray.push(
        `<div class="star" style="
          width: ${size}px;
          height: ${size}px;
          left: ${left}%;
          top: ${top}%;
          animation-delay: ${delay}s;
        "></div>`
      );
    }

    if (containerRef.current) {
      containerRef.current.innerHTML = starsArray.join("");
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    console.log("StarsBackground: Generowanie gwiazd");
    generateStars();
  }, [generateStars]);

  return (
    <div
      ref={containerRef}
      className="starry-background absolute inset-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
