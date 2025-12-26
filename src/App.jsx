import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Menu, X, Instagram, Twitter, Linkedin, ChevronRight, Zap, Code, Cpu, Calendar, MapPin, Ticket, Target, Globe, Maximize, Minimize, Award, Mic, Users, Trophy, User, Mail, Phone, School, Home, Fingerprint, Lock, Unlock } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Timeline from './components/Timeline';
import FeaturedEvents from './components/FeaturedEvents';
import MusicController from './components/MusicController';

gsap.registerPlugin(ScrollTrigger);

/**
 * TECHNOSTAV'26 - Sanjivani University
 * Final Robust Version: Fixed rendering issues, safer boot sequence logic.
 */

// --- BOOT SEQUENCE COMPONENT ---
const BootSequence = ({ onComplete }) => {
  const [phase, setPhase] = useState('lock'); // lock, boot
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  
  const bootText = [
    "INITIALIZING SYSTEM...",
    "SOURCE: SANJIVANI UNIVERSITY",
    "PROTOCOL: TECHNOSTAV’26",
    "STATUS: NATIONAL LEVEL",
    "SYSTEM READY"
  ];

  // Phase Management
  useEffect(() => {
    if (phase === 'lock') {
      const timer = setTimeout(() => {
        setUnlocked(true);
        setTimeout(() => setPhase('boot'), 800); // Wait for unlock anim
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Text typing effect (Only runs in 'boot' phase)
  useEffect(() => {
    if (phase !== 'boot') return;
    
    let currentLine = 0;
    const textInterval = setInterval(() => {
      if (currentLine < bootText.length) {
        setLines(prev => [...prev, bootText[currentLine]]);
        currentLine++;
      } else {
        clearInterval(textInterval);
      }
    }, 400); // Faster

    return () => clearInterval(textInterval);
  }, [phase]);

  // Progress bar effect (Only runs in 'boot' phase)
  useEffect(() => {
    if (phase !== 'boot') return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + Math.random() * 15, 100); // Faster
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [phase]);

  // Completion
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(onComplete, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center font-mono text-cyan-500 p-4 overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
       <AnimatePresence mode="wait">
         {/* Phase 2: HUD Lock */}
         {phase === 'lock' && (
            <motion.div
               key="lock"
               initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
               className="relative flex items-center justify-center z-20"
            >
               {/* Rotating Rings */}
               <div className={`absolute w-64 h-64 border-2 border-cyan-500/30 rounded-full border-t-transparent animate-spin-slow ${unlocked ? 'border-green-500/50' : ''}`} />
               <div className={`absolute w-48 h-48 border-2 border-blue-500/30 rounded-full border-b-transparent animate-spin-reverse-slow ${unlocked ? 'border-green-500/50' : ''}`} />
               
               {/* Center Lock */}
               <div className="relative z-10 text-white">
                  {unlocked ? <Unlock size={64} className="text-green-400" /> : <Lock size={64} className="text-cyan-400" />}
               </div>
               
               <div className="absolute -bottom-24 text-center font-mono text-xs tracking-[0.3em] text-cyan-400 w-full">
                  {unlocked ? <span className="text-green-400">ACCESS GRANTED</span> : "SECURITY CHECK"}
               </div>
            </motion.div>
         )}

         {/* Phase 3: System Boot (Existing Logic) */}
         {phase === 'boot' && (
            <motion.div 
                key="boot"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="w-full max-w-md relative z-10 flex flex-col justify-center min-h-[50vh] border-x border-cyan-500/10 px-6 bg-black/20 backdrop-blur-sm"
            >
                {/* Header */}
                <div className="border-b border-cyan-500/30 pb-4 mb-8 flex justify-between items-center text-[10px] tracking-[0.2em] opacity-70">
                <span>SANJIVANI_ROOT</span>
                <span className="animate-pulse text-blue-500">● LIVE</span>
                </div>

                {/* Vertical Lines */}
                <div className="grow flex flex-col justify-center mb-8 space-y-4 font-bold text-sm md:text-lg">
                {lines.map((line, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }} 
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}   
                            transition={{ duration: 0.4 }}
                            className="flex items-center gap-3"
                        >
                        <ChevronRight size={18} className="text-blue-500 shrink-0" />
                        <span className={`tracking-widest wrap-break-word ${index === lines.length - 1 ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.8)]' : 'text-cyan-400'}`}>
                            {line}
                        </span>
                        </motion.div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-cyan-400/60 mb-2">
                        <span>System_Check</span>
                        <span>{Math.floor(progress)}%</span>
                    </div>
                    <div className="relative w-full h-1 bg-cyan-900/30 overflow-hidden">
                        <div 
                            className="absolute top-0 left-0 h-full bg-linear-to-r from-cyan-600 to-blue-500 shadow-[0_0_15px_#d946ef]"
                            style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                        ></div>
                    </div>
                </div>
            </motion.div>
         )}
       </AnimatePresence>

      {/* Background Grids */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-size-[40px_100%]"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#030014_90%)]"></div>
    </motion.div>
  );
};

// --- SCI-FI UPGRADES ---

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        followerRef.current.animate({
          transform: `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
        }, { duration: 500, fill: "forwards" });
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" />
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-cyan-500 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out" />
    </>
  );
};

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable on mobile for performance
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(1);
    const chars = "01TECHNOSTAV26SANJIVANI";

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#8b5cf6'; // cyan
      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-10 pointer-events-none mix-blend-screen hidden md:block" />;
};

const DecodingText = ({ text, className }) => {
  const [display, setDisplay] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
};


const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const boundsRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    if (ref.current) {
      boundsRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouse = (e) => {
    if (!boundsRef.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = boundsRef.current;
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    boundsRef.current = null;
  };

  const { x, y } = position;
  return (
    <motion.button
      ref={ref}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// --- CUSTOM HOOKS ---

const useTypingEffect = (words, typingSpeed = 150, deletingSpeed = 100, pauseDuration = 2000) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeedState(isDeleting ? deletingSpeed : typingSpeed);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeedState);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseDuration, typingSpeedState]);

  return text;
};

// --- VISUAL ENGINE (CSS 3D) ---

const StarField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Reduce star count on mobile
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 50 : 200;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random()
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
    />
  );
};

const CyberGrid = () => {
  return <div className="cyber-grid"></div>;
};

const AdvancedHoloCore = () => {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center pointer-events-none opacity-60">
      {/* Outer Ring - Simplified animation for mobile */}
      <div className="absolute w-full h-full border border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite] md:animate-[spin_10s_linear_infinite] border-t-2 border-t-cyan-500"></div>
      
      {/* Tech Ticks - Visible on mobile now for better vibe */}
      <div className="absolute w-[110%] h-[110%] animate-[spin_30s_linear_infinite]">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cyan-500/50"></div>
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cyan-500/50"></div>
         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-cyan-500/50"></div>
         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-cyan-500/50"></div>
      </div>

      {/* Middle Ring (Counter Rotate) */}
      <div className="absolute w-[80%] h-[80%] border border-blue-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse] border-b-2 border-b-blue-500 border-dashed"></div>
      
      {/* Inner Ring */}
      <div className="absolute w-[60%] h-[60%] border-2 border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite] flex items-center justify-center">
        <div className="w-full h-full border-l-4 border-cyan-500 rounded-full opacity-50"></div>
      </div>
      
      {/* Core */}
      <div className="absolute w-20 h-20 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_20px_#fff] animate-ping"></div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [booting, setBooting] = useState(true);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  
  const typingText = useTypingEffect(["TECHNOSTAV'26", "INNOVATION", "THE FUTURE", "REVOLUTION"], 100, 50);

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => console.log(e));
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-white relative">
      <CustomCursor />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        :root {
          --neon-primary: #8b5cf6; 
          --neon-secondary: #d946ef; 
        }

        body { font-family: 'Rajdhani', sans-serif; background-color: #030014; }
        .font-cyber { font-family: 'Orbitron', sans-serif; }

        .glass-panel {
          background: rgba(10, 5, 20, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(139, 92, 246, 0.15);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .clip-path-polygon {
          clip-path: polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%);
        }
        
        @keyframes spin-slow-3d {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg); }
        }
        @keyframes spin-reverse-3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(-360deg) rotateY(-360deg); }
        }
        @keyframes star-move-slow {
          from { transform: translateY(0); }
          to { transform: translateY(-100vh); }
        }
        @keyframes star-move-fast {
          from { transform: translateY(0); }
          to { transform: translateY(-200vh); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0); }
        }

        .animate-spin-slow-3d { animation: spin-slow-3d 20s linear infinite; }
        .animate-spin-reverse-3d { animation: spin-reverse-3d 15s linear infinite; }
        .animate-star-move-slow { animation: star-move-slow 100s linear infinite; }
        .animate-star-move-fast { animation: star-move-fast 60s linear infinite; }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-blink { animation: blink 1s step-end infinite; }
        .animate-fade-in-long { animation: fadeIn 2s ease-out forwards; }
        
        .glitch-text:hover {
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
          color: var(--neon-primary);
          text-shadow: 2px 0 var(--neon-secondary), -2px 0 #00ffff;
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {booting ? (
          <BootSequence key="boot" onComplete={() => setBooting(false)} />
        ) : (
          <motion.div 
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full min-h-screen relative flex flex-col"
          >
            {/* --- BACKGROUND LAYER --- */}
            <div className="fixed inset-0 z-0 bg-linear-to-b from-[#020617] to-[#0a0520] overflow-hidden">
              <MatrixRain />
              <StarField />
              <CyberGrid />
              {/* Reduced blur radius for mobile performance */}
              <div className="absolute top-[-10%] left-[-10%] w-75 md:w-125 h-75 md:h-125 bg-cyan-900/20 rounded-full blur-[40px] md:blur-[120px] animate-pulse"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-75 md:w-150 h-75 md:h-150 bg-sky-900/20 rounded-full blur-[40px] md:blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            {/* --- UI LAYER --- */}
            <div className="relative z-10 block pb-24 lg:pb-0">
              
              {/* Navigation */}
              <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/5 ${scrolled ? 'bg-[#020617]/90 backdrop-blur-md py-3 shadow-lg shadow-cyan-900/10' : 'bg-transparent py-4 md:py-6'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-cyan-500 rounded-sm flex items-center justify-center relative overflow-hidden group-hover:border-blue-500 transition-colors bg-black/50 backdrop-blur-sm">
                      <Zap className="text-cyan-500 group-hover:text-blue-500 transition-colors w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-cyber text-lg md:text-2xl font-bold tracking-wider text-white leading-none glitch" data-text="TECHNOSTAV">TECHNO<span className="text-cyan-500">STAV</span></span>
                      <span className="text-[8px] md:text-[10px] text-gray-400 tracking-[0.2em] uppercase leading-tight">Sanjivani University</span>
                    </div>
                  </div>

                  {/* Desktop Links */}
                  <div className="hidden lg:flex items-center gap-8">
                    {['Home', 'Events', 'Workshops', 'Sponsors'].map((item) => (
                      <a key={item} href={`#${item.toLowerCase()}`} className="relative text-sm font-semibold tracking-widest uppercase text-gray-300 hover:text-cyan-400 transition-colors group glitch-hover" data-text={item}>
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300"></span>
                      </a>
                    ))}
                    
                    <button onClick={toggleFullscreen} className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-full" title="Toggle Fullscreen">
                      {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                    </button>

                    <button onClick={() => setIsRegistrationOpen(true)} className="px-6 py-2 bg-cyan-500/10 border border-cyan-500 text-cyan-400 font-cyber text-sm tracking-wider hover:bg-cyan-500 hover:text-black transition-all duration-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_25px_rgba(0,243,255,0.6)] clip-path-polygon hover:scale-105">
                      REGISTER
                    </button>
                  </div>

                  {/* Music Controller (Mobile: Top Right, Desktop: Bottom Right Fixed) */}
                  <MusicController />
                </div>
              </nav>

              {/* Mobile Menu Removed - Replaced by Bottom Nav */}

              {/* HUD Elements (Hidden on small mobile to save space) */}
              <div className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-20">
                <div className="w-px h-20 bg-linear-to-b from-transparent via-cyan-500 to-transparent mx-auto mb-4"></div>
                <div className="flex flex-col gap-6 text-gray-500">
                  <Instagram size={20} className="hover:text-cyan-400 cursor-pointer transition-colors" />
                  <Twitter size={20} className="hover:text-blue-500 cursor-pointer transition-colors" />
                  <Linkedin size={20} className="hover:text-sky-500 cursor-pointer transition-colors" />
                </div>
                <div className="w-px h-20 bg-linear-to-b from-transparent via-cyan-500 to-transparent mx-auto mt-4"></div>
              </div>

              {/* Hero Section */}
              <section className="fixed top-0 left-0 w-full h-screen flex items-center justify-center px-4 md:px-6 pt-0 md:pt-20 overflow-hidden z-0 pointer-events-auto">
                {/* Background Holo Objects - Responsive Positioning */}
                <div className="absolute top-[15%] -right-[10%] md:top-[10%] md:right-[5%] z-0 pointer-events-none scale-75 md:scale-100 opacity-80 md:opacity-80">
                  <AdvancedHoloCore />
                </div>
                <div className="absolute bottom-[15%] -left-[10%] md:bottom-[10%] md:left-[5%] z-0 pointer-events-none scale-75 md:scale-100 opacity-80 md:opacity-80">
                  <AdvancedHoloCore />
                </div>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="max-w-6xl w-full text-center relative z-10 flex flex-col items-center"
                >
                  {/* Decorative Frame - Responsive */}
                  <div className="absolute top-0 left-0 w-16 h-16 md:w-32 md:h-32 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 md:w-32 md:h-32 border-b-2 border-r-2 border-blue-500/30 rounded-br-3xl"></div>

                  <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-3 mb-4 md:mb-6 mt-0 md:mt-0">
                      <span className="px-2 md:px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-[10px] md:text-xs font-mono tracking-widest text-cyan-300 animate-pulse text-center">
                          NATIONAL LEVEL EVENT
                      </span>
                      <h2 className="text-cyan-400 font-mono tracking-[0.2em] text-[10px] md:text-sm">
                        // 21-22 FEB 2026
                      </h2>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="mb-6 md:mb-8 relative inline-block text-center">
                    <h1 className="font-cyber text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black leading-tight md:leading-none cursor-default select-none filter drop-shadow-[0_0_10px_rgba(139,92,246,0.3)] min-h-[1.2em]">
                      <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-100 to-gray-400">{typingText}</span>
                      <span className="animate-blink text-cyan-500 ml-1">|</span>
                    </h1>
                    <h2 className="font-cyber text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold text-cyan-500 tracking-[0.2em] mt-2 md:mt-4 filter drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                      <DecodingText text="SANJIVANI UNIVERSITY" />
                    </h2>
                  </motion.div>

                  <motion.p variants={itemVariants} className="max-w-3xl mx-auto text-gray-300 text-sm md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-12 text-center md:border-l-0 md:pl-0 backdrop-blur-sm p-4 rounded-xl bg-black/30">
                    Witness the <span className="text-white font-bold">First National Level Tech Fest</span> at Sanjivani University. 
                    Two days of relentless innovation, coding battles, and engineering marvels. 
                    <br/><span className="hidden md:block text-cyan-400 text-xs md:text-sm font-bold tracking-widest mt-2">BE PART OF THE LEGACY.</span>
                  </motion.p>

                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full sm:w-auto px-4 sm:px-0">
                    <MagneticButton className="w-full sm:w-auto group relative px-6 md:px-8 py-3 md:py-4 bg-cyan-600 text-white font-cyber font-bold tracking-widest clip-path-polygon overflow-hidden shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_40px_rgba(0,243,255,0.7)] transition-all active:scale-95">
                      <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors duration-300 glitch-text">
                        EXPLORE EVENTS <ChevronRight size={18} />
                      </span>
                      <div className="absolute inset-0 bg-cyan-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                    </MagneticButton>
                    
                    <MagneticButton className="w-full sm:w-auto group relative px-6 md:px-8 py-3 md:py-4 border border-white/20 text-white font-cyber font-bold tracking-widest hover:bg-white/5 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all bg-transparent backdrop-blur-sm overflow-hidden clip-path-polygon active:scale-95">
                      <span className="relative z-10">CAMPUS AMBASSADOR</span>
                    </MagneticButton>
                  </motion.div>
                </motion.div>

                {/* Floating Scroll Indicator */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
                >
                  <div className="w-[26px] h-[42px] rounded-full border-2 border-cyan-500/40 flex justify-center p-2 shadow-[0_0_15px_rgba(0,243,255,0.2)] bg-black/20 backdrop-blur-sm">
                    <motion.div 
                      animate={{ y: [0, 12, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,243,255,0.8)]"
                    />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-cyan-400/70 font-cyber">Scroll</span>
                </motion.div>
              </section>

              {/* Content Wrapper for Parallax Effect */}
              <div className="relative z-20 bg-[#020617] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] mt-[100vh]">
              
              {/* Stats Marquee */}
              <div className="w-full bg-cyan-900/10 border-y border-cyan-500/20 py-3 md:py-4 overflow-hidden relative backdrop-blur-sm z-10">
                <div className="whitespace-nowrap flex gap-10 items-center animate-marquee">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-cyan-300/70 font-cyber text-xs md:text-sm tracking-widest flex items-center gap-4">
                      <span className="w-2 h-2 bg-blue-500 rotate-45 animate-pulse"></span>
                      NATIONAL LEVEL // HACKATHON // ROBOWARS // DRONE RACING // 21-22 FEB 2026
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured Events */}
              <FeaturedEvents setIsRegistrationOpen={setIsRegistrationOpen} />

              {/* Info Section */}
              <section className="relative py-16 md:py-24 px-4 md:px-6 bg-linear-to-b from-transparent to-[#0a0a15]/80">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  
                  <div className="relative order-2 lg:order-1">
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-sky-600 rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
                    <div className="relative glass-panel p-6 md:p-12 rounded-2xl overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-30">
                        <Ticket className="w-24 h-24 md:w-32 md:h-32 text-white/5 group-hover:text-cyan-400/10 transition-colors rotate-12" />
                      </div>
                      
                      <h3 className="font-cyber text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-3">
                        <Globe className="text-cyan-500" /> EVENT DETAILS
                      </h3>
                      <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
                        <div className="flex items-center gap-4 text-gray-300 border-b border-white/5 pb-4">
                          <div className="p-3 bg-cyan-500/20 rounded-lg text-cyan-400 shrink-0"><Calendar size={20} /></div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
                            <p className="font-bold text-base md:text-lg">February 21-22, 2026</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300 border-b border-white/5 pb-4">
                          <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 shrink-0"><MapPin size={20} /></div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Venue</p>
                            <p className="font-bold text-base md:text-lg">Sanjivani University Campus</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300 border-b border-white/5 pb-4">
                          <div className="p-3 bg-sky-500/20 rounded-lg text-sky-400 shrink-0"><Users size={20} /></div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Expected Footfall</p>
                            <p className="font-bold text-base md:text-lg">10,000+ Students</p>
                          </div>
                        </div>
                      </div>

                      <button onClick={() => setIsRegistrationOpen(true)} className="w-full py-3 md:py-4 bg-white text-black font-bold font-cyber hover:bg-cyan-500 hover:text-white transition-all tracking-widest rounded-sm clip-path-polygon shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,243,255,0.6)] active:scale-95">
                        GET PASSES
                      </button>
                    </div>
                  </div>

                  <div className="order-1 lg:order-2 text-center lg:text-left">
                    <h2 className="font-cyber text-3xl md:text-5xl font-bold mb-4 md:mb-6">THE FUTURE IS <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">HERE</span></h2>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                      Technostav'26 is not just an event; it's a phenomenon. As Sanjivani University's first National Level Tech Fest, we are setting the stage for the brightest minds across India to compete, innovate, and inspire.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <StatBox number="30+" label="Events" />
                      <StatBox number="50+" label="Colleges" />
                      <StatBox number="10k+" label="Footfall" />
                      <StatBox number="₹5L+" label="Prizes" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Workshops Section */}
              <section className="relative py-16 md:py-24 px-4 md:px-6 bg-black/40" id="workshops">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-4 text-center md:text-left">
                    <div>
                      <h3 className="text-sky-500 font-mono text-xs md:text-sm tracking-wider mb-2 flex items-center justify-center md:justify-start gap-2">
                        <Cpu size={14} /> HANDS-ON
                      </h3>
                      <h2 className="font-cyber text-3xl md:text-5xl font-bold text-white text-shadow-glow">WORKSHOPS</h2>
                    </div>
                    <div className="h-px bg-linear-to-r from-sky-500/50 to-transparent grow mx-8 hidden md:block"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <WorkshopCard 
                      title="AI & Generative Models" 
                      instructor="Dr. Sarah Connor" 
                      date="21 Feb, 10:00 AM"
                      image="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
                      onEnroll={() => setIsRegistrationOpen(true)}
                    />
                    <WorkshopCard 
                      title="Blockchain Development" 
                      instructor="Alex Murphy" 
                      date="22 Feb, 02:00 PM"
                      image="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop"
                      onEnroll={() => setIsRegistrationOpen(true)}
                    />
                  </div>
                </div>
              </section>

              {/* Timeline Section */}
              <Timeline />

              {/* Sponsors Section */}
              <section className="relative py-16 md:py-24 border-t border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden" id="sponsors">
                <div className="max-w-7xl mx-auto text-center mb-12">
                  <h3 className="text-cyan-500 font-mono text-xs md:text-sm tracking-wider mb-2">OUR PARTNERS</h3>
                  <h2 className="font-cyber text-3xl md:text-5xl font-bold text-white">SPONSORS</h2>
                </div>
                
                <div className="relative w-full overflow-hidden">
                  <div className="flex whitespace-nowrap animate-marquee gap-16 items-center">
                    {[...Array(2)].map((_, i) => (
                      <React.Fragment key={i}>
                        {['Google', 'Microsoft', 'GitHub', 'RedBull', 'Intel', 'Nvidia', 'Amazon', 'Tesla'].map((sponsor, index) => (
                          <div key={`${i}-${index}`} className="flex items-center gap-4 group cursor-pointer">
                            <span className="font-cyber text-2xl md:text-4xl font-bold text-gray-600 group-hover:text-cyan-400 transition-colors uppercase tracking-widest opacity-50 group-hover:opacity-100">
                              {sponsor}
                            </span>
                            <span className="text-blue-500 opacity-30 text-xl">/</span>
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  {/* Gradient Fade Edges */}
                  <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-linear-to-r from-[#020617] to-transparent z-10"></div>
                  <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-linear-to-l from-[#020617] to-transparent z-10"></div>
                </div>
              </section>

              {/* Footer */}
              <footer className="relative bg-black/80 backdrop-blur-xl py-8 md:py-12 px-6 border-t border-white/10 mt-auto">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                  <div className="text-center md:text-left">
                    <h2 className="font-cyber text-xl md:text-2xl font-bold text-white mb-2">TECHNOSTAV'26</h2>
                    <p className="text-gray-500 text-xs md:text-sm">© 2026 Sanjivani University. All rights reserved.</p>
                  </div>
                  
                  <div className="flex gap-6">
                    {['Instagram', 'Discord', 'YouTube'].map(social => (
                      <a key={social} href="#" className="text-gray-500 hover:text-cyan-400 transition-colors uppercase text-[10px] md:text-xs tracking-widest font-bold">
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </footer>
              </div>

              {/* Bottom Navigation - Mobile Floating Dock */}
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] grid grid-cols-5 items-center lg:hidden h-16 px-2">
                <a href="#" className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Home size={20} />
                </a>
                <a href="#events" className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Zap size={20} />
                </a>
                
                <div className="relative flex justify-center items-center">
                  <button onClick={() => setIsRegistrationOpen(true)} className="absolute -top-8 w-14 h-14 bg-linear-to-tr from-cyan-500 to-violet-600 rounded-full flex items-center justify-center border-4 border-[#030014] shadow-[0_0_20px_rgba(0,243,255,0.5)] text-white transform active:scale-95 transition-all duration-300 group z-50">
                    <Ticket size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                  </button>
                </div>

                <a href="#workshops" className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Cpu size={20} />
                </a>
                <a href="#sponsors" className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Users size={20} />
                </a>
              </div>
            </div>
            <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SUB COMPONENTS ---

const StatBox = ({ number, label }) => (
  <motion.div 
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
    className="p-4 md:p-6 border border-white/10 bg-white/5 rounded-lg text-center backdrop-blur-sm cursor-default"
  >
    <h4 className="font-cyber text-2xl md:text-3xl font-bold text-cyan-400 mb-1 md:mb-2">{number}</h4>
    <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">{label}</p>
  </motion.div>
);

const WorkshopCard = ({ title, instructor, date, image, onEnroll }) => (
  <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-black/50">
    <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-20 transition-opacity duration-500" style={{ backgroundImage: `url(${image})` }}></div>
    <div className="relative p-6 md:p-8 flex flex-col h-full z-10">
      <div className="mb-auto">
        <span className="px-3 py-1 bg-sky-500/20 border border-sky-500/50 rounded text-[10px] font-mono tracking-widest text-sky-300 mb-4 inline-block">WORKSHOP</span>
        <h3 className="font-cyber text-2xl md:text-3xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">by <span className="text-white font-bold">{instructor}</span></p>
      </div>
      <div className="mt-8 flex justify-between items-end border-t border-white/10 pt-4">
        <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
          <Calendar size={16} /> {date}
        </div>
        <button onClick={onEnroll} className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 font-bold font-cyber text-xs tracking-widest hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-all duration-300">
          ENROLL
        </button>
      </div>
    </div>
  </div>
);

const RegistrationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Successful! See you at Technostav'26.");
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-lg bg-[#0a0520] border border-cyan-500/30 rounded-xl p-6 md:p-8 shadow-[0_0_50px_rgba(139,92,246,0.2)]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        
        <h2 className="font-cyber text-2xl md:text-3xl font-bold text-white mb-2">JOIN THE REVOLUTION</h2>
        <p className="text-gray-400 text-sm mb-6">Secure your spot at Technostav'26.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-cyan-400 tracking-widest">FULL NAME</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input type="text" required className="w-full bg-white/5 border border-white/10 rounded p-3 pl-10 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="John Doe" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-cyan-400 tracking-widest">EMAIL</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="email" required className="w-full bg-white/5 border border-white/10 rounded p-3 pl-10 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-cyan-400 tracking-widest">PHONE</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input type="tel" required className="w-full bg-white/5 border border-white/10 rounded p-3 pl-10 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="+91 98765 43210" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-cyan-400 tracking-widest">COLLEGE / UNIVERSITY</label>
            <div className="relative">
              <School className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input type="text" required className="w-full bg-white/5 border border-white/10 rounded p-3 pl-10 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="Sanjivani University" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-cyan-400 tracking-widest">INTERESTED EVENT</label>
            <div className="relative">
              <select className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-cyan-500 focus:outline-none transition-colors appearance-none">
                <option>Code-A-Thon</option>
                <option>Robo-Arena</option>
                <option>Drone Prix</option>
                <option>Paper Presentation</option>
                <option>Gaming (E-Sports)</option>
                <option>Workshops</option>
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 rotate-90" size={16} />
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-cyber font-bold tracking-widest mt-4 transition-all clip-path-polygon shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_40px_rgba(0,243,255,0.6)] hover:scale-[1.02]">
            CONFIRM REGISTRATION
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default App;
