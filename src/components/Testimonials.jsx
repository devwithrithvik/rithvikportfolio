import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Plus } from 'lucide-react';
import ReviewModal from './ReviewModal';

const Testimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dynamicReviews, setDynamicReviews] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('portfolio_reviews') || '[]');
    setDynamicReviews(stored);
  }, [isModalOpen]);

  const staticReviews = [
    {
      name: "Alex Johnson",
      role: "Founder, TechStart",
      content: "Rithvik transformed our vision into a stunning reality. His attention to detail and ability to deliver complex features on time is unmatched.",
      rating: 5,
    },
    {
      name: "Sarah Miller",
      role: "CEO, FoodieX",
      content: "The best developer I've worked with. The UI is gorgeous and the performance is incredible. Our conversion rate increased by 40% after the redesign.",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "E-commerce Owner",
      content: "Professional, creative, and highly skilled. He handled our project with extreme care and suggested improvements that we hadn't even thought of.",
      rating: 5,
    }
  ];

  const allReviews = [...dynamicReviews, ...staticReviews];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6"
        >
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Client <span className="text-gradient">Success Stories</span></h2>
            <p className="text-gray-400">Don't just take my word for it — hear from the people I've worked with.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-accent-purple/10 border border-accent-purple/50 rounded-2xl text-accent-neon font-bold hover:bg-accent-purple/20 transition-all"
          >
            <Plus size={20} />
            <span>Review Rithvik's Work</span>
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {allReviews.map((review, i) => (
            <motion.div
              key={review.id || review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 rounded-3xl relative flex flex-col"
            >
              <Quote className="absolute top-8 right-8 text-white/5" size={60} />
              <div className="flex mb-6">
                {[...Array(5)].map((_, starIndex) => (
                  <Star 
                    key={starIndex} 
                    size={16} 
                    className={starIndex < (review.rating || 5) ? "text-yellow-500 fill-yellow-500" : "text-gray-600"} 
                  />
                ))}
              </div>
              <p className="text-gray-300 italic mb-10 relative z-10 leading-relaxed flex-grow">
                "{review.content || review.comment}"
              </p>
              <div>
                <h4 className="text-lg font-bold">{review.name}</h4>
                <p className="text-sm text-accent-blue">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  );
};

export default Testimonials;
