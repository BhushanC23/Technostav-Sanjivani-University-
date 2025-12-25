import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

const schedule = [
  { time: "09:00 AM", event: "SYSTEM INITIALIZATION", desc: "Opening Ceremony & Keynote", location: "Main Auditorium" },
  { time: "11:00 AM", event: "HACKATHON BEGINS", desc: "24-Hour Coding Marathon Starts", location: "Innovation Hub" },
  { time: "02:00 PM", event: "ROBO WARS", desc: "Qualifying Rounds - Arena 1", location: "Open Ground" },
  { time: "05:00 PM", event: "CYBER GAMING", desc: "Valorant Tournament - Group Stage", location: "E-Sports Arena" },
  { time: "08:00 PM", event: "NEON NIGHT", desc: "Cultural Event & DJ Night", location: "Amphitheatre" },
];

const Timeline = () => {
  return (
    <section className="relative py-20 overflow-hidden" id="schedule">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-cyan-500 font-mono text-sm tracking-wider mb-2">EVENT SCHEDULE</h3>
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-white text-shadow-glow">
            MISSION <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">TIMELINE</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Center Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-linear-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0"></div>
          
          {/* Vertical Left Line (Mobile) */}
          <div className="md:hidden absolute left-4 h-full w-0.5 bg-linear-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0"></div>

          <div className="space-y-12 md:space-y-0">
            {schedule.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Spacer (Desktop) */}
                <div className="hidden md:block w-1/2"></div>

                {/* Connector */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-10">
                  <div className="w-4 h-4 bg-[#020617] border-2 border-cyan-500 rounded-full shadow-[0_0_10px_rgba(0,243,255,0.8)] relative">
                    <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <div className="relative group">
                    {/* Tech Corners */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors md:hidden"></div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors md:hidden"></div>

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.1)]">
                      <div className={`flex items-center gap-3 mb-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        <Clock size={16} className="text-cyan-400" />
                        <span className="font-mono text-cyan-400 text-sm tracking-widest">{item.time}</span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-cyber">{item.event}</h3>
                      <p className="text-gray-400 text-sm mb-4 font-rajdhani">{item.desc}</p>
                      
                      <div className={`flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        <MapPin size={14} /> {item.location}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;