# Michael Liu — Personal Tech Portfolio & Research Website

A modern, responsive personal tech portfolio built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**, optimized for seamless deployment to **GitHub Pages**.

---

## ⚡ Quick Start

### 1. Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```
Generates production-ready static assets in the `dist/` folder.

---

## 📁 How to Update Content Along the Way

All website content is driven by a single data file:
📂 **[`src/data/portfolioData.ts`](./src/data/portfolioData.ts)**

Whenever you want to add new projects, research, skills, or honors, you only need to edit this file!

### 1. Supplying Resume PDF
- Place your PDF file in the `public/` directory and name it **`resume.pdf`** (`public/resume.pdf`).
- The "Download PDF" button will immediately serve your resume.

### 2. Adding a New Project
In `src/data/portfolioData.ts`, add an object to `projectsData`:
```typescript
{
  id: "my-new-project",
  title: "Project Name",
  subtitle: "One-line descriptive summary",
  period: "Fall 2026",
  category: "AI/ML", // Options: 'AI/ML' | 'Systems' | 'Web & Mobile' | 'Robotics'
  featured: true,
  highlights: [
    "Quantifiable achievement or engineering contribution #1.",
    "Quantifiable achievement or engineering contribution #2."
  ],
  techStack: ["PyTorch", "FastAPI", "React", "Docker"],
  githubUrl: "https://github.com/MichaelfromSBS/my-repo",
  liveUrl: "https://my-demo-url.com", // optional
}
```

### 3. Adding Research Papers or Lab Updates
In `src/data/portfolioData.ts`, update `researchProjects`:
```typescript
{
  id: "new-paper",
  title: "Title of Paper or Project",
  lab: "VariAbility Lab / S3D",
  advisor: "Prof. Andrew Begel",
  period: "2026",
  summary: "High-level overview of the research.",
  highlights: [
    "Key finding or system contribution."
  ],
  tags: ["MCP", "HCI", "Accessibility"],
  paperUrl: "https://arxiv.org/abs/...", // optional link to preprint/paper
  codeUrl: "https://github.com/MichaelfromSBS/...", // optional link
}
```

### 4. Updating Skills or Coursework
- In `src/data/portfolioData.ts`, edit `skillGroups` to add/remove programming languages, frameworks, or tools.
- In `educationData`, append newly completed CMU courses (e.g. 15-213, 15-451, 10-315, etc.).

---

## 🚀 How to Launch on GitHub Pages

### Option A: User/Organization Site (`MichaelfromSBS.github.io`)
1. Create a repository on GitHub named **`MichaelfromSBS.github.io`**.
2. Push this codebase to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of personal website"
   git branch -M main
   git remote add origin https://github.com/MichaelfromSBS/MichaelfromSBS.github.io.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The included `.github/workflows/deploy.yml` workflow will automatically build and deploy the site to `https://MichaelfromSBS.github.io/`.

### Option B: Project Repository (e.g. `personal-website` or `portfolio`)
1. Create a repository named `personal-website` on GitHub.
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of personal website"
   git branch -M main
   git remote add origin https://github.com/MichaelfromSBS/personal-website.git
   git push -u origin main
   ```
3. In GitHub Settings > Pages, select **GitHub Actions**.
4. The site will be live at `https://MichaelfromSBS.github.io/personal-website/`!

---

## 🎨 Features & Highlights
- **Dark / Light Mode Toggle**: Seamless theme switching persisted in `localStorage`.
- **Category Filterable Projects**: Filter projects by AI/ML, Systems, Web & Mobile, and Robotics.
- **Academic & Lab Spotlight**: Dedicated section for SURA & VariAbility Lab research.
- **Interactive Resume Card**: In-browser scan-friendly resume card + PDF download.
- **Direct Contact System**: One-click email clipboard copy with visual feedback + direct mail link.
