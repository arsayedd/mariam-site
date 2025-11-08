
import React from 'react';
import type { Content } from '../types';

interface AboutProps {
  content: Content['about'];
}

const About: React.FC<AboutProps> = ({ content }) => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <img 
              src="https://picsum.photos/id/1005/400/500" 
              alt="Psy Maryam El Qasri"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div className="md:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text dark:text-white mb-6">
              {content.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {content.bio}
            </p>
            <div className="bg-brand-beige dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-brand-text dark:text-white mb-3">{content.visionTitle}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{content.vision}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;