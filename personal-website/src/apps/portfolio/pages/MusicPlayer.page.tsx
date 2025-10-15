import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { IconArrowLeft, IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';
import { Text } from '@/shared/components/ui/Text';
import { Title } from '@/shared/components/ui/Title';
import classes from './MusicPlayer.module.css';

interface MusicPlayerState {
  title: string;
  artist: string;
  coverImage: string;
  audioSrc: string;
  isPlaying: boolean;
  currentTime: number;
}

export function MusicPlayerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as MusicPlayerState;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(state?.isPlaying || false);
  const [currentTime, setCurrentTime] = useState(state?.currentTime || 0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volumeBeforeSeeking, setVolumeBeforeSeeking] = useState(1);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // Set initial time
    audio.currentTime = state?.currentTime || 0;

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

    // Auto play if it was playing
    if (state?.isPlaying) {
      audio.play();
    }

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [state?.currentTime, state?.isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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

  const handleBack = () => {
    // Store the current state before going back
    if (audioRef.current) {
      navigate('/fun', {
        state: {
          currentSong: state,
          isPlaying: isPlaying,
          currentTime: audioRef.current.currentTime,
        }
      });
    } else {
      navigate('/fun');
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!state) {
    navigate('/fun');
    return null;
  }

  return (
    <div className={classes.playerContainer}>
      {/* Back button */}
      <button onClick={handleBack} className={classes.backButton}>
        <IconArrowLeft size={24} />
      </button>

      {/* Album cover */}
      <div className={classes.albumSection}>
        <img src={state.coverImage} alt={`${state.title} cover`} className={classes.albumCover} />
      </div>

      {/* Song info */}
      <div className={classes.songDetails}>
        <Title order={2} className={classes.playerTitle}>{state.title}</Title>
        <Text className={classes.playerArtist}>{state.artist}</Text>
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
        <button onClick={togglePlayPause} className={classes.playPauseButton}>
          {isPlaying ? (
            <IconPlayerPauseFilled size={48} />
          ) : (
            <IconPlayerPlayFilled size={48} />
          )}
        </button>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={state.audioSrc} />
    </div>
  );
}
