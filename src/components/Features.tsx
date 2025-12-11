'use client';

import React, { useRef, useState } from 'react';
import { Video, TrendingUp, DollarSign } from 'lucide-react';
import { Reveal } from './Reveal';

// Tilt Card Component
const TiltCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; delay: number }> = ({ icon, title, desc, delay }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleMouseLeave = () => {
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    return (
        <Reveal delay={delay}>
            <div 
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-200 border border-gray-100 h-full transform-style-3d cursor-default"
                style={{ transform: transform, transition: transform ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out' }}
            >
                <div className="w-16 h-16 bg-dark rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-dark mb-4">{title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{desc}</p>
            </div>
        </Reveal>
    );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Video className="w-8 h-8 text-white" />,
      title: "Instant Job Parsing",
      desc: "Forward RFQ emails to our AI. It extracts scope, materials, location, timeline, and budget in seconds."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: "Smart Pricing Suggestions",
      desc: "AI analyzes your past wins and market rates to suggest optimal pricing. Land profitable jobs without guessing."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-white" />,
      title: "Professional Proposal Drafts",
      desc: "Get ready-to-send, branded proposals with your pricing, timeline, and terms. Send in under a minute."
    }
  ];

  return (
    <section id="features" className="py-32 bg-cream relative overflow-hidden scroll-mt-24">
      <div className="absolute top-1/2 left-0 w-full h-full bg-gradient-to-b from-transparent to-white/50 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-dark mb-6">Why Contractors Love ProposalAI</h2>
          </Reveal>
          <Reveal delay={0.2}>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto">Stop losing jobs because your proposal arrives too late. Respond to RFQs faster than competitors and win more business.</p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <TiltCard key={i} {...f} delay={i * 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
