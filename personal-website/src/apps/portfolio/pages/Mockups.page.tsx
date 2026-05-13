import { useState } from 'react';
import { pageContent, educationItems, experienceItems, otherProjects, gamesProjects } from '../data/content';
import { useInstagramData } from '../hooks/useInstagramData';
import classes from './Mockups.module.css';

const NAV_ITEMS = [
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'content', label: 'Content' },
  { id: 'games', label: 'Games' },
];

// Highlight colors for each item title
const EDUCATION_COLORS: Record<string, string> = {
  'University of Waterloo': '#ffd000',
};

const EXPERIENCE_COLORS: Record<string, string> = {
  'Inductive Solution': '#a8d4ff',
  '@jeffguo.md': '#ffb6d9',
  'Opusense (YC X25)': '#ffd000',
};

const PROJECT_COLORS: Record<string, string> = {
  'The Boards': '#ffd000',
  'Insu': '#a8d4ff',
  'IMitate': '#ffb6d9',
  'SHOUT': '#ffd000',
};

const GAME_COLORS: Record<string, string> = {
  'Property Higher or Lower?': '#c8c8c8',
  'Nailongify': '#ffb6d9',
};

export function MockupsPage() {
  const { media: instagramMedia, loading: igLoading } = useInstagramData();
  const [contentLimit, setContentLimit] = useState(9);

  // Aggregate stats
  const totalViews = instagramMedia.reduce((sum, p) => sum + (p.views ?? 0), 0);
  const totalLikes = instagramMedia.reduce((sum, p) => sum + (p.like_count ?? 0), 0);
  const totalShares = instagramMedia.reduce((sum, p) => sum + (p.shares ?? 0), 0);

  const formatNum = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K+`;
    return n.toString();
  };

  return (
    <div className={classes.page}>
      {/* Sidebar */}
      <aside className={classes.sidebar}>
        <div className={classes.sidebarInner}>
          <div className={classes.sidebarIdentity}>
            <h2 className={classes.sidebarName}>Jeff Guo</h2>
            <p className={classes.sidebarRole}>SWE | Toronto</p>
          </div>

          <nav className={classes.sidebarNav}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={classes.navLink}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={classes.sidebarSocials}>
            <a href={pageContent.socials.github} target="_blank" rel="noopener noreferrer" className={classes.socialLink}>GitHub</a>
            <a href={pageContent.socials.linkedin} target="_blank" rel="noopener noreferrer" className={classes.socialLink}>LinkedIn</a>
            <a href={`mailto:${pageContent.socials.email}`} className={classes.socialLink}>Email</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={classes.socialLink}>Resume</a>
          </div>

        </div>
      </aside>

      {/* Main content */}
      <main className={classes.main}>
        <header className={classes.header}>
          <h1 className={classes.name}>Jeff Guo</h1>
          <p className={classes.role}>SWE | Toronto</p>
          <p className={classes.bio}>
            <a
              href="#education"
              className={classes.bioHighlight}
              style={{ '--hl-color': '#ffd000' } as React.CSSProperties}
              onClick={(e) => { e.preventDefault(); document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' }); }}
            >Math @ Waterloo</a>
            . Shipped{' '}
            <a
              href="#projects"
              className={classes.bioHighlight}
              style={{ '--hl-color': '#a8d4ff' } as React.CSSProperties}
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            >iOS apps</a>
            . 4.3M views on{' '}
            <a
              href="#content"
              className={classes.bioHighlight}
              style={{ '--hl-color': '#ffb6d9' } as React.CSSProperties}
              onClick={(e) => { e.preventDefault(); document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' }); }}
            >tech content</a>
            . Looking for fall 2026 SWE roles.
          </p>
        </header>

        {/* Education */}
        <section id="education" className={classes.section}>
          <h2 className={classes.sectionTitle}>Education</h2>
          <div className={classes.itemList}>
            {educationItems.map((item) => (
              <div key={item.school} className={classes.item}>
                <div className={classes.itemHeader}>
                  <div>
                    <div className={classes.titleWrap}>
                      <h3
                        className={classes.highlightTitle}
                        style={{ '--hl-color': EDUCATION_COLORS[item.school] || '#ffd000' } as React.CSSProperties}
                      >
                        {item.school}
                      </h3>
                    </div>
                    <p className={classes.itemSub}>{item.program}{item.gpa && ` — ${item.gpa} GPA`}</p>
                  </div>
                  <div className={classes.itemMeta}>
                    <span>{item.dateRange}</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className={classes.section}>
          <h2 className={classes.sectionTitle}>Experience</h2>
          <div className={classes.itemList}>
            {experienceItems.map((item) => (
              <div key={`${item.company}-${item.role}`} className={classes.item}>
                <div className={classes.itemHeader}>
                  <div>
                    <div className={classes.titleWrap}>
                      <h3
                        className={classes.highlightTitle}
                        style={{ '--hl-color': EXPERIENCE_COLORS[item.company] || '#ffd000' } as React.CSSProperties}
                      >
                        {item.role}
                      </h3>
                    </div>
                    <p className={classes.itemSub}>
                      {item.companyLink ? (
                        <a href={item.companyLink} target="_blank" rel="noopener noreferrer" className={classes.itemLink}>
                          {item.company}
                        </a>
                      ) : (
                        item.company
                      )}
                    </p>
                  </div>
                  <div className={classes.itemMeta}>
                    <span>{item.dateRange}</span>
                    {item.location && <span>{item.location}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className={classes.section}>
          <h2 className={classes.sectionTitle}>Projects</h2>
          <div className={classes.projectGrid}>
            {otherProjects.map((project) => (
              <a
                key={project.title}
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.projectCard}
              >
                <img src={project.imageSrc} alt={project.title} className={classes.projectImage} />
                <div className={classes.projectBody}>
                  <div className={classes.titleWrap}>
                    <h3
                      className={classes.highlightTitle}
                      style={{ '--hl-color': PROJECT_COLORS[project.title] || '#ffd000' } as React.CSSProperties}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <span className={classes.projectTech}>{project.tech.join(' / ')}</span>
                  <p className={classes.projectDesc}>{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Content */}
        <section id="content" className={classes.section}>
          <h2 className={classes.sectionTitle}>Content</h2>

          {igLoading ? (
            <p className={classes.loadingText}>Loading...</p>
          ) : (
            <>
              <p className={classes.statLine}>
                find me at{' '}
                <a href="https://www.instagram.com/jeffguo.md" target="_blank" rel="noopener noreferrer" className={classes.statLink} style={{ '--hl-color': '#ffb6d9' } as React.CSSProperties}>@jeffguo.md</a>
                {' '}on instagram · {formatNum(totalViews)} views · {formatNum(totalLikes)} likes · {formatNum(totalShares)} shares
              </p>
              <div className={classes.contentGrid}>
                {[...instagramMedia]
                  .sort((a, b) => (b.views ?? b.like_count) - (a.views ?? a.like_count))
                  .slice(0, contentLimit)
                  .map((post) => (
                    <a
                      key={post.id}
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.contentTile}
                    >
                      <img
                        src={post.thumbnail_url || post.media_url}
                        alt={post.caption || ''}
                        className={classes.contentTileImage}
                      />
                      {post.views != null && (
                        <span className={classes.tileViewCount}>
                          <svg viewBox="0 0 24 24" fill="currentColor" className={classes.viewIcon}>
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                          </svg>
                          {post.views >= 1_000_000
                            ? `${(post.views / 1_000_000).toFixed(1)}M`
                            : post.views >= 1_000
                              ? `${(post.views / 1_000).toFixed(1)}K`
                              : post.views}
                        </span>
                      )}
                    </a>
                  ))}
              </div>
              {contentLimit < instagramMedia.length && (
                <button
                  className={classes.showMoreBtn}
                  onClick={() => setContentLimit((prev) => prev + 9)}
                >
                  Show more
                </button>
              )}
            </>
          )}
        </section>

        {/* Games */}
        <section id="games" className={classes.section}>
          <h2 className={classes.sectionTitle}>Games</h2>
          <div className={classes.projectGrid}>
            {gamesProjects.map((game) => (
              <a
                key={game.title}
                href={game.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.projectCard}
              >
                <img src={game.imageSrc} alt={game.title} className={classes.projectImage} />
                <div className={classes.projectBody}>
                  <div className={classes.titleWrap}>
                    <h3
                      className={classes.highlightTitle}
                      style={{ '--hl-color': GAME_COLORS[game.title] || '#ffd000' } as React.CSSProperties}
                    >
                      {game.title}
                    </h3>
                  </div>
                  {game.subtitle && <p className={classes.projectDesc}>{game.subtitle}</p>}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className={classes.cta}>
          <h2 className={classes.ctaTitle}>{pageContent.cta.title}</h2>
          <p className={classes.ctaDesc}>{pageContent.cta.description}</p>
          <div className={classes.ctaButtons}>
            <a href={`mailto:${pageContent.socials.email}`} className={classes.ctaButton}>Get in touch</a>
            <a href={pageContent.socials.linkedin} target="_blank" rel="noopener noreferrer" className={classes.ctaButtonSecondary}>LinkedIn</a>
          </div>
        </section>
      </main>
    </div>
  );
}
