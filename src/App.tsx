import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ExternalLink, Github, Globe2, Mail, Menu, X } from "lucide-react";
import site from "./data/site.json";
import profile from "./data/profile.json";
import projects from "./data/projects.json";
import papers from "./data/papers.json";
import education from "./data/education.json";
import gallery from "./data/gallery.json";

type Lang = "en" | "zh";
type Localized = { en: string; zh: string };
const t = (value: Localized | string | undefined, lang: Lang) =>
  typeof value === "string" ? value : value?.[lang] ?? "";

function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = site.labels;
  const navItems = [
    ["projects", copy.projects[lang]],
    ["papers", copy.papers[lang]],
    ["education", copy.education[lang]],
    ["gallery", copy.gallery[lang]],
  ];
  const visibleProjects = useMemo(() => projects.filter((item) => item.visible !== false), []);
  const visiblePapers = useMemo(() => papers.filter((item) => item.visible !== false), []);
  const visibleEducation = useMemo(() => education.filter((item) => item.visible !== false), []);
  const visibleGallery = useMemo(() => gallery.filter((item) => item.visible !== false), []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Go to home">
          <span className="wordmark-dot" />
          {site.name}
        </a>
        <button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`navigation ${menuOpen ? "navigation-open" : ""}`}>
          {navItems.map(([id, label]) => (
            <a href={`#${id}`} key={id} onClick={closeMenu}>{label}</a>
          ))}
          
        </nav>
      </header>

      <main id="home">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" />{t(profile.kicker, lang)}</p>
            <h1>{t(profile.headline, lang)}</h1>
            <p className="hero-description">{t(profile.intro, lang)}</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#projects">{copy.explore[lang]} <ArrowDownRight size={17} /></a>
              {profile.email && <a className="text-link" href={`mailto:${profile.email}`}>{copy.contact[lang]} <ArrowUpRight size={15} /></a>}
            </div>
            <div className="hero-meta">
              {profile.location && <span>{t(profile.location, lang)}</span>}
              {profile.affiliation && <><span className="meta-separator">/</span><span>{t(profile.affiliation, lang)}</span></>}
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-frame">
              <img src={profile.portrait || "/images/profile-placeholder.svg"} alt={t(profile.portraitAlt, lang) || "Profile portrait"} />
              <div className="portrait-caption">
                <span>{t(profile.portraitCaption, lang) || "Selected work & research"}</span>
                <span className="caption-mark">KC.</span>
              </div>
            </div>
            <div className="hero-side-note">{t(profile.sideNote, lang)}</div>
          </div>
        </section>

        <section className="intro-strip">
          <div className="section-wrap intro-strip-inner">
            <span className="strip-label">{copy.currentFocus[lang]}</span>
            <p>{t(profile.focus, lang)}</p>
          </div>
        </section>

        <section className="content-section section-wrap" id="projects">
          <SectionHeading number="01" title={copy.projects[lang]} subtitle={copy.projectsSubtitle[lang]} />
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <article className="project-card" key={project.id}>
                <a className="project-image-link" href={project.links?.project || project.links?.github || "#projects"} target={project.links?.project || project.links?.github ? "_blank" : undefined} rel="noreferrer">
                  <img className="project-image" src={project.image || "/images/project-placeholder.svg"} alt={t(project.imageAlt, lang) || t(project.title, lang)} loading="lazy" />
                  <span className="image-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="image-arrow"><ArrowUpRight size={19} /></span>
                </a>
                <div className="project-card-body">
                  <div className="card-overline"><span>{project.category}</span><span>{project.year}</span></div>
                  <h3>{t(project.title, lang)}</h3>
                  <p>{t(project.description, lang)}</p>
                  {project.tags?.length > 0 && <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
                  <div className="card-links">
                    {project.links?.project && <a href={project.links.project} target="_blank" rel="noreferrer">{copy.viewProject[lang]} <ExternalLink size={13} /></a>}
                    {project.links?.github && <a href={project.links.github} target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>}
                    {project.links?.paper && <a href={project.links.paper} target="_blank" rel="noreferrer">{copy.paper[lang]} <ExternalLink size={13} /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section section-wrap papers-section" id="papers">
          <SectionHeading number="02" title={copy.papers[lang]} subtitle={copy.papersSubtitle[lang]} />
          <div className="paper-list">
            {visiblePapers.map((paper, index) => (
              <article className="paper-row" key={paper.id}>
                <span className="paper-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="paper-main">
                  <h3>{t(paper.title, lang)}</h3>
                  <p className="paper-authors">{t(paper.authors, lang)}</p>
                  <p className="paper-venue">{t(paper.venue, lang)}{paper.year ? ` · ${paper.year}` : ""}{paper.type ? ` · ${paper.type}` : ""}</p>
                  {paper.note && <p className="paper-note">{t(paper.note, lang)}</p>}
                </div>
                <div className="paper-links">
                  {paper.doi && <a href={paper.doi.startsWith("http") ? paper.doi : `https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer">DOI <ArrowUpRight size={14} /></a>}
                  {paper.pdf && <a href={paper.pdf} target="_blank" rel="noreferrer">PDF <ArrowUpRight size={14} /></a>}
                  {paper.project && <a href={paper.project} target="_blank" rel="noreferrer">{copy.project[lang]} <ArrowUpRight size={14} /></a>}
                </div>
              </article>
            ))}
            {visiblePapers.length === 0 && <p className="empty-state">{copy.emptyPapers[lang]}</p>}
          </div>
        </section>

        <section className="content-section section-wrap education-section" id="education">
          <SectionHeading number="03" title={copy.education[lang]} subtitle={copy.educationSubtitle[lang]} />
          <div className="timeline">
            {visibleEducation.map((item) => (
              <article className="timeline-item" key={item.id}>
                <div className="timeline-date">{t(item.period, lang)}</div>
                <div className="timeline-marker"><span /></div>
                <div className="timeline-content">
                  <h3>{t(item.title, lang)}</h3>
                  <p className="timeline-place">{t(item.organization, lang)}</p>
                  {item.description && <p>{t(item.description, lang)}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section section-wrap gallery-section" id="gallery">
          <SectionHeading number="04" title={copy.gallery[lang]} subtitle={copy.gallerySubtitle[lang]} />
          <div className="gallery-grid">
            {visibleGallery.map((item) => (
              <a className="gallery-item" href={item.image} target="_blank" rel="noreferrer" key={item.id}>
                <img src={item.image || "/images/project-placeholder.svg"} alt={t(item.alt, lang) || t(item.caption, lang)} loading="lazy" />
                <div className="gallery-caption"><span>{t(item.caption, lang)}</span><ArrowUpRight size={16} /></div>
              </a>
            ))}
          </div>
        </section>

        <section className="contact-band">
          <div className="section-wrap contact-inner">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" />{copy.contactEyebrow[lang]}</p>
              <h2>{copy.contactTitle[lang]}</h2>
              <p>{copy.contactDescription[lang]}</p>
            </div>
            <div className="contact-actions">
              {profile.email && <a className="button button-light" href={`mailto:${profile.email}`}><Mail size={16} /> {profile.email}</a>}
              {profile.github && <a className="contact-social" href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a>}
              {profile.scholar && <a className="contact-social" href={profile.scholar} target="_blank" rel="noreferrer">Google Scholar <ArrowUpRight size={14} /></a>}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <a className="wordmark" href="#home"><span className="wordmark-dot" />{site.name}</a>
        <span>© {new Date().getFullYear()} {site.name}. {copy.footer[lang]}</span>
        <a href="#home" className="back-top">{copy.backToTop[lang]} ↑</a>
      </footer>
    </div>
  );
}

function SectionHeading({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="section-heading">
      <div className="section-heading-title"><span className="section-number">{number}</span><h2>{title}</h2></div>
      <p>{subtitle}</p>
    </div>
  );
}

export default App;
