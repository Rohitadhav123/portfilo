export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tech: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  visualType: "healthcare" | "invohydra" | "lms" | "recipe";
  accentColor: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  period: string;
  role: string;
  projects?: {
    name: string;
    period: string;
    tech: string[];
    description: string;
    responsibilities: string[];
  }[];
  tech?: string[];
  responsibilities?: string[];
}

export interface TechCategory {
  title: string;
  items: { name: string; iconName?: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const PERSONAL_INFO = {
  name: "ROHIT ADHAV",
  firstName: "ROHIT",
  lastName: "ADHAV",
  role: "Full-Stack Web Developer",
  tagline:
    "Building scalable digital products with Next.js, React, Node.js and modern backend architecture.",
  about:
    "Full-Stack Web Developer with 11 months of internship experience delivering 3+ production-ready platforms across healthcare, billing, and sales-tech.",
  techBadges: [
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "Nest.js",
    "PostgreSQL",
    "MongoDB",
    "REST APIs",
    "Microservices",
    "AWS",
    "Docker",
    "Kubernetes",
  ],
  contact: {
    headline: "Let's build something that feels different.",
    subtext:
      "Open to full-stack development opportunities, interesting products and challenging engineering problems.",
    email: "adhavrohit37@gmail.com",
    phone: "95293-85906",
    linkedin: "https://www.linkedin.com/in/rohit-adhav-926a4b291",
    github: "https://github.com/Rohitadhav123",
  },
  education: {
    institution: "Trinity Academy of Engineering, Pune, Maharashtra",
    degree: "B.E. in Computer Engineering",
    year: "2026",
    cgpa: "8.94",
  },
};

export const PROJECTS: Project[] = [
  {
    id: "hybrid-healthcare",
    title: "HYBRID HEALTHCARE SYSTEM",
    subtitle: "Flagship Healthcare & Telemedicine Ecosystem",
    category: "Full-Stack / Healthcare Tech",
    description:
      "An enterprise-grade hybrid healthcare platform integrating FHIR standards and NAMASTE-to-ICD medical code mapping with real-time multi-role workflows.",
    tech: ["Next.js", "MongoDB", "Node.js", "ShadCN", "FHIR", "Razorpay"],
    highlights: [
      "Multi-role dashboards (doctor, admin, patient)",
      "Telemedicine & emergency alert system",
      "Multi-hospital support & analytics dashboards",
      "NAMASTE code mapping to ICD codes & FHIR standards",
      "Secure scalable microservices architecture",
    ],
    liveUrl: "https://hybrid-approach-for-healthcare.vercel.app/",
    visualType: "healthcare",
    accentColor: "#22D3EE",
  },
  {
    id: "invohydra",
    title: "INVOHYDRA",
    subtitle: "SaaS GST Billing & Invoicing Suite",
    category: "Full-Stack / SaaS Billing",
    description:
      "GST-compliant automated billing and invoicing platform engineered for seamless customer management, inventory reporting, and payment workflows.",
    tech: [
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Cashfree",
      "Tailwind CSS",
      "ShadCN UI",
    ],
    highlights: [
      "GST-compliant invoicing & billing workflows",
      "Comprehensive customer & product management",
      "Automated financial reports & payment gateway integration",
      "Architected with scalable full-stack system patterns",
    ],
    visualType: "invohydra",
    accentColor: "#8B5CF6",
  },
  {
    id: "lupira-lms",
    title: "LUPIRA LMS",
    subtitle: "Enterprise Learning & Lead Management Platform",
    category: "Full-Stack / EdTech & Sales-Tech",
    description:
      "Integrated Learning Management System designed to handle client data pipelines, dynamic course content delivery, and sales lead conversion workflows.",
    tech: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    highlights: [
      "Lead management & client communication workflows",
      "Interactive LMS dashboards with role-based access",
      "High-throughput RESTful backend APIs and database logic",
    ],
    visualType: "lms",
    accentColor: "#EC4899",
  },
  {
    id: "recipe-sharing",
    title: "RECIPE SHARING PLATFORM",
    subtitle: "Community Driven Culinary Feed & Authoring Suite",
    category: "Full-Stack / Social Web App",
    description:
      "Interactive recipe creation and social discovery application with real-time searching, category filtering, image uploads, and secure authentication.",
    tech: ["React.js", "MongoDB", "Node.js", "Express.js"],
    highlights: [
      "Secure JWT authentication system",
      "Create, edit, and share recipe posts with image uploads",
      "Dynamic recipe feed with real-time search & filters",
    ],
    visualType: "recipe",
    accentColor: "#F59E0B",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "lupira-internship",
    company: "Lupira",
    period: "August 2025 — August 2026",
    role: "Intern, Full Stack Developer and Team Lead",
    projects: [
      {
        name: "InvoHydra",
        period: "January 2026 — August 2026",
        tech: [
          "Next.js",
          "React.js",
          "Node.js",
          "Express.js",
          "PostgreSQL",
          "Cashfree Payment Gateway",
          "Tailwind CSS",
          "ShadCN UI",
        ],
        description:
          "GST-compliant billing and invoicing platform for managing customers, products and reports.",
        responsibilities: [
          "Led a team to build InvoHydra from the ground up",
          "Architected a scalable full-stack system",
          "Developed secure RESTful APIs",
          "Built GST-compliant invoicing and reporting modules",
          "Mentored team members and conducted code reviews",
          "Coordinated with cross-functional teams",
        ],
      },
      {
        name: "Lupira Website + LMS",
        period: "August 2025 — January 2026",
        tech: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
        description:
          "Enterprise Web Platform and Learning Management System with automated lead pipelines.",
        responsibilities: [
          "Developed responsive UI components",
          "Built LMS dashboards",
          "Developed backend APIs",
          "Worked with database logic",
          "Handled client data, leads and communication workflows",
        ],
      },
    ],
  },
];

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: "Languages",
    items: [
      { name: "C++" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML" },
      { name: "CSS3" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Redux" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
      { name: "MUI" },
      { name: "ShadCN" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "RESTful APIs" },
      { name: "Microservices Architecture" },
    ],
  },
  {
    title: "Database",
    items: [{ name: "MongoDB" }, { name: "PostgreSQL" }, { name: "MySQL" }],
  },
  {
    title: "DevOps",
    items: [
      { name: "AWS" },
      { name: "EC2" },
      { name: "S3" },
      { name: "Lambda" },
      { name: "Amplify" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "CI/CD" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Postman" },
      { name: "Swagger" },
      { name: "Linux" },
      { name: "Slack" },
    ],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "globathon",
    title: "Globathon Hackathon",
    subtitle: "Finalist",
    description: "Organized by Globatech. Competed against 118 teams.",
  },
  {
    id: "avishkar",
    title: "Avishkar Research Competition",
    subtitle: "University Level Qualifier",
    description:
      "Qualified from Zonal Round to University Level representing college.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Understand",
    description:
      "Deep dive into user requirements, domain logic, and system goals to build clarity.",
  },
  {
    step: "02",
    title: "Architect",
    description:
      "Design resilient schema, clean APIs, and scalable modular component architectures.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Develop robust full-stack software using modern frameworks, strict typing, and clean code.",
  },
  {
    step: "04",
    title: "Test",
    description:
      "Rigorously validate endpoints, component states, edge cases, and performance criteria.",
  },
  {
    step: "05",
    title: "Deploy",
    description:
      "Automate CI/CD, deploy to reliable cloud infrastructure, and monitor for high availability.",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
