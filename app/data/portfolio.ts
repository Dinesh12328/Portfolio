export type NavLink = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  role: string;
  summary: string;
  impact: string[];
  stack: string[];
  live: string;
  repo: string;
  icon: "briefcase" | "brain" | "route" | "box";
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
  icon: "server" | "layers" | "database" | "test";
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type Metric = {
  value: string;
  label: string;
};

export const navLinks: NavLink[] = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const heroStats: Metric[] = [
  { value: "4", label: "projects" },
  { value: "Java 17/21", label: "Spring stack" },
  { value: "JWT", label: "secure APIs" },
  { value: "Docker", label: "deployable builds" },
];

export const projects: Project[] = [
  {
    name: "WorkFlowPro",
    role: "Task and project management system",
    summary:
      "A Spring Boot workspace for projects, members, tasks, comments, attachments, notifications, and dashboard analytics.",
    impact: [
      "JWT-protected project and task APIs with owner/member access rules.",
      "Dashboard endpoints for status, priority, workload, overdue tasks, and unread notifications.",
      "Docker and Render-ready setup with H2 for local work and MySQL for hosted runs.",
    ],
    stack: ["Java 21", "Spring Boot", "JWT", "JPA", "MySQL", "Docker"],
    live: "https://workflowpro-9hi1.onrender.com",
    repo: "https://github.com/Dinesh12328/WorkFlowPro",
    icon: "briefcase",
  },
  {
    name: "ResumeFit AI",
    role: "Resume-to-job fit analysis platform",
    summary:
      "A secure backend product that uploads resume PDFs, extracts text, compares skills against job descriptions, saves reports, and exports PDF results.",
    impact: [
      "Multipart PDF ingestion with Apache PDFBox validation and text extraction.",
      "JWT-authenticated report history, detail, delete, and PDF download workflows.",
      "Pluggable analysis engine with deterministic local scoring and optional Spring AI integration.",
    ],
    stack: ["Java 21", "Spring Boot", "PDFBox", "Spring AI", "JWT", "MySQL"],
    live: "https://resumefit-ai-7xvk.onrender.com",
    repo: "https://github.com/Dinesh12328/ResumeFit-Ai",
    icon: "brain",
  },
  {
    name: "Event-Driven Order Delivery",
    role: "Restaurant order and delivery backend",
    summary:
      "A modular order-delivery system for restaurant browsing, order placement, payment simulation, delivery assignment, notifications, and admin monitoring.",
    impact: [
      "Kafka-ready domain events for orders, payments, delivery updates, notifications, retries, and DLT handling.",
      "Centralized order status policy blocks invalid lifecycle jumps and keeps state changes auditable.",
      "PostgreSQL persistence, Redis read caching, Swagger docs, and admin event visibility.",
    ],
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "Kafka", "Redis", "JWT"],
    live: "https://event-driven-order-delivery.onrender.com",
    repo: "https://github.com/Dinesh12328/-Event-Driven-Order-Delivery-System",
    icon: "route",
  },
  {
    name: "ShopEase Backend API",
    role: "E-commerce backend with integrated UI",
    summary:
      "A Spring Boot e-commerce application with products, categories, cart, orders, payments, admin management, Swagger documentation, and a browser UI.",
    impact: [
      "Layered REST APIs secured by JWT with USER and ADMIN authorization.",
      "Catalog search, cart quantity updates, checkout, order history, and admin order status updates.",
      "H2-first local development with optional MySQL, Docker Compose, and Render Blueprint deployment.",
    ],
    stack: ["Java 17", "Spring Security", "JPA", "Swagger", "H2", "Docker"],
    live: "https://shopease-backend-api.onrender.com",
    repo: "https://github.com/Dinesh12328/shopease-backend-api",
    icon: "box",
  },
];

export const aboutParagraphs = [
  "I am Dinesh Pyla, a Java Backend Developer focused on practical backend systems that are secure, scalable, and production-ready.",
  "My portfolio centers on Spring Boot APIs, authentication, persistence, service boundaries, and deployment discipline with Docker-friendly workflows.",
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend Core",
    description: "Designing secure, layered Spring services and API contracts.",
    icon: "server",
    skills: [
      "Java",
      "Spring Boot",
      "Spring Web",
      "REST APIs",
      "Spring Security",
      "JWT",
      "JPA",
      "Hibernate",
    ],
  },
  {
    title: "Distributed Systems",
    description: "Building resilient services with clear boundaries and events.",
    icon: "layers",
    skills: [
      "Microservices",
      "Spring Cloud Gateway",
      "Eureka",
      "Config Server",
      "OpenFeign",
      "Kafka",
      "Resilience4j",
      "Redis",
    ],
  },
  {
    title: "Data and Tools",
    description: "Choosing the right storage and shipping with deployment-ready setup.",
    icon: "database",
    skills: [
      "MySQL",
      "PostgreSQL",
      "H2",
      "Docker",
      "Docker Compose",
      "Maven",
      "Swagger",
      "Postman",
    ],
  },
  {
    title: "Quality Signals",
    description: "Prioritizing testability, reliability, and clear project delivery.",
    icon: "test",
    skills: [
      "JUnit",
      "MockMvc",
      "API tests",
      "Health checks",
      "Role-based access",
      "Deployment docs",
      "Git",
      "GitHub",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover the Problem",
    description:
      "Clarify domain rules, security boundaries, and data flows before implementation.",
  },
  {
    step: "02",
    title: "Design the Architecture",
    description:
      "Define API contracts, persistence strategy, and service responsibilities.",
  },
  {
    step: "03",
    title: "Build Secure APIs",
    description:
      "Implement Spring Boot services with JWT-authenticated, role-aware endpoints.",
  },
  {
    step: "04",
    title: "Test and Refine",
    description:
      "Validate critical workflows and harden behavior with focused backend checks.",
  },
  {
    step: "05",
    title: "Deploy and Observe",
    description:
      "Ship Docker-ready services with documentation and operational readiness.",
  },
];

export const metrics: Metric[] = [
  { value: "4+", label: "Featured backend projects" },
  { value: "Java 17/21", label: "Production-focused stack" },
  { value: "JWT-secured", label: "Authentication-first APIs" },
  { value: "Live links", label: "Real deployable demos" },
];

export const educationItems = [
  "B.Tech in Computer Science and Engineering, Centurion University of Technology and Management, Andhra Pradesh. Expected 2027.",
  "LeetCode practice in Java across arrays, two pointers, sorting, hash tables, binary search, and sliding window patterns.",
];

export const contactLinks = [
  {
    label: "Email",
    href: "mailto:pd1929350@gmail.com",
    icon: "mail" as const,
  },
  {
    label: "GitHub Profile",
    href: "https://github.com/Dinesh12328",
    icon: "github" as const,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dinesh-pyla-a64a45322/",
    icon: "linkedin" as const,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/pyladinesh_45",
    icon: "arrow" as const,
  },
];
