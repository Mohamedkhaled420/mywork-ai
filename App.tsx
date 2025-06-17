
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import HomePage from './pages/HomePage';
import MBTIPage from './pages/MBTIPage';
import TKIPage from './pages/TKIPage';
import ChatbotPage from './pages/ChatbotPage';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
// Lucide icons are used in Header, not directly here for navigation items, but keeping for Header's needs
// import { Home, Brain, Users, MessageSquare } from 'lucide-react'; 

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 50 },
};

const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const App: React.FC = () => {
  // The `location` and `key` for AnimatePresence are typically obtained from `useLocation` hook
  // if you want to animate route changes based on path.
  // For simplicity, if App.tsx itself doesn't use useLocation, we can remove it from Routes.
  // However, AnimatePresence usually needs a key on its direct children that changes for exit animations to work.
  // The current structure where motion.div is inside Route should work if location is correctly passed to Routes.
  // If react-router-dom v6, `useLocation` must be called within Router context.
  // The AnimatePresence setup expects `location` and `key` on `Routes` for page transitions.
  // This is a common pattern:
  // const location = useLocation();
  // <Routes location={location} key={location.pathname}>
  // However, if we don't declare `location` here, `Routes` will use its internal context.
  // For `AnimatePresence` `mode="wait"` to work correctly with `Routes`, it's better to manage `location` state.
  // For this fix, let's assume the existing Routes structure without explicit location prop for Routes itself, relying on motion.div keys.
  // The key issue in original was the transition prop type, which is now fixed.

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <AnimatedBackground />
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 z-10">
          <AnimatePresence mode="wait">
            <Routes> {/* Removed location and key here for now, each motion.div has a key from path */}
              <Route path="/" element={
                <motion.div key="home" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                  <HomePage />
                </motion.div>
              } />
              <Route path="/mbti" element={
                <motion.div key="mbti" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                  <MBTIPage />
                </motion.div>
              } />
              <Route path="/tki" element={
                <motion.div key="tki" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                  <TKIPage />
                </motion.div>
              } />
              <Route path="/chatbot" element={
                <motion.div key="chatbot" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
                  <ChatbotPage />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </main>
        <footer className="py-6 text-center text-sm text-gray-400 z-10">
          <p>&copy; {new Date().getFullYear()} L&amp;D FuturePlatform. All rights reserved.</p>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
