import React from 'react';
import { Microscope, UserCheck, Zap, Layers, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import { researchProjects } from '../data/portfolioData';

export const Research: React.FC = () => {
  return (
    <section id="research" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Microscope className="w-3.5 h-3.5" />
            <span>Academic Research</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Research & Lab Experience
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
            Investigating human-centered AI systems, neurodivergent accessibility in software engineering, and context-aware developer tooling at Carnegie Mellon University.
          </p>
        </div>

        <div className="space-y-8">
          {researchProjects.map((research) => (
            <div
              key={research.id}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-white to-purple-50/30 dark:from-slate-800/90 dark:via-slate-800/80 dark:to-purple-950/20 border border-purple-100 dark:border-purple-900/40 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {research.title}
                </h3>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50 self-start sm:self-auto">
                  {research.period}
                </span>
              </div>

              {/* Lab & Advisor Info */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm font-medium text-purple-700 dark:text-purple-300 mb-4">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  {research.lab}
                </span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span>Advised by {research.advisor}</span>
              </div>

              {/* Summary */}
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                {research.summary}
              </p>

              {/* Key Contributions & Metrics */}
              <div className="space-y-3 mb-6 bg-slate-50/80 dark:bg-slate-900/50 p-4 sm:p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Key Research Contributions:
                </h4>
                <ul className="space-y-2.5">
                  {research.highlights.map((point, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      {index === 0 && <Zap className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
                      {index === 1 && <Layers className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />}
                      {index === 2 && <UserCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />}
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags and Links */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {research.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {research.codeUrl && (
                    <a
                      href={research.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      Code Repository
                    </a>
                  )}
                  {research.paperUrl && (
                    <a
                      href={research.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Paper / Report
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
