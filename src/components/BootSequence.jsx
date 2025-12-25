import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BootSequence = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState([]);
  
  const sequence = [
    { text: "INITIALIZING SYSTEM...", delay: 800 },
    { text: "SOURCE: SANJIVANI UNIVERSITY", delay: 2100 },
    { text: "PROTOCOL: TECHNOSTAV'26", delay: 3400 },
    { text: "STATUS: NATIONAL LEVEL", delay: 4700 },
    { text: "SYSTEM READY", delay: 6000, highlight: true },
  ];

  useEffect(() => {
    // Progress bar animation (approx 7s total)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 70); // 70ms * 100 = 7000ms = 7s

    // Text sequence animation
    const timeouts = sequence.map(({ text, delay, highlight }) => {
      return setTimeout(() => {
        setLines(prev => [...prev, { text, highlight }]);
      }, delay);
    });

    return () => {
      clearInterval(progressInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-deep-black z-50 flex items-center justify-center font-rajdhani"
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-md p-8 border border-white/10 bg-black/50 backdrop-blur-sm relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 text-xs tracking-widest text-gray-500 border-b border-white/10 pb-2">
          <span>SANJIVANI_ROOT</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span>LIVE</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-12 min-h-[160px]">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex items-center gap-3 text-lg font-bold tracking-wider ${
                line.highlight ? 'text-fuchsia drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]' : 'text-gray-300'
              }`}
            >
              <span className="text-neon-violet">›</span>
              {line.text}
            </motion.div>
          ))}
          {/* Blinking Cursor */}
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-3 h-5 bg-neon-violet ml-2 inline-block"
          />
        </div>

        {/* Footer / Progress */}
        <div className="flex justify-between text-xs text-gray-500 mb-2 font-mono">
          <span>SYSTEM_CHECK</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full bg-gray-900 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-neon-violet to-fuchsia"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BootSequence;