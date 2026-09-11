import { PersonalInfo, EducationItem, SkillGroup, ResearchProject, ProjectItem, HonorItem, ExperienceItem } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Michael Liu",
  headline: "CS & Machine Learning @ Carnegie Mellon University",
  tagline: "Exploring the intersection of Human-AI Interaction, Multimodal Machine Learning, and Robust Systems.",
  bio: "I am a Computer Science undergraduate at Carnegie Mellon University concentrating in Machine Learning. My work spans neurodiversity-tailored developer tooling with MCP, high-throughput multimodal deepfake detection, and systems compilers. I am passionate about building intelligent, reliable, and human-centric software.",
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
      { code: "15-151", name: "Mathematical Foundations for Computer Science" },
      { code: "15-251", name: "Great Theoretical Ideas in Computer Science" },
      { code: "15-150", name: "Functional Programming" },
      { code: "15-122", name: "Imperative Computation" },
      { code: "21-241", name: "Matrices and Linear Transformations" },
      { code: "36-225", name: "Probability Theory" },
      { code: "16-180", name: "Concepts of Robotics" },
    ],
    honors: ["CMU ScottyLab Labrador Member", "Tepper Hackathon 3rd Place"]
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
    items: ["Python", "C", "C++", "Java", "SML", "C0", "JavaScript", "Node.js", "LaTeX"]
  },
  {
    category: "AI, ML & Data Science",
    iconName: "BrainCircuit",
    items: ["PyTorch", "TensorFlow", "Scikit-Learn", "FastAPI", "Pandas", "NumPy", "RAG", "MCP (Model Context Protocol)", "Jupyter"]
  },
  {
    category: "Systems & Infrastructure",
    iconName: "Cpu",
    items: ["Docker", "Git", "Google Firebase", "React Native", "Linux/Unix", "NoSQL Synchronization"]
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
      "Reduced developer context-switching friction by integrating the Model Context Protocol (MCP) into Jupyter server extensions for local context awareness.",
      "Maintained sub-100ms interface responsiveness by engineering custom JupyterLab UI components delivering real-time, non-intrusive emotional support tailored for neurodivergent developers.",
      "Validated interaction flow and system efficacy by designing and conducting structured user studies with autistic software engineers."
    ],
    tags: ["MCP", "JupyterLab", "Python", "HCI", "Neurodiversity", "User Studies"],
    posterUrl: "./Implementation Poster Design_v4.pdf",
    posterPreviewUrl: "./sura-poster.jpg",
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "sura-project",
    title: "SURA: Neurodiversity Wellbeing Project",
    subtitle: "Context-aware JupyterLab assistant for neurodivergent software engineers",
    period: "May 2026 – Aug 2026",
    category: "AI/ML",
    featured: true,
    highlights: [
      "Integrated Model Context Protocol (MCP) into JupyterLab server extensions to provide ambient context awareness.",
      "Engineered sub-100ms UI components delivering non-intrusive emotional support tailored for neurodivergent programmers.",
      "Conducted structured qualitative and quantitative user studies with autistic software engineers to validate usability."
    ],
    techStack: ["Python", "MCP", "JupyterLab", "TypeScript", "FastAPI"],
    posterUrl: "./Implementation Poster Design_v4.pdf",
    posterPreviewUrl: "./sura-poster.jpg",
  },
  {
    id: "viditas",
    title: "Viditas: Multimodal Deepfake Detection System",
    subtitle: "Real-time dual-stream audio & video AI anomaly classifier",
    period: "August 2026",
    category: "AI/ML",
    featured: true,
    highlights: [
      "Accelerated AI-generated media classification throughput to 30+ FPS by developing an asynchronous inference backend in FastAPI and PyTorch.",
      "Enhanced detection precision across benchmark datasets by building end-to-end pipelines processing parallel audio and video streams for real-time anomaly detection."
    ],
    techStack: ["PyTorch", "FastAPI", "Python", "Computer Vision", "Audio DSP", "Docker"],
    githubUrl: "https://github.com/MichaelfromSBS/viditas",
  },
  {
    id: "scotty-tasks",
    title: "ScottyTasks",
    subtitle: "Gamified task management ecosystem for the Carnegie Mellon community",
    period: "Jan 2026 – Present",
    category: "Web & Mobile",
    featured: true,
    highlights: [
      "Scaled task management tooling for the CMU community, integrating gamification elements to drive recurring daily active engagement.",
      "Decreased data sync latency to under 50ms by implementing real-time NoSQL synchronization and user authentication via Google Firebase."
    ],
    techStack: ["React Native", "Firebase", "NoSQL", "TypeScript", "Mobile UI"],
    githubUrl: "https://github.com/scottylabs-labrador/CMU-ScottyTasks",
  },
  {
    id: "c0-compiler",
    title: "Stack-Based Simple Compiler (C0)",
    subtitle: "Type-safe bytecode compiler with safety preconditions and memory contracts",
    period: "Oct 2025 – Nov 2025",
    category: "Systems",
    featured: false,
    highlights: [
      "Achieved a 100% execution pass rate across 50+ bytecode test suites by engineering a stack-based instruction set compiler in C0.",
      "Eliminated runtime memory corruption and assertion faults by enforcing strict dynamic function contracts and safety preconditions."
    ],
    techStack: ["C0", "C", "Compilers", "Bytecode", "Formal Verification"],
    githubUrl: "https://github.com/MichaelfromSBS",
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
    id: "tepper-hackathon",
    title: "3rd Place — Tepper Hackathon (CMU Energy Week)",
    organization: "Tepper School of Business, Carnegie Mellon University",
    period: "March 2026",
    description: "Built a quantitative optimization model maximizing industrial energy efficiency and long-term business sustainability under fluctuating grid conditions.",
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
    role: "Undergraduate Student Researcher (SURA)",
    organization: "VariAbility Lab / S3D, Carnegie Mellon University",
    location: "Pittsburgh, PA",
    period: "May 2026 – August 2026",
    points: [
      "Conducted HCI and AI systems research under Prof. Andrew Begel in the Software and Societal Systems Department.",
      "Integrated the Model Context Protocol (MCP) into JupyterLab to enable local context-aware neurodiversity assistance.",
      "Designed and ran formal user studies evaluating productivity and cognitive load with neurodivergent software engineers."
    ],
    tags: ["MCP", "Python", "HCI", "JupyterLab", "User Research"]
  },
  {
    id: "scottylab",
    role: "Labrador Member",
    organization: "CMU ScottyLab",
    location: "Pittsburgh, PA",
    period: "September 2025 – Present",
    points: [
      "Collaborate with CMU's premier student software and technology organization to develop applications serving thousands of students.",
      "Participate in product planning, code reviews, and architecture design for open-source campus services."
    ],
    tags: ["React Native", "Open Source", "TypeScript", "Campus Tech"]
  }
];
