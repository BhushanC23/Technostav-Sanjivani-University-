import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Grid, Sparkles, ArrowUpRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-deep-black">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid Floor */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[linear-gradient(to_right,rgba(124,58,237,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_top,black,transparent)] transform perspective-500 rotate-x-60 origin-bottom"></div>

        {/* HoloCore Effect - Top Right */}
        <div className="absolute -top-20 -right-20 opacity-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-neon-violet/20 rounded-full animate-[spin_30s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-dotted border-fuchsia/20 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
        </div>

        {/* HoloCore Effect - Bottom Left */}
        <div className="absolute -bottom-20 -left-20 opacity-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-neon-violet/20 rounded-full animate-[spin_30s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dotted border-white/10 rounded-full animate-[spin_25s_linear_infinite_reverse]"></div>
        </div>
        
        {/* Floating geometric elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-neon-violet rounded-full"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full pt-20">
        
        {/* Top Tag */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mb-6 font-mono text-xs tracking-widest"
        >
          <span className="border border-white/20 px-3 py-1 text-gray-300 bg-white/5">NATIONAL LEVEL EVENT</span>
          <span className="text-gray-500">//</span>
          <span className="text-neon-violet font-bold">21-22 FEB 2026</span>
        </motion.div>

        {/* Main Title */}
        <div className="relative text-center mb-2">
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-orbitron text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none"
          >
            TECHNOSTAV<span className="text-gray-500">'26</span>
          </motion.h1>
          
          {/* Subtitle Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full"
          >
            <h2 className="font-rajdhani text-2xl md:text-4xl font-bold text-neon-violet tracking-[0.5em] uppercase opacity-80 mix-blend-screen">
              Sanjivani University
            </h2>
          </motion.div>
        </div>

        {/* Description Box */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 max-w-2xl text-center relative"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl -z-10"></div>
          <div className="p-8">
            <p className="font-rajdhani text-lg text-gray-300 leading-relaxed">
              Witness the <span className="text-white font-bold">First National Level Tech Fest</span> at Sanjivani University. 
              Two days of relentless innovation, coding battles, and engineering marvels.
            </p>
            <p className="font-orbitron text-sm text-neon-violet font-bold mt-4 tracking-widest">
              BE PART OF THE LEGACY.
            </p>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-6"
        >
          <button className="group px-8 py-4 bg-neon-violet text-white font-orbitron font-bold tracking-wider hover:bg-fuchsia transition-all duration-300 flex items-center gap-2 clip-path-slant">
            EXPLORE EVENTS <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-4 border border-white/20 text-white font-orbitron font-bold tracking-wider hover:bg-white/5 transition-all duration-300 uppercase">
            Campus Ambassador
            <span className="block text-[10px] font-normal text-gray-500 tracking-widest mt-1">Scroll Down</span>
          </button>
        </motion.div>

        {/* Bottom Right Widget */}
        <div className="absolute bottom-10 right-10 hidden md:flex flex-col gap-4">
          <div className="w-12 h-32 bg-black/40 backdrop-blur border border-white/10 rounded-full flex flex-col items-center justify-between py-4 text-gray-500">
            <Grid size={16} />
            <Sparkles size={16} className="text-neon-violet" />
            <ArrowUpRight size={16} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;