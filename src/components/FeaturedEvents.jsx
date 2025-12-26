import React, { useRef, useLayoutEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code, Cpu, Zap, Award, Mic, Trophy, ChevronRight, Target } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- TILT CARD COMPONENT (Copied for self-containment) ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const boundsRef = useRef(null);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseEnter = (e) => {
    boundsRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    if (!boundsRef.current) return;
    // Disable tilt on touch devices/small screens for performance
    if (window.innerWidth < 768) return;
    
    const width = boundsRef.current.width;
    const height = boundsRef.current.height;
    const mouseXVal = e.clientX - boundsRef.current.left;
    const mouseYVal = e.clientY - boundsRef.current.top;
    const xPct = mouseXVal / width - 0.5;
    const yPct = mouseYVal / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    boundsRef.current = null;
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const events = [
  { icon: <Code size={32} />, title: "Code-A-Thon", subtitle: "National Hackathon", desc: "24-hour coding marathon. Solve real-world problems. Prize Pool: ₹1,00,000+", color: "cyan" },
  { icon: <Cpu size={32} />, title: "Robo-Arena", subtitle: "Robot Combat", desc: "Design, build, and destroy. The ultimate arena for machine supremacy.", color: "pink" },
  { icon: <Zap size={32} />, title: "Drone Prix", subtitle: "FPV Racing", desc: "Navigate through neon obstacles at breakneck speeds. National qualifiers.", color: "sky" },
  { icon: <Award size={32} />, title: "Paper Presentation", subtitle: "Research Symposium", desc: "Present your innovative ideas to industry experts.", color: "cyan" },
  { icon: <Mic size={32} />, title: "Tech Talk", subtitle: "Industry Experts", desc: "Keynote sessions from leaders in AI, Blockchain and Space Tech.", color: "pink" },
  { icon: <Trophy size={32} />, title: "E-Sports", subtitle: "Gaming Tournament", desc: "Valorant, BGMI, and FIFA championships with massive screens.", color: "sky" }
];

const FeaturedEvents = ({ setIsRegistrationOpen }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Only apply the "Focus Spot" effect on mobile/tablet where vertical scrolling is dominant
      // On desktop, we might want a different effect or just the grid.
      // For now, applying to all, but tuning the trigger.
      
      ScrollTrigger.batch(cardsRef.current, {
        // Batching for performance
        interval: 0.1, 
        batchMax: 3,
        
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            scale: 1, // Reset scale to 1 instead of 1.05 for cleaner look
            filter: "grayscale(0%)",
            rotateX: 0,
            boxShadow: "0px 0px 20px rgba(0, 243, 255, 0.15)", // Reduced shadow intensity
            borderColor: "rgba(0, 243, 255, 0.4)",
            duration: 0.5, // Faster duration
            stagger: 0.1,
            overwrite: true
          });
        },
        onLeave: (batch) => {
          // Only fade out on desktop, keep visible on mobile once entered
          if (window.innerWidth > 768) {
             gsap.to(batch, {
               opacity: 0.4,
               scale: 0.95,
               filter: "grayscale(100%)",
               rotateX: 10,
               boxShadow: "0px 0px 0px rgba(0,0,0,0)",
               borderColor: "rgba(255, 255, 255, 0.1)",
               duration: 0.6,
               stagger: 0.1,
               overwrite: true
             });
          }
        },
        onEnterBack: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            scale: 1.05,
            filter: "grayscale(0%)",
            rotateX: 0,
            boxShadow: "0px 0px 30px rgba(0, 243, 255, 0.2)",
            borderColor: "rgba(0, 243, 255, 0.5)",
            duration: 0.6,
            stagger: 0.1,
            overwrite: true
          });
        },
        onLeaveBack: (batch) => {
          if (window.innerWidth > 768) {
            gsap.to(batch, {
              opacity: 0.4,
              scale: 0.95,
              filter: "grayscale(100%)",
              rotateX: -10,
              boxShadow: "0px 0px 0px rgba(0,0,0,0)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              duration: 0.6,
              stagger: 0.1,
              overwrite: true
            });
          }
        },
        
        // The "Focus Spot" Logic
        start: "top 75%", // Adjusted for better mobile trigger
        end: "bottom 25%",
        markers: false 
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const colorClasses = {
    cyan: "text-cyan-400 group-hover:border-cyan-500",
    pink: "text-blue-500 group-hover:border-blue-500",
    sky: "text-sky-500 group-hover:border-sky-500",
  };

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6" id="events" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-4 text-center md:text-left">
          <div>
            <h3 className="text-blue-500 font-mono text-xs md:text-sm tracking-wider mb-2 flex items-center justify-center md:justify-start gap-2">
              <Target size={14} /> DOMAINS
            </h3>
            <h2 className="font-cyber text-3xl md:text-5xl font-bold text-white text-shadow-glow">FEATURED EVENTS</h2>
          </div>
          <div className="h-px bg-linear-to-r from-cyan-500/50 to-transparent grow mx-8 hidden md:block"></div>
          <button className="text-cyan-400 hover:text-white transition-colors flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest border-b border-cyan-500 pb-1">
            VIEW ALL <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 perspective-1000">
          {events.map((event, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="will-change-transform opacity-0 transform-gpu" // Initial state for GSAP to take over
              onClick={() => setIsRegistrationOpen(true)}
            >
              <TiltCard className={`group h-full relative glass-panel p-6 md:p-8 rounded-xl cursor-pointer border border-white/10 ${colorClasses[event.color]} overflow-hidden transition-colors duration-300`}>
                {/* HUD Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className={`absolute -right-4 -top-4 p-4 opacity-5 group-hover:opacity-20 transition-all transform group-hover:scale-125 group-hover:rotate-12 duration-500`}>
                   {React.cloneElement(event.icon, { size: 120 })}
                </div>
                
                <div className="relative z-10 text-left">
                  <div className={`mb-4 md:mb-6 p-3 md:p-4 bg-white/5 w-fit rounded-lg backdrop-blur-md ${event.color === 'cyan' ? 'text-cyan-400' : event.color === 'pink' ? 'text-blue-500' : 'text-sky-500'} ring-1 ring-white/10 group-hover:ring-white/30 transition-all group-hover:shadow-[0_0_15px_rgba(0,243,255,0.5)]`}>
                    {React.cloneElement(event.icon, { size: 24 })}
                  </div>
                  <h4 className="font-mono text-[10px] md:text-xs text-gray-400 mb-2 tracking-widest uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-current rounded-full"></span> {event.subtitle}
                  </h4>
                  <h3 className="font-cyber text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-all group-hover:drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                    {event.desc}
                  </p>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300 text-cyan-400">
                    REGISTER NOW <ChevronRight size={14} />
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
