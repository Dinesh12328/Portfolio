import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BadgeCheck,
  Box,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  ContactRound,
  Database,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Layers3,
  Mail,
  Route,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  TestTube2,
} from "lucide-react";
import { BackendOrbitScene } from "./components/BackendOrbitScene";

type Project = {
  name: string;
  role: string;
  summary: string;
  impact: string[];
  stack: string[];
  live: string;
  repo: string;
  icon: LucideIcon;
};

const projects: Project[] = [
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
    icon: BriefcaseBusiness,
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
    icon: BrainCircuit,
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
    icon: Route,
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
    icon: Box,
  },
];

const skillGroups = [
  {
    title: "Backend Core",
    icon: ServerCog,
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
    icon: Layers3,
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
    icon: Database,
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
    icon: TestTube2,
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

const highlightItems = [
  {
    title: "API Development",
    text: "I build Spring Boot APIs with authentication, role-based flows, layered services, persistence, documentation, and deployable project structure.",
    icon: BadgeCheck,
  },
  {
    title: "Service Architecture",
    text: "I work with microservices, gateway routing, service discovery, event-driven order flows, Redis caching, and clean lifecycle rules.",
    icon: ShieldCheck,
  },
  {
    title: "Delivery Mindset",
    text: "I care about setup clarity, API documentation, security decisions, Docker support, testable flows, and maintainable backend code.",
    icon: Sparkles,
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <BackendOrbitScene />
        <div className="hero-shell">
          <nav className="nav" aria-label="Primary navigation">
            <a className="brand" href="#home" aria-label="Dinesh Pyla home">
              <span>DP</span>
              <strong>Dinesh Pyla</strong>
            </a>
            <div className="nav-links">
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#highlights">Highlights</a>
              <a href="#contact">Contact</a>
            </div>
          </nav>

          <div className="hero-content">
            <div className="eyebrow">
              <TerminalSquare aria-hidden="true" size={18} />
              Java Backend Developer
            </div>
            <h1 id="hero-title">Dinesh Pyla</h1>
            <p className="hero-copy">
              Java backend developer working with Spring Boot, REST APIs, JWT
              security, persistence, microservices, event-driven workflows,
              Docker, and production-minded project structure.
            </p>

            <div className="hero-actions" aria-label="Primary links">
              <a className="button primary" href="#projects">
                <Code2 aria-hidden="true" size={18} />
                View Case Studies
              </a>
              <a
                className="button secondary"
                href="https://github.com/Dinesh12328"
                target="_blank"
                rel="noreferrer"
              >
                <GitBranch aria-hidden="true" size={18} />
                GitHub
              </a>
              <a
                className="button secondary"
                href="https://www.linkedin.com/in/dinesh-pyla-a64a45322/"
                target="_blank"
                rel="noreferrer"
              >
                <ContactRound aria-hidden="true" size={18} />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="hero-proof" aria-label="Profile proof points">
            <div>
              <strong>4</strong>
              <span>projects</span>
            </div>
            <div>
              <strong>Java 17/21</strong>
              <span>Spring stack</span>
            </div>
            <div>
              <strong>JWT</strong>
              <span>secure APIs</span>
            </div>
            <div>
              <strong>Docker</strong>
              <span>deployable builds</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section intro-band" aria-label="Profile summary">
        <div className="section-grid two-column">
          <div>
            <p className="section-kicker">Profile</p>
            <h2>Java, Spring Boot, APIs, and backend systems.</h2>
          </div>
          <p className="lead">
            I focus on Java backend development with Spring Boot, REST API
            design, authentication, persistence, microservices, and deployment.
            My projects are practical backend builds with live links, source
            repositories, and clear implementation details.
          </p>
        </div>
      </section>

      <section className="section" id="projects" aria-labelledby="projects-title">
        <div className="section-heading">
          <p className="section-kicker">Projects</p>
          <h2 id="projects-title">Spring Boot projects with live demos.</h2>
          <p>
            Render demos can take a cold-start moment, but each card includes
            the live project and the GitHub repository.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => {
            const Icon = project.icon;

            return (
              <article className="project-card" key={project.name}>
                <div className="project-topline">
                  <span className="project-icon">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.role}</p>
                  </div>
                </div>
                <p className="project-summary">{project.summary}</p>
                <ul className="impact-list">
                  {project.impact.map((item) => (
                    <li key={item}>
                      <CheckCircle2 aria-hidden="true" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="stack-list" aria-label={`${project.name} stack`}>
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <a
                    className="button small primary"
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink aria-hidden="true" size={16} />
                    Live Demo
                  </a>
                  <a
                    className="button small secondary"
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitBranch aria-hidden="true" size={16} />
                    Source
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section systems-band" aria-labelledby="systems-title">
        <div className="section-heading compact">
          <p className="section-kicker">Backend Work</p>
          <h2 id="systems-title">The areas I keep improving.</h2>
        </div>
        <div className="signal-grid">
          <div className="signal-item">
            <ShieldCheck aria-hidden="true" size={24} />
            <h3>Security</h3>
            <p>
              JWT flows, Spring Security filters, role-based access, ownership
              checks, and protected API surfaces.
            </p>
          </div>
          <div className="signal-item">
            <Layers3 aria-hidden="true" size={24} />
            <h3>Services</h3>
            <p>
              Gateway routing, service discovery, config server, Feign service
              calls, and resilience patterns.
            </p>
          </div>
          <div className="signal-item">
            <Database aria-hidden="true" size={24} />
            <h3>Persistence</h3>
            <p>
              JPA entities, relational models, H2 development mode, MySQL and
              PostgreSQL deployment paths.
            </p>
          </div>
          <div className="signal-item">
            <Route aria-hidden="true" size={24} />
            <h3>Events</h3>
            <p>
              Kafka-ready order, payment, delivery, notification, retry, and
              audit event flows.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="skills" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="section-kicker">Technical Stack</p>
          <h2 id="skills-title">Java backend stack.</h2>
          <p>
            Technologies I use across Java backend, API, and Spring Boot
            development.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <article className="skill-card" key={group.title}>
                <div className="skill-title">
                  <Icon aria-hidden="true" size={22} />
                  <h3>{group.title}</h3>
                </div>
                <div className="stack-list">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="section highlight-band"
        id="highlights"
        aria-labelledby="highlights-title"
      >
        <div className="section-heading">
          <p className="section-kicker">How I Work</p>
          <h2 id="highlights-title">Practical backend habits.</h2>
          <p>
            I keep my backend projects focused on clear API design, secure
            flows, persistence, service boundaries, deployment readiness, and
            maintainable project structure.
          </p>
        </div>
        <div className="highlight-grid">
          {highlightItems.map((item) => {
            const Icon = item.icon;
            return (
              <article className="highlight-card" key={item.title}>
                <Icon aria-hidden="true" size={24} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section education-band" aria-labelledby="education-title">
        <div className="section-grid two-column">
          <div>
            <p className="section-kicker">Education and Practice</p>
            <h2 id="education-title">
              Computer Science foundation plus DSA habit.
            </h2>
          </div>
          <div className="education-list">
            <div>
              <GraduationCap aria-hidden="true" size={22} />
              <p>
                B.Tech in Computer Science and Engineering, Centurion
                University of Technology and Management, Andhra Pradesh.
                Expected 2027.
              </p>
            </div>
            <div>
              <Code2 aria-hidden="true" size={22} />
              <p>
                LeetCode practice in Java across arrays, two pointers, sorting,
                hash tables, binary search, and sliding window patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="contact-panel">
          <div>
            <p className="section-kicker">Contact</p>
            <h2 id="contact-title">Let&apos;s connect.</h2>
            <p>
              Reach me by email, GitHub, LinkedIn, or LeetCode. The project
              links above include live demos and source repositories.
            </p>
          </div>
          <div className="contact-actions">
            <a className="button primary" href="mailto:pd1929350@gmail.com">
              <Mail aria-hidden="true" size={18} />
              Email
            </a>
            <a
              className="button secondary"
              href="https://github.com/Dinesh12328"
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch aria-hidden="true" size={18} />
              GitHub Profile
            </a>
            <a
              className="button secondary"
              href="https://leetcode.com/u/pyladinesh_45"
              target="_blank"
              rel="noreferrer"
            >
              <ArrowUpRight aria-hidden="true" size={18} />
              LeetCode
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
