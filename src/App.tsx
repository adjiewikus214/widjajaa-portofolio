import { useEffect, useMemo, useState, type ReactElement } from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import { portfolio } from './content'
import './App.css'
import 'react-github-calendar/tooltips.css'

type Theme = 'light' | 'dark'

const currentYear = new Date().getFullYear()

function App() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [articleFilter, setArticleFilter] = useState('ALL')
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const visibleArticles = useMemo(
    () => portfolio.articles.filter((article) => articleFilter === 'ALL' || article.category === articleFilter),
    [articleFilter],
  )

  const searchResults = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return []
    const items: { label: string; kind: string; href: string }[] = []
    portfolio.projects.forEach((project) => items.push({ label: project.title, kind: 'PROJECT', href: '#projects' }))
    portfolio.articles.forEach((article) => items.push({ label: article.title, kind: 'ARTICLE', href: '#articles' }))
    portfolio.faqs.forEach((faq) => items.push({ label: faq.question, kind: 'FAQ', href: '#faq' }))
    return items.filter((item) => item.label.toLowerCase().includes(needle)).slice(0, 8)
  }, [query])

  useEffect(() => {
    if (!searchOpen) return undefined
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [searchOpen])

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onShortcut)
    return () => window.removeEventListener('keydown', onShortcut)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      // Theme still applies for this visit when storage is unavailable.
    }
  }, [theme])

  return (
    <div className="shell">
      <header className="nav">
        <div className="nav-inner">
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#top" className="nav-link">Home</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#articles" className="nav-link">Blog</a>
          </nav>
          <div className="nav-actions">
            <button type="button" className="search-pill" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
              <span className="search-label">Search...</span>
              <span className="kbd">⌘K</span>
            </button>
            <span className="nav-divider" aria-hidden="true" />
            <button
              type="button"
              className="icon-button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <Hero />
        <section className="projects" id="projects" aria-labelledby="projects-heading">
          <SectionHeading title="PROJECTS" id="projects-heading" />
          <p className="section-intro">Selected work focused on performance and user experience.</p>
          <div className="project-list">
            {portfolio.projects.map((project) => (
              <article className="project" key={project.title}>
                <div className="project-art" data-art={project.art} aria-hidden="true">
                  <span className="art-line" />
                  <span className="art-line" />
                  <span className="art-line" />
                </div>
                <div className="project-body">
                  <div className="project-head">
                    <h3>{project.title}</h3>
                    <span className="status"><span className="status-dot" />{project.status}</span>
                  </div>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-foot">
                    <ul className="tag-row">
                      {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                    <span className="project-duration">{project.duration}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience" id="experience" aria-labelledby="experience-heading">
          <SectionHeading title="EXPERIENCE" id="experience-heading" />
          <div className="timeline">
            {portfolio.experience.map((item) => (
              <article className="timeline-item" key={item.title}>
                <div className="timeline-head">
                  <span className="timeline-label">{item.label}</span>
                  <h3>{item.title}</h3>
                  <span className="timeline-meta">{item.meta}</span>
                  <span className="timeline-kind">{item.kind}</span>
                </div>
                <ul className="timeline-lines">
                  {item.lines.map((line) => <li key={line}>{line}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="articles" id="articles" aria-labelledby="articles-heading">
          <SectionHeading title="BLOG" id="articles-heading" />
          <div className="filter-row" role="group" aria-label="Filter articles">
            {['ALL', ...new Set(portfolio.articles.map((article) => article.category))].map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter${articleFilter === filter ? ' is-active' : ''}`}
                aria-pressed={articleFilter === filter}
                onClick={() => setArticleFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="article-list" aria-live="polite">
            {visibleArticles.map((article) => (
              <article className="article" key={article.title}>
                <div className="article-art" data-art={article.art} aria-hidden="true">
                  <span className="art-line" />
                  <span className="art-line" />
                </div>
                <div className="article-body">
                  <div className="article-meta">
                    <span>{article.category}</span>
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about" id="about" aria-labelledby="about-heading">
          <SectionHeading title="ABOUT ME" id="about-heading" />
          {portfolio.about.paragraphs.map((paragraph) => (
            <p className="about-paragraph" key={paragraph}>{paragraph}</p>
          ))}
          <dl className="fact-grid">
            {portfolio.about.facts.map((fact) => (
              <div className="fact" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="stack" id="stack" aria-labelledby="stack-heading">
          <SectionHeading title="TECH STACK" id="stack-heading" />
          <p className="section-intro">A practical toolset for building and shipping maintainable products.</p>
          <div className="stack-grid">
            {portfolio.stack.map((group) => (
              <div className="stack-group" key={group.group}>
                <h3>{group.group}</h3>
                <ul className="tag-row">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="faq" aria-labelledby="faq-heading">
          <SectionHeading title="GENERAL INQUIRIES" id="faq-heading" />
          <div className="faq-list">
            {portfolio.faqs.map((faq, index) => (
              <div className="faq-item" key={faq.question}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {faq.question}
                  <ChevronIcon open={openFaq === index} />
                </button>
                {openFaq === index && <p className="faq-answer">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="collaborate" id="contact" aria-labelledby="collaborate-heading">
          <h2 id="collaborate-heading">LET&apos;S COLLABORATE</h2>
          <p>I&apos;m currently available for new projects. Add your own availability in <code>src/content.ts</code>.</p>
          <a className="button button-primary" href={`mailto:${portfolio.email}`}>
            <MailIcon /> Send Email
          </a>
        </section>
      </main>

      <footer className="footer">
        <div>
          <p className="footer-name">{portfolio.name}</p>
          <p className="footer-role">{portfolio.role}</p>
        </div>
        <div className="footer-links">
          {portfolio.socials.map((social) => (
            <a key={social.label} href={social.href || '#top'} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
          <a href="#top">Back to top</a>
        </div>
        <p className="footer-legal">© {currentYear} {portfolio.name}. All rights reserved.</p>
      </footer>

      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search">
          <button
            type="button"
            className="search-backdrop"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          />
          <div className="search-panel">
            <div className="search-field">
              <SearchIcon />
              <input
                type="search"
                placeholder="Search projects, articles, FAQs..."
                aria-label="Search projects, articles, FAQs"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoFocus
              />
              <span className="kbd">ESC</span>
            </div>
            <div className="search-results" aria-live="polite">
              {query.trim() === '' && <p className="search-empty">Type to search.</p>}
              {query.trim() !== '' && searchResults.length === 0 && (
                <p className="search-empty">No matches.</p>
              )}
              {searchResults.map((result) => (
                <a
                  key={`${result.kind}-${result.label}`}
                  className="search-result"
                  href={result.href}
                  onClick={() => setSearchOpen(false)}
                >
                  <span className="search-kind">{result.kind}</span>
                  <span className="search-result-label">{result.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" aria-label="Profile">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-top">
          <div className="avatar">
            <div className="avatar-placeholder" role="img" aria-label="Profile placeholder"><span>YN</span></div>
            <span className="avatar-badge" aria-hidden="true">
              <RefreshIcon />
            </span>
          </div>
          <div className="hero-name">
            <h1>I&apos;M {portfolio.name.toUpperCase()}</h1>
            <span className="verified" aria-label="Verified">
              <CheckIcon />
            </span>
            <span className="role">{portfolio.role}</span>
          </div>
        </div>
        <p className="hero-intro">{portfolio.intro}</p>
        <div className="hero-buttons">
          <a className="button button-primary" href={portfolio.scheduleUrl}>
            <CalendarIcon /> Schedule Call
          </a>
          <a className="button button-outline" href={`mailto:${portfolio.email}`}>
            <MailIcon /> Send Email
          </a>
        </div>
        <p className="socials-label">Here are my socials</p>
        <ul className="social-chips">
          {portfolio.socials.map((social) => (
            <li key={social.label}>
              <a className="chip" href={social.href || '#top'} target="_blank" rel="noreferrer">
                <SocialIcon name={social.icon} />
                {social.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="activity">
          <GitHubCalendar
            username={portfolio.githubUsername}
            year="last"
            colorScheme="dark"
            blockSize={11}
            blockMargin={4}
            blockRadius={2}
            fontSize={11}
            tooltips={{
              activity: {
                text: ({ count, date }) => `${count} contribution${count === 1 ? '' : 's'} on ${date}`,
              },
              colorLegend: {
                text: (level) => level === 0 ? 'No contributions' : `Contribution level ${level}`,
              },
            }}
          />
        </div>
      </div>
    </section>
  )
}

function SectionHeading({ title, id }: { title: string; id: string }) {
  return (
    <h2 className="section-heading" id={id}>
      <span className="section-rule" aria-hidden="true" />
      {title}
    </h2>
  )
}

function SearchIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="icon icon-sm" viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 5 5 9-9" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg className="icon icon-sm" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11a8 8 0 1 0-.6 4" />
      <path d="M20 5v6h-6" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg className={`icon icon-sm chevron${open ? ' is-open' : ''}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function SocialIcon({ name }: { name: string }) {
  const paths: Record<string, ReactElement> = {
    github: <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.3-2.5-1-3.5.3-1.2.3-2.4 0-3.5 0 0-1 0-3 1.5a11 11 0 0 0-8 0C6 2 5 2 5 2c-.3 1.1-.3 2.3 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.4.5-.7 1.1-.9 1.7v3.8M9 18c-4.5 2-5-2-7-2" />,
    linkedin: <><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4Z" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" /></>,
    twitter: <path d="M22 5.9c-.7.3-1.5.5-2.4.6a4 4 0 0 0 1.8-2.2c-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.8A11.7 11.7 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5 4 4 0 0 1-1.9-.5 4.1 4.1 0 0 0 3.3 4.1 4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.6c.8-.6 1.5-1.3 2-2.1Z" />,
  }
  return (
    <svg className="icon icon-sm" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name] ?? paths.github}
    </svg>
  )
}

export default App