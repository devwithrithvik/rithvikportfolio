import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, Plus, Trash2 } from 'lucide-react';
import ReviewModal from './ReviewModal';

const Testimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dynamicReviews, setDynamicReviews] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('portfolio_reviews') || '[]');
    setDynamicReviews(stored);
  }, [isModalOpen]);

  const deleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const updated = dynamicReviews.filter(rev => (rev.id || rev.name) !== id);
      setDynamicReviews(updated);
      localStorage.setItem('portfolio_reviews', JSON.stringify(updated));
    }
  };

  const staticReviews = [
    {
      id: "static-1",
      name: "Alex Johnson",
      role: "Founder, TechStart",
      content: "Rithvik transformed our vision into a stunning reality. His attention to detail and ability to deliver complex features on time is unmatched.",
      rating: 5,
      isStatic: true
    },
    {
      id: "static-2",
      name: "Sarah Miller",
      role: "CEO, FoodieX",
      content: "The best developer I've worked with. The UI is gorgeous and the performance is incredible. Our conversion rate increased by 40% after the redesign.",
      rating: 5,
      isStatic: true
    },
    {
      id: "static-3",
      name: "David Chen",
      role: "E-commerce Owner",
      content: "Professional, creative, and highly skilled. He handled our project with extreme care and suggested improvements that we hadn't even thought of.",
      rating: 5,
      isStatic: true
    }
  ];

  const allReviews = [...dynamicReviews, ...staticReviews];

  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
              Client <span className="text-gradient">Voices</span>
            </h2>
            <p className="text-white/40 text-lg font-light leading-relaxed">
              I take pride in delivering excellence. Here is what my clients have to say about our journey together.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-bold hover:bg-white/10 transition-all group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            <span>Leave a Review</span>
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {allReviews.map((review, i) => (
              <motion.div
                key={review.id || review.name}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-12 rounded-[3rem] relative flex flex-col border border-white/[0.05] group"
              >
                <Quote className="absolute top-10 right-10 text-white/[0.03]" size={80} />
                
                {!review.isStatic && (
                  <button 
                    onClick={() => deleteReview(review.id || review.name)}
                    className="absolute top-8 left-8 p-2 rounded-xl bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                    title="Delete Review"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div className="flex mb-8 gap-1">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star 
                      key={starIndex} 
                      size={14} 
                      className={starIndex < (review.rating || 5) ? "text-yellow-500 fill-yellow-500" : "text-white/10"} 
                    />
                  ))}
                </div>
                <p className="text-white/60 text-lg font-light italic mb-12 relative z-10 leading-relaxed flex-grow">
                  "{review.content || review.comment}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{review.name}</h4>
                    <p className="text-xs uppercase tracking-widest text-accent-blue font-bold">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  );
};

export default Testimonials;


