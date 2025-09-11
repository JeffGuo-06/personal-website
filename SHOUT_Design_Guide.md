# SHOUT - Accurate Brand & Web Design System

*Extracted from the actual Swift app codebase*

## Brand Identity & Core Concept

**SHOUT** embodies the freedom to sing your heart out at concerts without worry. The app removes voices from concert videos using AI-powered audio separation, giving users clean concert videos without their vocal interference.

**Brand Values:**
- **Liberation**: "SHOUT your heart out" - complete freedom at concerts
- **Quality**: Professional-grade AI voice separation  
- **Simplicity**: Complex audio processing made simple
- **Musical**: Celebrates live music and concert culture
- **Bold**: Confident, energetic branding that matches concert energy

## Accurate Color System (from Swift app)

### Primary Colors
```css
/* Main Brand Color */
SHOUT Yellow: #FFFF00 (Color.yellow in Swift)
/* Used for: Logo, primary buttons, accents, highlights, progress bars */

Concert Black: #000000 (Color.black)  
/* Used for: Backgrounds, primary dark color */

Stage White: #FFFFFF (Color.white)
/* Used for: Primary text, icons, contrast elements */
```

### Secondary Colors  
```css
/* Text & UI Colors */
Text Gray: #808080 (Color.gray)
/* Used for: Secondary text, descriptions, inactive states */

Success Green: #00FF00 (Color.green) 
/* Used for: Success states, completed processing */

Error Red: #FF0000 (Color.red)
/* Used for: Error states, warnings, failed processing */

Accent Blue: #0000FF (Color.blue)
/* Used for: Instrument controls, secondary accents */
```

### Opacity & Background System
```css
/* Glass/Translucent Backgrounds */
Card Background: rgba(255, 255, 255, 0.05)
Border Subtle: rgba(255, 255, 255, 0.1) 
Border Accent: rgba(255, 255, 0, 0.3) /* Yellow with 30% opacity */
Overlay Dark: rgba(0, 0, 0, 0.7)
Processing Overlay: rgba(0, 0, 0, 0.8)
```

### Gradient System
```css
/* Yellow Radial Gradient (Hero Background) */
background: radial-gradient(circle, rgba(255,255,0,0.1) 100px, rgba(0,0,0,1) 500px);

/* Processing Gradients */
.processing-bar {
  background: linear-gradient(90deg, rgba(255,255,0,0.8), #FFFF00);
}

/* Card Highlights */
.selected-border {
  border: 1px solid rgba(255,255,0,0.5);
}
```

## Typography & Brand Voice

### Primary Font
**System Font** (SF Pro on iOS/macOS)
- Hero Text: System, 80pt, Black weight (.black)
- Headlines: System, Large Title, Bold (.bold)
- Subheadings: System, Title2, Semibold (.semibold)
- Body: System, Body, Regular (.regular)
- Captions: System, Caption, Regular (.regular)

### Brand Voice Examples (from app)
- **Main CTA**: "AHHHHHHH" (with tracking: 2pt)
- **Tagline**: "your heart out."  
- **Subtitle**: "Remove your voice from concert videos"
- **Action**: "Let's clean up your concert videos"
- **Processing**: "Creating your video..."

### Button Labels (Actual app language)
- "AHHHHHHH" (Primary CTA)
- "Choose from Photos"
- "Choose from Files" 
- "Create Video"
- "Play Preview" / "Pause Preview"
- "Back" / "Continue"

## Visual Elements & UI Components

