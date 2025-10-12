import React from 'react';
import styles from './Center.module.css';

export interface CenterProps {
  /** Center content */
  children: React.ReactNode;
  /** Whether to center both horizontally and vertically */
  inline?: boolean;
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export const Center: React.FC<CenterProps> = ({
  children,
  inline = false,
  className = '',
  style,
}) => {
  return (
    <div className={`${inline ? styles.centerInline : styles.center} ${className}`} style={style}>
      {children}
    </div>
  );
};
