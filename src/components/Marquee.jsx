import React from 'react';

const Marquee = () => {
  return (
    <div className="bg-neon-violet/10 border-y border-neon-violet/30 py-2 overflow-hidden relative">
      <div className="animate-marquee whitespace-nowrap flex space-x-8 font-rajdhani font-bold text-neon-violet tracking-wider">
        <span>REGISTRATIONS OPEN FOR TECHNOSTAV'26</span>
        <span>•</span>
        <span>OVER 50+ EVENTS</span>
        <span>•</span>
        <span>WIN PRIZES WORTH 5 LAKHS</span>
        <span>•</span>
        <span>HACKATHONS • CODING • ROBOTICS • GAMING</span>
        <span>•</span>
        <span>REGISTRATIONS OPEN FOR TECHNOSTAV'26</span>
        <span>•</span>
        <span>OVER 50+ EVENTS</span>
      </div>
    </div>
  );
};

export default Marquee;