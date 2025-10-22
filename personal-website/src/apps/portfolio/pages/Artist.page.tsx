import React, { useEffect, useState, useRef } from 'react';
import { IconPlayerPlayFilled, IconPlayerPauseFilled, IconChevronDown, IconChevronUp, IconUser } from '@tabler/icons-react';
import { songs, type Song, pageContent, gamesProjects, otherProjects, upcomingContent, type UpcomingItem } from '../data/content';
import { MusicPlayerModal } from './MusicPlayerModal';
import { About } from '../components/About/About';
import { AuthModal } from '../components/Auth/AuthModal';
import { ProfileSidebar } from '../components/Auth/ProfileSidebar';
import { Snackbar } from '../components/Snackbar/Snackbar';
import { InstagramBanner } from '../components/InstagramBanner/InstagramBanner';
import { useAuth } from '../contexts/AuthContext';
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
  const [isInstagram, setIsInstagram] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { user, loading, login, logout } = useAuth();

  // Detect Instagram browser
  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsInstagram(/Instagram/.test(userAgent));
  }, []);

  // Initial scroll position on mount
  useEffect(() => {
    // Scroll to position where title is at 2/3 of upper half (33vh from top)
    // Hero header is 60vh, title at bottom, so scroll down by ~27vh
    const scrollToPosition = window.innerHeight * 0.27;
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

  return (
    <div className={classes.artistPage}>
      {/* Instagram Banner */}
      {isInstagram && <InstagramBanner />}

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

      {/* Desktop Sidebar Player */}
      <aside className={classes.desktopSidebar}>
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
        ) : (
          <div className={classes.sidebarContent}>
            {/* About Section */}
            <About
              image={pageContent.about.image}
              ranking={pageContent.about.ranking}
              name={pageContent.about.name}
              verified={pageContent.about.verified}
              stats={pageContent.about.stats}
              bio={pageContent.about.bio}
              isFollowing={pageContent.about.isFollowing}
              onFollowToggle={handleFollowClick}
            />
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className={classes.mainContent}>
      {/* Sticky Header */}
      <header
        className={classes.stickyHeader}
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
          {/* Social Media Section */}
          <section className={classes.socialSection}>
            <button
              className={classes.primaryPlayButton}
              onClick={handlePlayFirstSong}
              aria-label={currentSong?.audioSrc === songs[0]?.audioSrc && isPlaying ? 'Pause' : 'Play'}
            >
              {currentSong?.audioSrc === songs[0]?.audioSrc && isPlaying ? (
                <IconPlayerPauseFilled size={24} />
              ) : (
                <IconPlayerPlayFilled size={24} />
              )}
            </button>
            <button className={classes.followButton} onClick={handleFollowClick}>Follow</button>
            <div className={classes.socialIcons}>
              <a
                href="https://www.instagram.com/jeffguo.md"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialIcon}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>JEFFGUO.md</span>
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
                <span>JEFFGUO.md</span>
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
                href="https://www.youtube.com/@jeffgwoah"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.socialIcon}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
            </div>
          </section>

          {/* Music Section */}
          <section id="music" className={classes.section}>
            <h2>Music</h2>
            <div className={classes.songList}>
              {songs.map((song, index) => (
                <div
                  key={song.audioSrc}
                  className={`${classes.songRow} ${
                    currentSong?.audioSrc === song.audioSrc && isPlaying
                      ? classes.songRowActive
                      : ''
                  }`}
                  onClick={() => handleSongClick(song)}
                >
                  <div className={classes.songNumberContainer}>
                    {currentSong?.audioSrc === song.audioSrc && isPlaying ? (
                      <div className={classes.playingIndicator}>
                        <div className={classes.bar}></div>
                        <div className={classes.bar}></div>
                        <div className={classes.bar}></div>
                      </div>
                    ) : (
                      <>
                        <span className={classes.songNumber}>{index + 1}</span>
                        <IconPlayerPlayFilled className={classes.songPlayIcon} size={16} />
                      </>
                    )}
                  </div>
                  <img
                    src={song.coverImage}
                    alt={`${song.title} cover`}
                    className={classes.songCover}
                  />
                  <div className={classes.songInfo}>
                    <span className={classes.songTitle}>{song.title}</span>
                    <span className={classes.songArtist}>{song.artist}</span>
                  </div>
                  <span className={classes.songDuration}>
                    {currentSong?.audioSrc === song.audioSrc && duration ? formatTime(duration) : ''}
                  </span>
                </div>
              ))}
            </div>
          </section>

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
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section id="upcoming" className={classes.section}>
            <h2>Upcoming</h2>
            <div className={classes.upcomingList}>
              {upcomingContent.map((item, index) => (
                <div key={index} className={classes.upcomingItem}>
                  {item.imageSrc && (
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className={classes.upcomingThumbnail}
                    />
                  )}
                  <div className={classes.upcomingInfo}>
                    <div className={classes.upcomingHeader}>
                      <h3 className={classes.upcomingTitle}>{item.title}</h3>
                    </div>
                    {item.subtitle && (
                      <p className={classes.upcomingSubtitle}>{item.subtitle}</p>
                    )}
                    <p className={classes.upcomingDescription}>{item.description}</p>
                    <span className={classes.upcomingRelease}>{item.releaseInfo}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="about" className={classes.section}>
            <About
              image={pageContent.about.image}
              ranking={pageContent.about.ranking}
              name={pageContent.about.name}
              verified={pageContent.about.verified}
              stats={pageContent.about.stats}
              bio={pageContent.about.bio}
              isFollowing={pageContent.about.isFollowing}
              onFollowToggle={handleFollowClick}
            />
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
