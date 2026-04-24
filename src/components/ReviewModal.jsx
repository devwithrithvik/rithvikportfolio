import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Send, CheckCircle } from 'lucide-react';

const ReviewModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', role: '', rating: 5, comment: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');

    setTimeout(() => {
      const reviews = JSON.parse(localStorage.getItem('portfolio_reviews') || '[]');
      const newReview = { ...formData, id: Date.now(), date: new Date().toISOString() };
      localStorage.setItem('portfolio_reviews', JSON.stringify([newReview, ...reviews]));
      
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({ name: '', role: '', rating: 5, comment: '' });
      }, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative glass-card p-8 md:p-10 rounded-3xl w-full max-w-xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white">
              <X size={24} />
            </button>

            {status === 'success' ? (
              <div className="py-12 text-center">
                <CheckCircle size={64} className="text-accent-neon mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-2">Review Submitted!</h3>
                <p className="text-gray-400">Thanks for your feedback, Rithvik appreciates it.</p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-2">Review Rithvik's Work</h2>
                <p className="text-gray-400 mb-8">Your feedback helps me grow and helps others trust my work.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                      <input 
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Role / Company</label>
                      <input 
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple"
                        placeholder="CEO at TechCo"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Rating</label>
                    <div className="flex space-x-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({...formData, rating: star})}
                          className="focus:outline-none"
                        >
                          <Star 
                            size={28} 
                            className={`${star <= formData.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'} transition-colors`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Your Review</label>
                    <textarea 
                      required
                      rows="4"
                      value={formData.comment}
                      onChange={(e) => setFormData({...formData, comment: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple resize-none"
                      placeholder="What was it like working with Rithvik?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <span>{status === 'submitting' ? 'Submitting...' : 'Submit Review'}</span>
                    <Send size={18} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
