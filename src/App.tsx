import { useEffect, useRef, useState } from "react"
import ProjectShowcase from "./ProjectShowcase"

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "work" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Workflow", id: "ai" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
]

const ROLES = [
  "Full-Stack Development",
  "Vue.js & Nest.js",
  "Flutter Mobile Apps",
  "Laravel & Node.js",
  "AI-Assisted Engineering",
]

const AI_HIGHLIGHTS = [
  {
    title: "Agentic Coding",
    sub: "OpenCode · Claude",
    desc: "Agent-driven implementation of features across Vue, Nest.js and Laravel codebases.",
  },
  {
    title: "AI Testing",
    sub: "Coverage support",
    desc: "AI-assisted generation of PHPUnit and Cypress specs to expand regression coverage.",
  },
  {
    title: "Code Review",
    sub: "Second pair of eyes",
    desc: "LLM-assisted review passes for edge cases and consistency before pull requests land.",
  },
  {
    title: "3",
    sub: "AI tools in use",
    desc: "OpenCode, Claude and DeepSeek wired into everyday development workflows.",
  },
]

const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "PHP", "Dart", "SQL", "CSS"],
  },
  {
    title: "Frontend",
    items: [
      "Vue.js",
      "Nuxt.js",
      "Quasar",
      "React.js",
      "Angular",
      "Aurelia.js",
      "jQuery",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Nest.js", "Laravel", "REST APIs", "API Integration"],
  },
  {
    title: "Mobile",
    items: ["Flutter", "Ionic Framework", "React Native"],
  },
  {
    title: "Databases",
    items: ["MySQL", "MongoDB"],
  },
  {
    title: "Infrastructure & Integrations",
    items: ["Docker", "Firebase", "SAP", "FHIR API"],
  },
  {
    title: "Testing & Monitoring",
    items: [
      "PHPUnit",
      "Cypress",
      "End-to-End Testing",
      "Datadog",
      "Error Investigation",
    ],
  },
  {
    title: "Practices",
    items: [
      "Git",
      "Agile / Scrum",
      "Jira",
      "Legacy Modernization",
      "Production Support",
    ],
  },
  {
    title: "AI-Assisted Development",
    items: [
      "OpenCode",
      "Claude",
      "DeepSeek",
      "Agentic Coding",
      "AI Code Review",
    ],
  },
]

const PROJECTS = [
  {
    tag: "Transportation",
    period: "Jan 2025 – present",
    title: "TransAct — EZRouting & EZAT",
    tagline:
      "Transportation management and real-time tracking for a multi-fleet network across 100+ schools",
    role: "Senior Full-Stack Developer (via CoDev)",
    desc: "Backend services and frontend interfaces for fleet routing and transportation management, with REST APIs and reusable UI components powering real-time routing and vehicle tracking. Production issues around GPS and map visibility are investigated and monitored through Datadog.",
    tech: ["Node.js", "Nest.js", "Aurelia.js", "Vue.js", "Datadog"],
    bullets: [
      "REST APIs shared across core transportation products",
      "Real-time routing and vehicle tracking interfaces",
      "GPS and map issue investigation from customer reports",
    ],
  },
  {
    tag: "Mobile",
    period: "Jan 2025 – present",
    title: "EZA2B · Where's the Bus · SD360 · EZArrival",
    tagline:
      "Four Flutter applications for parents, drivers and school districts",
    role: "Mobile Developer (via CoDev)",
    desc: "Built and maintained four Flutter/Dart mobile applications in the TransAct ecosystem, including parent-facing bus location and arrival tracking backed by the same real-time routing services.",
    tech: ["Flutter", "Dart", "REST APIs", "Firebase"],
    bullets: [
      "Parent-facing live bus location and arrival tracking",
      "Shared API layer with the EZRouting platform",
      "Maintenance and release support across 4 apps",
    ],
  },
  {
    tag: "Healthcare",
    period: "Nov 2022 – Jul 2024",
    title: "Wellola · PortaSana — Patient Records",
    tagline:
      "Patient portal and CMS for Wellola (wellola.com) — a Flutter patient app and a Quasar admin web app on a FHIR API and Laravel",
    role: "Full-Stack Web Developer · Rendition Digital",
    desc: "Developed a patient-facing Flutter app and the administrative CMS web app for Wellola, helping deploy the patient records system across approximately 30 hospitals. Led frontend and backend work during the transition from a legacy application to its replacement while owning all customer queries for the legacy system.",
    tech: ["Flutter", "Dart", "Quasar", "Vue.js", "Laravel", "FHIR", "Docker"],
    links: [{ label: "Website", href: "https://wellola.com/" }],
    bullets: [
      "FHIR API integration for standardized clinical data exchange",
      "PHPUnit and Cypress suites validating releases",
      "Dockerized environments across dev, staging and production",
    ],
  },
  {
    tag: "Enterprise",
    period: "May 2019 – Nov 2022",
    title: "Inventory & Point-of-Sale Platform",
    tagline:
      "Enterprise inventory and POS system deployed for an Australian client",
    role: "Full-Stack Web Developer · Kaisa Consulting",
    desc: "Enterprise application work combining Node.js and Laravel APIs with Vue.js and React.js frontends, integrated with SAP, Firebase and MySQL to synchronize transactional data across business systems.",
    tech: ["Node.js", "Laravel", "Vue.js", "React.js", "SAP", "MySQL"],
    bullets: [
      "SAP, Firebase and MySQL data synchronization",
      "PHPUnit automated tests and Docker environments",
      "Agile delivery tracked in Jira",
    ],
  },
]

