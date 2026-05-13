import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingContact } from './components/layout/FloatingContact';
import { Hero } from './components/home/Hero';
import { Stats } from './components/home/Stats';
import { Services } from './components/home/Services';
import { TechStack } from './components/home/TechStack';
import { Portfolio } from './components/home/Portfolio';
import { Testimonials } from './components/home/Testimonials';
import { CTA } from './components/home/CTA';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen mesh-bg font-sans selection:bg-[#FF1493]/30 selection:text-white relative overflow-hidden">
        <Navbar />
        
        <main>
          <Hero />
          <Stats />
          <Services />
          <TechStack />
          <Portfolio />
          <Testimonials />
          <CTA />
        </main>

        <FloatingContact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
