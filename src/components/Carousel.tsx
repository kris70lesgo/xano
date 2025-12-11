'use client';

import React, { useEffect, useRef } from 'react';

const CARDS = [
  "https://images.unsplash.com/photo-1611558709796-ae5654136356?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586996292898-71f4036c4e07?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a302d2d3f524?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?q=80&w=600&auto=format&fit=crop",
];

const CARD_WIDTH = 220;
const GAP = 24;
const ITEM_FULL_WIDTH = CARD_WIDTH + GAP;
const SCROLL_SPEED = 0.8;
const CURVE_FACTOR = 0.00015;
const ENTRANCE_DURATION = 1500;

const Carousel: React.FC = () => {
  const items = [...CARDS, ...CARDS, ...CARDS, ...CARDS];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const requestRef = useRef<number>();
  const scrollPosRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const totalWidth = items.length * ITEM_FULL_WIDTH;
    scrollPosRef.current = 2000;

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      
      const rawProgress = Math.min(elapsed / ENTRANCE_DURATION, 1);
      const easeProgress = 1 - Math.pow(1 - rawProgress, 3);
      
      scrollPosRef.current += SCROLL_SPEED;

      const viewportWidth = window.innerWidth;
      const centerX = viewportWidth / 2;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const finalX = (index * ITEM_FULL_WIDTH - scrollPosRef.current) % totalWidth;
        
        let visualX = finalX;
        if (visualX < -ITEM_FULL_WIDTH * 2) {
             visualX += totalWidth;
        }

        const cardCenterX = visualX + CARD_WIDTH / 2;
        const distFromCenter = cardCenterX - centerX;
        
        const curveY = Math.pow(distFromCenter, 2) * CURVE_FACTOR * easeProgress;
        const rotation = (distFromCenter / centerX) * 10 * easeProgress;

        card.style.transform = `translate3d(${visualX}px, ${curveY}px, 0) rotate(${rotation}deg)`;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [items.length]);

  return (
    <section className="w-full py-32 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-dark mb-6">Featured Content</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Explore our portfolio of stunning creator-made videos</p>
        </div>
      </div>
      <div 
        ref={containerRef} 
        className="relative w-full h-[500px] overflow-hidden"
        style={{ perspective: '1000px' }}
      >
      {items.map((src, i) => (
        <div
          key={i}
          ref={(el) => {cardsRef.current[i] = el}}
          className="absolute top-10 left-0 w-[220px] h-[350px] rounded-3xl overflow-hidden shadow-2xl will-change-transform bg-white group cursor-pointer"
        >
          <img
            src={src}
            alt="Carousel item"
            className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
          
           <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md p-2 rounded-full border border-white/20">
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5"></div>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 border border-white"></div>
                    <div className="h-2 w-20 bg-white/50 rounded-full"></div>
                </div>
            </div>
        </div>
      ))}
      
      <div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Carousel;
