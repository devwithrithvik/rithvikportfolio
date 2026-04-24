import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Palette, Terminal, Cpu } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'HTML', category: 'Frontend' },
    { name: 'CSS', category: 'Frontend' },
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'React', category: 'Frontend' },
    { name: 'GitHub', category: 'Tools' },
    { name: 'Vercel', category: 'Tools' },
    { name: 'Figma', category: 'Tools' },
    { name: 'UI/UX Design', category: 'Other' },
    { name: 'AI Tools', category: 'Other' },
  ];

  const categories = [
    { name: 'Frontend', icon: <Layout className="text-accent-purple" /> },
    { name: 'Tools', icon: <Terminal className="text-accent-blue" /> },
    { name: 'Other', icon: <Cpu className="text-accent-neon" /> },
  ];

  return (
    <section id="about" className="section-padding bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Driven by <span className="text-gradient">Creativity</span> & Code
          </h2>
          <div className="space-y-6 text-gray-400 leading-relaxed">
            <p>
              My journey into freelance web development started with a passion for building things that matter. I believe every business deserves a digital presence that isn't just functional, but truly impactful.
            </p>
            <p>
              I focus on problem-solving with a learning mindset, constantly exploring new technologies like AI tools to stay ahead of the curve. My goal is to bridge the gap between complex technical requirements and intuitive user experiences.
            </p>
            <p>
              Whether it's a sleek landing page or a complex web application, I bring a dedicated focus on quality and detail to every project I undertake.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid gap-6"
        >
          {categories.map((cat) => (
            <div key={cat.name} className="glass-card p-6 rounded-2xl group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold">{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter((s) => s.category === cat.name)
                  .map((skill) => (
                    <span
                      key={skill.name}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 group-hover:border-accent-purple/30 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
