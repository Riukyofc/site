import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { Services } from './components/home/Services';
import { Portfolio } from './components/home/Portfolio';
import { CTA } from './components/home/CTA';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen mesh-bg font-sans selection:bg-[#FF1493]/30 selection:text-white relative overflow-hidden">
        <Navbar />
        
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <CTA />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
