import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const schedule = [
  { time: "09:00 AM", event: "SYSTEM INITIALIZATION", desc: "Opening Ceremony & Keynote", location: "Main Auditorium" },
  { time: "11:00 AM", event: "HACKATHON BEGINS", desc: "24-Hour Coding Marathon Starts", location: "Innovation Hub" },
  { time: "02:00 PM", event: "ROBO WARS", desc: "Qualifying Rounds - Arena 1", location: "Open Ground" },
  { time: "05:00 PM", event: "CYBER GAMING", desc: "Valorant Tournament - Group Stage", location: "E-Sports Arena" },
  { time: "08:00 PM", event: "NEON NIGHT", desc: "Cultural Event & DJ Night", location: "Amphitheatre" },
];

const Timeline = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const lineRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const totalCards = cards.length;

      if (isMobile) {
        // --- MOBILE: DECK OF CARDS EFFECT ---
        cards.forEach((card, index) => {
          if (!card) return;

          ScrollTrigger.create({
            trigger: card,
            start: "top top", 
            end: `bottom top+=${100 * (totalCards - index)}`, 
            pin: true,
            pinSpacing: false, 
            scrub: true,
            id: `card-${index}`,
            onUpdate: (self) => {
              // Logic for all cards except the last one
              if (index < totalCards - 1) {
                 const progress = self.progress;
                 gsap.to(card, {
                     scale: 1 - (progress * 0.1), 
                     opacity: 1 - (progress * 0.5), 
                     filter: `blur(${progress * 5}px)`, 
                     overwrite: 'auto'
                 });
              } else {
                // Logic specifically for the LAST card to make it disappear
                const progress = self.progress;
                // Start fading out after 50% scroll of its pinned duration
                if (progress > 0.5) {
                    gsap.to(card, {
                        opacity: 1 - ((progress - 0.5) * 2), // Fade out completely by end
                        scale: 1 - ((progress - 0.5) * 0.2),
                        filter: `blur(${(progress - 0.5) * 10}px)`,
                        overwrite: 'auto'
                    });
                }
              }
            }
          });
          
          // Entrance animation
          gsap.fromTo(card, 
              { opacity: 0, y: 100, scale: 0.9 },
              { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  duration: 0.8,
                  ease: "power3.out",
                  scrollTrigger: {
                      trigger: card,
                      start: "top 90%",
                      end: "top 60%",
                      scrub: 1
                  }
              }
          );
        });
      } else {
        // --- DESKTOP: ZIG-ZAG REVEAL ---
        
        // Animate Center Line
        gsap.fromTo(lineRef.current, 
            { height: "0%" },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1,
              }
            }
        );

        cards.forEach((card, index) => {
            if (!card) return;
            
            // Direction: 1 (Right side card) comes from Right (+100)
            // Direction: -1 (Left side card) comes from Left (-100)
            // Wait... in the layout:
            // Index 0 (Even): Content is on Right. So it should come from Right (+100).
            // Index 1 (Odd): Content is on Left. So it should come from Left (-100).
            
            // Current code: direction = index % 2 === 0 ? 1 : -1;
            // Even (0): 1 * 50 = +50 (Right). Correct.
            // Odd (1): -1 * 50 = -50 (Left). Correct.
            
            // To make it look like it's coming from "outside the screen", we need larger values.
            // Even (0): Left Side -> Needs to come from Left (-x)
            // Odd (1): Right Side -> Needs to come from Right (+x)
            const direction = index % 2 === 0 ? -1 : 1;
            
            gsap.fromTo(card,
              { opacity: 0, x: direction * 200 }, // Increased distance for "outside-in" feel
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%", // Start slightly earlier
                  end: "top 50%",
                  scrub: 1 // Smooth scrubbing
                }
              }
            );
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section className="relative py-20 bg-[#020617]" id="schedule" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h3 className="text-cyan-500 font-mono text-sm tracking-wider mb-2">EVENT SCHEDULE</h3>
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-white text-shadow-glow">
            MISSION <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">TIMELINE</span>
          </h2>
        </motion.div>

        {isMobile ? (
            // --- MOBILE LAYOUT (DECK) ---
            <div className="relative flex flex-col gap-0 pb-40"> 
              {schedule.map((item, index) => (
                <div 
                  key={index}
                  ref={el => cardsRef.current[index] = el}
                  className="sticky top-0 h-screen flex items-center justify-center w-full"
                >
                  <div className="relative w-full max-w-2xl mx-auto">
                    <div className="relative bg-[#0a0520] border border-cyan-500/30 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                      
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500"></div>

                      <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="mb-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30 text-cyan-400 font-mono text-sm tracking-widest">
                                <Clock size={16} />
                                {item.time}
                            </div>
                        </div>
                        
                        <h3 className="text-3xl font-cyber font-bold text-white mb-4 leading-tight">
                            {item.event}
                        </h3>
                        
                        <p className="text-gray-400 text-lg mb-8 font-rajdhani max-w-lg">
                            {item.desc}
                        </p>
                        
                        <div className="flex items-center gap-2 text-gray-500 uppercase tracking-wider text-sm font-bold">
                            <MapPin size={16} className="text-blue-500" /> 
                            {item.location}
                        </div>
                      </div>
                      
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] font-cyber font-black text-white/5 pointer-events-none select-none z-0">
                          0{index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        ) : (
            // --- DESKTOP LAYOUT (ZIG-ZAG) ---
            <div className="relative">
              <div ref={lineRef} className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-linear-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 h-full origin-top"></div>
              
              <div className="space-y-24">
                {schedule.map((item, index) => (
                  <div 
                    key={index}
                    ref={el => cardsRef.current[index] = el}
                    className={`relative flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="w-1/2"></div>
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                      <div className="w-4 h-4 bg-[#020617] border-2 border-cyan-500 rounded-full shadow-[0_0_10px_rgba(0,243,255,0.8)] relative group-hover:scale-125 transition-transform duration-300">
                        <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20"></div>
                      </div>
                    </div>

                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                      <div className="relative group">
                        {/* Connecting Line */}
                        <div className={`absolute top-1/2 ${index % 2 === 0 ? '-right-16' : '-left-16'} w-16 h-[1px] bg-cyan-500/30 group-hover:bg-cyan-400 transition-colors duration-500`}>
                            <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full ${index % 2 === 0 ? 'left-0' : 'right-0'} shadow-[0_0_10px_rgba(6,182,212,0.8)]`}></div>
                        </div>

                        {/* Card Container */}
                        <div className="relative bg-[#0a0520]/80 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-xl overflow-hidden transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:-translate-y-2">
                          
                          {/* Hover Gradient */}
                          <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Tech Corners */}
                          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-lg group-hover:border-cyan-400 transition-colors"></div>
                          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-500/30 rounded-br-lg group-hover:border-cyan-400 transition-colors"></div>
                          
                          {/* Decorative Elements */}
                          <div className={`absolute top-4 ${index % 2 === 0 ? 'left-4' : 'right-4'} flex gap-1`}>
                            <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></div>
                            <div className="w-1 h-1 bg-cyan-500/50 rounded-full"></div>
                            <div className="w-1 h-1 bg-cyan-500/30 rounded-full"></div>
                          </div>

                          {/* Content */}
                          <div className="relative z-10">
                            <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                              <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-2 group-hover:bg-cyan-500/20 transition-colors">
                                <Clock size={14} className="text-cyan-400" />
                                <span className="font-mono text-cyan-400 text-xs tracking-widest">{item.time}</span>
                              </div>
                            </div>
                            
                            <h3 className="text-3xl font-bold text-white mb-3 font-cyber tracking-wide group-hover:text-cyan-400 transition-colors duration-300">
                              {item.event}
                            </h3>
                            
                            <p className="text-gray-400 text-base mb-6 font-rajdhani leading-relaxed group-hover:text-gray-300 transition-colors">
                              {item.desc}
                            </p>
                            
                            <div className={`flex items-center gap-2 text-sm text-gray-500 uppercase tracking-wider font-mono ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                              <MapPin size={14} className="text-blue-500 group-hover:text-blue-400 transition-colors" /> 
                              <span className="group-hover:text-blue-400 transition-colors">{item.location}</span>
                            </div>
                          </div>

                          {/* Scanline Effect */}
                          <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        )}
      </div>
    </section>
  );
};

export default Timeline;