
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import TypingIndicator from '../components/chat/TypingIndicator';
import GlassButton from '../components/GlassButton';
import GlassCard from '../components/GlassCard';
import { ChatMessage as ChatMessageType } from '../types';
import { sendMessageToGeminiStream, resetChat, getAiClient } from '../services/geminiService';
import { ArrowLeft, RotateCcw, AlertTriangle, MessageSquare } from 'lucide-react'; // Added MessageSquare
import { THEME_COLORS, GEMINI_CHAT_SYSTEM_INSTRUCTION } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const theme = THEME_COLORS.chatbot;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  // Check API key status on mount
  useEffect(() => {
    try {
      getAiClient(); // This will throw if API_KEY is missing
      setError(null);
    } catch (e: any) {
      setError(e.message || "Failed to initialize AI. API Key might be missing or invalid.");
    }
  }, []);


  const handleSend = useCallback(async (text: string) => {
    if (error) return; // Don't send if there's an API key error

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    let aiResponseText = "";
    const aiMessageId = (Date.now() + 1).toString(); // Provisional ID

    // Add a placeholder for AI message to update stream into
    setMessages(prev => [
      ...prev,
      {
        id: aiMessageId,
        text: "", // Empty for now, will be filled by stream
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);

    await sendMessageToGeminiStream(
      text,
      (chunkText) => { // onChunk
        aiResponseText += chunkText;
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId ? { ...msg, text: aiResponseText } : msg
        ));
      },
      (errorMessage) => { // onError
        setError(errorMessage);
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId ? { ...msg, text: `Error: ${errorMessage}` } : msg
        ));
        setIsLoading(false);
      },
      () => { // onComplete
        setIsLoading(false);
      }
    );
  }, [error]);

  const handleResetChat = () => {
    resetChat();
    setMessages([]);
    setError(null); // Clear any errors on reset
    // Re-check API key status
     try {
      getAiClient();
    } catch (e: any) {
      setError(e.message || "Failed to initialize AI. API Key might be missing or invalid.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
       <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/">
           <GlassButton colorClass={`bg-${theme.primary}/30 hover:bg-${theme.primary}/50 border-${theme.primary}/50`} className="!px-3 !py-2">
            <ArrowLeft size={20} className="mr-1" /> Back
          </GlassButton>
        </Link>
        <h1 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo}`}>
          AI Learning Companion
        </h1>
        <GlassButton onClick={handleResetChat} colorClass={`bg-${theme.secondary}/30 hover:bg-${theme.secondary}/50 border-${theme.secondary}/50`} className="!px-3 !py-2">
          <RotateCcw size={20} className="mr-1" /> Reset
        </GlassButton>
      </motion.div>

      <GlassCard className={`flex flex-col h-[70vh] border-${theme.primary}/50`}>
        <div className="flex-grow overflow-y-auto pr-2 space-y-4 custom-scrollbar">
          {messages.length === 0 && !isLoading && !error && (
            <div className="text-center text-gray-400 pt-10">
              <MessageSquare size={48} className={`mx-auto mb-4 text-${theme.primary}`} />
              <p>Ask me anything about your assessment results, personality types, conflict styles, or career development!</p>
              <p className="text-xs mt-2">{GEMINI_CHAT_SYSTEM_INSTRUCTION.substring(0,100)}...</p>
            </div>
          )}
          <AnimatePresence>
            {messages.map(msg => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          </AnimatePresence>
          {isLoading && messages[messages.length-1]?.sender === 'user' && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        
        {error && (
          <motion.div 
            className={`mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm flex items-center`}
            initial={{opacity: 0, y:10}} animate={{opacity:1, y:0}}
          >
            <AlertTriangle size={20} className="mr-2"/> {error}
          </motion.div>
        )}

        <ChatInput onSend={handleSend} isLoading={isLoading || !!error} />
      </GlassCard>
    </div>
  );
};

export default ChatbotPage;
