import React, { forwardRef, useEffect, useRef, useState } from 'react';
import classes from './Image.module.css';

export type ImageFit = 'contain' | 'cover' | 'fill' | 'scale-down' | 'none';
export type ImageRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image source */
  src: string;
  /** Alternative text */
  alt: string;
  /** Image fit */
  fit?: ImageFit;
  /** Image width */
  width?: number | string;
  /** Image height */
  height?: number | string;
  /** Image border radius */
  radius?: ImageRadius;
  /** Fallback image source */
  fallbackSrc?: string;
  /** Show loading skeleton */
  withPlaceholder?: boolean;
  /** Custom placeholder content */
  placeholder?: React.ReactNode;
  /** Caption text */
  caption?: React.ReactNode;
  /** Component to render as wrapper */
  component?: React.ElementType;
  /** Loading state callback */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Error state callback */
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Additional props for custom component */
  [key: string]: any;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      fit = 'cover',
      width,
      height,
      radius = 0,
      fallbackSrc,
      withPlaceholder = true,
      placeholder,
      caption,
      component,
      className,
      style,
      onLoad,
      onError,
      ...others
    },
    ref
  ) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
      setCurrentSrc(src);
      setError(false);
      setLoading(true);
    }, [src]);

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      setLoading(false);
      onLoad?.(event);
    };

    const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
      setLoading(false);
      if (!error && fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setError(false);
      } else {
        setError(true);
      }
      onError?.(event);
    };

    const Component = component || 'div';

    const wrapperClassNames = [classes.wrapper, caption && classes.withCaption, className]
      .filter(Boolean)
      .join(' ');

    const imageClassNames = [
      classes.image,
      classes[`fit-${fit}`],
      radius && classes[`radius-${radius}`],
      loading && classes.loading,
      error && classes.error,
    ]
      .filter(Boolean)
      .join(' ');

    const imageStyles: React.CSSProperties = {
      width,
      height,
      ...style,
    };

    const showPlaceholder = (loading || error) && withPlaceholder;

    return (
      <Component className={wrapperClassNames}>
        <div className={classes.imageWrapper} style={{ width, height }}>
          {showPlaceholder && (
            <div className={classes.placeholder}>
              {placeholder || (
                <div className={classes.placeholderContent}>
                  {error ? (
                    <div className={classes.errorIcon}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className={classes.loadingSpinner}>
                      <div className={classes.spinner} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <img
            {...others}
            ref={(node) => {
              if (ref) {
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref && 'current' in ref) {
                  (ref as React.MutableRefObject<HTMLImageElement | null>).current = node;
                }
              }
              imageRef.current = node;
            }}
            src={currentSrc}
            alt={alt}
            className={imageClassNames}
            style={imageStyles}
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
        {caption && <div className={classes.caption}>{caption}</div>}
      </Component>
    );
  }
);

Image.displayName = 'Image';
