import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  ArrowDown,
  Asterisk,
  Plus,
  Minus,
  X,
  Github,
  Linkedin,
  FileDown,
  Check,
  Copy,
  Code2,
  Braces,
  Sparkles,
  Pause,
  Play,
} from "lucide-react";
import ProjectVisual from "./components/ProjectVisual";
import { profile, projects, skills } from "./content";

import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import usePortfolioMotion from "./hooks/usePortfolioMotion";
import "./premium.css";

function SectionLabel({ number, children, light = false }) {
  return (
    <div className={`section-label mono ${light ? "label-light" : ""}`}>
      <span className="label-dot" />
      <span>{children}</span>
      <span className="label-number">/{number}</span>
    </div>
  );
}

function Brand({ footer = false }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#home"
      aria-label="Pranav Shinde, back to top"
    >
      <span className="brand-symbol">
        p<span>/</span>s<span className="brand-dot">.</span>
      </span>
      <span className="brand-name">
        PRANAV
        <br />
        SHINDE
      </span>
    </a>
  );
}

function Hero({ onProject }) {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-topline mono">
        <span>
          <span className="live-dot" /> INTELLIGENCE MEETS INTENTION
        </span>
        <span className="hero-edition">PERSONAL PORTFOLIO — VOL. 01</span>
      </div>
      <div className="hero-main">
        <h1 className="hero-title" id="hero-title" aria-label="Pranav Shinde.">
          <span className="title-line">
            <span>PRANAV</span>
          </span>
          <span className="title-line second-line">
            <span>
              SHINDE<span className="title-period">.</span>
            </span>
          </span>
        </h1>
        <div
          className="hero-cards hero-cards-single"
          aria-label="Explore ScamShield AI"
        >
          {projects.map((project, i) => (
            <div
              className={`hero-card-slot hero-card-slot-${i + 1}`}
              key={project.id}
            >
              <div className="hero-card-entry">
                <div className="hero-card-motion">
                  <button
                    type="button"
                    className={`floating-card floating-card-${i + 1}`}
                    onClick={(event) => onProject(project, event.currentTarget)}
                    aria-label={`Explore ${project.title}`}
                  >
                    <div className="floating-card-bar">
                      <span className="window-dots">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="mono">{project.title}</span>
                      <ArrowUpRight size={12} />
                    </div>
                    <div className="floating-card-visual">
                      <ProjectVisual type={project.id} compact />
                    </div>
                    <span className="floating-card-foot mono">
                      <span>CONCEPT INTERFACE</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          <span className="card-annotation mono">
            A FEW THINGS
            <br />
            I’M BUILDING.
            <svg viewBox="0 0 64 45" fill="none" aria-hidden="true">
              <path
                d="M4 5c5 31 31 35 52 21m-13-1 14 1-6 12"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </span>
        </div>
        <Asterisk
          className="hero-asterisk"
          aria-hidden="true"
          strokeWidth={1.3}
        />
      </div>
      <div className="hero-bottom">
        <div className="hero-intro">
          <p className="hero-role mono">AI & DATA SCIENCE DEVELOPER</p>
          <p>
            I build intelligent digital experiences using artificial
            intelligence, data, and modern web technologies.
          </p>
          <div className="hero-actions">
            <a className="button button-lime" href="#work">
              View my work <ArrowUpRight size={18} />
            </a>
            <a className="text-link" href="#contact">
              Contact me <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <a className="scroll-cue mono" href="#work">
          <span>
            SCROLL TO
            <br />
            EXPLORE
          </span>
          <span className="scroll-cue-icon">
            <ArrowDown size={19} />
          </span>
        </a>
        <div className="hero-side-note mono">
          <span>THOUGHTFULLY DESIGNED.</span>
          <span>INTELLIGENTLY BUILT.</span>
          <span className="note-line" />
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="marquee">
      <div
        className="marquee-track"
        aria-hidden="true"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {Array.from({ length: 4 }, (_, i) => (
          <span className="marquee-set" key={i}>
            <span>INTELLIGENT BY DESIGN</span>
            <Asterisk />
            <span className="marquee-outline">HUMAN AT HEART</span>
            <Asterisk />
          </span>
        ))}
      </div>
      <button
        className="marquee-control"
        aria-label={paused ? "Resume moving text" : "Pause moving text"}
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={12} /> : <Pause size={12} />}
      </button>
    </div>
  );
}

function Work({ onProject }) {
  return (
    <section
      className="work section-pad"
      id="work"
      aria-labelledby="work-heading"
    >
      <div className="projects">
        {projects.map((project) => (
          <article
            className={`project project-${project.accent}`}
            key={project.id}
          >
            <div className="project-info">
              <div>
                <p className="project-category mono">{project.category}</p>
                <h3 id="work-heading">{project.title}</h3>
                <p className="project-tagline">{project.description}</p>
                <p className="project-description">{project.detail}</p>
                <button
                  className="project-button"
                  onClick={(event) => onProject(project, event.currentTarget)}
                >
                  Explore the project{" "}
                  <span>
                    <ArrowUpRight size={21} />
                  </span>
                </button>
              </div>
              <div className="project-focus mono">
                {project.focus.slice(0, 2).map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
            </div>
            <button
              className="project-preview"
              aria-label={`View ${project.title} concept and project details`}
              onClick={(event) => onProject(project, event.currentTarget)}
            >
              <span className="preview-topline mono">
                <span>{project.title.toUpperCase()} / INTERFACE STUDY</span>
              </span>
              <div className="project-window">
                <ProjectVisual type={project.id} />
              </div>
              <span className="preview-bottomline mono">
                <span>ORIGINAL CONCEPT VISUAL</span>
                <span className="preview-open">
                  <ArrowUpRight size={20} />
                </span>
              </span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      className="about section-pad"
      id="about"
      aria-labelledby="about-heading"
    >
      <SectionLabel number="02">THE PERSON BEHIND THE PIXELS</SectionLabel>
      <div className="about-layout">
        <div className="about-copy">
          <h2 className="about-statement reveal" id="about-heading">
            <span className="type-line">
              <span>A curious mind.</span>
            </span>
            <span className="type-line">
              <span>A builder’s instinct.</span>
            </span>
            <span className="type-line accent-line">
              <span>Always connecting</span>
            </span>
            <span className="type-line accent-line">
              <span>the dots.</span>
            </span>
          </h2>
          <div className="about-description reveal">
            <span className="about-small-star">
              <Asterisk size={30} />
            </span>
            <p>
              I’m Pranav Shinde. My world sits somewhere between artificial
              intelligence, data, and the web. I like making complex things feel
              simple—and useful things feel considered.
            </p>
          </div>
        </div>
        <div className="orbit-art reveal" aria-hidden="true">
          <div className="orbit-grid" />
          <div className="orbit-ring orbit-ring-1" />
          <div className="orbit-ring orbit-ring-2" />
          <div className="orbit-ring orbit-ring-3" />
          <span className="orbit-node orbit-node-1">
            <Code2 size={25} />
          </span>
          <span className="orbit-node orbit-node-2">
            <Braces size={25} />
          </span>
          <span className="orbit-node orbit-node-3">
            <Sparkles size={21} />
          </span>
          <div className="orbit-center">
            p/s<span>.</span>
          </div>
          <span className="orbit-caption mono">
            HUMAN CURIOSITY.
            <br />
            MACHINE POSSIBILITY.
          </span>
        </div>
      </div>
      <div className="education-row reveal">
        <div className="mono education-label">
          <span className="label-dot" /> MY FOUNDATION
        </div>
        <div>
          <h3>
            B.Tech in Artificial Intelligence
            <br />& Data Science
          </h3>
          <p>Sanjay Ghodawat University</p>
        </div>
        <ArrowUpRight className="education-arrow" size={29} />
      </div>
      <div className="milestone-row reveal">
        <span className="mono">ACHIEVEMENTS & CERTIFICATIONS</span>
        <p>More chapters to come.</p>
        <span className="milestone-note">
          Verified milestones will be added here.
        </span>
      </div>
    </section>
  );
}

function Toolkit() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);
  const filtered = skills.filter(
    (skill) => filter === "all" || skill.group === filter,
  );
  return (
    <section
      className="toolkit section-pad"
      id="skills"
      aria-labelledby="skills-heading"
    >
      <SectionLabel number="03">TOOLS OF THE TRADE</SectionLabel>
      <div className="section-heading-row reveal">
        <h2 className="section-title" id="skills-heading">
          <span className="type-line">
            <span>The right tools.</span>
          </span>
          <span className="type-line muted-word">
            <span>Endless possibilities.</span>
          </span>
        </h2>
        <Asterisk
          className="toolkit-star"
          strokeWidth={1.2}
          aria-hidden="true"
        />
      </div>
      <div className="toolkit-toolbar">
        <p>A little logic. A lot of possibility.</p>
        <div className="skill-filters" aria-label="Filter skills">
          {[
            ["all", "Everything"],
            ["ai", "AI & data"],
            ["web", "Web & tools"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => {
                setFilter(value);
                setActive(null);
              }}
              aria-pressed={filter === value}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="skill-grid" aria-live="polite">
        {filtered.map((skill) => (
          <button
            className={`skill-cell ${active === skill.name ? "skill-expanded" : ""}`}
            key={skill.name}
            aria-expanded={active === skill.name}
            onClick={() => setActive(active === skill.name ? null : skill.name)}
          >
            <span className="skill-index mono">
              {String(skills.indexOf(skill) + 1).padStart(2, "0")}
            </span>
            <span className="skill-name">{skill.name}</span>
            {active === skill.name ? <Minus size={16} /> : <Plus size={16} />}
            <span className="skill-detail">
              {active === skill.name
                ? skill.detail
                : skill.group === "ai"
                  ? "INTELLIGENCE & DATA"
                  : "DEVELOPMENT & DELIVERY"}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(id);
  }, [copied]);
  return (
    <section
      className="contact section-pad"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <SectionLabel number="04" light>
        GOOD THINGS START WITH A CONVERSATION
      </SectionLabel>
      <div className="contact-heading-wrap reveal">
        <h2 id="contact-heading">
          <span className="type-line">
            <span>LET’S BUILD</span>
          </span>
          <span className="type-line">
            <span>SOMETHING</span>
          </span>
          <span className="type-line contact-final">
            <span>GREAT.</span>
          </span>
        </h2>
        <Asterisk className="contact-star" strokeWidth={1} aria-hidden="true" />
      </div>
      <div className="contact-bottom">
        <div className="contact-intro">
          <p>
            Have an idea worth exploring?
            <br />
            Let’s connect the dots.
          </p>
          {profile.email ? (
            <div className="email-actions">
              <a className="contact-email" href={`mailto:${profile.email}`}>
                {profile.email}
                <ArrowUpRight size={22} />
              </a>
              <button
                onClick={copyEmail}
                className="copy-email"
                aria-label={copied ? "Email copied" : "Copy email address"}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
              <span className="sr-only" role="status">
                {copied ? "Email copied to clipboard" : ""}
              </span>
            </div>
          ) : (
            <div className="contact-placeholder">
              <span className="mono">EMAIL</span>
              <span>
                Contact details coming soon <ArrowUpRight size={18} />
              </span>
            </div>
          )}
        </div>
        <div className="contact-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={18} />
            GitHub
            <ArrowUpRight size={18} />
          </a>
          {profile.linkedin ? (
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} />
              LinkedIn
              <ArrowUpRight size={18} />
            </a>
          ) : (
            <span className="unavailable-link">
              <Linkedin size={18} />
              LinkedIn<span className="mono">COMING SOON</span>
            </span>
          )}
          {profile.resume ? (
            <a href={profile.resume} download>
              <FileDown size={18} />
              Résumé
              <ArrowDown size={18} />
            </a>
          ) : (
            <button className="unavailable-link" disabled>
              <FileDown size={18} />
              Résumé<span className="mono">COMING SOON</span>
            </button>
          )}
        </div>
      </div>
      <footer>
        <Brand footer />
        <span className="mono">© {new Date().getFullYear()} PRANAV SHINDE</span>
        <a href="#home" className="back-top mono">
          BACK TO TOP <ArrowUpRight size={16} />
        </a>
      </footer>
    </section>
  );
}

function ProjectDialog({ project, onClose, returnFocusRef }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const previous = returnFocusRef.current;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll(
          'button, a[href], [tabindex="0"]',
        );
        if (!nodes?.length) return;
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === dialogRef.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKey);
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [onClose, returnFocusRef]);
  return createPortal(
    <div
      className="dialog-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="project-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabIndex={-1}
      >
        <div className="dialog-top">
          <span className="mono">PROJECT NOTES</span>
          <button onClick={onClose} aria-label="Close project details">
            <X size={22} />
          </button>
        </div>
        <div className={`dialog-visual project-${project.accent}`}>
          <ProjectVisual type={project.id} />
        </div>
        <div className="dialog-copy">
          <p className="mono project-category">{project.category}</p>
          <h2 id="dialog-title">{project.title}</h2>
          <p>{project.detail}</p>
          <div className="dialog-focus">
            {project.focus.map((f) => (
              <span key={f}>
                <Plus size={13} />
                {f}
              </span>
            ))}
          </div>
          <div className="dialog-stack">
            <span className="mono">SUGGESTED TECHNOLOGIES</span>
            <div>
              {project.suggestedStack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
          <p className="concept-note">
            Original interface concept, created for this portfolio. The
            technology suggestions describe a possible implementation, not a
            verified production stack.
          </p>
          {project.url && (
            <a
              className="button button-lime"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              Visit project <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function App() {
  const root = useRef(null);
  const [project, setProject] = useState(null);
  const returnFocusRef = useRef(null);
  const openProject = useCallback((selected, trigger) => {
    returnFocusRef.current = trigger;
    setProject(selected);
  }, []);
  const closeProject = useCallback(() => setProject(null), []);
  usePortfolioMotion(root);
  return (
    <div ref={root} className="app" inert={project ? true : undefined}>
      <ScrollProgress />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero onProject={openProject} />
        <Marquee />
        <Work onProject={openProject} />
        <About />
        <Toolkit />
        <Contact />
      </main>
      {project && (
        <ProjectDialog
          project={project}
          onClose={closeProject}
          returnFocusRef={returnFocusRef}
        />
      )}
    </div>
  );
}
