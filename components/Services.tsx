
import React from 'react';
import type { Content } from '../types';
import IndividualTherapyIcon from './icons/IndividualTherapyIcon';
import CouplesTherapyIcon from './icons/CouplesTherapyIcon';
import AddictionRecoveryIcon from './icons/AddictionRecoveryIcon';
import AnxietyDepressionIcon from './icons/AnxietyDepressionIcon';
import OnlineConsultationIcon from './icons/OnlineConsultationIcon';

interface ServicesProps {
  content: Content['services'];
}

const serviceIcons: { [key: string]: React.ReactNode } = {
  individual: <IndividualTherapyIcon />,
  couples: <CouplesTherapyIcon />,
  addiction: <AddictionRecoveryIcon />,
  anxiety: <AnxietyDepressionIcon />,
  online: <OnlineConsultationIcon />,
};

const Services: React.FC<ServicesProps> = ({ content }) => {
  return (
    <section id="services" className="py-20 bg-brand-beige dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-text dark:text-white mb-12">
          {content.title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.list.map((service) => (
            <div key={service.id} className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-shadow text-center">
              <div className="flex justify-center mb-4 text-brand-primary dark:text-brand-blue">
                {serviceIcons[service.id]}
              </div>
              <h3 className="text-xl font-bold text-brand-text dark:text-white mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;