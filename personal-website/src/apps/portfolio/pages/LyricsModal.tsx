import React from 'react';
import { IconX } from '@tabler/icons-react';
import { Text } from '@/shared/components/ui/Text';
import { Title } from '@/shared/components/ui/Title';
import classes from './LyricsModal.module.css';

interface LyricsModalProps {
  title: string;
  artist: string;
  lyrics: string;
  onClose: () => void;
}

export const LyricsModal: React.FC<LyricsModalProps> = ({
  title,
  artist,
  lyrics,
  onClose,
}) => {
  return (
    <div className={classes.modalOverlay} onClick={onClose}>
      <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={classes.closeButton} onClick={onClose}>
          <IconX size={24} />
        </button>

        <div className={classes.header}>
          <Title order={3} className={classes.songTitle}>{title}</Title>
          <Text className={classes.songArtist}>{artist}</Text>
        </div>

        <div className={classes.lyricsContainer}>
          <Text className={classes.lyrics}>
            {lyrics.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < lyrics.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </Text>
        </div>
      </div>
    </div>
  );
};
