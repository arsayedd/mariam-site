
import React, { useState } from 'react';
import type { Content } from '../types';

interface BookingProps {
  content: Content['booking'];
}

interface BookingDetails {
    language: string;
    sessionType: string;
    date: string;
    time: string;
}

const Booking: React.FC<BookingProps> = ({ content }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const details: BookingDetails = {
        language: formData.get('language') as string,
        sessionType: formData.get('sessionType') as string,
        date: formData.get('date') as string,
        time: formData.get('time') as string,
    };
    setBookingDetails(details);
    setIsSubmitted(true);
  };
  
  const handleReset = () => {
      setIsSubmitted(false);
      setBookingDetails(null);
  }

  const renderForm = () => (
     <form onSubmit={handleSubmit} className="bg-brand-beige dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="language" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{content.form.language}</label>
            <select id="language" name="language" className="w-full p-3 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
              <option>{content.form.languageOptions.english}</option>
              <option>{content.form.languageOptions.arabic}</option>
            </select>
          </div>
          <div>
            <label htmlFor="sessionType" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{content.form.sessionType}</label>
            <select id="sessionType" name="sessionType" className="w-full p-3 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
              <option>{content.form.sessionOptions.online}</option>
              <option>{content.form.sessionOptions.inClinic}</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{content.form.date}</label>
            <input type="date" id="date" name="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>
          <div>
            <label htmlFor="time" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{content.form.time}</label>
            <input type="time" id="time" name="time" className="w-full p-3 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>
        </div>
        <div>
           <button type="submit" className="w-full bg-brand-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-500 transition-colors">
              {content.form.submit}
           </button>
        </div>
      </form>
  );

  const renderConfirmation = () => (
    <div className="bg-brand-beige dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h3 className="text-2xl font-bold text-brand-text dark:text-white mb-2">{content.confirmation.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{content.confirmation.message}</p>
        
        {bookingDetails && (
            <div className="text-left bg-white dark:bg-gray-700 p-6 rounded-lg border dark:border-gray-600 mb-8 space-y-4">
                <h4 className="text-lg font-bold text-brand-text dark:text-white mb-4 text-center">{content.confirmation.summaryTitle}</h4>
                <div>
                    <p className="font-semibold text-gray-500 dark:text-gray-400">{content.form.language}</p>
                    <p className="text-brand-text dark:text-gray-200">{bookingDetails.language}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-500 dark:text-gray-400">{content.form.sessionType}</p>
                    <p className="text-brand-text dark:text-gray-200">{bookingDetails.sessionType}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold text-gray-500 dark:text-gray-400">{content.form.date}</p>
                        <p className="text-brand-text dark:text-gray-200">{bookingDetails.date || 'Not specified'}</p>
                    </div>
                     <div>
                        <p className="font-semibold text-gray-500 dark:text-gray-400">{content.form.time}</p>
                        <p className="text-brand-text dark:text-gray-200">{bookingDetails.time || 'Not specified'}</p>
                    </div>
                </div>
            </div>
        )}
        
        <button onClick={handleReset} className="w-full sm:w-auto bg-brand-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-500 transition-colors">
            {content.confirmation.bookAnother}
        </button>
    </div>
  );

  return (
    <section id="booking" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-text dark:text-white mb-12">
            {content.title}
          </h2>
          {isSubmitted ? renderConfirmation() : renderForm()}
        </div>
      </div>
    </section>
  );
};

export default Booking;