### Icon System
**SF Symbols** (Apple's system icons)
- Music/Audio: `music.mic`, `waveform`, `speaker.3.fill`, `mic.fill`
- Media: `video`, `play.circle.fill`, `pause.circle.fill`
- UI: `chevron.left`, `checkmark.circle.fill`, `music.note`
- Security: `lock.shield`

### Button Styles (from Swift code)
```css
/* Primary Button (Yellow) */
.primary-button {
  background: #FFFF00;
  color: #000000;
  border-radius: 25px; /* cornerRadius: 25 */
  padding: 16px 24px; /* .padding() */
  font-weight: bold;
  box-shadow: 0 0 30px rgba(255,255,0,0.4); /* Yellow glow */
}

/* Secondary Button (Glass) */
.secondary-button {
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  border-radius: 12px; /* cornerRadius: 12 */
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Danger Button (Processing states) */
.danger-button {
  background: #FF0000;
  color: #FFFFFF;
  border-radius: 12px;
}
```

### Card/Container Styles
```css
/* Main Content Cards */
.content-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
}

/* Highlighted/Selected Cards */
.selected-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 0, 0.3); /* Yellow border */
}

/* Processing Cards */
.processing-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(20px); /* Glass effect */
}
```

### Animation Effects (from Swift)
```css
/* Pulsing Effect (Hero button) */
@keyframes pulse {
  0% { transform: scale(1.0); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1.0); }
}

/* Text Breathing (Hero title) */
@keyframes breathe {
  0% { transform: scale(1.0); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1.0); }
}

/* Processing Shimmer */
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}
```

## Website Layout & User Flow

### Header Navigation
```
SHOUT Logo (Yellow) | How It Works | Pricing | Support | Sign In | [AHHHHHHH] (CTA)
```

### Hero Section (Accurate to app)
**Background**: Black with yellow radial gradient overlay
**Content**:
- Logo: "SHOUT" (80pt, black weight, yellow, glowing shadow)
- Tagline: "your heart out." (white, semibold)  
- Description: "Remove your voice from concert videos" (gray)
- CTA: "AHHHHHHH" button (yellow background, black text, mic icons)

### Features Section (Based on app features)
**Three columns**:
1. **AI Voice Separation** - Waveform icon, yellow accent
2. **Original Quality** - Video icon, "No quality loss" 
3. **Private & Local** - Lock/Shield icon, "Your videos stay safe"

### How It Works (From actual app flow)
1. **Upload Video** → Choose from Photos/Files
2. **AI Processing** → AudioShake separation  
3. **Adjust Levels** → Vocal/instrument sliders
4. **Download Result** → Clean concert video

## Interactive Elements

### Volume Sliders (from VocalVolumeAdjustmentView)
```css
/* Vocal Slider */
.vocal-slider {
  track-color: #FFFF00; /* .tint(.yellow) */
  thumb-color: #FFFF00;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 0, 0.3);
}

/* Instrument Slider */  
.instrument-slider {
  track-color: #0000FF; /* .tint(.blue) */
  thumb-color: #0000FF;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 0, 255, 0.3);
}
```

### Progress Indicators
```css
/* Processing Progress */
.progress-bar {
  background: rgba(128, 128, 128, 0.3); /* Gray background */
  height: 6px;
  border-radius: 4px;
}

.progress-fill {
  background: #FFFF00; /* Yellow fill */
  border-radius: 4px;
  transition: width 0.3s ease;
}
```

## Processing States & Feedback

### Status Messages (from app)
- **Starting**: "Starting video processing..."
- **Processing**: "Creating your video..." / "Mixing vocals and instruments"  
- **Success**: "Video processing completed successfully"
- **Error**: "Processing failed: [error message]"

### Loading States
```css
.processing-overlay {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
}

.spinner {
  color: #FFFF00; /* Yellow loading spinner */
  transform: scale(1.5);
}
```

## Mobile-First Responsive Design

### Breakpoints
```css
Mobile: 320px - 768px
Tablet: 768px - 1024px  
Desktop: 1024px+
```

### Mobile Adaptations (iOS-focused)
- **Touch targets**: 44pt minimum (iOS standard)
- **Safe areas**: Respect iPhone notch/home indicator
- **Haptic feedback**: Heavy impact on primary actions
- **Navigation**: SwiftUI NavigationView patterns
- **Dark mode**: Force dark appearance (`.preferredColorScheme(.dark)`)

## Performance & Technical Notes

### Accessibility (following iOS patterns)
- High contrast support (Yellow on black has strong contrast)
- VoiceOver labels for all interactive elements
- Dynamic Type support for text scaling
- Reduced motion alternatives for animations

### Platform Integration
- **Photos access**: Native iOS Photos picker
- **Files access**: iOS Files app integration  
- **Share sheet**: Native iOS sharing
- **Background processing**: Respect iOS app lifecycle

## Brand Applications

### Social Media
- **Instagram**: Dark backgrounds, yellow highlights, concert imagery
- **TikTok**: Vertical video demos showing before/after
- **Twitter**: Concert quotes with yellow SHOUT branding

### Marketing Copy Style
- **Energetic**: "SHOUT your heart out!"
- **Concert-focused**: "Perfect your concert videos"
- **Benefit-driven**: "Sing without worry"
- **Simple**: Avoid technical audio jargon

This design system reflects the actual implemented SHOUT brand as built in the Swift application, ensuring consistency between the native app and web presence.