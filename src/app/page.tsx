import Header from "../components/ui/Header";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";
import Footer from "../components/ui/Footer";
import Script from "next/script";

export const metadata = {
  title: "STALINK – Nowoczesne strony internetowe",
  description:
    "Nowoczesne, estetyczne i szybkie strony internetowe budowane z wykorzystaniem Next.js, React, TypeScript i Tailwind CSS.",
};

export default function Home() {
  return (
    <>
      <Script
        id="ld-json-org"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "STALINK",
            url: "https://twojadomena.pl",
            logo: "https://twojadomena.pl/logo.svg",
            sameAs: [],
          }),
        }}
      />
      <Script
        id="ld-json-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "STALINK",
            url: "https://twojadomena.pl",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://twojadomena.pl/?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <main>
        <Header />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
