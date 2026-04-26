import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden text-center px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-purple/5 blur-[120px] rounded-full -z-10 animate-pulse-slow"></div>
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent-blue/5 blur-[100px] rounded-full -z-10"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto z-10"
      >

        
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8"
        >
          Hi, I’m <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">Rithvik</span>
          <br />
          <span className="text-gradient drop-shadow-[0_0_30px_rgba(124,58,237,0.3)]">Developer</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
        >
          I’m <span className="text-white font-medium">Rithvik</span>, a developer crafting modern digital experiences that combine design, performance, and functionality. Building products that help you grow online.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <a href="#projects" className="btn-premium flex items-center space-x-2 group w-full md:w-auto justify-center">
            <span>View My Work</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contact" className="px-8 py-3 rounded-full border border-white/10 text-white/70 font-bold transition-all duration-300 hover:bg-white/5 hover:text-white w-full md:w-auto text-center">
            Let’s Talk
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;

