import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, Shield, LogOut, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const AdminMessages = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyText, setReplyText] = useState({});
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password protection (can be moved to .env later)
    if (password === 'rithvikadmin123') {
      setIsAuthenticated(true);
      fetchMessages();
    } else {
      setError('Invalid password');
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/messages');
      const result = await response.json();
      if (result.success) {
        setMessages(result.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (id) => {
    const reply = replyText[id];
    if (!reply) return;

    try {
      const response = await fetch(`/api/messages?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply }),
      });
      const result = await response.json();
      if (result.success) {
        setMessages(messages.map(msg => msg._id === id ? result.data : msg));
        setReplyText({ ...replyText, [id]: '' });
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 bg-[#0a0a0a]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 rounded-3xl w-full max-w-md"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent-purple/20 flex items-center justify-center mx-auto mb-6">
            <Shield className="text-accent-purple" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-center mb-8">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => {setPassword(e.target.value); setError('');}}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple transition-all"
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="text-red-500 text-sm flex items-center gap-2"><AlertCircle size={16}/> {error}</p>}
            <button type="submit" className="w-full btn-primary py-3">Login</button>
          </form>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Admin <span className="text-gradient">Messages</span></h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        <div className="grid gap-6">
          <AnimatePresence>
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-accent-purple" size={48} /></div>
            ) : messages.map((msg) => (
              <motion.div 
                key={msg._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 rounded-2xl border-l-4 border-l-accent-purple"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{msg.name}</h3>
                    <p className="text-accent-blue text-sm">{msg.email}</p>
                    <p className="text-gray-500 text-xs mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                    msg.status === 'replied' ? 'bg-accent-neon/20 text-accent-neon' : 'bg-white/10 text-gray-400'
                  }`}>
                    {msg.status}
                  </span>
                </div>

                <div className="bg-white/5 p-6 rounded-xl mb-6">
                  <p className="text-gray-200">{msg.message}</p>
                </div>

                {msg.reply ? (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-sm text-accent-purple font-bold mb-2">My Reply:</p>
                    <p className="text-gray-400">{msg.reply}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-accent-purple"
                      placeholder="Write your reply..."
                      rows="3"
                      value={replyText[msg._id] || ''}
                      onChange={(e) => setReplyText({ ...replyText, [msg._id]: e.target.value })}
                    ></textarea>
                    <button 
                      onClick={() => handleReply(msg._id)}
                      className="btn-primary px-6 py-2 flex items-center space-x-2"
                    >
                      <Send size={18} />
                      <span>Send Reply</span>
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AdminMessages;
