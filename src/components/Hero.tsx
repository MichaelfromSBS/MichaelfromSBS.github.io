import React from 'react';
import { ArrowRight, Mail, MapPin, Sparkles, Award, GraduationCap, Compass } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo, honorsData } from '../data/portfolioData';
import { NavTab } from './Navbar';

interface HeroProps {
  onNavigate: (tab: NavTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="about" className="pt-24 pb-16 md:pt-32 md:pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner Affiliation Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs font-semibold tracking-wide uppercase mb-8 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        <span>Carnegie Mellon University • Computer Science & Machine Learning</span>
      </div>

      {/* Main Welcoming Card: Portrait + Bio */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-12">
        {/* Natural, Soft Portrait Framing */}
        <div className="shrink-0 relative group">
          {/* Subtle ambient blur glow behind portrait */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-red-500/15 via-slate-400/10 to-indigo-500/15 blur-lg opacity-70 group-hover:opacity-100 transition duration-500 pointer-events-none" />

          {/* Portrait Container */}
          <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-3xl p-1 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]">
            <img
              src="./portrait.jpg"
              alt="Michael Liu"
              className="w-full h-full object-cover object-top rounded-[22px] transition-opacity duration-300"
              onError={(e) => {
                // Fallback to portrait.png if .jpg is not found
                const target = e.target as HTMLImageElement;
                if (!target.src.endsWith('portrait.png')) {
                  target.src = './portrait.png';
                }
              }}
            />
          </div>

          {/* Status indicator badge */}
          <div className="mt-3 flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Open to Summer 2027 Internships</span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 tracking-tight">
              SWE • Machine Learning • Data
            </span>
          </div>
        </div>

        {/* Welcoming Greeting & Bio Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-3">
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 dark:from-red-400 dark:via-rose-400 dark:to-amber-300">
              {personalInfo.name}
            </span>
            .
          </h1>

          <p className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-200 mb-4">
            Undergraduate in Computer Science concentrating in Machine Learning at{' '}
            <span className="font-semibold text-red-600 dark:text-red-400">Carnegie Mellon University</span>.
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Welcome to my website! I'm interested in building robust, intelligent software at the crossroads of{' '}
            <span className="font-medium text-slate-800 dark:text-slate-200">Human-AI Interaction</span>,{' '}
            <span className="font-medium text-slate-800 dark:text-slate-200">Multimodal Systems</span>, and{' '}
            <span className="font-medium text-slate-800 dark:text-slate-200">Type-Safe Compilers</span>. When I'm not coding or doing research at CMU, I enjoy robotics, competitive programming, and open-source tooling.
          </p>

          {/* Quick Context Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-8 text-xs font-medium text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Pittsburgh, PA</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
              <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
              <span>BS in CS (Class of 2029)</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>VariAbility Lab Researcher</span>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('research')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 shadow-xs transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-purple-500" />
              <span>Research</span>
            </button>

            <button
              onClick={() => onNavigate('resume')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 shadow-xs transition-all cursor-pointer"
            >
              <span>Resume</span>
            </button>

            <div className="flex items-center gap-1.5 ml-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs transition-all"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs transition-all"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Distinction & Competitive Highlights Bar */}
      <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {honorsData.map((honor) => (
          <div
            key={honor.id}
            onClick={() => onNavigate('honors')}
            className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-900/60 transition-all cursor-pointer group shadow-xs"
          >
            <div className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1 flex items-center justify-between">
              <span>{honor.highlightRank || honor.period}</span>
              <Award className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-500 transition-colors" />
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
              {honor.title}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {honor.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
