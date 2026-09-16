import { useEffect, useRef, useState } from "react"

type Project = {
  title: string
  tag: string
  desc: string
  tech: string[]
  img?: string
  links?: {
    label: string
    href: string
  }[]
}

type CaseStudy = {
  title: string
  role: string
  desc: string
  period: string
  tech: string[]
  bullets: string[]
}

type Presentation = {
  category: string
  kind: string
  theme: string
  summary: string
  image?: string
  screen?: boolean
  caseIndex?: number
}

const PRESENTATIONS: Record<string, Presentation> = {
  "PortaSana · Wellola": {
    category: "Healthcare",
    kind: "Patient app + admin platform",
    theme: "plum",
    summary: "Connecting patients and care teams, beyond the hospital.",
    image: "app-icons/portasana.png",
    caseIndex: 2,
  },
  "PathWise K-12 Platform": {
    category: "Transportation",
    kind: "Connected K–12 platform",
    theme: "mint",
    summary: "The connected platform behind the school run.",
    image: "app-icons/routing-dispatch.png",
    caseIndex: 0,
  },
  EZRouting: {
    category: "Transportation",
    kind: "Web application",
    theme: "mint",
    summary: "Complex routes. Clearer daily operations.",
    image: "app-icons/routing-dispatch.png",
    caseIndex: 0,
  },
  EZAT: {
    category: "Transportation",
    kind: "Admin web application",
    theme: "peach",
    summary: "From trip requests to driver assignments, all in one place.",
    image: "app-icons/ezat.png",
    caseIndex: 0,
  },
  "Where's the Bus": {
    category: "Transportation",
    kind: "iOS + Android",
    theme: "butter",
    summary: "A little less waiting. A lot more peace of mind.",
    image: "app-icons/wtb-tracking.jpg",
    screen: true,
    caseIndex: 1,
  },
  EZArrival: {
    category: "Transportation",
    kind: "iOS + Android",
    theme: "sky",
    summary: "Real-time arrivals, right in a parent’s pocket.",
    image: "app-icons/arrival-screen.jpg",
    screen: true,
    caseIndex: 1,
  },
  "EZ A2B": {
    category: "Transportation",
    kind: "Flutter mobile application",
    theme: "sky",
    summary: "Keeping families connected to the school journey.",
    caseIndex: 1,
  },
  "SafeDriver 360": {
    category: "Transportation",
    kind: "Driver tablet application",
    theme: "mint",
    summary: "A driver’s daily route, connected from start to finish.",
    caseIndex: 1,
  },
  "Driver Times": {
    category: "Transportation",
    kind: "iOS + Android",
    theme: "peach",
    summary: "Less paperwork. More time on the road.",
    image: "app-icons/driver-screen.png",
    screen: true,
  },
  OneCampus: {
    category: "Education",
    kind: "iOS + Android",
    theme: "lavender",
    summary: "Campus life, with one place to start.",
    image: "app-icons/campus-screen.png",
    screen: true,
  },
  SELAH: {
    category: "Enterprise",
    kind: "Web application",
    theme: "sky",
    summary: "A devotional companion for daily reflection.",
    image: "thumb-selah.jpg",
  },
  DGTD: {
    category: "Enterprise",
    kind: "Web application",
    theme: "mint",
    summary: "Admin tooling for a dealer network.",
    image: "thumb-dgtd.jpg",
  },
  "RAMCAR MOBILE": {
    category: "Enterprise",
    kind: "Web application",
    theme: "peach",
    summary: "Client-facing account portal for the Supercharge AU network.",
    image: "thumb-ramcar.jpg",
  },
  "OMMC HENRI": {
    category: "Enterprise",
    kind: "Web application",
    theme: "plum",
    summary: "Account resource management for the Henri platform.",
    image: "thumb-ommc.jpg",
  },
  rfp: {
    category: "Enterprise",
    kind: "Web application",
    theme: "butter",
    summary: "Online request-for-payment portal for suppliers.",
    image: "thumb-rfp.jpg",
  },
  FocusCEO: {
    category: "Enterprise",
    kind: "Web application",
    theme: "lavender",
    summary: "Executive task management for CEOs.",
    image: "thumb-focusceo.jpg",
  },
  Juander: {
    category: "Enterprise",
    kind: "SaaS · LMS",
    theme: "sky",
    summary: "eLearning platform for training teams and learners.",
    image: "thumb-juander.jpg",
  },
}

