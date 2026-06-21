import React from "react";
import Header from "../../components/ui/Header";
import Contact from "../sections/ContactSection";
import Footer from "../../components/ui/Footer";

const KontaktPage = () => {
  return (
    <div className="bg-[#0a0e1f] min-h-screen">
      <link rel="icon" href="/logo.svg" />
      <Header />
      <main>
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default KontaktPage;
