import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-[100] transition-all duration-500 py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? 'glass px-8 py-4 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : ''}`}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold font-display flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white text-sm">R</div>
            <span className="text-white hidden sm:block tracking-tighter">rithvik<span className="text-white/40">.dev</span></span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="px-5 py-2 text-sm font-medium text-white/50 hover:text-white transition-all duration-300 rounded-full hover:bg-white/[0.03]"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ml-4 px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-6 top-24 z-[99] md:hidden glass-morphism rounded-[2rem] border border-white/10 overflow-hidden p-8"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-white/60 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <a href="https://github.com/devwithrithvik" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/rithvik-kolipaka-3479b5383" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white">
                    <Linkedin size={20} />
                  </a>
                  <a href="mailto:rithvikkolipaka12@gmail.com" className="text-white/40 hover:text-white">
                    <Mail size={20} />
                  </a>
                </div>
                <a href="#contact" onClick={() => setIsOpen(false)} className="px-6 py-2 bg-white text-black rounded-full text-sm font-bold">
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

