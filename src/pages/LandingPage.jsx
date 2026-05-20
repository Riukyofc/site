import React, { Suspense, lazy } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { FloatingContact } from '../components/layout/FloatingContact';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { Preloader } from '../components/layout/Preloader';
import { Hero } from '../components/sections/Hero';

// Lazy loading for below-fold sections
const LogoMarquee = lazy(() => import('../components/sections/LogoMarquee').then(m => ({ default: m.LogoMarquee })));
const Stats = lazy(() => import('../components/sections/Stats').then(m => ({ default: m.Stats })));
const About = lazy(() => import('../components/sections/About').then(m => ({ default: m.About })));
const Services = lazy(() => import('../components/sections/Services').then(m => ({ default: m.Services })));
const Portfolio = lazy(() => import('../components/sections/Portfolio').then(m => ({ default: m.Portfolio })));
const Catalog = lazy(() => import('../components/sections/Catalog').then(m => ({ default: m.Catalog })));
const Process = lazy(() => import('../components/sections/Process').then(m => ({ default: m.Process })));
const Testimonials = lazy(() => import('../components/sections/Testimonials').then(m => ({ default: m.Testimonials })));
const CTA = lazy(() => import('../components/sections/CTA').then(m => ({ default: m.CTA })));

const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center opacity-50">
    <div className="w-8 h-8 rounded-full border-2 border-[#00BFFF]/20 border-t-[#00BFFF] animate-spin"></div>
  </div>
);

export const LandingPage = () => {
  return (
    <div className="min-h-screen mesh-bg font-sans relative overflow-hidden">
      <Preloader />
      <Navbar />
      
      <main>
        <Hero />
        
        <Suspense fallback={<SectionLoader />}>
          <LogoMarquee />
          <Stats />
          <About />
          <Services />
          <Portfolio />
          <Catalog />
          <Process />
          <Testimonials />
          <CTA />
        </Suspense>
      </main>

      <FloatingContact />
      <ScrollToTop />
      <Footer />
    </div>
  );
};
