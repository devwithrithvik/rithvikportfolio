import React from 'react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-primary">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="text-2xl font-bold font-display mb-2">
            <span className="text-accent-neon">RK</span>
            <span className="text-white">.dev</span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs mb-4">
            Building the future of the web, one pixel at a time. Available for freelance opportunities.
          </p>
          <a href="/inbox" className="text-accent-purple text-sm font-bold hover:underline">Check Private Inbox</a>
        </div>

        <div className="flex items-center space-x-6">
          <a href="https://github.com/devwithrithvik" className="text-gray-400 hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Twitter size={20} />
          </a>
          <a href="https://www.linkedin.com/in/rithvik-kolipaka-3479b5383" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Instagram size={20} />
          </a>
        </div>

        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Rithvik Kolipaka. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
