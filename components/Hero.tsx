
import React from 'react';
import type { Content } from '../types';

interface HeroProps {
  content: Content['hero'];
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  return (
    <section id="home" className="relative bg-brand-beige dark:bg-gray-800 py-20 md:py-32">
      <div className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5" style={{backgroundImage: "url('https://picsum.photos/1600/900?random=1&blur=2')"}}></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-brand-text dark:text-white mb-4 leading-tight">
          {content.greeting}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          {content.introduction}
        </p>
        <a
          href="#booking"
          className="bg-brand-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-500 transition-transform transform hover:scale-105"
        >
          {content.cta}
        </a>
      </div>
    </section>
  );
};

export default Hero;