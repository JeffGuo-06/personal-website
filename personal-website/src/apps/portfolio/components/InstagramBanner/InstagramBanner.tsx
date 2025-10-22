import React from 'react';
import classes from './InstagramBanner.module.css';

export function InstagramBanner() {
  return (
    <div className={classes.banner}>
      <div className={classes.content}>
        <div className={classes.textSection}>
          <h3 className={classes.title}>Instagram detected</h3>
          <p className={classes.subtitle}>it's better in the browser.</p>
          <p className={classes.instructions}>
            Click on the <strong>•••</strong> three dots and hit <strong>Open in external browser</strong>
          </p>
        </div>
      </div>
      <div className={classes.arrowSection}>
        <svg className={classes.arrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
