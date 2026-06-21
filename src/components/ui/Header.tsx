"use client";

import Link from "next/link";
import { useReducer } from "react";
import { Menu, X } from "lucide-react";

type State = {
  isMenuOpen: boolean;
};

type Action = { type: "TOGGLE_MENU" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return { isMenuOpen: !state.isMenuOpen };
    default:
      return state;
  }
};

export default function Header() {
  const [state, dispatch] = useReducer(reducer, { isMenuOpen: false });
  const toggleMenu = () => dispatch({ type: "TOGGLE_MENU" });

  const links = [
    { href: "/", label: "Start" },
    { href: "/o-mnie", label: "O mnie" },
    { href: "/projekty", label: "Projekty" },
    { href: "/automatyzacja-ai", label: "Automatyzacja AI" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  return (
    <header className="bg-[#05060f]/70 backdrop-blur-xl w-full py-4 fixed top-0 left-0 z-50 border-b border-cyan-400/10 transition-all duration-300">
      <div className="flex items-center justify-between px-6 lg:px-20 mx-auto w-full max-w-[1600px]">
        {/* Logo */}
        <div className="select-none text-white text-3xl font-bold tracking-widest uppercase transition-all duration-300">
          <Link href="/" className="cursor-pointer">
            Stal<span className="text-cyan-400">ink</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle Menu"
          className="md:hidden text-white focus:outline-none transition-all duration-300"
          onClick={toggleMenu}
        >
          {state.isMenuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-10 text-xl items-center ml-auto select-none">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="cursor-pointer text-slate-200 hover:text-cyan-400 transition-all duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu */}
        {state.isMenuOpen && (
          <div className="absolute top-[100%] left-0 w-full bg-[#0a0e1f]/95 backdrop-blur-xl border-t border-cyan-400/10 text-slate-200 flex flex-col items-center gap-6 py-6 md:hidden z-40 transition-all duration-300 shadow-xl select-none">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="cursor-pointer text-2xl hover:text-cyan-400 transition-all duration-300"
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
