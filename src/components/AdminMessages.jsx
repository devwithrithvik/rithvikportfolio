import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, Shield, LogOut, CheckCircle, Loader2, AlertCircle, Trash2, Star, Quote } from 'lucide-react';

const AdminMessages = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('messages'); // messages, reviews
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyText, setReplyText] = useState({});
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'rithvikadmin123') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setError('Invalid password');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError('');
    
    // Fetch Messages
    try {
      const response = await fetch('/api/messages');
      if (response.ok) {
        const result = await response.json();
        if (result.success) setMessages(result.data);
      } else {
        throw new Error();
      }
    } catch (err) {
      const localMsgs = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      setMessages(localMsgs.map(m => ({
        _id: m.id || Math.random().toString(36).substr(2, 9),
        ...m,
        createdAt: m.date || new Date().toISOString()
      })));
    }

    // Fetch Reviews
    const localReviews = JSON.parse(localStorage.getItem('portfolio_reviews') || '[]');
    setReviews(localReviews);

    setLoading(false);
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
      if (response.ok) {
        const result = await response.json();
        setMessages(messages.map(msg => msg._id === id ? result.data : msg));
        setReplyText({ ...replyText, [id]: '' });
        return;
      }
      throw new Error();
    } catch (error) {
      const localMsgs = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      const updated = localMsgs.map(m => (m.id === id || m._id === id) ? { ...m, reply, status: 'replied' } : m);
      localStorage.setItem('portfolio_messages', JSON.stringify(updated));
      setMessages(messages.map(msg => msg._id === id ? { ...msg, reply, status: 'replied' } : msg));
      setReplyText({ ...replyText, [id]: '' });
    }
  };

  const deleteMessage = (id) => {
    if (window.confirm('Delete this message?')) {
      const updated = messages.filter(m => m._id !== id);
      setMessages(updated);
      localStorage.setItem('portfolio_messages', JSON.stringify(updated));
    }
  };

  const deleteReview = (id) => {
    if (window.confirm('Delete this review?')) {
      const updated = reviews.filter(r => (r.id || r.name) !== id);
      setReviews(updated);
      localStorage.setItem('portfolio_reviews', JSON.stringify(updated));
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
            <button type="submit" className="w-full btn-primary py-4">Login</button>
          </form>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin <span className="text-gradient">Dashboard</span></h1>
            <p className="text-white/40 text-sm">Manage your inquiries and reviews in one place.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex glass p-1 rounded-2xl border border-white/10">
              <button 
                onClick={() => setActiveTab('messages')}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'messages' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                Messages
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'reviews' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
              >
                Reviews
              </button>
            </div>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-accent-purple" size={48} /></div>
            ) : activeTab === 'messages' ? (
              <div className="space-y-6">
                {messages.length === 0 ? (
                   <div className="text-center py-20 glass-card rounded-[3rem] text-white/20">No messages yet.</div>
                ) : messages.map((msg) => (
                  <motion.div 
                    key={msg._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-10 rounded-[3rem] border border-white/[0.05] relative overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                          <Mail size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{msg.name}</h3>
                          <p className="text-accent-blue text-sm">{msg.email}</p>
                          <p className="text-white/20 text-xs mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          msg.status === 'replied' ? 'bg-green-500/10 text-green-500' : 'bg-white/5 text-white/30'
                        }`}>
                          {msg.status || 'unread'}
                        </span>
                        <button 
                          onClick={() => deleteMessage(msg._id)}
                          className="p-3 rounded-xl bg-white/5 text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/[0.03] mb-8">
                      <p className="text-white/60 leading-relaxed italic">"{msg.message}"</p>
                    </div>

                    {msg.reply ? (
                      <div className="mt-8 pt-8 border-t border-white/[0.05]">
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle size={16} className="text-accent-purple" />
                          <p className="text-xs uppercase tracking-widest text-accent-purple font-bold">Your Reply</p>
                        </div>
                        <p className="text-white/40 leading-relaxed">{msg.reply}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <textarea 
                          className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 text-white focus:outline-none focus:border-accent-purple transition-colors"
                          placeholder="Craft your response..."
                          rows="3"
                          value={replyText[msg._id] || ''}
                          onChange={(e) => setReplyText({ ...replyText, [msg._id]: e.target.value })}
                        ></textarea>
                        <button 
                          onClick={() => handleReply(msg._id)}
                          className="px-8 py-3 bg-white text-black rounded-full text-sm font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        >
                          <Send size={16} />
                          <span>Send Reply</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {reviews.length === 0 ? (
                  <div className="col-span-full text-center py-20 glass-card rounded-[3rem] text-white/20">No reviews found.</div>
                ) : reviews.map((rev) => (
                  <motion.div 
                    key={rev.id || rev.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-10 rounded-[3rem] border border-white/[0.05] relative flex flex-col group"
                  >
                    <Quote className="absolute top-10 right-10 text-white/[0.02]" size={80} />
                    <button 
                      onClick={() => deleteReview(rev.id || rev.name)}
                      className="absolute top-8 left-8 p-3 rounded-xl bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="flex mb-6 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < (rev.rating || 5) ? "text-yellow-500 fill-yellow-500" : "text-white/10"} />
                      ))}
                    </div>
                    <p className="text-white/60 mb-8 flex-grow italic text-lg leading-relaxed">"{rev.content || rev.comment}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center text-white font-bold text-sm">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold">{rev.name}</h4>
                        <p className="text-xs uppercase tracking-widest text-accent-blue font-bold">{rev.role || 'Client'}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AdminMessages;
