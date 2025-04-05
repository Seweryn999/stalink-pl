"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black bg-opacity-70 backdrop-blur-lg w-full py-4 fixed top-0 left-0 z-50 shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
        {/* Logo Stalink wyrównane do lewej */}
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white text-3xl font-black tracking-widest animate-pulse-slow uppercase">
          <Link href="/">Stalink</Link>
        </div>

        {/* Przycisk burger menu (widoczny tylko na mobile) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>

        {/* Nawigacja desktopowa */}
        <ul className="hidden md:flex gap-8 text-gray-300 text-2xl ml-auto">
          <li>
            <Link href="#hero" className="hover:text-white transition-all">
              Home
            </Link>
          </li>
          <li>
            <Link href="#about" className="hover:text-white transition-all">
              O mnie
            </Link>
          </li>
          <li>
            <Link href="#projects" className="hover:text-white transition-all">
              Projekty
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-white transition-all">
              Kontakt
            </Link>
          </li>
        </ul>

        {/* Mobilne menu (wysuwane po kliknięciu burgera) */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black bg-opacity-90 text-gray-300 flex flex-col items-center gap-6 py-6 md:hidden z-40">
            <Link
              href="#hero"
              className="text-2xl hover:text-white transition-all"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-2xl hover:text-white transition-all"
              onClick={toggleMenu}
            >
              O mnie
            </Link>
            <Link
              href="#projects"
              className="text-2xl hover:text-white transition-all"
              onClick={toggleMenu}
            >
              Projekty
            </Link>
            <Link
              href="#contact"
              className="text-2xl hover:text-white transition-all"
              onClick={toggleMenu}
            >
              Kontakt
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
