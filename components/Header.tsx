
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Brain, Users, MessageSquare, Zap } from 'lucide-react'; // Added Zap for logo
import { TestSection } from '../types'; // Changed from ../constants
import { THEME_COLORS } from '../constants';

const NavLink: React.FC<{ to: string; children: React.ReactNode; section: TestSection }> = ({ to, children, section }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const colorKey = section.toLowerCase() as keyof typeof THEME_COLORS;
  const activeColor = THEME_COLORS[colorKey]?.primary || THEME_COLORS.home.primary;
  
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center space-x-2
                  ${isActive ? `bg-white/20 text-white shadow-md border border-${activeColor}/50` : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
    >
      {children}
    </Link>
  );
};

const Header: React.FC = () => {
  return (
    <header className="bg-black/30 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <Zap size={32} className={`mr-2 text-${THEME_COLORS.home.primary} group-hover:text-white transition-colors duration-300 transform group-hover:scale-110`} />
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 group-hover:opacity-80 transition-opacity">
                L&amp;D FuturePlatform
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" section={TestSection.Home}><Home size={18} /><span>Home</span></NavLink>
              <NavLink to="/mbti" section={TestSection.MBTI}><Brain size={18} /><span>MBTI Test</span></NavLink>
              <NavLink to="/tki" section={TestSection.TKI}><Users size={18} /><span>TKI Test</span></NavLink>
              <NavLink to="/chatbot" section={TestSection.Chatbot}><MessageSquare size={18} /><span>AI Chatbot</span></NavLink>
            </div>
          </div>
        </div>
      </nav>
       {/* Mobile Nav - Basic, can be expanded with a menu button */}
       <div className="md:hidden p-2 flex justify-around bg-black/50">
          <NavLink to="/" section={TestSection.Home}><Home size={20} /></NavLink>
          <NavLink to="/mbti" section={TestSection.MBTI}><Brain size={20} /></NavLink>
          <NavLink to="/tki" section={TestSection.TKI}><Users size={20} /></NavLink>
          <NavLink to="/chatbot" section={TestSection.Chatbot}><MessageSquare size={20} /></NavLink>
        </div>
    </header>
  );
};

export default Header;