
import React, { useState } from 'react';
import type { Language, Content, Theme } from '../types';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

interface HeaderProps {
  content: Content['header'];
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const Header: React.FC<HeaderProps> = ({ content, currentLanguage, onLanguageChange, theme, onThemeChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', text: content.nav.home },
    { href: '#about', text: content.nav.about },
    { href: '#services', text: content.nav.services },
    { href: '#blog', text: content.nav.blog },
    { href: '#contact', text: content.nav.contact },
  ];

  const toggleTheme = () => {
    onThemeChange(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-xl font-bold text-brand-primary">
          {currentLanguage === 'en' ? 'Psy Maryam El Qasri' : 'Psy مريم القصري'}
        </a>

        <nav className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-blue transition-colors">
              {link.text}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse">
           <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 text-sm rounded-full ${currentLanguage === 'en' ? 'bg-brand-primary text-white' : 'text-gray-600 dark:text-gray-300'}`}
            >
              {content.languageToggle.en}
            </button>
            <button
              onClick={() => onLanguageChange('ar')}
              className={`px-3 py-1 text-sm rounded-full ${currentLanguage === 'ar' ? 'bg-brand-primary text-white' : 'text-gray-600 dark:text-gray-300'}`}
            >
              {content.languageToggle.ar}
            </button>
          </div>
          <a href="#booking" className="hidden lg:block bg-brand-primary text-white px-4 py-2 rounded-full hover:bg-blue-500 transition-colors text-sm">
            {content.nav.bookNow}
          </a>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-gray-600 dark:text-gray-300">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
       {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 py-4 px-6 absolute top-full left-0 w-full shadow-md">
          <nav className="flex flex-col space-y-4 rtl:space-y-reverse items-center">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-blue transition-colors text-center">
                {link.text}
              </a>
            ))}
             <a href="#booking" onClick={() => setIsMenuOpen(false)} className="bg-brand-primary text-white px-6 py-2 rounded-full hover:bg-blue-500 transition-colors w-full text-center mt-4">
              {content.nav.bookNow}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;