const SIDE_PROJECTS = [
  {
    title: "Devocean",
    sub: "devocean.website",
    desc: "Devotional tracking web application built end to end, with an interface for recording and tracking daily devotion activities.",
    tech: ["Laravel", "Vue.js", "MySQL"],
  },
  {
    title: "Maddox Jewelry",
    sub: "Livestream commerce",
    desc: "Livestream-selling application for jewelry sellers, including in-app admin chat for direct communication with buyers about products and purchases.",
    tech: ["Livestream", "Chat", "Full-Stack"],
  },
  {
    title: "Italian Living",
    sub: "Property listings",
    desc: "Property-listing platform for residents of Italy with listing management and property search, plus a companion Flutter app extending the web experience to mobile.",
    tech: ["Laravel", "PHP", "Flutter"],
  },
  {
    title: "Project Management App",
    sub: "Freelance build",
    desc: "Laravel-based project management application with task tracking and team workflow features, delivered from requirements through testing.",
    tech: ["Laravel", "SQL", "JavaScript"],
  },
]

const APPS = [
  {
    title: "PortaSana · Wellola",
    tag: "Healthcare · Patient app",
    desc: "Patient-facing Flutter app and Quasar admin web app for Wellola — appointments, messaging, symptom tracking and remote care, backed by a FHIR API and Laravel. Deployed across approximately 30 hospitals.",
    tech: ["Flutter", "Dart", "Quasar", "Vue.js", "Laravel", "FHIR"],
    img: "app-icons/portasana.png",
    links: [{ label: "Website", href: "https://wellola.com/" }],
  },
  {
    title: "PathWise K-12 Platform",
    tag: "TransAct · Backend",
    desc: "K-12 student transportation platform for U.S. school districts, supporting a multi-fleet network across 100+ schools with real-time routing and vehicle tracking.",
    tech: ["Nest.js", "Node.js", "Vue.js", "Flutter"],
    img: "app-icons/pathwise-logo.png",
    links: [{ label: "Website", href: "https://pathwisek12.com/" }],
  },
  {
    title: "EZRouting",
    tag: "System of record",
    desc: "The platform's core — route, trip and stop configuration, vehicle and staff assignment, and attendance processing with the APIs the mobile apps consume.",
    tech: ["Nest.js", "Node.js", "Aurelia.js", "REST APIs"],
    img: "app-icons/ezrouting.png",
    links: [
      {
        label: "Website",
        href: "https://pathwisek12.com/transportation-suite/",
      },
    ],
  },
  {
    title: "EZAT",
    tag: "Admin tool",
    desc: "Administrative interface for fleet routing and transportation management — field trip planning, service and supply tracking, routing configuration and the APIs the mobile apps consume.",
    tech: ["Aurelia.js", "Vue.js", "Nest.js", "REST APIs"],
    img: "app-icons/ezat.png",
    links: [
      {
        label: "Website",
        href: "https://pathwisek12.com/transportation-suite/field-trips/",
      },
    ],
  },
  {
    title: "Where's the Bus",
    tag: "Parent app",
    desc: "Parent-facing bus tracking app — live vehicle location, rider management, notification preferences and district SSO for schools and families.",
    tech: ["Flutter", "Dart", "Firebase", "Maps"],
    img: "app-icons/wherethesbus.png",
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/wheresthebus/id937146732",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.wtb.mrider",
      },
      { label: "Website", href: "https://wheresthebus.com/" },
    ],
  },
  {
    title: "EZArrival",
    tag: "Parent app",
    desc: "Live bus location and arrival tracking for parents, with attendance history, schedules and notifications.",
    tech: ["Flutter", "Dart", "Firebase"],
    img: "app-icons/ezarrival.png",
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/ezarrival-k12-transportation/id6759999918",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.pathwise.ezarrival",
      },
    ],
  },
  {
    title: "EZ A2B",
    tag: "Parent app",
    desc: "The earlier generation of the parent tracking app, handling live bus location, notifications and consent flows before its EZArrival rebrand.",
    tech: ["Flutter", "Dart", "Firebase"],
    img: "app-icons/eza2b.png",
    links: [
      {
        label: "APKPure",
        href: "https://apkpure.com/ez-a2b-k12-transportation-app/com.eza2b.app",
      },
    ],
  },
  {
    title: "SafeDriver 360",
    tag: "Driver app",
    desc: "Driver tablet app for school bus routes — trip execution with turn-by-turn navigation, student scanning over BLE and RFID, and staff clock-in for in-vehicle hardware.",
    tech: ["Flutter", "Dart", "BLE", "RFID"],
    img: "app-icons/safedriver360.png",
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.geodataintelligence.safedriver360",
      },
    ],
  },
  {
    title: "Driver Times",
    tag: "Driver app",
    desc: "Driver-facing duty-time and clock-in tracking against assigned vehicles, route preparation and home services.",
    tech: ["Flutter", "Dart", "REST APIs"],
    img: "app-icons/drivertimes.png",
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/drivertimes/id1619140628",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.geodataintelligence.drivertimes",
      },
    ],
  },
  {
    title: "OneCampus",
    tag: "Campus portal",
    desc: "White-label campus portal app giving higher-ed students and staff a single entry point to tasks, announcements, alerts and directory contacts through a tenant configuration layer.",
    tech: ["Flutter", "Dart", "Firebase"],
    img: "app-icons/onecampus.png",
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/onecampus-app/id1370996457",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.rsmart.onecampusapp",
      },
    ],
  },
  {
    title: "SELAH",
    tag: "Devotional companion",
    desc: "A devotional web application for daily reflection and reading, built as part of the Devocean ecosystem.",
    tech: ["React", "Supabase", "Node.js", "Express"],
    links: [{ label: "Website", href: "http://selah.devocean.website/" }],
  },
  {
    title: "DGTD",
    tag: "Enterprise · Dealer tooling",
    desc: "Administrative tooling for a dealer network, built within the Motolite ecosystem.",
    tech: ["PWA", "Vue.js", "Firebase", "Laravel"],
    links: [{ label: "Website", href: "http://dgtd.motolite.com/" }],
  },
  {
    title: "RAMCAR MOBILE",
    tag: "Enterprise · Client portal",
    desc: "Client-facing account portal for the Supercharge AU network under Ramcar.",
    tech: ["SAP", "Laravel", "API", "Firebase"],
    links: [{ label: "Website", href: "https://scb.ramcar.com.au/" }],
  },
  {
    title: "OMMC HENRI",
    tag: "Enterprise · Account management",
    desc: "Account Resource Management System for the Henri platform within Motolite.",
    tech: ["Laravel", "Vue.js", "Firebase", "Firestore", "SAP"],
    links: [{ label: "Website", href: "https://ommc-henri.motolite.com/" }],
  },
  {
    title: "rfp",
    tag: "Enterprise · Supplier portal",
    desc: "Online Request for Payment portal letting suppliers submit and track payment requests.",
    tech: ["Laravel", "Livewire", "Filament", "MySQL"],
    links: [{ label: "Website", href: "https://rfp.motolite.com/user/rfps" }],
  },
  {
    title: "FocusCEO",
    tag: "SaaS · Executive task management",
    desc: "Task management platform built for CEOs — delegation, accountability and automated workflows.",
    tech: ["Laravel", "Livewire"],
    links: [{ label: "Website", href: "https://focusceo.com/" }],
  },
  {
    title: "Juander",
    tag: "SaaS · LMS",
    desc: "eLearning platform for creating courses, managing learners and delivering training on any device.",
    tech: ["Laravel", "Vue.js", "Ionic", "RoboMongo"],
    links: [{ label: "Website", href: "https://juander.com/" }],
  },
]

