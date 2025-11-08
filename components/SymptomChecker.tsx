
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import type { Content, Language } from '../types';
import SymptomCheckerIcon from './icons/SymptomCheckerIcon';

interface SymptomCheckerProps {
  content: Content['symptomChecker'];
  language: Language;
}

type Message = {
  role: 'user' | 'model';
  text: string;
};

type Stage = 'intro' | 'chat' | 'summary' | 'error';

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ content, language }) => {
  const [stage, setStage] = useState<Stage>('intro');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation, isLoading]);

  const getSystemInstruction = () => {
    if (language === 'ar') {
      return "أنت مساعد ذكاء اصطناعي متعاطف وداعم لفحص أولي لأعراض الصحة النفسية. هدفك هو طرح 5 أسئلة لطيفة ومفتوحة لمساعدة المستخدم على التفكير في حالته الصحية. اطرح سؤالاً واحداً في كل مرة. غطِّ مواضيع مثل المزاج العام، وأنماط النوم، والقلق، ومستويات الطاقة، والتفاعلات الاجتماعية. لا تستخدم المصطلحات الطبية المعقدة. لا تحاول التشخيص. بعد 5 أسئلة، يجب أن تكون إجابتك النهائية هي الملخص فقط ولا شيء آخر. يجب أن تكون جميع الاتصالات باللغة العربية.";
    }
    return `You are an empathetic and supportive AI assistant for a preliminary mental health symptom checker. Your goal is to ask 5 gentle, open-ended questions to help a user reflect on their well-being. Ask one question at a time. Cover topics like general mood, sleep patterns, anxiety, energy levels, and social interactions. Do not use clinical jargon. Do not attempt to diagnose. After 5 questions, your final response must ONLY be the summary and nothing else. All communication must be in English.`;
  };
  
  const getSummaryInstruction = (chatHistory: string) => {
      if (language === 'ar') {
          return `بناءً على المحادثة التالية، قدم ملخصًا لطيفًا وداعمًا للنقاط الرئيسية المذكورة. صغ الملخص كمواضيع محتملة للمناقشة مع أخصائي في الصحة النفسية. لا تقدم أي تشخيص أو نصيحة طبية. اختتم الملخص بتوصية قوية بإجراء استشارة متخصصة. يجب أن يكون الملخص باللغة العربية. المحادثة: ${chatHistory}`;
      }
      return `Based on the following conversation, provide a gentle and supportive summary of the key points mentioned. Frame it as potential topics for a discussion with a mental health professional. Do not provide any diagnosis or medical advice. End the summary by strongly recommending a professional consultation. The summary must be in English. Conversation: ${chatHistory}`;
  };

  const startCheck = async () => {
    setIsLoading(true);
    setConversation([]);
    setStage('chat');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const firstQuestionPrompt = language === 'ar' ? 'اطرح سؤالك الأول.' : 'Please provide your first question.';
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-pro',
          contents: firstQuestionPrompt,
          config: { 
            systemInstruction: getSystemInstruction(),
            thinkingConfig: { thinkingBudget: 32768 }
          }
      });
      setConversation([{ role: 'model', text: response.text }]);
    } catch (error) {
      console.error(error);
      setStage('error');
    }
    setIsLoading(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: Message = { role: 'user', text: userInput };
    const updatedConversation = [...conversation, newUserMessage];
    setConversation(updatedConversation);
    setUserInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const history = updatedConversation.map(msg => `${msg.role}: ${msg.text}`).join('\n');
      
      const userMessagesCount = updatedConversation.filter(m => m.role === 'user').length;

      if (userMessagesCount >= 5) {
        // Generate Summary
        const summaryResponse = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: getSummaryInstruction(history),
            config: {
              thinkingConfig: { thinkingBudget: 32768 }
            }
        });
        setConversation(prev => [...prev, { role: 'model', text: summaryResponse.text }]);
        setStage('summary');

      } else {
        // Get next question
        const nextQuestionPrompt = language === 'ar' 
            ? `هذه هي المحادثة حتى الآن:\n${history}\n\nيرجى طرح السؤال التالي.`
            : `This is the conversation so far:\n${history}\n\nPlease provide the next question.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: nextQuestionPrompt,
            config: { 
              systemInstruction: getSystemInstruction(),
              thinkingConfig: { thinkingBudget: 32768 }
            }
        });
        setConversation(prev => [...prev, { role: 'model', text: response.text }]);
      }
    } catch (error) {
      console.error(error);
      setStage('error');
    }

    setIsLoading(false);
  };
  
  const renderIntro = () => (
    <div className="text-center max-w-3xl mx-auto">
      <div className="flex justify-center mb-4 text-brand-primary dark:text-brand-blue">
          <SymptomCheckerIcon />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-brand-text dark:text-white mb-4">{content.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{content.description}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-8">{content.disclaimer}</p>
      <button onClick={startCheck} className="bg-brand-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-500 transition-colors">
        {content.cta}
      </button>
    </div>
  );

  const renderChat = () => (
    <div className="max-w-3xl mx-auto bg-brand-beige dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <div ref={chatContainerRef} className="h-96 overflow-y-auto mb-4 space-y-4 p-4">
        {conversation.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-sm md:max-w-md px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-brand-primary text-white' : 'bg-white dark:bg-gray-700 text-brand-text dark:text-gray-200'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
              <div className="max-w-sm md:max-w-md px-4 py-2 rounded-2xl bg-white dark:bg-gray-700 text-brand-text dark:text-gray-200">
                <span className="animate-pulse">{content.loading}</span>
              </div>
          </div>
        )}
         {stage === 'summary' && (
          <div className="text-center p-4 mt-6">
              <p className="font-semibold text-brand-text dark:text-white mb-4">{content.summaryMessage}</p>
              <a href="#booking" className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors">
                {content.bookConsultation}
              </a>
          </div>
        )}
      </div>
      {stage === 'chat' && (
        <form onSubmit={handleSendMessage} className="flex space-x-2 rtl:space-x-reverse">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={content.placeholder}
            className="flex-grow p-3 border border-gray-300 rounded-full focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            disabled={isLoading}
          />
          <button type="submit" className="bg-brand-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-500 transition-colors disabled:bg-gray-400" disabled={isLoading}>
            {content.send}
          </button>
        </form>
      )}
    </div>
  );
  
  const renderError = () => (
      <div className="text-center max-w-3xl mx-auto bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
        <p>{content.error}</p>
        <button onClick={() => setStage('intro')} className="mt-4 text-sm underline">
            Try Again
        </button>
      </div>
  );

  return (
    <section id="symptom-checker" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {stage === 'intro' && renderIntro()}
        {(stage === 'chat' || stage === 'summary') && renderChat()}
        {stage === 'error' && renderError()}
      </div>
    </section>
  );
};

export default SymptomChecker;
