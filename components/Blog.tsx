
import React from 'react';
import type { Content } from '../types';

interface BlogProps {
  content: Content['blog'];
}

const Blog: React.FC<BlogProps> = ({ content }) => {
  return (
    <section id="blog" className="py-20 bg-brand-beige dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-text dark:text-white mb-12">
          {content.title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden group">
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-text dark:text-white mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <a href="#" className="font-semibold text-brand-primary dark:text-brand-blue hover:underline">
                  {content.readMore} &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;