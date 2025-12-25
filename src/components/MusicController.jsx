import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const MusicController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/assets/music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error("Audio playback failed:", error);
            // Auto-pause if playback fails (e.g. interaction policy)
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <div className="relative z-50 lg:fixed lg:bottom-6 lg:right-6">
      <motion.button
        onClick={togglePlay}
        className={`relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 group ${
          isPlaying 
            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.4)]' 
            : 'bg-black/60 border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse Rings when playing */}
        {isPlaying && (
          <>
            <span className="absolute -inset-1 rounded-full bg-cyan-500/20 animate-ping duration-1000"></span>
            <span className="absolute -inset-2 rounded-full bg-cyan-500/10 animate-pulse duration-2000"></span>
          </>
        )}

        {/* Equalizer Bars Animation (Mini) */}
        {isPlaying && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-0.5 h-1/2 items-end opacity-0 group-hover:opacity-100 transition-opacity">
             {/* This could be complex, sticking to simple icon for now as requested */}
          </div>
        )}

        <div className="relative z-10">
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </div>
      </motion.button>
    </div>
  );
};

export default MusicController;
