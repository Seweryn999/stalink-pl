import Header from "../components/ui/Header";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import Footer from "../components/ui/Footer";
import Script from "next/script";
import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("./HomeClient"), { ssr: false });

export const metadata = {
  title: "Stalink",
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
            url: "https://stalink.pl",
            logo: "https://stalink.pl/logo.svg",
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
            url: "https://stalink.pl",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://stalink.pl/?q={search_term_string}",
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
        <HomeClient /> {/* ← dynamicznie ładowany client component */}
        <Footer />
      </main>
    </>
  );
}
