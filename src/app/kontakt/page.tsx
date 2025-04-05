import React from "react";
import Header from "../../components/ui/Header";
import Contact from "../sections/ContactSection";
import Footer from "../../components/ui/Footer";
import StarsBackground from "../../components/ui/StarsContact";

const KontaktPage = () => {
  return (
    <div>
      <link rel="icon" href="/logo.svg" />
      <Header />
      <main>
        <StarsBackground />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default KontaktPage;
