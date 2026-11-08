import { PersonalInfo, EducationItem, SkillGroup, ResearchProject, ProjectItem, HonorItem, ExperienceItem } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Michael Liu",
  headline: "CS & Machine Learning @ Carnegie Mellon University",
  tagline: "Engineering reliable, rigorous systems integrated with advanced machine learning models and intelligent AI components.",
  bio: "I am a Computer Science undergraduate at Carnegie Mellon University concentrating in Machine Learning. My passion lies in building reliable, rigorous systems seamlessly integrated with advanced ML models and AI components. Outside of software and research, I love playing table tennis, badminton, and video games.",
  school: "Carnegie Mellon University",
  degree: "Bachelor of Science in Computer Science",
  concentration: "Machine Learning",
  graduationYear: "Expected May 2029",
  email: "mliu8@andrew.cmu.edu",
  phone: "(631) 901-3527",
  location: "Pittsburgh, PA",
  github: "https://github.com/MichaelfromSBS",
  linkedin: "https://linkedin.com/in/michael-liu2",
  resumeUrl: "#resume", // User can place a resume.pdf in public/
};

export const educationData: EducationItem[] = [
  {
    institution: "Carnegie Mellon University",
    location: "Pittsburgh, PA",
    degree: "Bachelor of Science in Computer Science",
    concentration: "Concentration in Machine Learning",
    period: "Expected May 2029",
    coursework: [
      { code: "15-213", name: "Computer Systems" },
      { code: "15-251", name: "Great Theoretical Ideas in Computer Science" },
      { code: "15-150", name: "Functional Programming" },
      { code: "15-122", name: "Imperative Computation" },
      { code: "15-151", name: "Mathematical Foundations for Computer Science" },
      { code: "21-241", name: "Matrices and Linear Transformations" },
      { code: "36-225", name: "Probability Theory" },
      { code: "16-180", name: "Concepts of Robotics" },
    ],
    honors: ["CMU NOVA AI Hackathon Top 5 (People's Choice)", "Tepper Hackathon 3rd Place", "CMU ScottyLab Project Team Lead"]
  },
  {
    institution: "The Stony Brook School",
    location: "Stony Brook, NY",
    degree: "High School Diploma",
    period: "Graduated June 2025",
    honors: ["USACO Platinum Division (Perfect score in Gold)", "USAMO Qualifier (AMC 12 Top 1%)"]
  }
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Programming Languages",
    iconName: "Code2",
    items: ["Python", "C", "C++", "TypeScript", "JavaScript", "SQL", "Java", "SML", "Bash", "x86-64 Assembly"]
  },
  {
    category: "AI, ML & Data Science",
    iconName: "BrainCircuit",
    items: ["PyTorch", "TensorFlow", "CUDA", "Scikit-Learn", "NumPy", "Pandas", "OpenCV", "RAG", "LLM Agents", "MCP (Model Context Protocol)"]
  },
  {
    category: "Systems & Backend",
    iconName: "Cpu",
    items: ["FastAPI", "React", "React Native", "Node.js", "SQLite", "Firebase", "Docker", "Git", "Linux", "GDB"]
  },
  {
    category: "Spoken Languages & Communication",
    iconName: "Languages",
    items: ["English (Native fluency)", "Mandarin Chinese (Native fluency)"]
  }
];

