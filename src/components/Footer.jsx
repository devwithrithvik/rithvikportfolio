import React from 'react';
import { Github, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 px-6 md:px-12 border-t border-white/[0.05] bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
          <div className="max-w-md">
            <div className="text-3xl font-bold font-display mb-6 flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white text-base">R</div>
              <span className="text-white tracking-tighter">rithvik<span className="text-white/40">.dev</span></span>
            </div>
            <p className="text-white/30 text-lg font-light leading-relaxed mb-8">
              Crafting premium digital experiences for forward-thinking brands. Let's create something that matters.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://github.com/devwithrithvik" className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-300">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/rithvik-kolipaka-3479b5383" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-[0.3em] text-white/20 font-bold">Navigation</h4>
              <div className="flex flex-col gap-4">
                <a href="#home" className="text-white/50 hover:text-white transition-colors">Home</a>
                <a href="#about" className="text-white/50 hover:text-white transition-colors">About</a>
                <a href="#projects" className="text-white/50 hover:text-white transition-colors">Projects</a>
                <a href="#contact" className="text-white/50 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-[0.3em] text-white/20 font-bold">Extras</h4>
              <div className="flex flex-col gap-4">
                <a href="/inbox" className="text-white/50 hover:text-white transition-colors">Private Inbox</a>
                <a href="/admin/messages" className="text-white/50 hover:text-white transition-colors">Admin Console</a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-white/20 text-sm font-medium">
            &copy; {new Date().getFullYear()} Rithvik Kolipaka. Designed with excellence.
          </div>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 text-white/40 hover:text-white transition-all group"
          >
            <span className="text-xs uppercase tracking-widest font-bold">Back to top</span>
            <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
              <ArrowUp size={18} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

