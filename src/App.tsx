import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NeuralBackground } from './components/NeuralBackground';
import { Navbar, NavTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Research } from './components/Research';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Honors } from './components/Honors';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const validTabs: NavTab[] = ['about', 'projects', 'research', 'experience', 'honors', 'resume', 'contact'];

export const App: React.FC = () => {
  // Read initial tab from URL hash if available
  const [activeTab, setActiveTab] = useState<NavTab>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase() as NavTab;
      if (validTabs.includes(hash)) {
        return hash;
      }
    }
    return 'about';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync activeTab with browser URL hash & history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase() as NavTab;
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'about':
        return (
          <>
            <Hero onNavigate={handleSelectTab} />
            <Skills />
          </>
        );
      case 'projects':
        return <Projects />;
      case 'research':
        return <Research />;
      case 'experience':
        return <Experience />;
      case 'honors':
        return <Honors />;
      case 'resume':
        return <ResumeSection />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            <Hero onNavigate={handleSelectTab} />
            <Skills />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-red-500/20 selection:text-red-600 dark:selection:bg-red-500/30 dark:selection:text-red-300 relative flex flex-col justify-between">
      {/* Universal Interactive Neural Vector Background */}
      <NeuralBackground />

      {/* Top Fixed Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Multi-Page Tabbed View with Smooth Page Transitions */}
      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
