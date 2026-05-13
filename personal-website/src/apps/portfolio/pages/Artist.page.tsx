import React, { useEffect, useState, useRef } from 'react';
import { IconPlayerPlayFilled, IconPlayerPauseFilled, IconChevronDown, IconChevronUp, IconUser } from '@tabler/icons-react';
import { songs, type Song, pageContent, gamesProjects, otherProjects, experienceItems, educationItems, skillsData } from '../data/content';
import { MusicPlayerModal } from './MusicPlayerModal';
import { About } from '../components/About/About';
import { AuthModal } from '../components/Auth/AuthModal';
import { ProfileSidebar } from '../components/Auth/ProfileSidebar';
import { Snackbar } from '../components/Snackbar/Snackbar';
import { useAuth } from '../contexts/AuthContext';
import { useInstagramData } from '../hooks/useInstagramData';
import classes from './Artist.module.css';

export function ArtistPage() {
  const [scrollY, setScrollY] = useState(0);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [lyricsExpanded, setLyricsExpanded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { user, loading, login, logout } = useAuth();
  const { media: instagramMedia, loading: igLoading } = useInstagramData();
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [contentSort, setContentSort] = useState<'popular' | 'recent'>('popular');
  const [contentLimit, setContentLimit] = useState(5);

  // Initial scroll position on mount
  useEffect(() => {
    // Scroll to position where title is at 2/3 of upper half (33vh from top)
    // Hero header is 60vh, title at bottom, so scroll down by ~27vh
    const scrollToPosition = window.innerHeight * 0.15;
    window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Show sticky header when title is out of view
      // Assuming header is about 60vh, title is at bottom, so roughly 50vh
      const titleOutOfView = currentScrollY > window.innerHeight * 0.5;
      setShowStickyHeader(titleOutOfView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Audio playback effect
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  // Track audio time and duration
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    // Set initial values
    setDuration(audio.duration || 0);
    setCurrentTime(audio.currentTime || 0);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentSong]);

  const handleSongClick = (song: Song) => {
    if (currentSong?.audioSrc === song.audioSrc) {
      // Toggle play/pause for the same song
      setIsPlaying(!isPlaying);
    } else {
      // Play a new song
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Calculate overlay opacity based on scroll (0.3 to 0.8)
  const overlayOpacity = Math.min(0.3 + scrollY / 1000, 0.8);

  const openFullPlayer = () => {
    if (!currentSong) return;
    setIsPlayerModalOpen(true);
  };

  const handleProfileClick = () => {
    if (user) {
      setIsProfileSidebarOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = async (userId: string) => {
    await login(userId);
    setIsAuthModalOpen(false);
    setIsProfileSidebarOpen(true);
  };

  const handleLogout = async () => {
    await logout();
    setIsProfileSidebarOpen(false);
  };

  const handleFollowClick = () => {
    setSnackbarMessage('follow feature on the way,\nstay tuned to claim your day one card');
    setSnackbarOpen(true);
  };

  const handlePlayFirstSong = () => {
    const firstSong = songs[0];
    if (!firstSong) return;

    if (currentSong?.audioSrc === firstSong.audioSrc) {
      // Toggle play/pause if first song is already loaded
      setIsPlaying(!isPlaying);
    } else {
      // Play the first song
      setCurrentSong(firstSong);
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatCount = (n: number | undefined) => {
    if (n == null) return '—';
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toString();
  };

  const togglePost = (id: string) => {
    setExpandedPostId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={classes.artistPage}>
      {/* Floating Profile Icon */}
      {/* <button
        className={classes.profileIconButton}
        onClick={handleProfileClick}
        aria-label={user ? 'Open profile' : 'Sign in'}
      >
        {user?.profile_picture_url ? (
          <img
            src={user.profile_picture_url}
            alt={user.name}
            className={classes.profileIconImage}
          />
        ) : (
          <IconUser size={24} className={classes.profileIconPlaceholder} />
        )}
      </button> */}

      {/* Desktop Sidebar Player — only visible when a song is playing */}
      <aside className={`${classes.desktopSidebar} ${currentSong ? classes.sidebarVisible : ''}`}>
        {currentSong ? (
          <div className={classes.sidebarContent}>
            {/* Album Cover */}
            <img
              src={currentSong.coverImage}
              alt={`${currentSong.title} cover`}
              className={classes.sidebarAlbumCover}
            />

            {/* Song Info */}
            <div className={classes.sidebarSongInfo}>
              <h3 className={classes.sidebarTitle}>{currentSong.title}</h3>
              <p className={classes.sidebarArtist}>{currentSong.artist}</p>
            </div>

            {/* Timeline */}
            <div className={classes.sidebarTimeline}>
              <span className={classes.sidebarTimeText}>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className={classes.sidebarProgressBar}
              />
              <span className={classes.sidebarTimeText}>{formatTime(duration)}</span>
            </div>

            {/* Lyrics Section */}
            {currentSong.lyrics && (
              <div className={classes.sidebarSection}>
                <div className={classes.lyricsContainer}>
                  <div className={classes.lyricsHeader}>
                    <h4 className={classes.sidebarSectionTitle}>Lyrics</h4>
                    <button
                      className={classes.expandButton}
                      onClick={() => setLyricsExpanded(!lyricsExpanded)}
                    >
                      {lyricsExpanded ? (
                        <IconChevronUp size={20} />
                      ) : (
                        <IconChevronDown size={20} />
                      )}
                    </button>
                  </div>
                  <div
                    className={`${classes.sidebarLyrics} ${!lyricsExpanded ? classes.sidebarLyricsCollapsed : ''}`}
                  >
                    {currentSong.lyrics.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < currentSong.lyrics.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reels Section (Placeholder) */}
            <div className={classes.sidebarSection}>
              <div className={classes.reelsContainer}>
                <h4 className={classes.sidebarSectionTitle}>Reels</h4>
                <p className={classes.sidebarPlaceholder}>No reels yet</p>
              </div>
            </div>
          </div>
        ) : null}
      </aside>

      {/* Main Content */}
      <div className={`${classes.mainContent} ${currentSong ? classes.mainContentShifted : ''}`}>
      {/* Sticky Header */}
      <header
        className={`${classes.stickyHeader} ${currentSong ? classes.stickyHeaderShifted : ''}`}
        style={{ opacity: showStickyHeader ? 1 : 0 }}
      >
        <div className={classes.stickyHeaderContent}>
          <h2>JEFFGUO.md</h2>
        </div>
      </header>

      {/* Hero Header Section */}
      <section className={classes.heroHeader}>
        <div className={classes.backgroundImage} />
        <div
          className={classes.overlay}
          style={{ opacity: overlayOpacity }}
        />
        <div className={classes.headerContent}>
          <h1 className={classes.title}>JEFFGUO.md</h1>
        </div>
      </section>

      {/* Dark Content Container */}
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          {/* Social Icons */}
          <section className={classes.socialSection}>
            <div className={classes.socialIcons}>
              <a
                href={pageContent.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialIcon}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>JeffGuo-06</span>
              </a>
              <a
                href={pageContent.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialIcon}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>guo-jeff</span>
              </a>
              <a
                href="https://www.instagram.com/jeffguo.md"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialIcon}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>jeffguo.md</span>
              </a>
              <a
                href="https://www.tiktok.com/@jeffguo.md"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialIcon}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <span>jeffguo.md</span>
              </a>
              <a
                href="https://twitter.com/jeffgwoah"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialIcon}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>jeffgwoah</span>
              </a>
              <a
                href="mailto:jeffguo.06@gmail.com"
                className={classes.socialIcon}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>jeffguo.06@gmail.com</span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.resumeLink}
              >
                Resume
              </a>
            </div>
          </section>

          {/* Intro Bio */}
          <p className={classes.introBio}>{pageContent.intro.bio}</p>

          {/* Education Section */}
          <section id="education" className={classes.section}>
            <h2>Education</h2>
            <div className={classes.experienceList}>
              {educationItems.map((item) => (
                <div key={item.school} className={classes.experienceItem}>
                  <div className={classes.experienceHeader}>
                    <div className={classes.experienceRole}>
                      <h3 className={classes.experienceTitle}>{item.school}</h3>
                      <span className={classes.experienceCompany}>
                        {item.program}{item.gpa && ` — ${item.gpa} GPA`}
                      </span>
                    </div>
                    <div className={classes.experienceMeta}>
                      <span className={classes.experienceDate}>{item.dateRange}</span>
                      <span className={classes.experienceLocation}>{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className={classes.section}>
            <h2>Experience</h2>
            <div className={classes.experienceList}>
              {experienceItems.map((item) => (
                <div key={`${item.company}-${item.role}`} className={classes.experienceItem}>
                  <div className={classes.experienceHeader}>
                    <div className={classes.experienceRole}>
                      <h3 className={classes.experienceTitle}>{item.role}</h3>
                      <span className={classes.experienceCompany}>
                        {item.companyLink ? (
                          <a href={item.companyLink} target="_blank" rel="noopener noreferrer">
                            {item.company}
                          </a>
                        ) : (
                          item.company
                        )}
                      </span>
                    </div>
                    <div className={classes.experienceMeta}>
                      <span className={classes.experienceDate}>{item.dateRange}</span>
                      {item.location && (
                        <span className={classes.experienceLocation}>{item.location}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className={classes.section}>
            <h2>Projects</h2>
            <div className={classes.projectsList}>
              {otherProjects.map((project) => (
                <a
                  key={project.title}
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.projectItem}
                >
                  <img
                    src={project.imageSrc}
                    alt={project.title}
                    className={classes.projectThumbnail}
                  />
                  <div className={classes.projectInfo}>
                    <h3 className={classes.projectTitle}>{project.title}</h3>
                    {project.subtitle && (
                      <p className={classes.projectSubtitle}>{project.subtitle}</p>
                    )}
                    <div className={classes.techTags}>
                      {project.tech.map((t) => (
                        <span key={t} className={classes.techTag}>{t}</span>
                      ))}
                    </div>
                    <p className={classes.projectDescription}>{project.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Content Section */}
          <section id="content" className={classes.section}>
            <div className={classes.contentHeader}>
              <h2>Content</h2>
              <div className={classes.contentSortButtons}>
                <button
                  className={`${classes.sortButton} ${contentSort === 'popular' ? classes.sortButtonActive : ''}`}
                  onClick={() => { setContentSort('popular'); setContentLimit(5); }}
                >
                  Popular
                </button>
                <button
                  className={`${classes.sortButton} ${contentSort === 'recent' ? classes.sortButtonActive : ''}`}
                  onClick={() => { setContentSort('recent'); setContentLimit(5); }}
                >
                  Recent
                </button>
              </div>
            </div>
            {igLoading ? (
              <p className={classes.comingSoonText}>Loading...</p>
            ) : (
              <>
                <div className={classes.contentList}>
                  {[...instagramMedia]
                    .sort((a, b) =>
                      contentSort === 'popular'
                        ? (b.views ?? b.like_count) - (a.views ?? a.like_count)
                        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
                    )
                    .slice(0, contentLimit)
                    .map((post) => {
                      const isExpanded = expandedPostId === post.id;
                      const caption = post.caption || '';
                      const truncatedCaption = caption.length > 80 ? caption.slice(0, 80) + '...' : caption;

                      return (
                        <div key={post.id} className={classes.contentItem}>
                          <button
                            className={classes.contentTile}
                            onClick={() => togglePost(post.id)}
                          >
                            <img
                              src={post.thumbnail_url || post.media_url}
                              alt={caption}
                              className={classes.contentThumbnail}
                            />
                            <div className={classes.contentOverlay}>
                              {post.views != null && (
                                <span className={classes.contentViewCount}>
                                  <IconPlayerPlayFilled size={14} />
                                  {formatCount(post.views)}
                                </span>
                              )}
                            </div>
                          </button>
                          {isExpanded && (
                            <div className={classes.contentExpanded}>
                              {post.media_type === 'VIDEO' ? (
                                <video
                                  src={post.media_url}
                                  controls
                                  className={classes.contentVideo}
                                  playsInline
                                />
                              ) : (
                                <img
                                  src={post.media_url}
                                  alt={caption}
                                  className={classes.contentExpandedImage}
                                />
                              )}
                              <p className={classes.contentCaption}>{caption}</p>
                              <a
                                href={post.permalink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.contentLink}
                              >
                                View on Instagram
                              </a>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
                {contentLimit < instagramMedia.length && (
                  <button
                    className={classes.showMoreButton}
                    onClick={() => setContentLimit((prev) => prev + 5)}
                  >
                    Show more
                  </button>
                )}
              </>
            )}
          </section>

          {/* Games Section */}
          <section id="games" className={classes.section}>
            <h2>Games</h2>
            <div className={classes.projectsList}>
              {gamesProjects.map((game) => (
                <a
                  key={game.title}
                  href={game.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.projectItem}
                >
                  <img
                    src={game.imageSrc}
                    alt={game.title}
                    className={classes.projectThumbnail}
                  />
                  <div className={classes.projectInfo}>
                    <h3 className={classes.projectTitle}>{game.title}</h3>
                    {game.subtitle && (
                      <p className={classes.projectSubtitle}>{game.subtitle}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className={classes.ctaSection}>
            <h2 className={classes.ctaTitle}>{pageContent.cta.title}</h2>
            <p className={classes.ctaDescription}>{pageContent.cta.description}</p>
            <div className={classes.ctaButtons}>
              <a href={`mailto:${pageContent.socials.email}`} className={classes.ctaPrimary}>
                Get in touch
              </a>
              <a href={pageContent.socials.linkedin} target="_blank" rel="noopener noreferrer" className={classes.ctaSecondary}>
                LinkedIn
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Footer Music Player */}
      {currentSong && (
        <div className={classes.footerPlayer} onClick={openFullPlayer}>
          <div className={classes.footerPlayerContent}>
            <div className={classes.footerSongInfo}>
              <img
                src={currentSong.coverImage}
                alt={`${currentSong.title} cover`}
                className={classes.footerCover}
              />
              <div className={classes.footerText}>
                <div className={classes.footerTitle}>{currentSong.title}</div>
                <div className={classes.footerArtist}>{currentSong.artist}</div>
              </div>
            </div>
            <div className={classes.footerControls}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
                className={classes.playButton}
              >
                {isPlaying ? (
                  <IconPlayerPauseFilled size={24} />
                ) : (
                  <IconPlayerPlayFilled size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden audio element */}
      <audio ref={audioRef} src={currentSong?.audioSrc} />

      {/* Music Player Modal (Mobile) */}
      {isPlayerModalOpen && currentSong && (
        <MusicPlayerModal
          title={currentSong.title}
          artist={currentSong.artist}
          coverImage={currentSong.coverImage}
          audioRef={audioRef}
          isPlaying={isPlaying}
          lyrics={currentSong.lyrics}
          onTogglePlayPause={togglePlayPause}
          onClose={() => setIsPlayerModalOpen(false)}
        />
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Profile Sidebar */}
      {isProfileSidebarOpen && user && (
        <ProfileSidebar
          user={user}
          onClose={() => setIsProfileSidebarOpen(false)}
          onLogout={handleLogout}
        />
      )}

      {/* Snackbar */}
      <Snackbar
        message={snackbarMessage}
        isOpen={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
      </div>
    </div>
  );
}
