
import React, { useState } from 'react';
import GlassButton from '../GlassButton';
import { Send } from 'lucide-react';
import { THEME_COLORS } from '../../constants';

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');
  const theme = THEME_COLORS.chatbot;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-2 bg-black/30 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg mt-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask about personality or careers..."
        className="flex-grow bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none px-4 py-3 rounded-lg"
        disabled={isLoading}
      />
      <GlassButton
        type="submit"
        disabled={isLoading || !text.trim()}
        className="ml-2 !px-4 !py-3"
        colorClass={`bg-${theme.primary}/50 hover:bg-${theme.primary}/70 border-${theme.primary}/70 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isLoading ? <Send size={20} className="animate-pulse" /> : <Send size={20} />}
      </GlassButton>
    </form>
  );
};

export default ChatInput;
