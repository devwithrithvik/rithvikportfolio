import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Smartphone, Palette, RefreshCw, Layers, Monitor } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Website Design",
      description: "Modern, high-converting designs tailored to your brand identity and goals.",
      icon: <Monitor className="text-accent-purple" />,
    },
    {
      title: "Landing Page Development",
      description: "Optimized landing pages built for speed and maximum conversion rates.",
      icon: <Layers className="text-accent-blue" />,
    },
    {
      title: "UI/UX Design",
      description: "User-centric interfaces that provide seamless experiences across all devices.",
      icon: <Palette className="text-accent-neon" />,
    },
    {
      title: "Website Redesign",
      description: "Transform your outdated website into a modern, performance-driven digital asset.",
      icon: <RefreshCw className="text-accent-purple" />,
    },
    {
      title: "Mobile App Design",
      description: "Responsive and intuitive mobile-first designs for modern app experiences.",
      icon: <Smartphone className="text-accent-blue" />,
    },
    {
      title: "Consulting",
      description: "Technical advice on tech stack, performance, and digital strategy.",
      icon: <Layout className="text-accent-neon" />,
    }
  ];

  return (
    <section id="services" className="section-padding bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My <span className="text-gradient">Services</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive digital solutions to help your business stand out and scale in the modern web.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 rounded-3xl group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-accent-purple/20 transition-colors">
                {React.cloneElement(service.icon, { size: 32 })}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
