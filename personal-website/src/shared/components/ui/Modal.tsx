import React, { useEffect } from 'react';
import classes from './Modal.module.css';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  centered?: boolean;
  children: React.ReactNode;
}

export function Modal({ opened, onClose, centered = false, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (opened) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [opened, onClose]);

  if (!opened) return null;

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div 
        className={`${classes.modal} ${centered ? classes.centered : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={classes.closeButton} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}