import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, Github, Linkedin, CheckCircle, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('idle');
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('idle');
      alert('Error sending message. Please try again.');
    }
  };

  const socials = [
    { icon: <Mail size={20} />, href: "mailto:rithvikkolipaka12@gmail.com", label: "Email", color: "hover:text-accent-purple" },
    { icon: <MessageSquare size={20} />, href: "https://wa.me/911234567890", label: "WhatsApp", color: "hover:text-green-400" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/rithvik-kolipaka-3479b5383", label: "LinkedIn", color: "hover:text-accent-blue" },
    { icon: <Github size={20} />, href: "https://github.com/devwithrithvik", label: "GitHub", color: "hover:text-white" },
  ];

  return (
    <section id="contact" className="section-padding bg-primary relative">
      <div className="max-w-7xl mx-auto">
        <div className="glass-morphism rounded-[4rem] p-12 md:p-20 border border-white/[0.05] relative overflow-hidden">
          {/* Background Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-purple/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-blue/10 blur-[100px] rounded-full"></div>

          <div className="grid lg:grid-cols-2 gap-20 relative z-10">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
                  Let’s build <br/> something <span className="text-gradient">amazing</span>
                </h2>
                <p className="text-white/40 text-lg mb-12 max-w-md font-light leading-relaxed">
                  Have a vision? I have the tools. Let's collaborate to create a digital product that stands out and delivers results.
                </p>

                <div className="flex flex-wrap gap-6 mb-12">
                  {socials.map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      className={`w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center text-white/50 transition-all duration-300 ${social.color} hover:border-white/20`}
                      title={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/20 font-bold">Current Status</div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium text-white/60">Available for new projects</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 backdrop-blur-md bg-black/40 flex flex-col items-center justify-center text-center p-6 rounded-[2rem]"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3">Message Sent!</h3>
                    <p className="text-white/50">I'll get back to you within 24 hours.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="relative group">
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your Name" 
                      className="w-full bg-transparent border-b border-white/10 py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                    />
                  </div>
                  <div className="relative group">
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Your Email" 
                      className="w-full bg-transparent border-b border-white/10 py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                    />
                  </div>
                  <div className="relative group">
                    <textarea 
                      rows="4" 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Your Message" 
                      className="w-full bg-transparent border-b border-white/10 py-4 text-xl focus:outline-none focus:border-white transition-colors resize-none placeholder:text-white/10"
                    ></textarea>
                  </div>
                </div>

                <motion.button 
                  type="submit" 
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-premium flex items-center justify-center space-x-3 py-6 group"
                >
                  <span className="text-lg font-bold">{status === 'sending' ? 'Sending...' : 'Send Inquiry'}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

