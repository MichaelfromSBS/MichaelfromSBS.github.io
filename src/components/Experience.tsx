import React from 'react';
import { GraduationCap, Briefcase, MapPin, BookOpen } from 'lucide-react';
import { educationData, experienceData } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Background & Journey</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Education & Experience
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          Academic foundation at Carnegie Mellon University and organizational leadership roles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Education Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
            <GraduationCap className="w-5 h-5 text-red-600" />
            <span>Education</span>
          </div>

          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white/85 dark:bg-slate-800/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-xs"
            >
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {edu.institution}
                </h3>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {edu.period}
                </span>
              </div>

              <div className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">
                {edu.degree}
              </div>

              {edu.concentration && (
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-2">
                  {edu.concentration}
                </div>
              )}

              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{edu.location}</span>
              </div>

              {/* Coursework */}
              {edu.coursework && edu.coursework.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-red-500" />
                    <span>Selected Coursework:</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course) => (
                      <span
                        key={course.code}
                        className="px-2.5 py-1 rounded-lg text-xs bg-slate-100/90 dark:bg-slate-700/70 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-600/50"
                        title={course.name}
                      >
                        <span className="font-mono font-semibold text-red-600 dark:text-red-400">{course.code}</span>: {course.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {edu.honors && edu.honors.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  {edu.honors.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60"
                    >
                      ★ {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Experience / Leadership Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
            <Briefcase className="w-5 h-5 text-red-600" />
            <span>Experience & Leadership</span>
          </div>

          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-3xl bg-white/85 dark:bg-slate-800/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-xs"
            >
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {exp.role}
                </h3>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {exp.period}
                </span>
              </div>

              <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-3">
                {exp.organization}
              </div>

              {/* Bullet points presented cleanly */}
              <ul className="space-y-2 mb-4">
                {exp.points.map((point, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed list-disc list-inside">
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom tags */}
              {exp.tags && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
