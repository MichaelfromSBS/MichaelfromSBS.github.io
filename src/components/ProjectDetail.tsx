import React, { useEffect } from 'react';
import { ArrowLeft, ExternalLink, Calendar, Layers, CheckCircle2, ChevronRight, ChevronLeft, Cpu, FileText, Download } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/portfolioData';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
  onSelectProject: (id: string) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  projectId,
  onBack,
  onSelectProject
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  const currentIndex = projectsData.findIndex((p) => p.id === projectId);
  const project = projectsData[currentIndex] || projectsData[0];

  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Navigation Bar & Breadcrumb */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Projects</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Projects</span>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[200px]">
            {project.title}
          </span>
        </div>
      </div>

      {/* Project Header Banner */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60 font-mono">
            {project.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>{project.period}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          {project.subtitle}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-slate-200/60 dark:border-slate-800">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs sm:text-sm shadow-sm transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source on GitHub</span>
            </a>
          )}

          {project.posterUrl && (
            <a
              href={project.posterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>View Implementation Poster</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live Demo</span>
            </a>
          )}

          {project.paperUrl && (
            <a
              href={project.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-xs sm:text-sm shadow-xs transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Read Technical Report</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Content Body */}
      <div className="space-y-10">
        {/* Technical Highlights & Architecture Section */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/85 dark:bg-slate-800/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white mb-6">
            <Layers className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span>Architecture & Key Achievements</span>
          </div>

          <div className="space-y-4">
            {project.highlights.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800"
              >
                <CheckCircle2 className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                  {point}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research & Implementation Poster Showcase */}
        {project.posterPreviewUrl && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white/85 dark:bg-slate-800/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Research Implementation Poster</span>
              </div>
              {project.posterUrl && (
                <div className="flex items-center gap-2">
                  <a
                    href={project.posterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-semibold hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View High-Res PDF</span>
                  </a>
                  <a
                    href={project.posterUrl}
                    download="SURA_Implementation_Poster_Michael_Liu.pdf"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              )}
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Presented for the SURA Neurodiversity Wellbeing Project under Prof. Andrew Begel at Carnegie Mellon University.
            </p>

            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700 bg-slate-900/5 dark:bg-slate-950/40 group">
              <a
                href={project.posterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer"
              >
                <img
                  src={project.posterPreviewUrl}
                  alt={`${project.title} Implementation Poster`}
                  className="w-full object-contain max-h-[640px] transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm shadow-xl flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-purple-600" />
                    Click to Open Full-Resolution Poster (PDF)
                  </span>
                </div>
              </a>
            </div>
          </div>
        )}

        {/* Technology Stack Breakdown */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/85 dark:bg-slate-800/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white mb-4">
            <Cpu className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span>Technologies & Tools Deployed</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-medium bg-slate-100 dark:bg-slate-700/70 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-600/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Next / Previous Project Navigation Footer */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4">
          {prevProject ? (
            <button
              onClick={() => onSelectProject(prevProject.id)}
              className="flex flex-col text-left group p-3 -ml-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous Project</span>
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1 mt-0.5">
                {prevProject.title}
              </span>
            </button>
          ) : (
            <div />
          )}

          {nextProject ? (
            <button
              onClick={() => onSelectProject(nextProject.id)}
              className="flex flex-col text-right group p-3 -mr-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span className="flex items-center justify-end gap-1 text-xs font-semibold text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                <span>Next Project</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1 mt-0.5">
                {nextProject.title}
              </span>
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
