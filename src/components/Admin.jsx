import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Trash2, Reply, CheckCircle, Star, User, Calendar, Shield } from 'lucide-react';

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('messages');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
    const storedReviews = JSON.parse(localStorage.getItem('portfolio_reviews') || '[]');
    setMessages(storedMessages);
    setReviews(storedReviews);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'rithvik123') { // Simple password for now
      setIsAuthenticated(true);
    } else {
      alert('Wrong password!');
    }
  };

  const deleteMessage = (id) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('portfolio_messages', JSON.stringify(updated));
  };

  const deleteReview = (id) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    localStorage.setItem('portfolio_reviews', JSON.stringify(updated));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center px-6">
        <div className="glass-card p-10 rounded-3xl w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-accent-purple/20">
              <Shield className="text-accent-purple" size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-8">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple"
                placeholder="Enter password"
              />
            </div>
            <button type="submit" className="w-full btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary pt-32 px-6 md:px-12 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-4xl font-bold">Admin <span className="text-gradient">Dashboard</span></h1>
          <div className="flex glass p-1 rounded-2xl">
            <button 
              onClick={() => setActiveTab('messages')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'messages' ? 'bg-accent-purple text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Messages ({messages.length})
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'reviews' ? 'bg-accent-purple text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Reviews ({reviews.length})
            </button>
          </div>
        </div>

        {activeTab === 'messages' ? (
          <div className="space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-20 glass-card rounded-3xl text-gray-500">
                No messages yet.
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="glass-card p-8 rounded-3xl hover:border-accent-blue/30 transition-all">
                  <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-2xl bg-accent-blue/10">
                        <User className="text-accent-blue" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{msg.name}</h3>
                        <p className="text-accent-blue text-sm">{msg.email}</p>
                        <div className="flex items-center text-gray-500 text-xs mt-1">
                          <Calendar size={12} className="mr-1" />
                          {new Date(msg.date).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <a 
                        href={`mailto:${msg.email}?subject=Reply to your inquiry&body=Hi ${msg.name},`} 
                        className="p-3 bg-white/5 rounded-xl hover:bg-accent-neon/20 hover:text-accent-neon transition-all"
                        title="Reply via Email"
                      >
                        <Reply size={20} />
                      </a>
                      <button 
                        onClick={() => deleteMessage(msg.id)}
                        className="p-3 bg-white/5 rounded-xl hover:bg-red-500/20 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-gray-300 leading-relaxed italic">
                    "{msg.message}"
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.length === 0 ? (
              <div className="col-span-full text-center py-20 glass-card rounded-3xl text-gray-500">
                No reviews yet.
              </div>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="glass-card p-8 rounded-3xl flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < rev.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"} />
                      ))}
                    </div>
                    <button 
                      onClick={() => deleteReview(rev.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-gray-300 mb-8 flex-grow italic">"{rev.comment}"</p>
                  <div>
                    <h4 className="font-bold">{rev.name}</h4>
                    <p className="text-xs text-gray-500">{rev.role || 'Client'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
