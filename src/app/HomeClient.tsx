"use client";

import React from "react";
import Script from "next/script";
import Header from "../components/ui/Header";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";
import Footer from "../components/ui/Footer";
import AiFeatureSection from "./sections/AiSection";

export default function HomeClient() {
  return (
    <>
      {/* JSON-LD: Organization */}
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

      {/* JSON-LD: WebSite */}
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
        <AiFeatureSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
