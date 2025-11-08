
import React, { useState, useEffect } from 'react';
import type { Content, Appointment } from '../types';

interface PatientPortalProps {
  content: Content['patientPortal'];
}

type ActiveTab = 'appointments' | 'resources' | 'messages' | 'settings';

const PatientPortal: React.FC<PatientPortalProps> = ({ content }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('appointments');
  
  // State for reminder settings
  const [emailReminders, setEmailReminders] = useState(true);
  const [smsReminders, setSmsReminders] = useState(false);
  const [reminderTimes, setReminderTimes] = useState({
    '24h': true,
    '3h': false,
    '1h': true,
  });
  const [showSuccess, setShowSuccess] = useState(false);


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
      setIsLoggedIn(false);
      setActiveTab('appointments');
  }

  const handleReminderTimeChange = (key: keyof typeof reminderTimes) => {
    setReminderTimes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const AppointmentCard: React.FC<{ appointment: Appointment }> = ({ appointment }) => (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-600 space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
                <p className="font-semibold text-gray-500 dark:text-gray-400">{content.dashboard.appointments.tableHeaders.date}</p>
                <p className="text-brand-text dark:text-gray-200">{appointment.date}</p>
            </div>
            <div>
                <p className="font-semibold text-gray-500 dark:text-gray-400">{content.dashboard.appointments.tableHeaders.time}</p>
                <p className="text-brand-text dark:text-gray-200">{appointment.time}</p>
            </div>
            <div>
                <p className="font-semibold text-gray-500 dark:text-gray-400">{content.dashboard.appointments.tableHeaders.type}</p>
                <p className="text-brand-text dark:text-gray-200">{appointment.type}</p>
            </div>
        </div>
        {appointment.notes && (
             <div>
                <p className="font-semibold text-gray-500 dark:text-gray-400 text-sm">{content.dashboard.appointments.tableHeaders.notes}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-2 rounded-md">{appointment.notes}</p>
            </div>
        )}
    </div>
);


  const renderLogin = () => (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-text dark:text-white mb-8">{content.title}</h2>
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-center text-brand-text dark:text-white mb-6">{content.login.title}</h3>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{content.login.emailLabel}</label>
            <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{content.login.passwordLabel}</label>
            <input type="password" id="password" className="w-full p-3 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white" required />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center italic">{content.login.demoNote}</p>
          <div>
            <button type="submit" className="w-full bg-brand-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-500 transition-colors">
              {content.login.button}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderDashboard = () => (
     <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-text dark:text-white">
            {content.dashboard.welcome}
        </h2>
        <button onClick={handleLogout} className="text-sm font-semibold text-brand-primary dark:text-brand-blue hover:underline">
            {content.dashboard.logout}
        </button>
      </div>
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
         {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-600">
          <nav className="-mb-px flex space-x-4 rtl:space-x-reverse px-6" aria-label="Tabs">
            <button onClick={() => setActiveTab('appointments')} className={`${activeTab === 'appointments' ? 'border-brand-primary dark:border-brand-blue text-brand-primary dark:text-brand-blue' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
              {content.dashboard.tabs.appointments}
            </button>
             <button onClick={() => setActiveTab('resources')} className={`${activeTab === 'resources' ? 'border-brand-primary dark:border-brand-blue text-brand-primary dark:text-brand-blue' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
              {content.dashboard.tabs.resources}
            </button>
             <button onClick={() => setActiveTab('messages')} className={`${activeTab === 'messages' ? 'border-brand-primary dark:border-brand-blue text-brand-primary dark:text-brand-blue' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
              {content.dashboard.tabs.messages}
            </button>
             <button onClick={() => setActiveTab('settings')} className={`${activeTab === 'settings' ? 'border-brand-primary dark:border-brand-blue text-brand-primary dark:text-brand-blue' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
              {content.dashboard.tabs.settings}
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg text-brand-text dark:text-white mb-4">{content.dashboard.appointments.upcomingTitle}</h4>
                {content.dashboard.appointments.upcoming.length > 0 ? (
                    <div className="space-y-4">
                        {content.dashboard.appointments.upcoming.map(app => <AppointmentCard key={app.id} appointment={app} />)}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">{content.dashboard.appointments.noAppointments}</p>
                )}
              </div>
               <div>
                <h4 className="font-bold text-lg text-brand-text dark:text-white mb-4">{content.dashboard.appointments.pastTitle}</h4>
                 {content.dashboard.appointments.past.length > 0 ? (
                    <div className="space-y-4">
                        {content.dashboard.appointments.past.map(app => <AppointmentCard key={app.id} appointment={app} />)}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">{content.dashboard.appointments.noAppointments}</p>
                )}
              </div>
            </div>
          )}
           {activeTab === 'resources' && (
            <div>
               <h4 className="font-bold text-lg text-brand-text dark:text-white mb-2">{content.dashboard.resources.title}</h4>
               <p className="text-gray-500 dark:text-gray-400">{content.dashboard.resources.noResources}</p>
            </div>
          )}
           {activeTab === 'messages' && (
            <div className="space-y-4">
               <h4 className="font-bold text-lg text-brand-text dark:text-white mb-2">{content.dashboard.messages.title}</h4>
               <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md h-40">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{content.dashboard.messages.noMessages}</p>
               </div>
               <form className="space-y-2">
                   <textarea placeholder={content.dashboard.messages.placeholder} rows={4} className="w-full p-3 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"></textarea>
                   <button type="submit" className="bg-brand-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-500 transition-colors">
                       {content.dashboard.messages.button}
                   </button>
               </form>
            </div>
          )}
          {activeTab === 'settings' && (
            <div>
              <h4 className="font-bold text-lg text-brand-text dark:text-white mb-6">{content.dashboard.settings.title}</h4>
              <form onSubmit={handleSaveSettings} className="space-y-8">
                {/* Email Reminders */}
                <div className="p-4 border dark:border-gray-600 rounded-lg">
                  <div className="flex items-center justify-between">
                    <label htmlFor="emailToggle" className="font-semibold text-brand-text dark:text-white">{content.dashboard.settings.emailToggle}</label>
                    <button type="button" onClick={() => setEmailReminders(!emailReminders)} className={`${emailReminders ? 'bg-brand-primary' : 'bg-gray-200 dark:bg-gray-500'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}>
                      <span className={`${emailReminders ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
                    </button>
                  </div>
                  {emailReminders && (
                    <div className="mt-4">
                      <label htmlFor="reminder-email" className="block text-sm text-gray-700 dark:text-gray-300 font-semibold mb-2">{content.dashboard.settings.emailLabel}</label>
                      <input type="email" id="reminder-email" defaultValue="patient@example.com" className="w-full p-3 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                    </div>
                  )}
                </div>

                {/* SMS Reminders */}
                <div className="p-4 border dark:border-gray-600 rounded-lg">
                  <div className="flex items-center justify-between">
                    <label htmlFor="smsToggle" className="font-semibold text-brand-text dark:text-white">{content.dashboard.settings.smsToggle}</label>
                     <button type="button" onClick={() => setSmsReminders(!smsReminders)} className={`${smsReminders ? 'bg-brand-primary' : 'bg-gray-200 dark:bg-gray-500'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}>
                      <span className={`${smsReminders ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
                    </button>
                  </div>
                   {smsReminders && (
                    <div className="mt-4">
                      <label htmlFor="reminder-sms" className="block text-sm text-gray-700 dark:text-gray-300 font-semibold mb-2">{content.dashboard.settings.smsLabel}</label>
                      <input type="tel" id="reminder-sms" defaultValue="+1234567890" className="w-full p-3 border border-gray-300 rounded-md focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-600 dark:border-gray-500 dark:text-white" />
                    </div>
                  )}
                </div>

                {/* Reminder Frequency */}
                 <div>
                  <h5 className="font-semibold text-brand-text dark:text-white mb-3">{content.dashboard.settings.frequencyTitle}</h5>
                  <div className="flex flex-wrap gap-4">
                    {Object.keys(content.dashboard.settings.frequencyOptions).map((key) => (
                      <label key={key} className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer">
                        <input type="checkbox" checked={reminderTimes[key as keyof typeof reminderTimes]} onChange={() => handleReminderTimeChange(key as keyof typeof reminderTimes)} className="h-5 w-5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary" />
                        <span className="text-gray-700 dark:text-gray-300">{content.dashboard.settings.frequencyOptions[key as keyof typeof reminderTimes]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center gap-4">
                  <button type="submit" className="bg-brand-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-500 transition-colors">
                    {content.dashboard.settings.saveButton}
                  </button>
                  {showSuccess && <span className="text-green-600 dark:text-green-400 text-sm">{content.dashboard.settings.successMessage}</span>}
                </div>

              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="portal" className="py-20 bg-brand-beige dark:bg-gray-800">
      <div className="container mx-auto px-6">
        {isLoggedIn ? renderDashboard() : renderLogin()}
      </div>
    </section>
  );
};

export default PatientPortal;