export const researchProjects: ResearchProject[] = [
  {
    id: "sura-neurodiversity",
    title: "SURA: Neurodiversity Wellbeing Project",
    lab: "VariAbility Lab / S3D (Software and Societal Systems)",
    advisor: "Prof. Andrew Begel",
    period: "May 2026 – August 2026",
    summary: "Integrated Model Context Protocol (MCP) into JupyterLab server extensions to provide real-time, non-intrusive emotional and cognitive support tailored for neurodivergent developers.",
    highlights: [
      "Integrated the Model Context Protocol (MCP) into Jupyter server extensions to support local context awareness, streamlining developer workflows and reducing context-switching friction.",
      "Maintained sub-100ms interface responsiveness by engineering custom JupyterLab UI components delivering real-time, non-intrusive emotional support tailored for neurodivergent developers.",
      "Validated interaction flow and system efficacy by designing and conducting structured qualitative user studies with autistic software engineers, synthesizing key usability insights."
    ],
    tags: ["MCP", "JupyterLab", "Python", "HCI", "Neurodiversity", "User Studies"],
    posterUrl: "./Implementation Poster Design_v4.pdf",
    posterPreviewUrl: "./sura-poster.jpg",
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "marginguard",
    title: "MarginGuard: AI Financial Watchdog",
    subtitle: "Automated restaurant invoice reconciliation, adaptive forecasting, evidence-linked alerts & grounded chat (NOVA 2026 People's Choice Top 5)",
    period: "November 2026",
    category: "AI/ML",
    featured: true,
    highlights: [
      "Cut manual financial reconciliation time by 90%+ by building an asynchronous FastAPI and SQLite ingestion pipeline that extracts and cross-verifies unstructured PDF supplier invoices and POS receipts in under 2s.",
      "Enabled real-time dish margin tracking and 8-week adaptive demand forecasting across 100+ daily POS transactions by integrating weekday-baseline statistical models with evidence-linked anomaly alerts.",
      "Engineered a SQL-grounded LLM query agent via OpenRouter for natural-language financial auditing and grounded chat, earning Top 5 among People's Choice in the DoorDash Back of House Track at the CMU NOVA AI Hackathon."
    ],
    techStack: ["React", "FastAPI", "SQLite", "Python", "TypeScript", "LLM Agents", "OpenRouter", "SQL"],
    githubUrl: "https://github.com/MichaelfromSBS/MarginGuard",
  },
  {
    id: "sura-project",
    title: "SURA: Neurodiversity Wellbeing Project",
    subtitle: "Context-aware JupyterLab assistant for neurodivergent software engineers",
    period: "May 2026 – Aug 2026",
    category: "AI/ML",
    featured: true,
    highlights: [
      "Integrated the Model Context Protocol (MCP) into Jupyter server extensions to support local context awareness, streamlining developer workflows and reducing context-switching friction.",
      "Maintained sub-100ms interface responsiveness by engineering custom JupyterLab UI components delivering real-time, non-intrusive emotional support tailored for neurodivergent developers.",
      "Validated interaction flow and system efficacy by designing and conducting structured qualitative user studies with autistic software engineers, synthesizing key usability insights."
    ],
    techStack: ["Python", "MCP", "JupyterLab", "TypeScript", "FastAPI"],
    posterUrl: "./Implementation Poster Design_v4.pdf",
    posterPreviewUrl: "./sura-poster.jpg",
  },
  {
    id: "viditas",
    title: "Viditas: Multimodal Deepfake Detection System",
    subtitle: "High-throughput CUDA-accelerated dual-stream audio & video AI anomaly classifier",
    period: "August 2026",
    category: "AI/ML",
    featured: true,
    highlights: [
      "Accelerated deepfake classification throughput to 32+ FPS (<31ms/frame) by developing an asynchronous FastAPI and PyTorch backend utilizing CUDA stream concurrency and pinned memory for parallel ingestion.",
      "Improved multimodal anomaly detection F1-score by 15%+ across benchmark datasets while maintaining <10ms audio-video alignment via a custom presentation-timestamp (PTS) ring buffer."
    ],
    techStack: ["PyTorch", "CUDA", "FastAPI", "Python", "OpenCV", "Audio DSP", "Docker"],
    githubUrl: "https://github.com/MichaelfromSBS/viditas",
  },
  {
    id: "scotty-tasks",
    title: "ScottyTasks",
    subtitle: "Gamified habit-tracking and task management ecosystem for the Carnegie Mellon community",
    period: "Jan 2026 – Present",
    category: "Web & Mobile",
    featured: true,
    highlights: [
      "Boosted recurring daily task completion by 35%+ among CMU student testers by engineering 5+ gamified habit-tracking workflows and interactive progress modules in React Native and Expo.",
      "Decreased data sync latency to under 50ms across 100% of concurrent sessions by implementing real-time NoSQL state synchronization and user authentication via Google Firebase."
    ],
    techStack: ["React Native", "Expo", "Firebase", "NoSQL", "TypeScript", "Mobile UI"],
    githubUrl: "https://github.com/scottylabs-labrador/CMU-ScottyTasks",
  },
  {
    id: "robot-tour",
    title: "Autonomous Robot Tour",
    subtitle: "Closed-loop navigation and trajectory-tracking hardware robotics",
    period: "2024 – 2025",
    category: "Robotics",
    featured: false,
    highlights: [
      "Placed 2nd (2024) and 3rd (2025) out of 20+ teams at Regionals by programming autonomous navigation algorithms and closed-loop hardware controls.",
      "Calibrated trajectory-tracking logic to rank among top competing teams at the prestigious Yale Invitational 2025."
    ],
    techStack: ["C++", "Robotics Controls", "PID", "Hardware Sensors", "Autonomous Navigation"],
    githubUrl: "https://github.com/MichaelfromSBS",
  }
];

