import React from 'react';
import { Trophy, Award, Medal, Sparkles } from 'lucide-react';
import { honorsData } from '../data/portfolioData';

export const Honors: React.FC = () => {
  return (
    <section id="honors" className="py-16 bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Distinctions & Awards</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Honors & Competitive Achievements
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
            National Olympiad placements, hackathon awards, and mathematical competition distinctions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {honorsData.map((honor, index) => (
            <div
              key={honor.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/70 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    {index === 0 ? (
                      <Trophy className="w-5 h-5" />
                    ) : index === 1 ? (
                      <Award className="w-5 h-5" />
                    ) : (
                      <Medal className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300">
                    {honor.highlightRank}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {honor.title}
                </h3>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                  {honor.organization} • {honor.period}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {honor.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Distinction</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
