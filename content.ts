
import type { Content } from './types';

export const content: { [key: string]: Content } = {
  en: {
    header: {
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        blog: "Blog",
        contact: "Contact",
        bookNow: "Book Now",
      },
      languageToggle: { en: "EN", ar: "ع" }
    },
    hero: {
      greeting: "Welcome to a Space of Healing & Growth",
      introduction: "Psy Maryam El Qasri offers a compassionate and professional approach to mental wellness, guiding you on your path to balance and recovery.",
      cta: "Book a Consultation",
    },
    about: {
      title: "About Psy Maryam El Qasri",
      bio: "With over 15 years of experience in psychiatry, Psy Maryam El Qasri is a certified specialist in mental health, psychotherapy, and addiction treatment. She holds certifications from leading international institutions and is dedicated to providing personalized care tailored to each patient's unique needs. Her approach combines evidence-based therapies with a deep understanding of the emotional and psychological factors affecting mental well-being.",
      visionTitle: "Our Vision",
      vision: "To create a safe and non-judgmental environment where individuals can explore their challenges, develop coping mechanisms, and ultimately achieve lasting mental and emotional healing. We believe in empowering our patients to build resilience and lead fulfilling lives.",
    },
    services: {
      title: "Our Services",
      list: [
        { id: "individual", title: "Individual Therapy", description: "One-on-one sessions to address personal challenges, from anxiety to life transitions." },
        { id: "couples", title: "Couples Therapy", description: "Helping partners improve communication, resolve conflicts, and strengthen their relationship." },
        { id: "addiction", title: "Addiction Recovery", description: "Comprehensive programs to support individuals in overcoming substance and behavioral addictions." },
        { id: "anxiety", title: "Anxiety & Depression", description: "Specialized treatment plans to manage and overcome mood and anxiety disorders." },
        { id: "online", title: "Online Consultations", description: "Accessible and confidential therapy sessions from the comfort of your home." },
      ],
    },
    symptomChecker: {
      title: "AI Symptom Checker",
      description: "This confidential tool can help you reflect on your current feelings and identify areas you might want to discuss with a professional. Answer a few simple questions to get started.",
      disclaimer: "Disclaimer: This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
      cta: "Start Checker",
      placeholder: "Type your response here...",
      send: "Send",
      loading: "Thinking...",
      summaryMessage: "Thank you for sharing. Here is a brief summary of points you might find helpful to discuss with a mental health professional:",
      bookConsultation: "Book a Professional Consultation",
      error: "Sorry, an error occurred. Please try again later."
    },
    booking: {
      title: "Book a Consultation",
      form: {
        language: "Preferred Language",
        languageOptions: { english: "English", arabic: "Arabic" },
        sessionType: "Session Type",
        sessionOptions: { online: "Online", inClinic: "In-Clinic" },
        date: "Preferred Date",
        time: "Preferred Time",
        submit: "Request Appointment",
      },
      confirmation: {
        title: "Request Sent!",
        message: "Thank you for your request. We will contact you shortly to confirm your appointment.",
        summaryTitle: "Your Request Summary",
        bookAnother: "Book Another Appointment",
      },
    },
    blog: {
      title: "Mental Health Blog",
      posts: [
        { id: 1, title: "5 Simple Ways to Manage Daily Stress", excerpt: "Learn practical techniques to reduce stress and improve your mental well-being every day.", imageUrl: "https://picsum.photos/400/250?grayscale&blur=1" },
        { id: 2, title: "Understanding the Importance of Self-Care", excerpt: "Self-care isn't selfish; it's essential. Discover why and how to integrate it into your life.", imageUrl: "https://picsum.photos/400/250?grayscale&blur=2" },
        { id: 3, title: "Building Healthier Relationships", excerpt: "Explore the cornerstones of strong, supportive relationships and how to cultivate them.", imageUrl: "https://picsum.photos/400/250?grayscale&blur=3" },
      ],
      readMore: "Read More",
    },
    testimonials: {
      title: "What Our Patients Say",
      list: [
        { id: 1, quote: "Psy Maryam created a space where I felt truly heard and understood. Her guidance was invaluable in my recovery journey.", author: "A.K., Anonymous" },
        { id: 2, quote: "The online sessions were incredibly convenient and just as effective as in-person. I'm grateful for the support I received.", author: "F.B., Anonymous" },
        { id: 3, quote: "A compassionate and highly professional psychiatrist. I highly recommend her services to anyone seeking help.", author: "S.M., Anonymous" },
      ],
    },
    contact: {
      title: "Contact Us",
      location: "123 Wellness Street, Suite 400, Cairo, Egypt",
      phone: "Phone",
      whatsapp: "WhatsApp",
      email: "Email",
      socialMedia: "Follow Us",
    },
    footer: {
      copyright: "© 2024 Psy Maryam El Qasri. All Rights Reserved.",
    },
    chatBot: {
      headerTitle: "AI Assistant",
      placeholder: "Ask a question...",
      initialMessage: "Hello! I'm the clinic's AI assistant. How can I help you today? You can ask me about our services or how to book an appointment.",
      loading: "Thinking..."
    },
    // FIX: Add content for patientPortal to conform to the updated Content type.
    patientPortal: {
      title: "Patient Portal",
      login: {
        title: "Login to Your Account",
        emailLabel: "Email Address",
        passwordLabel: "Password",
        demoNote: "For demo purposes, any email/password will work.",
        button: "Login"
      },
      dashboard: {
        welcome: "Welcome, Patient",
        logout: "Logout",
        tabs: {
          appointments: "Appointments",
          resources: "Resources",
          messages: "Messages",
          settings: "Settings"
        },
        appointments: {
          upcomingTitle: "Upcoming Appointments",
          pastTitle: "Past Appointments",
          noAppointments: "No appointments to show.",
          upcoming: [
            { id: 1, date: "2024-09-15", time: "10:00 AM", type: "Online", notes: "Discuss progress on anxiety management techniques." },
          ],
          past: [
            { id: 2, date: "2024-08-20", time: "02:30 PM", type: "In-Clinic" },
          ],
          tableHeaders: {
            date: "Date",
            time: "Time",
            type: "Type",
            notes: "Notes"
          }
        },
        resources: {
          title: "Shared Resources",
          noResources: "No resources have been shared with you yet."
        },
        messages: {
          title: "Secure Messages",
          noMessages: "You have no new messages.",
          placeholder: "Type your message here...",
          button: "Send"
        },
        settings: {
          title: "Notification Settings",
          emailToggle: "Email Reminders",
          emailLabel: "Reminder Email Address",
          smsToggle: "SMS Reminders",
          smsLabel: "Reminder Phone Number",
          frequencyTitle: "Reminder Frequency",
          frequencyOptions: {
            '24h': "24 Hours Before",
            '3h': "3 Hours Before",
            '1h': "1 Hour Before",
          },
          saveButton: "Save Settings",
          successMessage: "Settings saved successfully!"
        }
      }
    },
  },
  ar: {
    header: {
      nav: {
        home: "الرئيسية",
        about: "عن الطبيبة",
        services: "الخدمات",
        blog: "المدونة",
        contact: "اتصل بنا",
        bookNow: "احجز الآن",
      },
      languageToggle: { en: "EN", ar: "ع" }
    },
    hero: {
      greeting: "مرحباً بكم في مساحة للشفاء والنمو",
      introduction: "تقدم Psy مريم القصري نهجاً مهنياً يتسم بالتعاطف لتحقيق العافية النفسية، وترشدك في طريقك نحو التوازن والتعافي.",
      cta: "احجز استشارة",
    },
    about: {
      title: "عن Psy مريم القصري",
      bio: "بخبرة تزيد عن 15 عاماً في الطب النفسي، Psy مريم القصري هي أخصائية معتمدة في الصحة النفسية والعلاج النفسي وعلاج الإدمان. حاصلة على شهادات من مؤسسات دولية رائدة وتكرس جهودها لتقديم رعاية شخصية مصممة خصيصاً لتلبية الاحتياجات الفريدة لكل مريض. يجمع نهجها بين العلاجات القائمة على الأدلة والفهم العميق للعوامل العاطفية والنفسية التي تؤثر على الصحة النفسية.",
      visionTitle: "رؤيتنا",
      vision: "خلق بيئة آمنة وغير قضائية حيث يمكن للأفراد استكشاف تحدياتهم، وتطوير آليات التكيف، وتحقيق الشفاء العقلي والعاطفي الدائم في نهاية المطاف. نؤمن بتمكين مرضانا لبناء المرونة وعيش حياة مرضية.",
    },
    services: {
      title: "خدماتنا",
      list: [
        { id: "individual", title: "العلاج الفردي", description: "جلسات فردية لمعالجة التحديات الشخصية، من القلق إلى التحولات الحياتية." },
        { id: "couples", title: "العلاج الزوجي", description: "مساعدة الشركاء على تحسين التواصل وحل النزاعات وتقوية علاقتهم." },
        { id: "addiction", title: "التعافي من الإدمان", description: "برامج شاملة لدعم الأفراد في التغلب على إدمان المواد المخدرة والسلوكيات." },
        { id: "anxiety", title: "علاج القلق والاكتئاب", description: "خطط علاجية متخصصة لإدارة اضطرابات المزاج والقلق والتغلب عليها." },
        { id: "online", title: "الاستشارات عبر الإنترنت", description: "جلسات علاجية سرية ومتاحة من راحة منزلك." },
      ],
    },
    symptomChecker: {
      title: "فاحص الأعراض بالذكاء الاصطناعي",
      description: "هذه الأداة السرية يمكن أن تساعدك على التفكير في مشاعرك الحالية وتحديد الجوانب التي قد ترغب في مناقشتها مع أخصائي. أجب عن بعض الأسئلة البسيطة للبدء.",
      disclaimer: "إخلاء مسؤولية: هذه الأداة مخصصة للأغراض المعلوماتية فقط وليست بديلاً عن الاستشارة الطبية المتخصصة أو التشخيص أو العلاج. اطلب دائمًا مشورة طبيبك أو غيره من مقدمي الرعاية الصحية المؤهلين بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية.",
      cta: "ابدأ الفحص",
      placeholder: "اكتب إجابتك هنا...",
      send: "إرسال",
      loading: "يفكر...",
      summaryMessage: "شكرًا لمشاركتك. إليك ملخص موجز للنقاط التي قد تجد من المفيد مناقشتها مع أخصائي في الصحة النفسية:",
      bookConsultation: "احجز استشارة متخصصة",
      error: "عذرًا، حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا."
    },
    booking: {
      title: "احجز استشارة",
      form: {
        language: "اللغة المفضلة",
        languageOptions: { english: "الإنجليزية", arabic: "العربية" },
        sessionType: "نوع الجلسة",
        sessionOptions: { online: "عبر الإنترنت", inClinic: "في العيادة" },
        date: "التاريخ المفضل",
        time: "الوقت المفضل",
        submit: "طلب موعد",
      },
      confirmation: {
        title: "تم إرسال طلبك!",
        message: "شكرًا لطلبك. سنتصل بك قريبًا لتأكيد موعدك.",
        summaryTitle: "ملخص طلبك",
        bookAnother: "حجز موعد آخر",
      },
    },
    blog: {
      title: "مدونة الصحة النفسية",
      posts: [
        { id: 1, title: "5 طرق بسيطة لإدارة التوتر اليومي", excerpt: "تعلم تقنيات عملية لتقليل التوتر وتحسين صحتك النفسية كل يوم.", imageUrl: "https://picsum.photos/400/250?grayscale&blur=1" },
        { id: 2, title: "فهم أهمية الرعاية الذاتية", excerpt: "الرعاية الذاتية ليست أنانية؛ إنها ضرورية. اكتشف لماذا وكيف تدمجها في حياتك.", imageUrl: "https://picsum.photos/400/250?grayscale&blur=2" },
        { id: 3, title: "بناء علاقات صحية أكثر", excerpt: "استكشف الركائز الأساسية للعلاقات القوية والداعمة وكيفية تنميتها.", imageUrl: "https://picsum.photos/400/250?grayscale&blur=3" },
      ],
      readMore: "اقرأ المزيد",
    },
    testimonials: {
      title: "ماذا يقول مرضانا",
      list: [
        { id: 1, quote: "خلقت Psy مريم مساحة شعرت فيها بأنني مسموع ومفهوم حقاً. كان توجيهها لا يقدر بثمن في رحلة شفائي.", author: "أ. ك.، مريض" },
        { id: 2, quote: "كانت الجلسات عبر الإنترنت مريحة بشكل لا يصدق وفعالة تماماً مثل الجلسات الشخصية. أنا ممتن للدعم الذي تلقيته.", author: "ف. ب.، مريض" },
        { id: 3, quote: "طبيبة نفسية رحيمة ومهنية للغاية. أوصي بشدة بخدماتها لأي شخص يبحث عن المساعدة.", author: "س. م.، مريض" },
      ],
    },
    contact: {
      title: "اتصل بنا",
      location: "123 شارع العافية، جناح 400، القاهرة، مصر",
      phone: "الهاتف",
      whatsapp: "واتساب",
      email: "البريد الإلكتروني",
      socialMedia: "تابعنا",
    },
    footer: {
      copyright: "© 2024 Psy مريم القصري. جميع الحقوق محفوظة.",
    },
    chatBot: {
      headerTitle: "المساعد الذكي",
      placeholder: "اطرح سؤالاً...",
      initialMessage: "مرحباً! أنا المساعد الذكي للعيادة. كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن خدماتنا أو كيفية حجز موعد.",
      loading: "يفكر..."
    },
    // FIX: Add content for patientPortal to conform to the updated Content type.
    patientPortal: {
      title: "بوابة المريض",
      login: {
        title: "تسجيل الدخول إلى حسابك",
        emailLabel: "البريد الإلكتروني",
        passwordLabel: "كلمة المرور",
        demoNote: "لأغراض العرض، أي بريد إلكتروني/كلمة مرور ستعمل.",
        button: "تسجيل الدخول"
      },
      dashboard: {
        welcome: "أهلاً بك أيها المريض",
        logout: "تسجيل الخروج",
        tabs: {
          appointments: "المواعيد",
          resources: "المصادر",
          messages: "الرسائل",
          settings: "الإعدادات"
        },
        appointments: {
          upcomingTitle: "المواعيد القادمة",
          pastTitle: "المواعيد السابقة",
          noAppointments: "لا توجد مواعيد لعرضها.",
          upcoming: [
            { id: 1, date: "2024-09-15", time: "10:00 ص", type: "عبر الإنترنت", notes: "مناقشة التقدم في تقنيات إدارة القلق." },
          ],
          past: [
            { id: 2, date: "2024-08-20", time: "02:30 م", type: "في العيادة" },
          ],
          tableHeaders: {
            date: "التاريخ",
            time: "الوقت",
            type: "النوع",
            notes: "ملاحظات"
          }
        },
        resources: {
          title: "المصادر المشتركة",
          noResources: "لم تتم مشاركة أي مصادر معك بعد."
        },
        messages: {
          title: "الرسائل الآمنة",
          noMessages: "ليس لديك رسائل جديدة.",
          placeholder: "اكتب رسالتك هنا...",
          button: "إرسال"
        },
        settings: {
          title: "إعدادات الإشعارات",
          emailToggle: "تذكيرات البريد الإلكتروني",
          emailLabel: "عنوان البريد الإلكتروني للتذكير",
          smsToggle: "تذكيرات الرسائل القصيرة",
          smsLabel: "رقم هاتف التذكير",
          frequencyTitle: "تكرار التذكير",
          frequencyOptions: {
            '24h': "قبل 24 ساعة",
            '3h': "قبل 3 ساعات",
            '1h': "قبل ساعة واحدة",
          },
          saveButton: "حفظ الإعدادات",
          successMessage: "تم حفظ الإعدادات بنجاح!"
        }
      }
    }
  },
};
