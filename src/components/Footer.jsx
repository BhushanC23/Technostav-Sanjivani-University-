import React from 'react';
import { Github, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <h3 className="font-orbitron text-2xl font-bold text-white mb-4">
              TECHNOSTAV<span className="text-neon-violet">'26</span>
            </h3>
            <p className="font-rajdhani text-gray-400 mb-6">
              The ultimate convergence of technology and innovation. 
              Join us in shaping the future at Sanjivani University.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-neon-violet transition-colors"><Github size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-neon-violet transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-neon-violet transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-neon-violet transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron text-lg font-bold text-white mb-6">QUICK LINKS</h4>
            <ul className="space-y-3 font-rajdhani text-gray-400">
              <li><a href="#" className="hover:text-fuchsia transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-fuchsia transition-colors">Events Schedule</a></li>
              <li><a href="#" className="hover:text-fuchsia transition-colors">Register Now</a></li>
              <li><a href="#" className="hover:text-fuchsia transition-colors">Sponsors</a></li>
              <li><a href="#" className="hover:text-fuchsia transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-orbitron text-lg font-bold text-white mb-6">CONTACT BASE</h4>
            <ul className="space-y-4 font-rajdhani text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-neon-violet mt-1 flex-shrink-0" />
                <span>Sanjivani University, Kopargaon,<br />Maharashtra, India - 423603</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-neon-violet flex-shrink-0" />
                <span>contact@technostav.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-neon-violet flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center font-rajdhani text-gray-500 text-sm">
          <p>&copy; 2026 Technostav. All rights reserved. System Status: ONLINE.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;