export const honorsData: HonorItem[] = [
  {
    id: "nova-hackathon",
    title: "People's Choice Top 5 — CMU NOVA AI Hackathon",
    organization: "Carnegie Mellon University (DoorDash Back of House Track)",
    period: "November 2026",
    description: "Recognized as a Top 5 Team among People's Choice in the DoorDash Back of House Track for engineering MarginGuard, an AI restaurant financial watchdog.",
    highlightRank: "Top 5 People's Choice"
  },
  {
    id: "tepper-hackathon",
    title: "3rd Place — Tepper Hackathon (CMU Energy Week)",
    organization: "Tepper School of Business, Carnegie Mellon University",
    period: "March 2026",
    description: "Developed a quantitative optimization model analyzing enterprise AI energy demand to improve operational sustainability.",
    highlightRank: "3rd Place / Finalist"
  },
  {
    id: "usaco-platinum",
    title: "USACO Platinum Division",
    organization: "USA Computing Olympiad",
    period: "2024",
    description: "Achieved a perfect score in the Gold Division to qualify for the Platinum Division (Top ~300 competitive programmers nationwide).",
    highlightRank: "Top ~300 Nationally"
  },
  {
    id: "usamo-qualifier",
    title: "USAMO Qualifier",
    organization: "Mathematical Association of America (MAA)",
    period: "2024",
    description: "Ranked in the top 1% nationwide on AMC 12 and scored 11/15 on the American Invitational Mathematics Examination (AIME).",
    highlightRank: "Top 1% Nationwide"
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "sura-variability",
    role: "Undergraduate Research Apprentice (SURA)",
    organization: "VariAbility Lab / S3D, Carnegie Mellon University",
    location: "Pittsburgh, PA",
    period: "May 2026 – August 2026",
    points: [
      "Integrated the Model Context Protocol (MCP) into Jupyter server extensions to support local context awareness, streamlining developer workflows and reducing context-switching friction.",
      "Maintained sub-100ms interface responsiveness by engineering custom JupyterLab UI components delivering real-time, non-intrusive emotional support tailored for neurodivergent developers.",
      "Validated interaction flow and system efficacy by designing and conducting structured qualitative user studies with autistic software engineers, synthesizing key usability insights."
    ],
    tags: ["MCP", "Python", "HCI", "JupyterLab", "User Research"]
  },
  {
    id: "scottylab",
    role: "Project Team Lead & Developer",
    organization: "CMU ScottyLab (Labrador)",
    location: "Pittsburgh, PA",
    period: "September 2025 – Present",
    points: [
      "Guide weekly technical discussions and architectural planning, facilitating cross-functional team ideation while translating high-level feature concepts into concrete implementation milestones.",
      "Lead sprint planning and adapt project roadmaps in response to technical blockers and shifting scope, keeping teammates aligned on deliverables, code standards, and timeline milestones."
    ],
    tags: ["Project Leadership", "React Native", "TypeScript", "System Architecture"]
  }
];
