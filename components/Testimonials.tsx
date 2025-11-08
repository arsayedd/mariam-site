import React from 'react';
import type { Content } from '../types';

interface TestimonialsProps {
  content: Content['testimonials'];
}

const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-text dark:text-white mb-12">
          {content.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {content.list.map((testimonial) => (
            <div key={testimonial.id} className="bg-brand-beige dark:bg-gray-800 p-8 rounded-lg text-center shadow-md transform transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl dark:hover:shadow-blue-500/10">
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-brand-text dark:text-white">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;