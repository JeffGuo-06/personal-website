import React, { useRef, useState, useEffect } from 'react';
import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconBrandInstagram,
  IconMailFilled,
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconMusic,
} from '@tabler/icons-react';
import { Flex } from '@/shared/components/layout/Flex';
import { Group } from '@/shared/components/layout/Group';
import { Text } from '@/shared/components/ui/Text';
import { Title } from '@/shared/components/ui/Title';
import { MusicPlayerModal } from './MusicPlayerModal';
import { songs, projects, pageContent, type Song } from '../data/content';
import classes from './Fun.module.css';

// Floating Card Component for 3D hover effect
const FloatingCard: React.FC<{
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
}> = ({ children, href, target, rel, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewButtonRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const x = deltaX / 20;
    const y = deltaY / 20;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    containerRef.current.style.transition = 'none';

    if (viewButtonRef.current && isMouseEntered) {
      const magneticStrength = 0.3;
      const magneticX = deltaX * magneticStrength;
      const magneticY = deltaY * magneticStrength;
      viewButtonRef.current.style.transform = `translate(calc(-50% + ${magneticX}px), calc(-50% + ${magneticY}px))`;
      viewButtonRef.current.style.transition = 'none';
    }
  };

  const handleMouseEnter = () => setIsMouseEntered(true);

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;

    if (viewButtonRef.current) {
      viewButtonRef.current.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      viewButtonRef.current.style.transform = `translate(-50%, -50%)`;
    }
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ textDecoration: 'none' }}
    >
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={classes.floatingCardContainer}
        style={{
          padding: '150px',
          margin: '-150px',
        }}
      >
        <div style={{ padding: '150px', margin: '-150px', position: 'relative' }}>
          {children}
          {isMouseEntered && (
            <div
              ref={viewButtonRef}
              className={classes.magneticViewButton}
            >
              view
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

// Song Row Component for Spotify-style display
const SongRow: React.FC<{
  title: string;
  artist: string;
  coverImage: string;
  audioSrc: string;
  isPlaying: boolean;
  onClick: () => void;
}> = ({ title, artist, coverImage, audioSrc, isPlaying, onClick }) => {
  return (
    <div className={classes.songRow} onClick={onClick}>
      <div className={classes.songRowContent}>
        <img src={coverImage} alt={`${title} cover`} className={classes.songCover} />
        <div className={classes.songInfo}>
          <Text className={classes.songTitle}>{title}</Text>
          <Text className={classes.songArtist}>{artist}</Text>
        </div>
      </div>
      {isPlaying && (
        <div className={classes.playingIndicator}>
          <div className={classes.bar}></div>
          <div className={classes.bar}></div>
          <div className={classes.bar}></div>
        </div>
      )}
    </div>
  );
};

export function FunPage() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [scrollToLyrics, setScrollToLyrics] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Audio playback effect
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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

  const openFullPlayer = () => {
    if (!currentSong) return;
    setScrollToLyrics(false);
    setIsPlayerModalOpen(true);
  };

  const openPlayerToLyrics = () => {
    if (!currentSong) return;
    setScrollToLyrics(true);
    setIsPlayerModalOpen(true);
  };

  return (
    <div className={classes.snapContainer}>
      {/* Navbar */}
      <nav className={`${classes.navbar} ${showNavbar ? classes.navbarVisible : classes.navbarHidden}`}>
        <div className={classes.navbarContent}>
          <button onClick={() => window.location.href = '/'} className={classes.navButton}>
            Back to Business
          </button>
          <button onClick={() => scrollToSection('games')} className={classes.navButton}>
            Games
          </button>
          <button onClick={() => scrollToSection('music')} className={classes.navButton}>
            Music
          </button>
        </div>
      </nav>

      {/* Section 1: Intro */}
      <div className={classes.snapSection}>
        <div className={classes.sectionContent}>
          <div
            className={`${classes.glassCard} ${classes.animateCard}`}
            onMouseEnter={(e) => {
              e.currentTarget.classList.add(classes.liquidActive);
            }}
            onAnimationEnd={(e) => {
              if (e.animationName === 'liquidMove') {
                e.currentTarget.classList.remove(classes.liquidActive);
              }
            }}
          >
            <Flex gap="md" justify="flex-start" align="center" wrap="wrap">
              <Title className={classes.title}>
                {pageContent.intro.name} <span className={classes.divider}>|</span> <span className={classes.role}>{pageContent.intro.role}</span>
              </Title>
              <div className={classes.locationTag}>
                {pageContent.intro.location}
              </div>
            </Flex>

            <Text className={classes.description}>
              {pageContent.intro.description}
            </Text>

            {/* Social Icons */}
            <Group gap="sm" className={classes.contactIcons}>
              <a
                href={pageContent.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.glassIcon}
              >
                <IconBrandInstagram size={20} />
              </a>
              <a
                href={pageContent.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.glassIcon}
              >
                <IconBrandGithubFilled size={20} />
              </a>
              <a
                href={pageContent.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.glassIcon}
              >
                <IconBrandLinkedinFilled size={20} />
              </a>
              <a
                href={`mailto:${pageContent.socials.email}`}
                className={classes.glassIcon}
              >
                <IconMailFilled size={20} />
              </a>
            </Group>
          </div>
        </div>
      </div>

      {/* Section 2: Games Header */}
      <div id="games" className={classes.snapSection}>
        <div className={classes.sectionContent}>
          <div className={classes.musicSection}>
            <Title order={3} className={classes.sectionTitle}>{pageContent.sections.games.title}</Title>
            <Text className={classes.musicSubtitle}>
              {pageContent.sections.games.subtitle}
            </Text>
          </div>
        </div>
      </div>

      {/* Projects */}
      {projects.map((project) => (
        <div key={project.title} className={classes.snapSection}>
          <div className={classes.sectionContent}>
            <div className={classes.project}>
              <div className={classes.projectLeft}>
                <Title order={4} className={classes.projectTitle}>{project.title}</Title>
                <Group gap="xs" className={classes.projectTech}>
                  {project.tech.map((tech, i) => (
                    <span key={i} className={classes.techTag}>{tech}</span>
                  ))}
                </Group>
                <Text className={classes.projectDescription}>
                  {project.description.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < project.description.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </Text>
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className={classes.projectCta}>
                  Check it out
                </a>
                {project.codeLink && (
                  <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className={classes.codeLink}>
                    {project.codeLink.includes('github') ? "Here's the code if you want" : 'Code'}
                  </a>
                )}
              </div>
              <div className={classes.projectRight}>
                {project.imageType === 'iphone' ? (
                  <FloatingCard
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.projectImageLink}
                  >
                    <div className={classes.iphoneProjectImage}>
                      <img src={project.imageSrc} alt={`${project.title} Screenshot`} />
                    </div>
                  </FloatingCard>
                ) : (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.projectImageLink}
                  >
                    <div className={classes.projectImage}>
                      <img src={project.imageSrc} alt={`${project.title} Screenshot`} />
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Section 3: Music */}
      <div id="music" className={classes.snapSection}>
        <div className={classes.sectionContent}>
          <div className={classes.musicSection}>
            <Title order={3} className={classes.sectionTitle}>{pageContent.sections.music.title}</Title>
            <Text className={classes.musicSubtitle}>
              {pageContent.sections.music.subtitle.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < pageContent.sections.music.subtitle.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </Text>
            <div className={classes.songList}>
              {songs.map((song) => (
                <SongRow
                  key={song.audioSrc}
                  title={song.title}
                  artist={song.artist}
                  coverImage={song.coverImage}
                  audioSrc={song.audioSrc}
                  isPlaying={currentSong?.audioSrc === song.audioSrc && isPlaying}
                  onClick={() => handleSongClick(song)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Final CTA */}
      <div className={classes.snapSection}>
        <div className={classes.sectionContent}>
          <div className={classes.ctaSection}>
            <Title order={2} className={classes.ctaTitle}>{pageContent.cta.title}</Title>
            <Text className={classes.ctaDescription}>
              {pageContent.cta.description}
            </Text>
            <div className={classes.ctaButtons}>
              <a href={`mailto:${pageContent.socials.email}`} className={classes.primaryCta}>
                Get in touch
              </a>
              <a href={pageContent.socials.instagram} target="_blank" rel="noopener noreferrer" className={classes.secondaryCta}>
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Music Player */}
      {currentSong && (
        <div className={classes.footerPlayer} onClick={openFullPlayer}>
          <div className={classes.footerPlayerContent}>
            <div className={classes.footerSongInfo}>
              <img src={currentSong.coverImage} alt={`${currentSong.title} cover`} className={classes.footerCover} />
              <div className={classes.footerText}>
                <Text className={classes.footerTitle}>{currentSong.title}</Text>
                <Text className={classes.footerArtist}>{currentSong.artist}</Text>
              </div>
            </div>
            <div className={classes.footerControls}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openPlayerToLyrics();
                }}
                className={classes.lyricsButton}
              >
                <IconMusic size={20} />
              </button>
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

      {/* Music Player Modal */}
      {isPlayerModalOpen && currentSong && (
        <MusicPlayerModal
          title={currentSong.title}
          artist={currentSong.artist}
          coverImage={currentSong.coverImage}
          audioRef={audioRef}
          isPlaying={isPlaying}
          lyrics={currentSong.lyrics}
          scrollToLyrics={scrollToLyrics}
          onTogglePlayPause={togglePlayPause}
          onClose={() => {
            setIsPlayerModalOpen(false);
            setScrollToLyrics(false);
          }}
        />
      )}
    </div>
  );
}
