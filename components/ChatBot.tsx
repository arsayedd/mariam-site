
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { Content, Language } from '../types';
import ChatIcon from './icons/ChatIcon';

interface ChatBotProps {
  content: Content['chatBot'];
  language: Language;
}

type Message = {
  role: 'user' | 'model';
  text: string;
};

const ChatBot: React.FC<ChatBotProps> = ({ content, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const getSystemInstruction = () => {
    if (language === 'ar') {
      return `أنت مساعد ذكاء اصطناعي ودود ومفيد لعيادة Psy مريم القصري للطب النفسي. هدفك هو الإجابة على الأسئلة العامة حول العيادة والخدمات وحجز المواعيد وتقديم معلومات داعمة حول مواضيع الصحة النفسية.
- لا تقدم أي نصائح طبية أو تشخيصات أو خطط علاجية.
- إذا طلب مستخدم نصيحة طبية أو وصف أعراضه الشخصية بالتفصيل، يجب عليك أن ترفض بلطف وأن توصي بشدة بحجز استشارة مع Psy مريم.
- يجب أن تكون جميع ردودك باللغة العربية.
- اجعل الردود موجزة وسهلة الفهم.`;
    }
    return `You are a friendly and helpful AI assistant for Psy Maryam El Qasri's psychiatry clinic. Your purpose is to answer general questions about the clinic, services, booking appointments, and provide supportive information on mental wellness topics. 
- DO NOT provide any medical advice, diagnoses, or treatment plans. 
- If a user asks for medical advice or describes personal symptoms in detail, you MUST gently decline and strongly recommend booking a consultation with Psy Maryam.
- All your responses must be in English.
- Keep responses concise and easy to understand.`;
  };

  useEffect(() => {
    // Reset and initialize chat when language changes or window is opened
    if (isOpen) {
      const initializeChat = () => {
        try {
          setError(null);
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const newChat = ai.chats.create({
            model: 'gemini-2.5-pro',
            config: { 
              systemInstruction: getSystemInstruction(),
              thinkingConfig: { thinkingBudget: 32768 }
            }
          });
          setChat(newChat);
          setMessages([{ role: 'model', text: content.initialMessage }]);
        } catch (e) {
            console.error(e);
            setError("Could not initialize AI Assistant.");
        }
      };
      initializeChat();
    }
  }, [isOpen, language]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chat) return;

    const newUserMessage: Message = { role: 'user', text: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);
    
    // Add a placeholder for the streaming response
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
      const result = await chat.sendMessageStream({ message: userInput });
      let fullResponse = "";
      for await (const chunk of result) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage.role === 'model') {
                const updatedMessages = [...prev];
                updatedMessages[prev.length - 1] = { ...lastMessage, text: fullResponse };
                return updatedMessages;
            }
            return prev;
        });
      }
    } catch (err) {
      console.error(err);
      const errorMessage = language === 'ar' ? 'عذراً، حدث خطأ ما.' : 'Sorry, an error occurred.';
      setMessages(prev => prev.slice(0, -1)); // Remove the empty model message
      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`fixed bottom-0 end-0 m-6 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-primary text-white rounded-full p-4 shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
          aria-label={language === 'ar' ? 'افتح المحادثة' : 'Open Chat'}
        >
          <ChatIcon />
        </button>
      </div>

      <div
        className={`fixed bottom-0 end-0 m-0 sm:m-6 bg-white dark:bg-gray-800 rounded-t-lg sm:rounded-lg shadow-2xl w-full sm:w-96 h-[70vh] sm:h-auto sm:max-h-[70vh] flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-brand-text dark:text-white">{content.headerTitle}</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-brand-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-brand-text dark:text-gray-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length -1]?.role === 'user' && (
             <div className="flex justify-start">
              <div className="max-w-xs md:max-w-sm px-4 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700 text-brand-text dark:text-gray-200">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
         {error && <p className="text-red-500 text-xs text-center pb-2">{error}</p>}
          <form onSubmit={handleSendMessage} className="flex space-x-2 rtl:space-x-reverse">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={content.placeholder}
              className="flex-grow p-3 border border-gray-300 rounded-full focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              disabled={isLoading || error !== null}
            />
            <button
              type="submit"
              className="bg-brand-primary text-white p-3 rounded-full font-semibold hover:bg-blue-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isLoading || !userInput.trim() || error !== null}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
