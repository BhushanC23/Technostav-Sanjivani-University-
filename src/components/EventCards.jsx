import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Gamepad2, Rocket } from 'lucide-react';

const events = [
  { title: "Hackathon", icon: <Code size={40} />, desc: "24 Hour Coding Battle" },
  { title: "RoboWars", icon: <Cpu size={40} />, desc: "Build. Fight. Win." },
  { title: "Gaming", icon: <Gamepad2 size={40} />, desc: "Valorant & CS:GO Tournament" },
  { title: "Innovation", icon: <Rocket size={40} />, desc: "Project Exhibition" },
];

const EventCards = () => {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-orbitron font-bold text-center mb-12 text-white">FEATURED EVENTS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, borderColor: '#d946ef' }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl flex flex-col items-center text-center group cursor-pointer hover:shadow-[0_0_30px_rgba(217,70,239,0.3)] transition-all duration-300"
          >
            <div className="text-neon-violet group-hover:text-fuchsia transition-colors duration-300 mb-4">
              {event.icon}
            </div>
            <h3 className="text-2xl font-orbitron font-bold text-white mb-2">{event.title}</h3>
            <p className="font-rajdhani text-gray-400">{event.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventCards;