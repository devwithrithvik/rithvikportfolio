import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, DollarSign, MessageCircle } from 'lucide-react';

const WhyChooseMe = () => {
  const reasons = [
    {
      title: "Fast Delivery",
      desc: "I respect your time and deliver high-quality results within agreed deadlines.",
      icon: <Clock className="text-accent-purple" />,
    },
    {
      title: "Clean Design",
      desc: "Modern aesthetics combined with optimized code for the best user experience.",
      icon: <ShieldCheck className="text-accent-blue" />,
    },
    {
      title: "Beginner-Friendly",
      desc: "Competitive pricing tailored for startups and small businesses.",
      icon: <DollarSign className="text-accent-neon" />,
    },
    {
      title: "Client-Focused",
      desc: "Clear, constant communication to ensure your vision is fully realized.",
      icon: <MessageCircle className="text-accent-purple" />,
    }
  ];

  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Why <span className="text-gradient">Work With Me?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed">
            I don't just build websites; I build digital assets that help you achieve your business goals. My approach combines technical excellence with a deep understanding of user behavior.
          </p>
          <div className="flex items-center space-x-6">
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-white">50+</span>
              <span className="text-sm text-gray-500 uppercase tracking-widest">Projects Done</span>
            </div>
            <div className="w-[1px] h-12 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-white">100%</span>
              <span className="text-sm text-gray-500 uppercase tracking-widest">Happy Clients</span>
            </div>
          </div>
        </motion.div>

        <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-dark-100 border border-white/5 hover:border-accent-purple/30 transition-all group"
            >
              <div className="mb-6 p-3 w-fit rounded-2xl bg-white/5 group-hover:scale-110 transition-transform">
                {React.cloneElement(reason.icon, { size: 28 })}
              </div>
              <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;
