
import React, { useState, useEffect } from 'react';
import type { Language, Theme } from './types';
import { content } from './content';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import SymptomChecker from './components/SymptomChecker';
import Booking from './components/Booking';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Set initial theme based on system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);


  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.className = language === 'ar' ? 'font-cairo' : 'font-poppins';

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [language, theme]);

  const currentContent = content[language];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  }

  return (
    <div className={`bg-white text-brand-text dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300`}>
      <Header
        content={currentContent.header}
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onThemeChange={handleThemeChange}
      />
      <main>
        <Hero content={currentContent.hero} />
        <About content={currentContent.about} />
        <Services content={currentContent.services} />
        <SymptomChecker content={currentContent.symptomChecker} language={language} />
        <Booking content={currentContent.booking} />
        <Blog content={currentContent.blog} />
        <Testimonials content={currentContent.testimonials} />
        <Contact content={currentContent.contact} />
      </main>
      <Footer content={currentContent.footer} />
      <ChatBot content={currentContent.chatBot} language={language} />
    </div>
  );
};

export default App;