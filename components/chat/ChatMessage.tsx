
import React from 'react';
import { motion } from 'framer-motion';
import { ChatMessage as ChatMessageType } from '../../types';
import { User, Sparkles } from 'lucide-react'; // Sparkles for AI
import { THEME_COLORS } from '../../constants';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const theme = THEME_COLORS.chatbot;

  return (
    <motion.div
      className={`flex items-end mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isUser && (
        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} flex items-center justify-center mr-2 shadow-md`}>
          <Sparkles size={16} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-xl shadow-md ${
          isUser
            ? `bg-blue-600/70 text-white rounded-br-none`
            : `bg-slate-700/70 text-gray-200 rounded-bl-none border border-slate-600`
        }`}
      >
        <p className="text-sm break-words">{message.text}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-400'} text-right`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {isUser && (
         <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600/70 flex items-center justify-center ml-2 shadow-md">
          <User size={16} className="text-gray-300" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
