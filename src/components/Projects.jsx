import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "TitanX Gym",
      description: "Next-generation fitness platform with AI-driven workouts, immersive 3D tracking, and premium performance monitoring.",
      tech: ["React", "Three.js", "Tailwind", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000",
      live: "https://titanxgym.netlify.app/",
      github: "https://github.com/devwithrithvik",
    },
    {
      title: "Smart Expense Tracker",
      description: "AI-based financial insights platform with real-time tracking and personalized budget recommendations.",
      tech: ["React", "Tailwind", "Node.js", "Gemini AI"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000",
      live: "https://smart-expense-tracker-pearl-delta.vercel.app/",
      github: "https://github.com/devwithrithvik",
    },
    {
      title: "Food Ordering Website",
      description: "Modern food delivery platform with seamless checkout, restaurant management, and real-time order tracking.",
      tech: ["React", "Tailwind", "Firebase", "Redux"],
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000",
      live: "https://yummyorder.netlify.app/",
      github: "https://github.com/devwithrithvik",
    },
    {
      title: "AI Portfolio Generator",
      description: "A tool that uses AI to generate professional portfolios for developers based on their GitHub profile.",
      tech: ["React", "Next.js", "Tailwind", "OpenAI"],
      image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=80&w=1000",
      live: "#",
      github: "https://github.com/devwithrithvik",
    }
  ];

  return (
    <section id="projects" className="section-padding bg-primary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
              Featured <span className="text-gradient">Creations</span>
            </h2>
            <p className="text-white/40 text-lg font-light leading-relaxed">
              A curated collection of digital products that push the boundaries of design and development. Each project represents a unique challenge solved with precision.
            </p>
          </div>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/devwithrithvik" 
            className="group flex items-center space-x-3 px-6 py-3 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all"
          >
            <span className="text-sm font-medium">Explore All Work</span>
            <Github size={18} className="group-hover:rotate-12 transition-transform" />
          </motion.a>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={2000}
                className="group relative h-full"
              >
                <div className="glass-card rounded-[3rem] overflow-hidden flex flex-col h-full border border-white/[0.05]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    
                    <div className="absolute top-6 right-6 flex gap-2">
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 scale-0 group-hover:scale-100"
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-10 flex-grow flex flex-col">
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05]">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-gradient transition-all duration-500">{project.title}</h3>
                    <p className="text-white/40 text-sm mb-10 leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-6">
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-premium px-8 py-3 text-sm flex-1 text-center"
                      >
                        Launch Project
                      </a>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all"
                      >
                        <Github size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

