import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black py-6 border-t border-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-6">
          <div className="text-sm">
            © {new Date().getFullYear()} Seweryn Stalinger. All rights reserved.
          </div>
          <div className="text-sm">
            Email:{" "}
            <a
              href="mailto:seweryn.webdev@gmail.com"
              className="hover:text-blue-500 transition"
            >
              seweryn.webdev@gmail.com
            </a>
          </div>
          <div className="text-sm">
            Phone:{" "}
            <a
              href="tel:+48531087939"
              className="hover:text-blue-500 transition"
            >
              +48 531 087 939
            </a>
          </div>
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
