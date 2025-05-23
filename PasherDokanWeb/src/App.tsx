import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import Team from './components/Team';

function App() {
  useEffect(() => {
    // Update page title with consistent branding
    document.title = "PasherDokan - Digital Solutions for Local Shops";
    
    // Smooth scroll for anchor links with offset for floating header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (!href) return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        const headerOffset = 100; // Account for floating header
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 pointer-events-none" aria-hidden="true"></div>
        </div>
        <CallToAction />
        <Testimonials />
        <FAQ />
        <Team />
      </main>
      <Footer />
    </div>
  );
}

export default App;