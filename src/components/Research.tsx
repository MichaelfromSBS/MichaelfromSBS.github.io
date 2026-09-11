import React, { useState } from 'react';
import { Microscope, UserCheck, Zap, Layers, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { GithubIcon } from './Icons';
import { researchProjects } from '../data/portfolioData';

export const Research: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set([researchProjects[0]?.id]));

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="research" className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
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

      <div className="space-y-6">
        {researchProjects.map((research) => {
          const isExpanded = expandedIds.has(research.id);

          return (
            <div
              key={research.id}
              className={`p-6 sm:p-8 rounded-3xl bg-white/85 dark:bg-slate-800/85 backdrop-blur-md border transition-all duration-200 ${
                isExpanded
                  ? 'border-purple-300 dark:border-purple-900/80 shadow-md ring-1 ring-purple-500/20'
                  : 'border-slate-200/80 dark:border-slate-700/80 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {research.title}
                </h3>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50 self-start sm:self-auto font-mono">
                  {research.period}
                </span>
              </div>

              {/* Lab & Advisor Info */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm font-medium text-purple-700 dark:text-purple-300 mb-3">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  {research.lab}
                </span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span>Advised by {research.advisor}</span>
              </div>

              {/* Summary Teaser */}
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {research.summary}
              </p>

              {/* Expandable Key Contributions */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-3 bg-slate-50/80 dark:bg-slate-900/50 p-4 sm:p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
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
              </div>

              {/* Tags, Links & Expand Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                <div className="flex flex-wrap gap-2">
                  {research.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {research.codeUrl && (
                    <a
                      href={research.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code Repository</span>
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
                      <span>Paper / Report</span>
                    </a>
                  )}

                  <button
                    onClick={() => toggleExpand(research.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer p-1 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                  >
                    <span>{isExpanded ? 'Less' : 'Contributions'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
