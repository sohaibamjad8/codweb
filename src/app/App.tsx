import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { About } from "./components/About";
import { WhyWorkWithUs } from "./components/WhyWorkWithUs";
import { Footer } from "./components/Footer";
import { SmoothScroll } from "./components/SmoothScroll";
import { CustomCursor } from "./components/CustomCursor";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";
import { ConversationalForm } from "./components/ConversationalForm";
import { BackToTop } from "./components/BackToTop";

type PageView = "home" | "privacy" | "terms";

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<PageView>("home");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Preload BenchNine font for reliable loading
  useEffect(() => {
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.gstatic.com';
    preconnect1.crossOrigin = 'anonymous';

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'dns-prefetch';
    preconnect2.href = 'https://fonts.gstatic.com';

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=BenchNine:wght@300;400;700&display=swap';

    document.head.appendChild(preconnect1);
    document.head.appendChild(preconnect2);
    document.head.appendChild(fontLink);

    return () => {
      document.head.removeChild(preconnect1);
      document.head.removeChild(preconnect2);
      document.head.removeChild(fontLink);
    };
  }, []);

  if (currentPage === "privacy") {
    return (
      <PrivacyPolicy onBack={() => setCurrentPage("home")} />
    );
  }

  if (currentPage === "terms") {
    return (
      <TermsOfService onBack={() => setCurrentPage("home")} />
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen cursor-none">
        <CustomCursor />
        <BackToTop />
        <ConversationalForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
        <Navigation onGetStartedClick={() => setIsFormOpen(true)} />
        <WhatsAppButton />
        <Hero />
        <section id="services">
          <Services />
        </section>
        <section id="work">
          <Portfolio />
        </section>
        <section id="about">
          <About />
        </section>
        <WhyWorkWithUs />
        <section id="footer">
          <Footer
            onPrivacyClick={() => setCurrentPage("privacy")}
            onTermsClick={() => setCurrentPage("terms")}
            onFormOpen={() => setIsFormOpen(true)}
          />
        </section>
      </div>
    </SmoothScroll>
  );
}