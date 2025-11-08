
export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
}

// FIX: Add Appointment type for PatientPortal component.
export interface Appointment {
  id: number;
  date: string;
  time: string;
  type: string;
  notes?: string;
}

export interface Content {
  header: {
    nav: {
      home: string;
      about: string;
      services: string;
      blog: string;
      contact: string;
      bookNow: string;
    };
    languageToggle: {
      en: string;
      ar: string;
    }
  };
  hero: {
    greeting: string;
    introduction: string;
    cta: string;
  };
  about: {
    title: string;
    bio: string;
    vision: string;
    visionTitle: string;
  };
  services: {
    title: string;
    list: Service[];
  };
  symptomChecker: {
    title: string;
    description: string;
    disclaimer: string;
    cta: string;
    placeholder: string;
    send: string;
    loading: string;
    summaryMessage: string;
    bookConsultation: string;
    error: string;
  };
  booking: {
    title: string;
    form: {
      language: string;
      languageOptions: {
        english: string;
        arabic: string;
      };
      sessionType: string;
      sessionOptions: {
        online: string;
        inClinic: string;
      };
      date: string;
      time: string;
      submit: string;
    };
    confirmation: {
      title: string;
      message: string;
      summaryTitle: string;
      bookAnother: string;
    };
  };
  blog: {
    title: string;
    posts: BlogPost[];
    readMore: string;
  };
  testimonials: {
    title: string;
    list: Testimonial[];
  };
  contact: {
    title: string;
    location: string;
    phone: string;
    whatsapp: string;
    email: string;
    socialMedia: string;
  };
  footer: {
    copyright: string;
  };
  chatBot: {
    headerTitle: string;
    placeholder: string;
    initialMessage: string;
    loading: string;
  };
  // FIX: Add patientPortal to Content type for PatientPortal component.
  patientPortal: {
    title: string;
    login: {
      title: string;
      emailLabel: string;
      passwordLabel: string;
      demoNote: string;
      button: string;
    };
    dashboard: {
      welcome: string;
      logout: string;
      tabs: {
        appointments: string;
        resources: string;
        messages: string;
        settings: string;
      };
      appointments: {
        upcomingTitle: string;
        pastTitle: string;
        noAppointments: string;
        upcoming: Appointment[];
        past: Appointment[];
        tableHeaders: {
          date: string;
          time: string;
          type: string;
          notes: string;
        };
      };
      resources: {
        title: string;
        noResources: string;
      };
      messages: {
        title: string;
        noMessages: string;
        placeholder: string;
        button: string;
      };
      settings: {
        title: string;
        emailToggle: string;
        emailLabel: string;
        smsToggle: string;
        smsLabel: string;
        frequencyTitle: string;
        frequencyOptions: {
          [key: string]: string;
        };
        saveButton: string;
        successMessage: string;
      };
    };
  };
}
