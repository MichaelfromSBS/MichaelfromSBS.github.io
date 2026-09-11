import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NeuralBackground } from './components/NeuralBackground';
import { Navbar, NavTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Research } from './components/Research';
import { Projects } from './components/Projects';
import { ProjectDetail } from './components/ProjectDetail';
import { Experience } from './components/Experience';
import { Honors } from './components/Honors';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const validTabs: NavTab[] = ['about', 'projects', 'research', 'experience', 'honors', 'resume', 'contact'];

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('about');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

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

  // Parse and sync browser hash on load and when hash changes
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setActiveTab('about');
        setSelectedProjectId(null);
        return;
      }

      if (hash.startsWith('project/')) {
        const pId = hash.replace('project/', '');
        setActiveTab('projects');
        setSelectedProjectId(pId);
      } else if (validTabs.includes(hash as NavTab)) {
        setActiveTab(hash as NavTab);
        setSelectedProjectId(null);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
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
    setSelectedProjectId(null);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveTab('projects');
    window.location.hash = `project/${projectId}`;
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
    setActiveTab('projects');
    window.location.hash = 'projects';
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
        if (selectedProjectId) {
          return (
            <ProjectDetail
              projectId={selectedProjectId}
              onBack={handleBackToProjects}
              onSelectProject={handleSelectProject}
            />
          );
        }
        return <Projects onSelectProject={handleSelectProject} />;
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

  // Determine transition key for smooth motion
  const motionKey = activeTab === 'projects' && selectedProjectId
    ? `project-${selectedProjectId}`
    : activeTab;

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

      {/* Main Tabbed / Sub-page View with Smooth Transitions */}
      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={motionKey}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
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
