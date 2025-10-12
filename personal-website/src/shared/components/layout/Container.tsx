import React from 'react';
import styles from './Container.module.css';

export interface ContainerProps {
  /** Container content */
  children: React.ReactNode;
  /** Container size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Whether container should be fluid (100% width) */
  fluid?: boolean;
  /** Additional class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  fluid = false,
  className = '',
  style,
}) => {
  const getMaxWidth = () => {
    if (fluid) return '100%';

    if (typeof size === 'number') {
      return `${size}px`;
    }

    const sizes = {
      xs: '576px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1400px',
    };

    return sizes[size];
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      style={{
        maxWidth: getMaxWidth(),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
