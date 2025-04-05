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
    { href: "/", label: "Home" },
    { href: "/o-mnie", label: "O mnie" },
    { href: "/projekty", label: "Projekty" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  return (
    <header className="bg-black bg-opacity-70 backdrop-blur-lg w-full py-4 fixed top-0 left-0 z-50 shadow-md transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white text-3xl font-black tracking-widest uppercase">
          <Link href="/">Stalink</Link>
        </div>

        <button
          aria-label="Toggle Menu"
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {state.isMenuOpen ? (
            <X className="w-8 h-8 transition-transform duration-200" />
          ) : (
            <Menu className="w-8 h-8 transition-transform duration-200" />
          )}
        </button>

        <ul className="hidden md:flex gap-8 text-gray-300 text-xl ml-auto">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="hover:text-white transition-all duration-200 hover:scale-105"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {state.isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black bg-opacity-90 text-gray-300 flex flex-col items-center gap-6 py-6 md:hidden z-40 transition-all duration-300">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-2xl hover:text-white transition-all duration-200 hover:scale-105"
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
