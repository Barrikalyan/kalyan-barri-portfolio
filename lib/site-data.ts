import { projectsAPI, skillsAPI, certificatesAPI } from "@/lib/api-client";
import type { Certificate, PersonalInfo, Project, Skill } from "@/lib/types";

export type PortfolioData = {
  personalInfo: PersonalInfo;
  projects: Project[];
  certificates: Certificate[];
  skills: Skill[];
};

const fallbackPersonalInfo: PersonalInfo = {
  _id: "fallback-personal-info",
  name: "KALYAN BARRI",
  role: "FULL STACK Developer",
  bio:
    "I build products at the intersection of AI, software engineering, and elegant product design. I focus on shipping polished experiences that feel fast, useful, and memorable.",
  email: "kalyanbarri4@gmail.com",
  phone: "+91 6302348336",
  image: {
    asset: {
      url: "./public/images/kalyan 1.jpeg",
    },
  },
  socialLinks: {
    github: "https://github.com/barrikalyan",
    linkedin: "https://linkedin.com/in/kalyan-barri",
    instagram: "https://instagram.com/kalyan__klm/",
  },
};

const fallbackProjects: Project[] = [
  {
  _id: "project-1",
  title: "RELIC RUSH",
  description:
    "A modern full-stack gaming platform built with the MERN stack, featuring immersive gameplay mechanics, responsive UI design, and smooth user interactions. Developed with TypeScript and Tailwind CSS to deliver high performance, scalability, and an engaging user experience across devices.",
  technologies: [
    "MongoDB",
    "Express.js",
    "React",
    "Node.js",
    "TypeScript",
    "Tailwind CSS",
  ],
  githubUrl: "https://github.com/Tejaraomutte/Relic-Rush.git",
  liveUrl: "https://relic-rush.vercel.app",
  featured: true,
  image: {
    asset: {
      url: "./public/images/relic.png",
    },
  },
},
 {
  _id: "project-2",
  title: "QUANTUM BLOCH SIMULATOR",
  description:
    "An interactive quantum computing simulator designed to visualize qubit states and Bloch Sphere transformations in real time. Built using Python, Flask, Qiskit, and Aer Simulator to simplify complex quantum computing concepts through dynamic simulations and intuitive visual representation.",
  technologies: [
    "Python",
    "Flask",
    "Qiskit",
    "Aer Simulator",
    "Quantum Computing",
    "HTML",
    "CSS",
    "JavaScript",
  ],
  githubUrl: "https://github.com/barrikalyan/Quantum-bloch-simulator.git",
  liveUrl: "https://Quantum-bloch-simulator.onrender.com/",
  featured: true,
  image: {
    asset: {
      url: "./public/images/quantum.png",
    },
  },
},
 {
    _id: "project-4",
    title: "Machine Learning Pipeline",
    description:
      "An end-to-end ML pipeline for data preprocessing, model training, and deployment. Features automated workflow orchestration, experiment tracking, and real-time monitoring of model performance.",
    technologies: ["Python", "TensorFlow", "FastAPI", "Docker", "PostgreSQL", "Kubernetes"],
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com/",
    featured: false,
    image: {
      asset: {
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      },
    },
  },
  {
    _id: "project-5",
    title: "Content Management System",
    description:
      "A modern headless CMS built with Sanity and Next.js. Features rich text editing, real-time collaboration, version control, and AI-powered content suggestions for blog management.",
    technologies: ["Next.js", "Sanity", "TypeScript", "Tailwind CSS", "React Query", "Vercel"],
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com/",
    featured: false,
    image: {
      asset: {
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      },
    },
  },
];

