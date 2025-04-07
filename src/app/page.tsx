import Header from "../components/ui/Header";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";
import Footer from "../components/ui/Footer";

export default function Home() {
  return (
    <main className="">
      <link rel="icon" href="/logo.svg" />
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