const EXPERIENCE = [
  {
    year: "2025",
    current: true,
    company: "CoDev — client: TransAct",
    role: "Senior Full-Stack Developer",
    period: "Jan 2025 – Present · Makati, Philippines (Remote)",
    points: [
      "Develop and maintain backend services and frontend interfaces for EZRouting and EZAT using Node.js, Nest.js, Aurelia.js and Vue.js.",
      "Design and maintain REST APIs and reusable UI components supporting real-time routing and vehicle tracking.",
      "Build and maintain 4 Flutter/Dart mobile applications: EZA2B, Where's the Bus, SD360 and EZArrival.",
      "Investigate customer-reported GPS and map issues and monitor production performance with Datadog.",
    ],
  },
  {
    year: "2024",
    company: "Freelance",
    role: "Full-Stack Developer",
    period: "Jul 2024 – Jan 2025 · Remote",
    points: [
      "Delivered full-stack web applications using JavaScript, PHP, Laravel and SQL from requirements through implementation, debugging and testing.",
      "Built a Laravel-based project management application with task tracking and team workflow features.",
      "Developed Italian Living, a property-listing platform with listing management and property search.",
      "Delivered a companion Flutter application extending core web functionality to mobile users.",
    ],
  },
  {
    year: "2022",
    company: "Rendition Digital Inc.",
    role: "Full-Stack Web Developer",
    period: "Nov 2022 – Jul 2024 · Philippines",
    points: [
      "Led frontend and backend development during the transition from a legacy hospital records application to its replacement, while managing all legacy customer queries.",
      "Contributed to the launch of 2 web applications and 1 Flutter mobile application during the modernization effort.",
      "Integrated the FHIR API to support standardized clinical data exchange across roughly 30 hospitals.",
      "Implemented PHPUnit and Cypress test suites and containerized environments with Docker.",
    ],
  },
  {
    year: "2019",
    company: "Kaisa Consulting",
    role: "Full-Stack Web Developer",
    period: "May 2019 – Nov 2022 · Philippines",
    points: [
      "Developed enterprise applications including an inventory and point-of-sale system deployed for an Australian client.",
      "Built integrations with SAP, Firebase and MySQL to synchronize transactional data across business systems.",
      "Implemented frontend features with React.js and Vue.js and integrated them with backend services.",
      "Wrote automated tests with PHPUnit and maintained Docker-based development and staging environments.",
    ],
  },
  {
    year: "2016",
    company: "Miyens Technologies",
    role: "Full-Stack Web Developer",
    period: "May 2016 – Apr 2019 · Philippines",
    points: [
      "Progressed from frontend development with JavaScript and jQuery to full-stack work with Laravel and MongoDB.",
      "Designed and built a proprietary web authoring tool enabling instructors to create and publish e-learning content.",
      "Developed interactive e-learning courses using the Ionic Framework for cross-platform delivery.",
    ],
  },
]

