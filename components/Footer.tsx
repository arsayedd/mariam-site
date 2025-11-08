
import React from 'react';
import type { Content } from '../types';

interface FooterProps {
  content: Content['footer'];
}

const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer className="bg-brand-text dark:bg-gray-950 text-white dark:text-gray-300 py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">{content.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;