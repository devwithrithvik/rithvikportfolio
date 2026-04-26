import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Layout, Globe, Smartphone, Database } from 'lucide-react';

const Skills = () => {
  const categories = [
    {
      title: "Frontend Development",
      icon: <Layout className="text-accent-purple" />,
      skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js", "TypeScript"]
    },
    {
      title: "Backend & Cloud",
      icon: <Database className="text-accent-blue" />,
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase", "Vercel"]
    },
    {
      title: "Design & UX",
      icon: <Cpu className="text-accent-neon" />,
      skills: ["Figma", "UI/UX Design", "Responsive Design", "Motion Design", "Adobe CC", "Prototyping"]
    }
  ];

  const floatingSkills = ["React", "Next.js", "AI", "Node", "Figma", "UX", "3D", "Web3"];

  return (
    <section id="skills" className="section-padding bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
              My <span className="text-gradient">Tech Stack</span> <br/> & Expertise
            </h2>
            <p className="text-white/40 text-lg mb-12 max-w-md font-light leading-relaxed">
              I use the latest technologies to build high-performance, scalable digital products. My toolkit is constantly evolving to stay ahead of industry standards.
            </p>

            <div className="flex flex-wrap gap-4">
              {floatingSkills.map((skill, i) => (
                <motion.div
                  key={skill}
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3 + i, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="px-6 py-3 rounded-2xl glass border border-white/10 text-white/60 text-sm font-medium"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-[2.5rem] border border-white/[0.05] group hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <span 
                      key={skill} 
                      className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-xs font-medium text-white/40 group-hover:text-white/70 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
