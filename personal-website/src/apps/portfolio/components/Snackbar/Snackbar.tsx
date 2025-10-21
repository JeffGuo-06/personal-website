import { useEffect } from 'react';
import classes from './Snackbar.module.css';

interface SnackbarProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export function Snackbar({ message, isOpen, onClose, duration = 3000 }: SnackbarProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className={classes.snackbar}>
      <span className={classes.message}>{message}</span>
    </div>
  );
}