const fallbackCertificates: Certificate[] = [
  {
    _id: "certificate-1",
    title: "ARTIFICIAL INTELLIGENCE FUNDAMENTALS",
    issuer: "IBM",
    date: "2025",
    certificateUrl: "./public/certificates/ai fundamentals.jpeg",
    image: {
      asset: {
        url: "./public/certificates/ai fundamentals.jpeg",
      },
    },
  },
  {
    _id: "certificate-3",
    title: "Cyber Security Fundamentals",
    issuer: "Coursera ",
    date: "2025",
    certificateUrl: "./public/certificates/cyberfundamentals.jpeg",
    image: {
      asset: {
        url: "./public/certificates/cyberfundamentals.jpeg",
      },
    },
  },
  {
    _id: "certificate-3",
    title: "Ethical Hacking",
    issuer: "Infosys Springboard",
    date: "2025",
    certificateUrl: "./public/certificates/ethical hacking.jpeg",
    image: {
      asset: {
        url: "./public/certificates/ethical hacking.jpeg",
      },
    },
  },
  {
    _id: "certificate-4",
    title: "Python for Data Science",
    issuer: "IBM",
    date: "2024",
    certificateUrl: "./public/certificates/datascience.jpeg",
    image: {
      asset: {
        url: "./public/certificates/datascience.jpeg",
      },
    },
  },
  {
    _id: "certificate-5",
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2024",
    certificateUrl: "https://example.com/",
    image: {
      asset: {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      },
    },
  },
];

const fallbackSkills: Skill[] = [
  // Frontend
  { _id: "skill-1", category: "Frontend", name: "HTML", proficiency: 95 },
  { _id: "skill-2", category: "Frontend", name: "CSS", proficiency: 90 },
  { _id: "skill-3", category: "Frontend", name: "JavaScript", proficiency: 92 },
  { _id: "skill-4", category: "Frontend", name: "React", proficiency: 95 },
  { _id: "skill-5", category: "Frontend", name: "Tailwind CSS", proficiency: 95 },

  // Backend
  { _id: "skill-6", category: "Backend", name: "Python", proficiency: 88 },
  { _id: "skill-7", category: "Backend", name: "Java", proficiency: 85 },
  { _id: "skill-8", category: "Backend", name: "C", proficiency: 80 },
  { _id: "skill-9", category: "Backend", name: "C++", proficiency: 85 },
  { _id: "skill-10", category: "Backend", name: "Node.js", proficiency: 88 },
  { _id: "skill-11", category: "Backend", name: "Express.js", proficiency: 85 },
  { _id: "skill-12", category: "Backend", name: "Django/Flask", proficiency: 80 },
  { _id: "skill-13", category: "Backend", name: "API/REST", proficiency: 90 },
  
  // Database
  { _id: "skill-14", category: "Database", name: "MongoDB", proficiency: 85 },
  { _id: "skill-15", category: "Database", name: "MySQL", proficiency: 82 },

  // AI & Workflows
  { _id: "skill-16", category: "AI/ML", name: "Prompt Engineering", proficiency: 89 },
  { _id: "skill-17", category: "AI/ML", name: "AI Agents n8n Workflow", proficiency: 86 },

  // Tools
  { _id: "skill-18", category: "Tools", name: "Git", proficiency: 93 },
];

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const [projects, certificates, skills] = await Promise.all([
      projectsAPI.getAll().catch(() => null),
      certificatesAPI.getAll().catch(() => null),
      skillsAPI.getAll().catch(() => null),
    ]);

    const mergeRecords = <T extends { _id: string; _updatedAt?: string }>(
      fallback: T[],
      incoming: T[] | null,
    ) => {
      if (!incoming) {
        return fallback;
      }

      const incomingById = new Map(incoming.map((item) => [item._id, item] as const));
      const fallbackById = new Map(fallback.map((item) => [item._id, item] as const));
      const merged: T[] = [];

      fallback.forEach((fallbackItem) => {
        const liveItem = incomingById.get(fallbackItem._id);

        if (!liveItem) {
          merged.push(fallbackItem);
          return;
        }

        if (liveItem._updatedAt) {
          merged.push(liveItem);
          return;
        }

        merged.push({ ...liveItem, ...fallbackItem });
      });

      incoming.forEach((liveItem) => {
        if (!fallbackById.has(liveItem._id)) {
          merged.push(liveItem);
        }
      });

      return merged;
    };

    return {
      personalInfo: fallbackPersonalInfo,
      projects: mergeRecords(fallbackProjects, projects),
      certificates: mergeRecords(fallbackCertificates, certificates),
      skills: mergeRecords(fallbackSkills, skills),
    };
  } catch {
    return {
      personalInfo: fallbackPersonalInfo,
      projects: fallbackProjects,
      certificates: fallbackCertificates,
      skills: fallbackSkills,
    };
  }
}