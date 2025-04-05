export default function Footer() {
  return (
    <footer className="bg-black py-6 px-4 mt-10 text-center text-gray-300 relative z-10">
      <div className="mx-auto">
        <p className="mb-2 font-mono">
          © {new Date().getFullYear()} Seweryn Stalinger. Wszelkie prawa
          zastrzeżone.
        </p>
        <div className="flex justify-center gap-4 text-sm mb-2">
          <a
            href="https://github.com/Seweryn999"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-all hover:scale-105"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/seweryn-stalinger-2a31b2297/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-all hover:scale-105"
          >
            LinkedIn
          </a>
        </div>

        <div className="text-sm mt-4">
          <a
            href="/polityka-prywatnosci"
            className="hover:text-blue-400 transition-all hover:scale-105"
          >
            Polityka Prywatności
          </a>
        </div>
      </div>
    </footer>
  );
}
