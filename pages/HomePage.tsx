
import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import { THEME_COLORS } from '../constants';
import { motion } from 'framer-motion';
import { Brain, Users, MessageSquare } from 'lucide-react';

const HomePage: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i:number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  const sections = [
    {
      title: "MBTI Personality Test",
      description: "Discover your Myers-Briggs Type Indicator and gain insights into your personality preferences.",
      link: "/mbti",
      theme: THEME_COLORS.mbti,
      icon: <Brain size={32} className={`mb-3 text-${THEME_COLORS.mbti.primary}`} />
    },
    {
      title: "TKI Conflict Resolution",
      description: "Understand your preferred Thomas-Kilmann conflict management style and how to navigate disagreements effectively.",
      link: "/tki",
      theme: THEME_COLORS.tki,
      icon: <Users size={32} className={`mb-3 text-${THEME_COLORS.tki.primary}`} />
    },
    {
      title: "AI Learning Companion",
      description: "Chat with our AI assistant for personalized advice on learning, career development, and understanding your results.",
      link: "/chatbot",
      theme: THEME_COLORS.chatbot,
      icon: <MessageSquare size={32} className={`mb-3 text-${THEME_COLORS.chatbot.primary}`} />
    }
  ];

  return (
    <div className="text-center">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 py-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Unlock Your Potential
      </motion.h1>
      <motion.p 
        className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Explore insightful assessments and engage with our AI to foster personal and professional growth.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <GlassCard 
            key={section.title}
            custom={index} 
            variants={cardVariants} 
            initial="hidden" 
            animate="visible" 
            className={`flex flex-col items-center border-${section.theme.primary}/50 h-full`}
          >
            {section.icon}
            <h2 className={`text-2xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${section.theme.gradientFrom} ${section.theme.gradientTo}`}>
              {section.title}
            </h2>
            <p className="text-gray-400 mb-6 flex-grow">{section.description}</p>
            <Link to={section.link}>
              <GlassButton colorClass={`bg-${section.theme.primary}/30 hover:bg-${section.theme.primary}/50 border-${section.theme.primary}/50`}>
                Start Now
              </GlassButton>
            </Link>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default HomePage;