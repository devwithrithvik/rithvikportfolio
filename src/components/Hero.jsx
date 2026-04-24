import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Rocket, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Blobs */}
      <div className="blob top-[-10%] left-[-10%] opacity-30"></div>
      <div className="blob bottom-[-10%] right-[-10%] opacity-20" style={{ animationDelay: '-5s', background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(124,58,237,0) 70%)' }}></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-neon text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Zap size={14} />
            <span>Available for Freelance</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Building <span className="text-gradient">Modern & Smart</span> Websites
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
            Hi, I'm <span className="text-white font-semibold">Rithvik Kolipaka</span>. I help businesses grow by creating stunning, high-performance web experiences that convert.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary flex items-center space-x-2 group">
              <span>Hire Me</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#projects" className="btn-secondary">
              View Projects
            </a>
          </div>

          <div className="mt-12 flex items-center space-x-6 text-gray-500">
            <div className="flex items-center space-x-2">
              <Code size={20} className="text-accent-purple" />
              <span className="text-sm">Clean Code</span>
            </div>
            <div className="flex items-center space-x-2">
              <Rocket size={20} className="text-accent-blue" />
              <span className="text-sm">Fast Performance</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative z-10 glass-card p-2 rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000" 
              alt="Developer Workspace" 
              className="rounded-2xl w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          
          {/* Floating elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -left-10 glass p-4 rounded-2xl flex items-center space-x-3 z-20 shadow-xl"
          >
            <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center">
              <Code className="text-accent-purple" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Project Quality</div>
              <div className="text-sm font-bold">100% Reliable</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 -right-10 glass p-4 rounded-2xl flex items-center space-x-3 z-20 shadow-xl"
          >
            <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center">
              <Rocket className="text-accent-blue" />
            </div>
            <div>
              <div className="text-xs text-gray-400">Delivery Speed</div>
              <div className="text-sm font-bold">Ultra Fast</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
