// Import assets
import linkedinmaxxAudio from '../assets/linkedinmaxx.mp3';
import linkedinmaxxCover from '../assets/linkedinmaxx.png';
import nailongifyImage from '../assets/nailongify.png';

// Types
export interface Song {
  title: string;
  artist: string;
  coverImage: string;
  audioSrc: string;
  lyrics: string;
}

export interface Project {
  title: string;
  tech: string[];
  description: string;
  codeLink?: string;
  demoLink: string;
  imageType: 'standard' | 'iphone';
  imageSrc: string;
}

// Music Data
export const songs: Song[] = [
  {
    title: 'linkedinmaxx',
    artist: 'JEFFGUO.md',
    coverImage: linkedinmaxxCover,
    audioSrc: linkedinmaxxAudio,
    lyrics: `
I’m tryna linkedinmaxx (yeah)
All these employers wont know how to act (yeah)
My posts are special they give heart attacks (yeah)
So, put your head down and comment, “Congrats!” (yeah)
Take me to the app (uh-huh)

Scroll the home page, (uh-huh)
I see these big tech people every day (uh-huh)
I start to look at my life in dismay (uh-huh)
sometimes, I wished all these posts were fake (uh-huh)
I know what to do

“Thrilled to share! “ (go ahead just post)
“Five things I learned…” (go ahead just post)
B2B (go ahead just post)
B2C (go ahead just post)
“This week, I had the chance” (go ahead just post)
“I just built the next…” (go ahead just post)
“Comment your email” (go ahead just post)
“We’re hiring!”(go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on

I’m tryna linkedinmaxx (yeah)
All these employers wont know how to act (yeah)
My posts are different they give heart attacks (yeah)
So, put your head down and comment, “Congrats!” (yeah)
Take me to the app (uh-huh)

Scroll the home page, (uh-huh)
I see these big tech people every day (uh-huh)
I start to look at my life in dismay (uh-huh)
sometimes, I wished all these posts were fake (uh-huh)
I know what to do

“Thrilled to share! “ (go ahead just post)
“Five things I learned…” (go ahead just post)
B2B (go ahead just post)
B2C (go ahead just post)
“This week, I had the chance” (go ahead just post)
“I just built the next…” (go ahead just post)
“Comment your email” (go ahead just post)
“We’re hiring!”(go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on

You ready?
You ready?
You ready?
Uh … yeah

I’m tryna linkedinmaxx (yeah)
All these employers wont know how to act (yeah)
My posts are different they give heart attacks (yeah)
So, put your head down and comment, “Congrats!” (yeah)
Take me to the app (uh-huh)

“Thrilled to share! “ (go ahead just post)
“Five things I learned…” (go ahead just post)
B2B (go ahead just post)
B2C (go ahead just post)
“This week, I had the chance” (go ahead just post)
“I just built the next…” (go ahead just post)
“Comment your email” (go ahead just post)
“We’re hiring!”(go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on (go ahead just post)
get ur linkedin on
`,
  },
  // Add more songs here...
];

// Projects Data
export const gamesProjects: Project[] = [
  {
    title: 'Nailongify',
    tech: ['If life was a highway,', "I'd wanna ride it", 'All Nailong'],
    description:
      "Use your camera to turn yourself into Nailong, hold each nailong face to unlock them, try to unlock all 8 in the fastest time. Also there's a leaderboard because, it's fun.",
    codeLink: 'https://github.com/JeffGuo-06/nailongify',
    demoLink: 'https://nailongify.guojeff.com',
    imageType: 'standard',
    imageSrc: nailongifyImage,
  },
  // Add more games here...
];

export const otherProjects: Project[] = [
  {
    title: 'The Boards',
    tech: ['React Native', 'Expo', 'Supabase'],
    description: 'A shared leaderboard IOS app designed for friend groups. Make leaderboards out of anything, basketball, pickleball, whatever he ball, shibal.',
    codeLink: 'https://github.com/JeffGuo-06/the-boards',
    demoLink: 'https://theboards.app',
    imageType: 'iphone',
    imageSrc: '/assets/boards-demo.png',
  },
  {
    title: 'SHOUT',
    tech: ['Swift', 'AudioShake'],
    description:
      'We all wanna scream at concerts, but how tf am I meant to post a nonchalant story if I\'m screaming. \n  I\'m building an app to remove your own voice from concert videos, join the waitlist if you want me to hurry.',
    demoLink: 'https://guojeff.com/shout',
    imageType: 'iphone',
    imageSrc: '/assets/shout-demo.png',
  },
  // Add more projects here...
];

// Page Content
export const pageContent = {
  intro: {
    name: 'JEFFGUO.md',
    role: 'Creator & Developer',
    location: 'Toronto, ON',
    description: `If you're an employer, you're on the wrong page. This is my shitpostfolio.
Also, md stands for markdown, it's supposed to be a niche coding thing NOT medical doctor, although I'll take the free doctor aura.`,
  },
  sections: {
    games: {
      title: 'Games',
      subtitle: "This is fun stuff I've built for friends, you're my friend now.",
    },
    music: {
      title: 'Music',
      subtitle: 'Name a developer that also makes music?\nCome on now.',
    },
    other: {
      title: 'You might also like',
      subtitle: 'More stuff I\'ve been working on.',
    },
  },
  cta: {
    title: 'WE ARE ALL GMI',
    description: 'Got an idea? Wanna collab? Hit me up.',
  },
  socials: {
    instagram: 'https://www.instagram.com/jeffguo.md',
    github: 'https://github.com/JeffGuo-06',
    linkedin: 'https://www.linkedin.com/in/jeff-guo-a87054303/',
    email: 'jeffguo.06@gmail.com',
  },
};
