import React from 'react';
import { ArrowRight, Mail, MapPin, Sparkles, Award } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo, honorsData } from '../data/portfolioData';

export const Hero: React.FC = () => {
  return (
    <section id="about" className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden relative">
      {/* Ambient gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 dark:bg-red-600/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Hero Content - pointer-events-none on container allows clicks/mouse on open space to interact with the neural canvas */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-none">
        {/* Top affiliation pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span>Carnegie Mellon University • Computer Science & Machine Learning</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 dark:from-red-400 dark:via-rose-400 dark:to-amber-300">{personalInfo.name}</span>.
        </h1>

        {/* Headline / Tagline */}
        <p className="text-xl sm:text-2xl font-medium text-slate-700 dark:text-slate-200 mb-4 max-w-3xl">
          {personalInfo.headline}
        </p>

        {/* Bio paragraph */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed mb-8">
          {personalInfo.bio}
        </p>

        {/* Key Quick Facts / Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-8 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 pointer-events-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>{personalInfo.location}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>VariAbility Lab Researcher (SURA)</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700 shadow-xs">
            <Award className="w-3.5 h-3.5 text-blue-500" />
            <span>USACO Platinum & USAMO Qualifier</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 pointer-events-auto">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#research"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700/90 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Research & SURA</span>
          </a>

          <div className="flex items-center gap-2 ml-auto sm:ml-2">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-105"
              title="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-105"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-3 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-105"
              title="Email Michael"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Honors quick spotlight bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 pointer-events-auto">
          {honorsData.map((honor) => (
            <div
              key={honor.id}
              className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-xs"
            >
              <div className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">
                {honor.highlightRank || honor.period}
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
      </div>
    </section>
  );
};
