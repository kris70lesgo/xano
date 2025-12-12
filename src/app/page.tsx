'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LogoTicker from '../components/LogoTicker';
import Features from '../components/Features';

import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <LogoTicker />
      <Features />

      <Process />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
