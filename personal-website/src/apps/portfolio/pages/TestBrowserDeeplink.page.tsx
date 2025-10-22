import React, { useState, useEffect } from 'react';
import { InstagramBanner } from '../components/InstagramBanner/InstagramBanner';
import classes from './TestBrowserDeeplink.module.css';

export function TestBrowserDeeplinkPage() {
  const [browserInfo, setBrowserInfo] = useState('');
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

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

    // In development, show banner by default for testing
    if (import.meta.env.DEV) {
      setShowBanner(true);
    } else {
      // In production, only show if actually on Instagram
      setShowBanner(inApp);
    }
  }, []);

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
      {/* Instagram Banner - shows in dev mode for testing */}
      {showBanner && <InstagramBanner />}

      <div className={classes.content}>
        <div className={classes.topSection}>
          <h1 className={classes.title}>Browser Detection Test</h1>
          {import.meta.env.DEV && (
            <div className={classes.devControls}>
              <button
                onClick={() => setShowBanner(!showBanner)}
                className={classes.toggleButton}
              >
                {showBanner ? 'Hide Banner' : 'Show Banner'}
              </button>
            </div>
          )}
          <p className={classes.browserInfo}>You are in: <strong>{browserInfo}</strong></p>
          <p className={classes.userAgent}>User Agent: {navigator.userAgent}</p>
        </div>

        <div className={classes.bottomSection}>
          {isInAppBrowser ? (
            <>
              <h2 className={classes.subtitle}>Open in Your Browser</h2>
              <p className={classes.description}>
                In-app browsers block external links. Follow these steps:
              </p>

              <div className={classes.instructions}>
                <h3 className={classes.instructionsTitle}>How to Open in Browser:</h3>
                <ol className={classes.instructionsList}>
                  <li>Tap the <strong>menu icon</strong> (⋯ or •••) at the top or bottom</li>
                  <li>Select <strong>"Open in Safari"</strong> or <strong>"Open in Browser"</strong></li>
                  <li>The page will open in your default browser</li>
                </ol>
              </div>

              <div className={classes.alternativeSection}>
                <p className={classes.alternativeText}>Or copy the link manually:</p>
                <button
                  onClick={handleCopyLink}
                  className={classes.deeplinkButton}
                >
                  <span className={classes.buttonIcon}>📋</span>
                  {copySuccess ? '✓ Copied!' : 'Copy guojeff.com'}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className={classes.subtitle}>You're in a standard browser!</h2>
              <p className={classes.description}>
                No need for special instructions. Here's the link:
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
