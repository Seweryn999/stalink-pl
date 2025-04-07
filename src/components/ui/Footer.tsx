import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black py-6 border-t border-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Seweryn Stalinger. All rights reserved.
        </div>
        <div className="flex space-x-6 items-center">
          <Link
            href="/polityka-prywatnosci"
            className="text-sm hover:text-blue-500 transition"
          >
            Polityka Prywatności
          </Link>
          <a
            href="https://github.com/Seweryn999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-blue-500 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/seweryn-stalinger-2a31b2297/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-blue-500 transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
