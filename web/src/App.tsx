import React, {useEffect,useState}from "react";

import Navbar from "./components/navbar";
import ChatWidget from "./components/ChatWidget";

import HeroSection from "./pages/HeroSection";
import ProblemSolution from "./pages/Problem&Solution";
import HowToWork from "./pages/HowToWork";
import InnovativeFeatures from "./pages/InnovativeFeatures";
import Feedbacks from "./pages/Feedbacks";
import Contact from "./pages/Contact";

const App: React.FC = () => {
  // Hangi bölümün aktif olduğunu tutan state
  const [activeSection, setActiveSection] = useState("anasayfa");

  useEffect(() => {
    // Tüm <section> etiketlerini seç
    const sections = document.querySelectorAll("section");

    // IntersectionObserver ile görünürdeki bölümü takip et
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Görünür olan bölümün id'sini al ve state olarak ata
            const id = entry.target.getAttribute("id");
            if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    // Her bir section'ı gözlemlemeye başla
    sections.forEach((section) => observer.observe(section));

    // Component unmount olduğunda observer'ı kaldır
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Navbar bileşeni, aktif bölüme göre vurgulama yapabilir */}
      <Navbar activeSection={activeSection} />
      <ChatWidget />
      <main className="min-h-screen snap-start">  
        <section id="anasayfa">
          <HeroSection />
        </section>
        <section>
          <ProblemSolution />
        </section>
        <section>
          <HowToWork />
        </section>
        <section>
          <InnovativeFeatures />
        </section>
        <section >
          <Feedbacks />
        </section>
        <section >
          <Contact />
        </section>
        

        
      </main>
    </>
  );
};

export default App;
