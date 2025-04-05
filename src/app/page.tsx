import Header from "../components/ui/Header";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";
import Footer from "../components/ui/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Header />
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-24">
        <link rel="icon" href="/logo.svg" />
        <HeroSection />
      </div>
      <div className=" py-20">
        <AboutSection />
      </div>
      <div className="section-container py-20">
        <ProjectsSection />
      </div>
      <div className="section-container py-20">
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
