import React from 'react';
import { Code2, BrainCircuit, Cpu, Languages } from 'lucide-react';
import { skillGroups } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-red-500" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5 text-purple-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-500" />;
      case 'Languages':
        return <Languages className="w-5 h-5 text-emerald-500" />;
      default:
        return <Code2 className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <section id="skills" className="py-16 bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              Technical Arsenal
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Skills & Proficiencies
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mt-2 md:mt-0">
            A comprehensive overview of the programming languages, ML toolkits, systems, and frameworks I use in research and production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-700/60">
                  {getIcon(group.iconName)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-600/50 hover:border-red-400 dark:hover:border-red-400 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
