export default function Footer() {
  return (
    <footer className="bg-black py-6 mt-10 text-center text-gray-300 relative z-10">
      <div className="container mx-auto">
        <p className="mb-4 font-mono text-sm">
          © {new Date().getFullYear()} Seweryn Stalinger. Wszelkie prawa
          zastrzeżone.
        </p>
        <div className="flex justify-center gap-6 text-sm mb-4">
          {[
            { href: "https://github.com/Seweryn999", label: "GitHub" },
            {
              href: "https://www.linkedin.com/in/seweryn-stalinger-2a31b2297/",
              label: "LinkedIn",
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-transform duration-200 hover:scale-105"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="text-sm">
          <a
            href="/polityka-prywatnosci"
            className="hover:text-blue-400 transition-transform duration-200 hover:scale-105"
          >
            Polityka Prywatności
          </a>
        </div>
      </div>
    </footer>
  );
}
