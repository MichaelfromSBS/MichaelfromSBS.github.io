import React, { useState } from 'react';
import { FolderGit2, ArrowRight, Sparkles } from 'lucide-react';
import { projectsData } from '../data/portfolioData';

interface ProjectsProps {
  onSelectProject: (id: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI/ML', 'Systems', 'Web & Mobile', 'Robotics'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Projects
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mt-2 md:mt-0">
          Systems engineering, deep learning pipelines, and full-stack software. Select any project to view its full technical architecture.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white/85 dark:bg-slate-800/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md hover:border-red-300 dark:hover:border-red-900/60 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group"
          >
            <div>
              {/* Top badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600/50 font-mono">
                  {project.category}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                  {project.period}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors flex items-center gap-2">
                <span>{project.title}</span>
                {project.featured && (
                  <span title="Featured Project">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  </span>
                )}
              </h3>

              {/* Short Description */}
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 mb-6 leading-relaxed">
                {project.subtitle}
              </p>
            </div>

            {/* Bottom: Tech Stack Preview & View Details Callout */}
            <div>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700/60 mb-4">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-400">
                    +{project.techStack.length - 4} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>View Project Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>

                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Full writeup
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
