import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Calendar, Zap } from 'lucide-react';

const stats = [
  { icon: <Users size={32} />, value: "5000+", label: "PARTICIPANTS" },
  { icon: <Trophy size={32} />, value: "₹5L+", label: "PRIZE POOL" },
  { icon: <Calendar size={32} />, value: "2 DAYS", label: "NON-STOP ACTION" },
  { icon: <Zap size={32} />, value: "50+", label: "TECH EVENTS" },
];

const About = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1] opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 border border-neon-violet rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 border border-fuchsia rounded-full opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-6">
              ABOUT <span className="text-neon-violet">THE SYSTEM</span>
            </h2>
            <p className="font-rajdhani text-lg text-gray-300 mb-6 leading-relaxed">
              Technostav'26 is not just a tech fest; it's a glimpse into the future. 
              Hosted by Sanjivani University, this national-level convergence brings together 
              the brightest minds to compete, innovate, and redefine the boundaries of technology.
            </p>
            <p className="font-rajdhani text-lg text-gray-300 mb-8 leading-relaxed">
              From coding marathons to robotic warfare, enter a realm where digital dreams 
              manifest into reality. Prepare for an immersive cyberpunk experience like no other.
            </p>
            
            <button className="px-6 py-2 border border-fuchsia text-fuchsia font-orbitron hover:bg-fuchsia hover:text-white transition-all duration-300">
              READ MORE_
            </button>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg hover:border-neon-violet transition-colors group"
              >
                <div className="text-neon-violet mb-2 group-hover:text-fuchsia transition-colors">
                  {stat.icon}
                </div>
                <div className="text-3xl font-orbitron font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-rajdhani text-gray-400 tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;