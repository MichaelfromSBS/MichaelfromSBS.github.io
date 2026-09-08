import React from 'react';
import { FileText, Download, ExternalLink, Printer } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const ResumeSection: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Curriculum Vitae</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Resume & Credentials
            </h2>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Page</span>
            </button>

            <a
              href="./resume.pdf"
              download="Michael_Liu_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Paper-like styled resume preview card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg p-6 sm:p-10 relative">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {personalInfo.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {personalInfo.location} • {personalInfo.phone} •{' '}
                <a href={`mailto:${personalInfo.email}`} className="text-red-600 dark:text-red-400 hover:underline">
                  {personalInfo.email}
                </a>
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1">
                  github.com/MichaelfromSBS <ExternalLink className="w-3 h-3" />
                </a>
                <span>•</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1">
                  linkedin.com/in/michael-liu2 <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Education */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">
                Education
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Carnegie Mellon University</span>
                    <span className="text-xs font-mono text-slate-500">Pittsburgh, PA • Expected May 2029</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300">
                    Bachelor of Science in Computer Science — Concentration in Machine Learning
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Selected Coursework:</span> Mathematical Foundations for CS (15-151), Great Theoretical Ideas in CS (15-251), Functional Programming (15-150), Matrices and Linear Transformations (21-241), Concepts of Robotics (16-180), Imperative Computation (15-122), Probability Theory (36-225).
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">The Stony Brook School</span>
                    <span className="text-xs font-mono text-slate-500">Stony Brook, NY • June 2025</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300">High School Diploma</div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">
                Technical Skills
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <p><span className="font-semibold text-slate-900 dark:text-white">Programming Languages:</span> Python, C, C++, Java, SML, C0, JavaScript, Node.js, LaTeX.</p>
                <p><span className="font-semibold text-slate-900 dark:text-white">Technologies:</span> PyTorch, FastAPI, React Native, Firebase, TensorFlow, Scikit-Learn, Pandas, NumPy, Git, Docker, Jupyter, MCP, RAG.</p>
                <p><span className="font-semibold text-slate-900 dark:text-white">Spoken Languages:</span> Native fluency in English and Mandarin Chinese.</p>
              </div>
            </div>

            {/* Projects & Research */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">
                Projects & Research
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">SURA: Neurodiversity Wellbeing Project</span>
                    <span className="text-xs font-mono text-slate-500">May 2026 – Aug 2026</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-1">Advised by Prof. Andrew Begel, VariAbility Lab / S3D</div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <li>Reduced developer context-switching friction by integrating the Model Context Protocol (MCP) into Jupyter server extensions for local context awareness.</li>
                    <li>Maintained sub-100ms interface responsiveness by engineering custom JupyterLab UI components delivering real-time, non-intrusive emotional support tailored for neurodivergent developers.</li>
                    <li>Validated interaction flow and system efficacy by designing and conducting structured user studies with autistic software engineers.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Viditas: Multimodal Deepfake Detection System</span>
                    <span className="text-xs font-mono text-slate-500">August 2026</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <li>Accelerated AI-generated media classification throughput to 30+ FPS by developing an asynchronous inference backend in FastAPI and PyTorch.</li>
                    <li>Enhanced detection precision across benchmark datasets by building end-to-end pipelines processing parallel audio and video streams for real-time anomaly detection.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">ScottyTasks (React Native & Firebase)</span>
                    <span className="text-xs font-mono text-slate-500">Jan 2026 – Present</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <li>Scaled task management tooling for the CMU community, integrating gamification elements to drive recurring daily active engagement.</li>
                    <li>Decreased data sync latency to under 50ms by implementing real-time NoSQL synchronization and user authentication via Google Firebase.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Stack-Based Simple Compiler (C0)</span>
                    <span className="text-xs font-mono text-slate-500">Oct 2025 – Nov 2025</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <li>Achieved a 100% execution pass rate across 50+ bytecode test suites by engineering a stack-based instruction set compiler in C0.</li>
                    <li>Eliminated runtime memory corruption and assertion faults by enforcing strict dynamic function contracts and safety preconditions.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Honors & Leadership */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">
                Honors & Leadership
              </h4>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <li><span className="font-semibold text-slate-900 dark:text-white">Tepper Hackathon (CMU Energy Week):</span> 3rd Place (March 2026) — Built quantitative model optimizing energy efficiency and business sustainability.</li>
                <li><span className="font-semibold text-slate-900 dark:text-white">USACO Platinum Division (2024):</span> Perfect score in Gold Division (Top ~300 nationally).</li>
                <li><span className="font-semibold text-slate-900 dark:text-white">USAMO Qualifier (2024):</span> AMC 12 top 1% nationwide; scored 11/15 on AIME.</li>
                <li><span className="font-semibold text-slate-900 dark:text-white">CMU ScottyLab Labrador Member:</span> September 2025 – Present.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
