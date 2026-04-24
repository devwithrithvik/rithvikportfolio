import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, Inbox as InboxIcon, Search, Loader2 } from 'lucide-react';

const Inbox = () => {
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchMessages = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/messages?email=${email}`);
      const result = await response.json();
      if (result.success) {
        setMessages(result.data);
        setSearched(true);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Private <span className="text-gradient">Inbox</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Check the status of your messages and view replies from Rithvik.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 rounded-3xl mb-12"
        >
          <form onSubmit={fetchMessages} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="email" 
                placeholder="Enter your email to see messages..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-accent-purple transition-all"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary px-8 py-4 flex items-center justify-center space-x-2 whitespace-nowrap disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
              <span>{loading ? 'Searching...' : 'Check Inbox'}</span>
            </button>
          </form>
        </motion.div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-20"
              >
                <Loader2 className="animate-spin text-accent-purple" size={48} />
              </motion.div>
            ) : messages.length > 0 ? (
              messages.map((msg, idx) => (
                <motion.div 
                  key={msg._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-6 rounded-2xl border-l-4 border-l-accent-purple"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                      msg.status === 'replied' ? 'bg-accent-neon/20 text-accent-neon' : 'bg-white/10 text-gray-400'
                    }`}>
                      {msg.status}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-1">Your Message:</div>
                    <p className="text-white bg-white/5 p-4 rounded-xl italic">"{msg.message}"</p>
                  </div>
                  
                  {msg.reply && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 border-t border-white/5 pt-6"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center flex-shrink-0 text-accent-purple font-bold">
                          R
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-accent-purple font-bold mb-1">Rithvik's Reply:</div>
                          <p className="text-gray-200">{msg.reply}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : searched ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 glass-card rounded-3xl"
              >
                <InboxIcon className="mx-auto text-gray-600 mb-4" size={48} />
                <p className="text-gray-400">No messages found for this email address.</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Inbox;
