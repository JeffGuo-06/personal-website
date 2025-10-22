import React, { useState, useEffect } from 'react';
import classes from './TestBrowserDeeplink.module.css';

export function TestBrowserDeeplinkPage() {
  const [browserInfo, setBrowserInfo] = useState('');
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown Browser';
    let inApp = false;

    // Check for in-app browsers first
    if (/Instagram/.test(userAgent)) {
      browser = 'Instagram In-App Browser';
      inApp = true;
    } else if (/FBAN|FBAV/.test(userAgent)) {
      browser = 'Facebook In-App Browser';
      inApp = true;
    } else if (/TikTok/.test(userAgent)) {
      browser = 'TikTok In-App Browser';
      inApp = true;
    } else if (/Twitter/.test(userAgent)) {
      browser = 'Twitter In-App Browser';
      inApp = true;
    } else if (/Line/.test(userAgent)) {
      browser = 'Line In-App Browser';
      inApp = true;
    } else if (/Snapchat/.test(userAgent)) {
      browser = 'Snapchat In-App Browser';
      inApp = true;
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
    setIsInAppBrowser(inApp);
  }, []);

  const handleOpenBrowser = () => {
    // Try multiple methods
    const url = 'https://guojeff.com';

    // Method 1: Try window.open
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');

    // Method 2: If that fails, try location
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = url;
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://guojeff.com');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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
            {isInAppBrowser
              ? 'Use one of the methods below to open guojeff.com in your browser'
              : 'Click the button below to open guojeff.com'}
          </p>

          <div className={classes.buttonGroup}>
            <button
              onClick={handleOpenBrowser}
              className={classes.deeplinkButton}
            >
              <span className={classes.buttonIcon}>🌐</span>
              Try to Open guojeff.com
            </button>

            <button
              onClick={handleCopyLink}
              className={classes.deeplinkButton}
            >
              <span className={classes.buttonIcon}>📋</span>
              {copySuccess ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          {isInAppBrowser && (
            <div className={classes.instructions}>
              <h3 className={classes.instructionsTitle}>Manual Instructions:</h3>
              <ol className={classes.instructionsList}>
                <li>Tap the menu icon (⋯ or •••) at the top or bottom of the screen</li>
                <li>Look for "Open in Safari" or "Open in Browser"</li>
                <li>Or copy the link above and paste it in your browser</li>
              </ol>
            </div>
          )}

          <div className={classes.note}>
            <p>
              {isInAppBrowser
                ? 'In-app browsers often restrict external links. Use the menu or copy the link manually.'
                : 'This will open guojeff.com in a new tab.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
