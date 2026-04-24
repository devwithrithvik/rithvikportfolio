import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, Phone, Github, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate saving to database (using localStorage)
    setTimeout(() => {
      const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      const newMessage = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString(),
        status: 'unread'
      };
      localStorage.setItem('portfolio_messages', JSON.stringify([newMessage, ...messages]));
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };
  return (
    <section id="contact" className="section-padding relative">
      <div className="blob top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Let's Build Something <span className="text-gradient">Extraordinary</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              Ready to take your business to the next level? I'm currently available for freelance projects and would love to hear about your ideas.
            </p>

            <div className="space-y-8">
              <div className="flex items-center space-x-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent-purple/20 transition-colors">
                  <Mail className="text-accent-purple" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest mb-1">Email Me</div>
                  <a href="mailto:rithvikkolipaka12@gmail.com" className="text-xl font-bold hover:text-accent-neon transition-colors">
                    rithvikkolipaka12@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors">
                  <MessageSquare className="text-accent-blue" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest mb-1">WhatsApp</div>
                  <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-accent-neon transition-colors">
                    Chat with me
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent-neon/20 transition-colors">
                  <Github className="text-accent-neon" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest mb-1">GitHub</div>
                  <a href="https://github.com/devwithrithvik" target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-accent-neon transition-colors">
                    @devwithrithvik
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-3xl relative overflow-hidden"
          >
            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 z-20 glass flex flex-col items-center justify-center text-center p-6"
                >
                  <CheckCircle size={64} className="text-accent-neon mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400">Thanks for reaching out, Rithvik will get back to you soon.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your Name" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea 
                  rows="5" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell me about your project..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple transition-colors resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