function Arrow({ diagonal = true }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Preview({
  project,
  large = false,
}: {
  project: Project
  large?: boolean
}) {
  const visual = PRESENTATIONS[project.title]
  const [failed, setFailed] = useState(false)
  const image = visual.image || project.img
  return (
    <div
      className={`product-preview theme-${visual.theme} ${
        large ? "preview-large" : ""
      } ${visual.screen ? "preview-phone" : ""} ${
        !visual.image ? "preview-brand" : ""
      }`}
    >
      <div className="preview-topline">
        <span>{visual.kind}</span>
        <span aria-hidden="true">↗</span>
      </div>
      <div className="preview-art">
        {image && !failed ? (
          <div className={visual.image ? "preview-image" : "preview-icon"}>
            <img
              src={image}
              alt={`${project.title} ${
                visual.screen
                  ? "App Store screenshot"
                  : visual.image
                    ? "official product artwork"
                    : "app icon"
              }`}
              loading="lazy"
              onError={() => setFailed(true)}
            />
          </div>
        ) : (
          <span className="preview-wordmark">{project.title}</span>
        )}
      </div>
      <div className="preview-bottomline">
        <span>
          {visual.screen
            ? "APP STORE PREVIEW"
            : visual.image
              ? "PRODUCT VISUAL"
              : "BRAND PREVIEW"}
        </span>
        <span>{visual.category}</span>
      </div>
    </div>
  )
}

export default function ProjectShowcase({
  apps,
  cases,
  independent,
}: {
  apps: Project[]
  cases: CaseStudy[]
  independent: {
    title: string
    sub: string
    desc: string
    tech: string[]
  }[]
}) {
  const [filter, setFilter] = useState("All projects")
  const [selected, setSelected] = useState<Project | null>(null)
  const [expanded, setExpanded] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const filters = [
    "All projects",
    "Healthcare",
    "Transportation",
    "Education",
    "Enterprise",
    "Independent",
  ]
  const filtered = apps.filter(
    (app) =>
      filter === "All projects" || PRESENTATIONS[app.title].category === filter,
  )
  const visible =
    expanded || filter !== "All projects" ? filtered : filtered.slice(0, 6)
  const showIndependent = filter === "All projects" || filter === "Independent"
  const caseStudy =
    selected && PRESENTATIONS[selected.title].caseIndex !== undefined
      ? cases[PRESENTATIONS[selected.title].caseIndex!]
      : null

  useEffect(() => {
    if (!selected) return
    dialog.current?.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = overflow
      opener.current?.focus()
    }
  }, [selected])

  function openProject(project: Project) {
    opener.current = (document.activeElement as HTMLElement)
    setSelected(project)
  }

  return (
    <section id="work" className="work-section section-shell">
      <div className="section-intro">
        <div>
          <p className="section-kicker">01 / SELECTED WORK</p>
          <h2>
            Real products.
            <br />
            <span className="serif-word">Real people.</span>
          </h2>
        </div>
        <p>
          A selection of the platforms and apps I’ve helped build. Different
          industries. One focus: making complex things feel simple.
        </p>
      </div>

      <div className="spotlight-grid">
        {apps.slice(0, 2).map((project, index) => (
          <article className="spotlight-card" key={project.title}>
            <button
              className="preview-button"
              onClick={() => openProject(project)}
              aria-label={`Explore ${project.title}`}
            >
              <Preview project={project} large />
              <span className="preview-open">
                Explore project <Arrow />
              </span>
            </button>
            <div className="spotlight-copy">
              <div className="project-meta">
                <span>{PRESENTATIONS[project.title].category}</span>
                <span>FEATURED / 0{index + 1}</span>
              </div>
              <button
                className="project-title-button"
                onClick={() => openProject(project)}
              >
                <h3>
                  {index === 0 ? "PortaSana by Wellola" : "PathWise K–12"}
                </h3>
                <Arrow />
              </button>
              <p>{PRESENTATIONS[project.title].summary}</p>
              <div className="project-tags">
                {project.tech.slice(0, 4).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="gallery-heading">
        <div>
          <p className="section-kicker">THE PROJECT INDEX</p>
          <h3>Explore the work.</h3>
        </div>
        <p>Web platforms, mobile apps & independent builds.</p>
      </div>
      <div
        className="project-filters"
        role="group"
        aria-label="Filter projects by industry"
      >
        {filters.map((item) => (
          <button
            key={item}
            aria-pressed={filter === item}
            onClick={() => {
              setFilter(item)
              setExpanded(false)
            }}
          >
            {item}
            <span>
              {item === "All projects"
                ? apps.length + independent.length
                : item === "Independent"
                  ? independent.length
                  : apps.filter(
                      (app) => PRESENTATIONS[app.title].category === item,
                    ).length}
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {filtered.length + (showIndependent ? independent.length : 0)} projects
        in {filter}
      </p>
      <div className="project-gallery">
        {visible.map((project) => (
          <article className="gallery-card" key={project.title}>
            <button
              className="preview-button"
              onClick={() => openProject(project)}
              aria-label={`View ${project.title} details`}
            >
              <Preview project={project} />
              <span className="preview-open">
                View project <Arrow />
              </span>
            </button>
            <div className="gallery-copy">
              <div className="project-meta">
                <span>{PRESENTATIONS[project.title].category}</span>
                <span>
                  {project.tech.includes("Flutter")
                    ? "WEB / MOBILE"
                    : "WEB PLATFORM"}
                </span>
              </div>
              <button
                className="project-title-button"
                onClick={() => openProject(project)}
              >
                <h3>{project.title}</h3>
                <Arrow />
              </button>
              <p>{PRESENTATIONS[project.title].summary}</p>
              <div className="project-tags">
                {project.tech.slice(0, 3).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      {filter === "All projects" && (
        <button
          className="show-projects"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show fewer apps" : `Explore all ${apps.length} apps`}
          <span aria-hidden="true">{expanded ? "−" : "+"}</span>
        </button>
      )}

      {showIndependent && (
        <div className="independent-section">
          <div className="gallery-heading">
            <h3>Built independently.</h3>
            <span className="section-kicker">IDEA → DELIVERY</span>
          </div>
          <div className="independent-grid">
            {independent.map((project, i) => (
              <article key={project.title} className="independent-card">
                <span className="independent-number">0{i + 1}</span>
                <p className="project-meta">{project.sub}</p>
                <h4>{project.title}</h4>
                <p>{project.desc}</p>
                <div className="project-tags">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      <details className="enterprise-detail">
        <summary>
          <span>Also in my toolkit</span>
          <strong>Enterprise inventory & point of sale</strong>
          <span aria-hidden="true">+</span>
        </summary>
        <div>
          <p>{cases[3].desc}</p>
          <p className="mt-3">
            {cases[3].role} · {cases[3].period}
          </p>
          <div className="project-tags">
            {cases[3].tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </details>

      {selected && (
        <dialog
          className="project-dialog"
          ref={dialog}
          aria-labelledby="project-dialog-title"
          onClose={() => setSelected(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialog.current?.close()
          }}
        >
          <div className="dialog-content">
            <div className="dialog-toolbar">
              <span>
                PROJECT NOTES / {PRESENTATIONS[selected.title].category}
              </span>
              <button
                autoFocus
                onClick={() => dialog.current?.close()}
                aria-label="Close project details"
              >
                ✕
              </button>
            </div>
            <Preview project={selected} large />
            <div className="dialog-copy">
              <p className="section-kicker">
                {PRESENTATIONS[selected.title].kind}
              </p>
              <h2 id="project-dialog-title">{selected.title}</h2>
              <p>{selected.desc}</p>
              <h3>My contribution</h3>
              <p>
                {caseStudy
                  ? caseStudy.desc
                  : `Development and maintenance of ${selected.title}, using ${selected.tech.join(", ")}.`}
              </p>
              {caseStudy && (
                <>
                  <p className="contribution-role">
                    {caseStudy.role} · {caseStudy.period}
                  </p>
                  <ul>
                    {caseStudy.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </>
              )}
              <div className="project-tags">
                {selected.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              {!!selected.links?.length && (
                <div className="project-external-links">
                  {selected.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                      <Arrow />
                    </a>
                  ))}
                </div>
              )}
              <p className="asset-caption">
                {PRESENTATIONS[selected.title].screen
                  ? "Preview from the public App Store listing."
                  : "Product visuals and brand assets belong to their respective owners."}{" "}
                Current product imagery may differ from the version I worked on.
              </p>
            </div>
          </div>
        </dialog>
      )}
    </section>
  )
}
