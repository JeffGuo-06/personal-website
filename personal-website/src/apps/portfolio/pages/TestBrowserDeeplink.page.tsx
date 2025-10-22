import React, { useState, useEffect } from 'react';
import classes from './TestBrowserDeeplink.module.css';

export function TestBrowserDeeplinkPage() {
  const [browserInfo, setBrowserInfo] = useState('');

  useEffect(() => {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown Browser';

    // Check for in-app browsers first
    if (/Instagram/.test(userAgent)) {
      browser = 'Instagram In-App Browser';
    } else if (/FBAN|FBAV/.test(userAgent)) {
      browser = 'Facebook In-App Browser';
    } else if (/TikTok/.test(userAgent)) {
      browser = 'TikTok In-App Browser';
    } else if (/Twitter/.test(userAgent)) {
      browser = 'Twitter In-App Browser';
    } else if (/Line/.test(userAgent)) {
      browser = 'Line In-App Browser';
    } else if (/Snapchat/.test(userAgent)) {
      browser = 'Snapchat In-App Browser';
    }
    // Then check standard browsers
    else if (/Chrome/.test(userAgent) && !/Edg/.test(userAgent)) {
      browser = 'Chrome';
    } else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
      browser = 'Safari';
    } else if (/Firefox/.test(userAgent)) {
      browser = 'Firefox';
    } else if (/Edg/.test(userAgent)) {
      browser = 'Edge';
    } else if (/OPR|Opera/.test(userAgent)) {
      browser = 'Opera';
    }

    // Add device info
    const isMobile = /Android|iPhone|iPad|iPod/.test(userAgent);
    const device = isMobile ? 'Mobile' : 'Desktop';

    setBrowserInfo(`${browser} (${device})`);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.topSection}>
          <h1 className={classes.title}>Browser Detection Test</h1>
          <p className={classes.browserInfo}>You are in: <strong>{browserInfo}</strong></p>
          <p className={classes.userAgent}>User Agent: {navigator.userAgent}</p>
        </div>

        <div className={classes.bottomSection}>
          <h2 className={classes.subtitle}>Open in Browser</h2>
          <p className={classes.description}>
            Tap the button below to open guojeff.com in your browser
          </p>

          <div className={classes.buttonGroup}>
            <a
              href="https://guojeff.com"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.deeplinkButton}
            >
              <span className={classes.buttonIcon}>🌐</span>
              Open guojeff.com
            </a>
          </div>

          <div className={classes.note}>
            <p>If you're in an in-app browser (Instagram, Facebook, etc.), this will open in your default browser or show you the option to do so.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
