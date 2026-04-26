import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Target, Award, ShieldCheck, Globe } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Rocket className="text-accent-purple" />,
      title: "Full-stack Developer",
      desc: "Architecting robust end-to-end solutions."
    },
    {
      icon: <Zap className="text-accent-blue" />,
      title: "AI-Powered Apps",
      desc: "Integrating cutting-edge AI for smarter UX."
    },
    {
      icon: <Target className="text-accent-neon" />,
      title: "Premium UI Focus",
      desc: "Obsessed with pixel-perfect design aesthetics."
    },
    {
      icon: <Award className="text-yellow-400" />,
      title: "Quality Driven",
      desc: "Building for performance and scalability."
    }
  ];

  return (
    <section id="about" className="section-padding bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
            Elevating the <span className="text-gradient">Digital Standard</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto font-light">
            I build scalable websites and dashboards with a strong focus on clean UI, smooth interactions, and real-world usability. Every project I work on is designed to reflect a premium standard while remaining practical and user-focused.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-[2rem] flex flex-col items-start group"
            >
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] mb-6 group-hover:scale-110 group-hover:bg-white/[0.08] transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 p-12 rounded-[3rem] glass-morphism flex flex-col md:flex-row items-center justify-between gap-8 border border-white/[0.05]"
        >
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-4">Focused on results, <br/>driven by passion.</h3>
            <p className="text-white/50 leading-relaxed max-w-xl">
              I don’t just build websites — I build products that help you grow online. I combine design, performance, and functionality to create modern digital experiences that stand out.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-1">10+</div>
              <div className="text-xs uppercase tracking-widest text-white/30">Projects Done</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-1">99%</div>
              <div className="text-xs uppercase tracking-widest text-white/30">Happy Clients</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

