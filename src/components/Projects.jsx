import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ExternalLink, Github } from 'lucide-react';

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
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
            <p className="text-gray-400 max-w-xl">
              A selection of my best work, combining clean design with powerful functionality.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a href="https://github.com/devwithrithvik" className="text-accent-neon hover:underline flex items-center space-x-2">
              <span>View all on GitHub</span>
              <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                gyroscope={true}
                className="glass-card h-full rounded-3xl overflow-hidden flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60"></div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-accent-blue px-2 py-1 rounded-md bg-accent-blue/10">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-8 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-accent-purple/20 hover:border-accent-purple/50 transition-all text-sm font-bold"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                    >
                      <Github size={20} />
                    </a>
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
