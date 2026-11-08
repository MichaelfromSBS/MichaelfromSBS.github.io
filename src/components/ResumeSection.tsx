import React from 'react';
import { FileText, Download, ExternalLink, Printer } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const ResumeSection: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
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
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Selected Coursework:</span> Computer Systems (15-213), Great Theoretical Ideas in CS (15-251), Functional Programming (15-150), Imperative Computation (15-122), Mathematical Foundations for CS (15-151), Matrices & Linear Transformations (21-241), Probability Theory (36-225), Concepts of Robotics (16-180).
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">
                Technical Skills
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <p><span className="font-semibold text-slate-900 dark:text-white">Languages:</span> Python, C, C++, TypeScript, JavaScript, SQL, Java, SML, Bash, x86-64 Assembly.</p>
                <p><span className="font-semibold text-slate-900 dark:text-white">ML & AI:</span> PyTorch, TensorFlow, CUDA, Scikit-Learn, NumPy, Pandas, OpenCV, RAG, LLM Agents, MCP.</p>
                <p><span className="font-semibold text-slate-900 dark:text-white">Systems & Backend:</span> FastAPI, React, React Native, Node.js, SQLite, Firebase, Docker, Git, Linux, GDB.</p>
                <p><span className="font-semibold text-slate-900 dark:text-white">Spoken Languages:</span> Native fluency in English and Mandarin Chinese.</p>
              </div>
            </div>

            {/* Research Experience */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">
                Research Experience
              </h4>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Carnegie Mellon University, VariAbility Lab</span>
                  <span className="text-xs font-mono text-slate-500">May 2026 – August 2026</span>
                </div>
                <div className="text-xs text-slate-500 italic mb-1">Undergraduate Research Apprentice (SURA) — Advised by Prof. Andrew Begel</div>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <li>Integrated the Model Context Protocol (MCP) into Jupyter server extensions to support local context awareness, streamlining developer workflows and reducing context-switching friction.</li>
                  <li>Maintained sub-100ms interface responsiveness by engineering custom JupyterLab UI components delivering real-time, non-intrusive emotional support tailored for neurodivergent developers.</li>
                  <li>Validated interaction flow and system efficacy by designing and conducting structured qualitative user studies with autistic software engineers, synthesizing key usability insights.</li>
                </ul>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">
                Projects
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">MarginGuard: AI Financial Watchdog (React, FastAPI, SQLite)</span>
                    <span className="text-xs font-mono text-slate-500">November 2026</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 mt-1">
                    <li>Cut manual financial reconciliation time by 90%+ by building an asynchronous FastAPI and SQLite ingestion pipeline that extracts and cross-verifies unstructured PDF supplier invoices and POS receipts in under 2s.</li>
                    <li>Enabled real-time dish margin tracking and 8-week demand forecasting across 100+ daily POS transactions by integrating weekday-baseline statistical models with a SQL-grounded LLM query agent via OpenRouter.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Viditas: Multimodal Deepfake Detection System</span>
                    <span className="text-xs font-mono text-slate-500">August 2026</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 mt-1">
                    <li>Accelerated deepfake classification throughput to 32+ FPS (&lt;31ms/frame) by developing an asynchronous FastAPI and PyTorch backend utilizing CUDA stream concurrency and pinned memory for parallel ingestion.</li>
                    <li>Improved multimodal anomaly detection F1-score by 15%+ across benchmark datasets while maintaining &lt;10ms audio-video alignment via a custom presentation-timestamp (PTS) ring buffer.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">ScottyTasks (React Native & Firebase)</span>
                    <span className="text-xs font-mono text-slate-500">January 2026 – Present</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 mt-1">
                    <li>Boosted recurring daily task completion by 35%+ among CMU student testers by engineering 5+ gamified habit-tracking workflows and interactive progress modules in React Native and Expo.</li>
                    <li>Decreased data sync latency to under 50ms across 100% of concurrent sessions by implementing real-time NoSQL state synchronization and user authentication via Google Firebase.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Leadership & Honors */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-3 border-b border-slate-200 dark:border-slate-800 pb-1">
                Leadership & Honors
              </h4>
              <div className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">CMU ScottyLab (Labrador)</span>
                  <span className="text-xs font-mono text-slate-500">September 2025 – Present</span>
                </div>
                <div className="text-xs text-slate-500 italic mb-1">Project Team Lead & Developer</div>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <li>Guide weekly technical discussions and architectural planning, facilitating cross-functional team ideation while translating high-level feature concepts into concrete implementation milestones.</li>
                  <li>Lead sprint planning and adapt project roadmaps in response to technical blockers and shifting scope, keeping teammates aligned on deliverables, code standards, and timeline milestones.</li>
                </ul>
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <li><span className="font-semibold text-slate-900 dark:text-white">CMU NOVA AI Hackathon:</span> Top 5 Team among People’s Choice (November 2026) – DoorDash Back of House Track (MarginGuard).</li>
                <li><span className="font-semibold text-slate-900 dark:text-white">Tepper Hackathon (CMU Energy Week):</span> 3rd Place (March 2026) – Developed a quantitative optimization model analyzing enterprise AI energy demand to improve operational sustainability.</li>
                <li><span className="font-semibold text-slate-900 dark:text-white">USACO Platinum Division (2024):</span> Perfect score in Gold Division (Top ~300 nationally).</li>
                <li><span className="font-semibold text-slate-900 dark:text-white">USAMO Qualifier (2024):</span> AMC 12 top 1% nationwide; scored 11/15 on AIME.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