const CAREER_STATS = [
  { value: "9+", label: "Years building" },
  { value: "5", label: "Roles" },
  { value: "3", label: "Industries" },
  { value: "1", label: "Current" },
]

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

function useActiveSection() {
  const [active, setActive] = useState("home")
  useEffect(() => {
    const handler = () => {
      const mid = window.innerHeight * 0.35
      let current = "home"
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id)
        if (el && el.getBoundingClientRect().top <= mid) current = link.id
      }
      setActive(current)
    }
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])
  return active
}

function useTypewriter(words: string[]) {
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    const done = !deleting && text === word
    const cleared = deleting && text === ""

    const delay = done ? 1800 : cleared ? 250 : deleting ? 40 : 75

    const timer = setTimeout(() => {
      if (done) {
        setDeleting(true)
      } else if (cleared) {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else {
        setText(
          deleting
            ? word.slice(0, text.length - 1)
            : word.slice(0, text.length + 1),
        )
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, index, words])

  return text
}

// ─── Shared UI ───────────────────────────────────────────────────────────────

function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  light = false,
}: {
  eyebrow: string
  title: string
  accent: string
  subtitle?: string
  light?: boolean
}) {
  return (
    <div className="section-heading">
      <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</p>
      <h2
        className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}{" "}
        <span className={light ? "text-sky-400" : "accent-grad"}>{accent}</span>
      </h2>
      {subtitle ? (
        <p
          className={`mt-5 text-base leading-relaxed ${
            light ? "text-white/60" : "text-slate-500"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/85 py-3 backdrop-blur-xl"
          : "border-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#home"
          className={`text-lg font-extrabold tracking-tight ${
            scrolled ? "text-slate-900" : "text-white"
          }`}
        >
          <span className="brand-monogram">
            jp<span> / </span>
          </span>
          <span className="brand-name">
            JOHN PAUL
            <br />
            DE JESUS
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`nav-link ${isActive ? "is-active" : ""} ${
                    scrolled
                      ? isActive
                        ? "text-blue-600"
                        : "text-slate-600 hover:text-slate-900"
                      : isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden ${scrolled ? "text-slate-900" : "text-white"}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-navigation"
          className="mt-3 border-t border-slate-200 bg-white px-5 py-4 lg:hidden"
        >
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium ${
                  active === link.id ? "text-blue-600" : "text-slate-600"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  const typed = useTypewriter(ROLES)

  return (
    <section
      id="home"
      className="hero-section dark-panel relative overflow-hidden text-white"
    >
      <div className="hero-layout section-shell">
        <div className="hero-copy">
          <div className="animate-fade-up" style={{ animationDelay: "60ms" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80">
              <span className="live-dot inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Open to new opportunities
            </span>
          </div>

          <h1
            className="animate-fade-up mx-auto mt-8 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "140ms" }}
          >
            Thoughtful code.
            <br />
            <span className="hero-serif">Real-world</span>
            <br />
            impact<span className="hero-period">.</span>
          </h1>

          <p
            className="animate-fade-up mt-6 text-lg text-white/70 sm:text-xl"
            style={{ animationDelay: "220ms" }}
          >
            I’m John Paul De Jesus.{" "}
            <span className="hero-role">Senior full-stack developer.</span>
          </p>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55"
            style={{ animationDelay: "300ms" }}
          >
            I turn complex problems into web and mobile experiences people rely
            on — from the morning school run to better-connected healthcare.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "380ms" }}
          >
            <a href="#work" className="hero-primary px-7 py-3 text-sm">
              Explore my work <ArrowIcon />
            </a>
            <a href="#contact" className="btn-light px-7 py-3 text-sm">
              Let’s talk <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div
            className="animate-fade-up mt-9 flex items-center justify-center gap-3"
            style={{ animationDelay: "440ms" }}
          >
            <a
              className="social-btn"
              href="https://github.com/polenginlabu"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              className="social-btn"
              href="https://linkedin.com/in/johnpaul-q-dejesus"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 10-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              className="social-btn"
              href="mailto:johnpaul.q.dejesus@gmail.com"
              aria-label="Email"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 8l10 6 10-6" />
              </svg>
            </a>
            <a
              className="social-btn"
              href="tel:+639999264736"
              aria-label="Phone"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.2 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.1 9.9a16 16 0 006 6l1.26-1.26a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </a>
          </div>
        </div>
        <div
          className="hero-visual"
          aria-label="Selected work in healthcare and transportation"
        >
          <div className="orbit-label">
            FROM THE FIRST COMMIT TO REAL-WORLD USE
          </div>
          <a href="#work" className="hero-product hero-product-care">
            <div className="hero-product-label">
              <span>01 / HEALTHCARE</span>
              <span>↗</span>
            </div>
            <img
              src="app-icons/portasana.png"
              alt="PortaSana patient care platform"
            />
            <div>
              <strong>Care, connected.</strong>
              <span>PortaSana · Flutter + Laravel</span>
            </div>
          </a>
          <a href="#work" className="hero-product hero-product-route">
            <div className="hero-product-label">
              <span>02 / TRANSPORTATION</span>
              <span>↗</span>
            </div>
            <img
              src="app-icons/routing-dispatch.png"
              alt="PathWise routing and dispatch product preview"
            />
            <div>
              <strong>A smarter school run.</strong>
              <span>PathWise · Web + Mobile</span>
            </div>
          </a>
          <div className="hero-code-label">
            <span aria-hidden="true">&lt;/&gt;</span>
            <span>{typed || "Full-Stack Development"}</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom section-shell">
        <p>
          BASED IN METRO MANILA
          <br />
          <span>Building for people, everywhere.</span>
        </p>
        <div>
          <strong>9+</strong>
          <span>
            YEARS OF
            <br />
            HANDS-ON EXPERIENCE
          </span>
        </div>
        <a href="#work">
          SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-28"
    >
      <Reveal>
        <SectionHeading
          eyebrow="02 / THE PERSON BEHIND THE CODE"
          title="An engineer who"
          accent="cares."
        />
      </Reveal>

      <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="soft-card overflow-hidden p-8 text-center">
            <img
              src="jp-portrait.png"
              alt="John Paul De Jesus"
              width={1080}
              height={1080}
              className="portrait-photo"
            />
            <h3 className="mt-6 text-xl font-bold text-slate-900">
              John Paul De Jesus
            </h3>
            <span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              Senior Full-Stack Developer
            </span>

            <dl className="mt-7 space-y-3 text-left text-sm">
              {[
                { k: "Location", v: "Metro Manila, Philippines" },
                { k: "Experience", v: "9+ years" },
                { k: "Focus", v: "Web · Mobile · APIs" },
                { k: "Education", v: "BS Information System" },
                { k: "Availability", v: "Open to opportunities" },
              ].map((row) => (
                <div
                  key={row.k}
                  className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3"
                >
                  <dt className="text-slate-400">{row.k}</dt>
                  <dd className="text-right font-medium text-slate-700">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href="#contact"
              className="btn-solid mt-7 inline-flex items-center gap-2 px-6 py-3 text-sm"
            >
              Let&apos;s talk <ArrowIcon />
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-5 text-base leading-relaxed text-slate-600">
            <p>
              I am a senior full-stack developer based in Metro Manila,
              Philippines, with over nine years of experience building and
              supporting production web and mobile applications across
              transportation, healthcare and enterprise operations.
            </p>
            <p>
              I led frontend and backend development during a legacy
              modernization initiative, contributing to the launch of 2 web
              applications and 1 Flutter app while remaining responsible for
              legacy customer support — a combination that taught me how to ship
              new systems without abandoning the people still running on the old
              one.
            </p>
            <p>
              My core expertise sits in Vue.js, Node.js, Nest.js, Laravel and
              Flutter, backed by hands-on work in API integration, automated
              testing and production troubleshooting. I also integrate
              AI-assisted coding, testing and code review directly into my
              development workflow.
            </p>

            <figure className="intro-video">
              <video
                src="jp-intro.mp4"
                poster="jp-intro-poster.jpg"
                preload="metadata"
                controls
                muted
                loop
                playsInline
                autoPlay
              />
              <figcaption>A look at how I work — day to day.</figcaption>
            </figure>

            <div className="grid gap-4 pt-3 sm:grid-cols-2">
              {[
                {
                  title: "Build",
                  desc: "Vue, Nuxt, Quasar and Aurelia frontends on top of Node.js, Nest.js and Laravel services.",
                },
                {
                  title: "Ship mobile",
                  desc: "Flutter applications used by parents, drivers and districts in daily operations.",
                },
                {
                  title: "Test",
                  desc: "PHPUnit and Cypress suites that validate functionality before a release goes out.",
                },
                {
                  title: "Support",
                  desc: "Datadog monitoring, error investigation and real customer issue resolution in production.",
                },
              ].map((card) => (
                <div key={card.title} className="soft-card p-5">
                  <h4 className="text-base font-semibold text-slate-900">
                    {card.title}
                  </h4>
                  <p className="mt-2 text-sm text-slate-500">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── AI ──────────────────────────────────────────────────────────────────────

function AI() {
  return (
    <section
      id="ai"
      className="dark-panel relative overflow-hidden py-16 text-white sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-sky-300">
              <span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
              Modern workflow
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              AI-Assisted <span className="text-sky-400">Development</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60">
              I treat AI as a force multiplier, not a replacement for
              engineering judgment. Agentic coding, AI-assisted testing and code
              review are part of how I deliver features — with the same review
              standards applied before anything reaches production.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AI_HIGHLIGHTS.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="glass-card h-full p-6">
                <div className="text-2xl font-bold text-sky-400">
                  {item.title}
                </div>
                <div className="mt-2 text-sm font-semibold text-white">
                  {item.sub}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Skills ──────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="bg-white py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            title="The right tools."
            accent="Solid foundations."
            eyebrow="03 / TOOLKIT"
            subtitle="From the interface to the infrastructure. This is what I build with."
          />
        </Reveal>

        <div className="mt-14 space-y-10">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 60}>
              <div>
                <div className="flex items-center gap-4">
                  <h3 className="whitespace-nowrap text-sm font-bold uppercase tracking-wider text-slate-900">
                    {group.title}
                  </h3>
                  <span className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs text-slate-400">
                    {group.items.length}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Work ────────────────────────────────────────────────────────────────────

function Work() {
  return (
    <ProjectShowcase apps={APPS} cases={PROJECTS} independent={SIDE_PROJECTS} />
  )
}

// ─── Experience ──────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-white py-16 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Career"
            title="The"
            accent="Journey"
            subtitle="Nine years across transportation, healthcare, enterprise systems and e-learning."
          />
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {CAREER_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-5 text-center"
              >
                <div className="text-2xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-16">
          <span className="timeline-rail absolute left-4 top-0 hidden h-full w-0.5 lg:left-1/2 lg:block lg:-translate-x-1/2" />

          <div className="space-y-10">
            {EXPERIENCE.map((job, i) => {
              const left = i % 2 === 0
              return (
                <Reveal key={job.company} delay={i * 70}>
                  <div className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
                    <span className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.18)] lg:block" />
                    {!left ? <div className="hidden lg:block" /> : null}

                    <div className={left ? "lg:text-right" : ""}>
                      <div className="soft-card relative p-6">
                        <div
                          className={`flex flex-wrap items-center gap-2 ${
                            left ? "lg:justify-end" : ""
                          }`}
                        >
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                            {job.year}
                          </span>
                          {job.current ? (
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
                              Current
                            </span>
                          ) : null}
                        </div>

                        <h3 className="mt-4 text-lg font-bold text-slate-900">
                          {job.company}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-blue-700">
                          {job.role}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {job.period}
                        </p>

                        <ul
                          className={`mt-4 space-y-2 text-left ${
                            left ? "lg:text-right" : ""
                          }`}
                        >
                          {job.points.map((point) => (
                            <li
                              key={point}
                              className="text-sm leading-relaxed text-slate-600"
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {left ? <div className="hidden lg:block" /> : null}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        <Reveal>
          <div className="mt-14 text-center">
            <div className="soft-card mx-auto inline-block px-8 py-6 text-center">
              <p className="eyebrow">Education</p>
              <h3 className="mt-3 text-lg font-bold text-slate-900">
                Bachelor of Science in Information System
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                University of Caloocan City · April 2016
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section
      id="contact"
      className="dark-panel relative overflow-hidden py-16 text-white sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title={"Let's build something"}
            accent="together"
            subtitle="Open to senior full-stack roles and project work — web, mobile or the services behind them."
            light
          />
        </Reveal>

        <Reveal>
        <div className="mt-14 mx-auto max-w-lg space-y-4">
          {[
            {
              label: "Email",
              value: "johnpaul.q.dejesus@gmail.com",
              href: "mailto:johnpaul.q.dejesus@gmail.com",
            },
            {
              label: "Phone",
              value: "+63 999 926 4736",
              href: "tel:+639999264736",
            },
            {
              label: "GitHub",
              value: "github.com/polenginlabu",
              href: "https://github.com/polenginlabu",
            },
            {
              label: "LinkedIn",
              value: "linkedin.com/in/johnpaul-q-dejesus",
              href: "https://linkedin.com/in/johnpaul-q-dejesus",
            },
            { label: "Location", value: "Metro Manila, Philippines" },
          ].map((item) => (
            <div key={item.label} className="glass-card px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-400">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target={
                    item.href.startsWith("http") ? "_blank" : undefined
                  }
                  rel="noreferrer"
                  className="mt-1 block break-all text-sm text-white/80 transition-colors hover:text-white"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 text-sm text-white/80">{item.value}</p>
              )}
            </div>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] py-8 text-white/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-sm sm:flex-row sm:px-8">
        <span className="font-bold text-white">
          John Paul<span className="text-blue-500">.</span>
        </span>
        <p>
          © {new Date().getFullYear()} John Paul De Jesus · Metro Manila,
          Philippines
        </p>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          Available for work
        </span>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Skills />
        <AI />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
