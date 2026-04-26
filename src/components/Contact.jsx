import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, Github, Linkedin, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [honeypot, setHoneypot] = useState('');

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Spam prevention: if honeypot is filled, silently ignore
    if (honeypot) {
      console.log("Spam detected");
      return;
    }

    if (!validate()) return;

    setStatus('sending');

    // Validate EmailJS keys
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('EmailJS keys are missing. Please check your .env file.');
      setStatus('error');
      return;
    }

    try {
      // 1. Send via EmailJS (Primary)
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_email: 'rithvikolipaka12@gmail.com',
        },
        PUBLIC_KEY
      );

      // 2. Backup to LocalStorage (Immediate fallback for local dev)
      const localMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      localMessages.push({ ...formData, id: Date.now(), date: new Date().toISOString(), status: 'unread' });
      localStorage.setItem('portfolio_messages', JSON.stringify(localMessages));

      // 3. Backup to MongoDB (Silent background task)
      fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(err => console.warn('MongoDB backup skipped (local environment or network error)'));

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => setStatus('idle'), 6000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const socials = [
    { icon: <Mail size={20} />, href: "mailto:rithvikkolipaka12@gmail.com", label: "Email", color: "hover:text-accent-purple" },
    { icon: <MessageSquare size={20} />, href: "https://wa.me/917670863913?text=Hi%20Rithvik,%20I'm%20interested%20in%20your%20services!", label: "WhatsApp", color: "hover:text-green-400" },
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
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-20 backdrop-blur-md bg-black/40 flex flex-col items-center justify-center text-center p-6 rounded-[2rem]"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3">Success!</h3>
                    <p className="text-white/50">Message sent successfully. I will get back to you soon.</p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-20 backdrop-blur-md bg-black/40 flex flex-col items-center justify-center text-center p-6 rounded-[2rem]"
                  >
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                      <AlertCircle size={40} className="text-red-500" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3">Oops!</h3>
                    <p className="text-white/50">Something went wrong. Please try again or email me directly.</p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="mt-6 text-sm text-white underline underline-offset-4"
                    >
                      Try again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="bot-field"
                  className="hidden"
                  onChange={(e) => setHoneypot(e.target.value)}
                />

                <div className="space-y-6">
                  <div className="relative group">
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your Name" 
                      className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500/50' : 'border-white/10'} py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/10`}
                    />
                    {errors.name && <span className="text-xs text-red-500/70 mt-1 absolute left-0 bottom-[-20px]">{errors.name}</span>}
                  </div>
                  <div className="relative group">
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Your Email" 
                      className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500/50' : 'border-white/10'} py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder:text-white/10`}
                    />
                    {errors.email && <span className="text-xs text-red-500/70 mt-1 absolute left-0 bottom-[-20px]">{errors.email}</span>}
                  </div>
                  <div className="relative group">
                    <textarea 
                      rows="4" 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Your Message" 
                      className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500/50' : 'border-white/10'} py-4 text-xl focus:outline-none focus:border-white transition-colors resize-none placeholder:text-white/10`}
                    ></textarea>
                    {errors.message && <span className="text-xs text-red-500/70 mt-1 absolute left-0 bottom-[-20px]">{errors.message}</span>}
                  </div>
                </div>

                <motion.button 
                  type="submit" 
                  disabled={status === 'sending'}
                  whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                  className="w-full btn-premium flex items-center justify-center space-x-3 py-6 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-lg font-bold">
                    {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
                  </span>
                  {status !== 'sending' && <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />}
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


