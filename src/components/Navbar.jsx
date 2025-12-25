import React, { useState } from 'react';
import { Menu, X, Maximize, Minimize, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-40 backdrop-blur-md border-b border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-neon-violet flex items-center justify-center bg-neon-violet/10">
              <Zap className="text-neon-violet" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-orbitron text-2xl font-bold text-white tracking-wider leading-none">
                TECHNOSTAV<span className="text-neon-violet">'26</span>
              </span>
              <span className="font-rajdhani text-xs text-gray-400 tracking-[0.2em] mt-1">
                SANJIVANI UNIVERSITY
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <div className="flex items-baseline space-x-8 font-rajdhani font-bold text-sm tracking-widest">
              <a href="#" className="text-white hover:text-neon-violet transition-colors">HOME</a>
              <a href="#" className="text-gray-400 hover:text-neon-violet transition-colors">EVENTS</a>
              <a href="#" className="text-gray-400 hover:text-neon-violet transition-colors">WORKSHOPS</a>
              <a href="#" className="text-gray-400 hover:text-neon-violet transition-colors">SPONSORS</a>
            </div>
            
            <div className="flex items-center gap-6">
              <button onClick={toggleFullscreen} className="text-gray-400 hover:text-white transition-colors">
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
              <button className="px-6 py-2 border border-neon-violet/50 text-white font-orbitron text-sm tracking-wider hover:bg-neon-violet/10 transition-all duration-300">
                REGISTER
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-neon-violet">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-xl border-b border-neon-violet/30"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-rajdhani font-bold tracking-wider">
            <a href="#" className="block px-3 py-2 text-white hover:text-neon-violet">HOME</a>
            <a href="#" className="block px-3 py-2 text-gray-400 hover:text-neon-violet">EVENTS</a>
            <a href="#" className="block px-3 py-2 text-gray-400 hover:text-neon-violet">WORKSHOPS</a>
            <a href="#" className="block px-3 py-2 text-gray-400 hover:text-neon-violet">SPONSORS</a>
            <div className="pt-4 px-3">
              <button className="w-full px-6 py-2 border border-neon-violet/50 text-white font-orbitron text-sm tracking-wider hover:bg-neon-violet/10">
                REGISTER
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;