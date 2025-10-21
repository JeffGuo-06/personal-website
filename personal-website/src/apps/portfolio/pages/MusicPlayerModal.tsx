import React, { useEffect, useState, useRef } from 'react';
import { IconArrowLeft, IconPlayerPauseFilled, IconPlayerPlayFilled, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Text } from '@/shared/components/ui/Text';
import { Title } from '@/shared/components/ui/Title';
import classes from './MusicPlayer.module.css';

interface MusicPlayerModalProps {
  title: string;
  artist: string;
  coverImage: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  lyrics?: string;
  scrollToLyrics?: boolean;
  onTogglePlayPause: () => void;
  onClose: () => void;
}

export function MusicPlayerModal({
  title,
  artist,
  coverImage,
  audioRef,
  isPlaying,
  lyrics,
  scrollToLyrics = false,
  onTogglePlayPause,
  onClose,
}: MusicPlayerModalProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volumeBeforeSeeking, setVolumeBeforeSeeking] = useState(1);
  const [lyricsExpanded, setLyricsExpanded] = useState(false);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // Load metadata to get duration
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    // Update current time
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
  }, [audioRef]);

  // Scroll to lyrics if requested
  useEffect(() => {
    if (scrollToLyrics && lyricsRef.current && containerRef.current) {
      setTimeout(() => {
        lyricsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [scrollToLyrics]);

  const handleSeekStart = () => {
    if (!audioRef.current) return;
    setIsSeeking(true);
    // Store current volume and mute
    setVolumeBeforeSeeking(audioRef.current.volume);
    audioRef.current.volume = 0;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleSeekEnd = () => {
    if (!audioRef.current) return;
    setIsSeeking(false);
    // Restore volume
    audioRef.current.volume = volumeBeforeSeeking;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const scrollToLyricsSection = () => {
    if (lyricsRef.current && containerRef.current) {
      lyricsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={classes.modalOverlay} onClick={onClose}>
      <div ref={containerRef} className={classes.playerContainer} onClick={(e) => e.stopPropagation()}>
        {/* Back button */}
        <button onClick={onClose} className={classes.backButton}>
          <IconArrowLeft size={24} />
        </button>

        {/* Album cover */}
        <div className={classes.albumSection}>
          <img src={coverImage} alt={`${title} cover`} className={classes.albumCover} />
        </div>

        {/* Song info */}
        <div className={classes.songDetails}>
          <Title order={2} className={classes.playerTitle}>{title}</Title>
          <Text className={classes.playerArtist}>{artist}</Text>
        </div>

        {/* Timeline */}
        <div className={classes.timeline}>
          <Text className={classes.timeText}>{formatTime(currentTime)}</Text>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            onMouseDown={handleSeekStart}
            onMouseUp={handleSeekEnd}
            onTouchStart={handleSeekStart}
            onTouchEnd={handleSeekEnd}
            className={classes.progressBar}
          />
          <Text className={classes.timeText}>{formatTime(duration)}</Text>
        </div>

        {/* Play/Pause button */}
        <div className={classes.controls}>
          <button onClick={onTogglePlayPause} className={classes.playPauseButton}>
            {isPlaying ? (
              <IconPlayerPauseFilled size={48} />
            ) : (
              <IconPlayerPlayFilled size={48} />
            )}
          </button>
        </div>

        {/* Lyrics section */}
        {lyrics && (
          <div className={classes.modalSection}>
            <div className={classes.modalLyricsContainer}>
              <div className={classes.modalLyricsHeader}>
                <Title order={3} className={classes.modalSectionTitle}>Lyrics</Title>
                <button
                  className={classes.modalExpandButton}
                  onClick={() => setLyricsExpanded(!lyricsExpanded)}
                >
                  {lyricsExpanded ? (
                    <IconChevronDown size={20} />
                  ) : (
                    <IconChevronUp size={20} />
                  )}
                </button>
              </div>
              <div
                ref={lyricsRef}
                className={`${classes.modalLyrics} ${!lyricsExpanded ? classes.modalLyricsCollapsed : ''}`}
              >
                {lyrics.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < lyrics.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reels Section */}
        <div className={classes.modalSection}>
          <div className={classes.modalReelsContainer}>
            <Title order={3} className={classes.modalSectionTitle}>Reels</Title>
            <Text className={classes.modalPlaceholder}>No reels yet</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
