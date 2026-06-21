import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05060f] text-slate-300 py-6 border-t border-cyan-400/10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-6">
          <div className="text-sm">
            © {new Date().getFullYear()} Seweryn Stalinger. All rights reserved.
          </div>
          <div className="text-sm">
            Email:{" "}
            <a
              href="mailto:seweryn.stalinger@stalink.pl"
              className="hover:text-cyan-400 transition"
            >
              seweryn.stalinger@stalink.pl
            </a>
          </div>
          <div className="text-sm">
            Phone:{" "}
            <a
              href="tel:+48531087939"
              className="hover:text-cyan-400 transition"
            >
              +48 531 087 939
            </a>
          </div>
        </div>
        <div className="flex space-x-6 items-center">
          <Link
            href="/polityka-prywatnosci"
            className="text-sm hover:text-cyan-400 transition"
          >
            Polityka Prywatności
          </Link>
          <a
            href="https://github.com/Seweryn999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-cyan-400 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/seweryn-stalinger-2a31b2297/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-cyan-400 transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
