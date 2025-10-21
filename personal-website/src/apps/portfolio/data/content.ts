// Import assets
import linkedinmaxxAudio from '../assets/linkedinmaxx.mp3';
import linkedinmaxxCover from '../assets/linkedinmaxx.png';
import nailongifyImage from '../assets/nailongify.png';
import propertyImage from  '../assets/property.png';
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
  subtitle?: string;
  tech: string[];
  description: string;
  codeLink?: string;
  demoLink: string;
  imageType: 'standard' | 'iphone';
  imageSrc: string;
}

export interface UpcomingItem {
  type: 'song' | 'project';
  title: string;
  subtitle?: string;
  description: string;
  releaseInfo: string; // e.g., "Coming Soon", "Q1 2025", etc.
  imageSrc?: string;
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
    title: 'Property Higher or Lower?',
    subtitle: 'Guess which GTA property costs more',
    tech: ['Selenium','Node'],
    description:
      "Housing is cooked rn, and I made a game out of it. Guess which property in the GTA costs more.",
    //codeLink: 'https://github.com/JeffGuo-06/nailongify',
    demoLink: 'https://property.guojeff.com',
    imageType: 'standard',
    imageSrc: propertyImage,
  },
  {
    title: 'Nailongify',
    subtitle: 'Face filter game with leaderboards',
    tech: ['If life was a highway,', "I'd wanna ride it", 'All Nailong'],
    description:
      "Use your camera to turn yourself into Nailong, hold each nailong face to unlock them, try to unlock all 8 in the fastest time. Also there's a leaderboard because, it's fun.",
    //codeLink: 'https://github.com/JeffGuo-06/nailongify',
    demoLink: 'https://nailongify.guojeff.com',
    imageType: 'standard',
    imageSrc: nailongifyImage,
  }

  // Add more games here...
];

export const otherProjects: Project[] = [
  {
    title: 'The Boards',
    subtitle: 'Shared leaderboards for friend groups',
    tech: ['React Native', 'Expo', 'Supabase'],
    description: 'A shared leaderboard IOS app designed for friend groups. Make leaderboards out of anything, basketball, pickleball, whatever he ball, shibal.',
    codeLink: 'https://github.com/JeffGuo-06/the-boards',
    demoLink: 'https://theboards.app',
    imageType: 'iphone',
    imageSrc: '/assets/boards-demo.png',
  },
  {
    title: 'SHOUT',
    subtitle: 'AI voice removal for concert videos',
    tech: ['Swift', 'AudioShake'],
    description:
      'We all wanna scream at concerts, but how tf am I meant to post a nonchalant story if I\'m screaming. \n  I\'m building an app to remove your own voice from concert videos, join the waitlist if you want me to hurry.',
    demoLink: 'https://guojeff.com/shout',
    imageType: 'iphone',
    imageSrc: '/assets/shout-demo.png',
  },
  // Add more projects here...
];

// Upcoming Content Data
export const upcomingContent: UpcomingItem[] = [
  {
    type: 'song',
    title: 'JSON',
    subtitle: 'Coming Soon',
    description: 'Working on something special...',
    releaseInfo: 'Coming Soon',
  },
  {
    type: 'song',
    title: '',
    subtitle: 'In Development',
    description: 'Building something cool for you all',
    releaseInfo: 'Q1 2025',
  },
  // Add more upcoming items here...
];

// Portfolio Projects Data
export const portfolioProjects: Project[] = [
  {
    title: 'The Boards',
    tech: ['React Native', 'Expo', 'Supabase'],
    description: 'A shared leaderboard IOS app designed for friend groups.',
    codeLink: 'https://github.com/JeffGuo-06/the-boards',
    demoLink: 'https://theboards.app',
    imageType: 'iphone',
    imageSrc: '/assets/boards-demo.png',
  },
  {
    title: 'IMitate',
    tech: ['React', 'Vercel', 'Next.js'],
    description: 'A patient simulator for health students to practice otherwise costly internal medicine (IM) diagnoses.',
    codeLink: 'https://github.com/liyuxiao2/IMitate',
    demoLink: 'https://imitate-medical-sim.vercel.app/',
    imageType: 'standard',
    imageSrc: '/assets/imitate-demo.png',
  },
  {
    title: 'SHOUT',
    tech: ['Swift', 'AudioShake'],
    description: 'An AI voice removal app, that is marketed towards concert goers who want clean concert videos.',
    demoLink: 'https://guojeff.com/shout',
    imageType: 'iphone',
    imageSrc: '/assets/shout-demo.png',
  },
];

// Page Content
export const pageContent = {
  intro: {
    name: 'JEFFGUO.md',
    role: 'Full Slack Developer',
    location: 'Toronto, ON',
    description: `Let's make coding cool again. (it never was)`
  },
  about: {
    image: '/assets/jeffguo.jpg',
    ranking: '#1 Techrot Rapper Songwriter',
    name: 'JEFFGUO.md',
    verified: true,
    stats: 'Full Slack Developer',
    bio: `Hey I'm Jeff! You probably know me from my prompting reel, I hope you liked it

These days, I just wanna create whatever I want, build whatever I want and not think about making money or padding my resume. 
Thank you all for letting me do that.

Also, even though I write about how much of a prompter I am, the songs are all handwritten, all the songs are off the dome. Honestly, it feels like such a breath of fresh air to make something by hand. (I do ask Claude to give me a tech word bank though).`,
    isFollowing: false,
  },
  sections: {
    games: {
      title: 'Games',
      subtitle: "This is fun stuff I've built for friends, you're my friend now.",
    },
    music: {
      title: 'Music',
      subtitle: 'A developer that also makes music?\n Are we deadass.',
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

// Portfolio Page Content (for the business/professional portfolio)
export const portfolioContent = {
  intro: {
    name: 'Jeff Guo',
    role: 'Full Stack Developer',
    location: 'Toronto, ON',
    description: "I'm a full stack developer specializing in creating intuitive and reliable mobile apps."
  },
  sections: {
    projects: {
      title: 'Projects',
      subtitle: 'Driven by the desire to build cool things for my friends to use, here are a few highlights.',
    },
  },
  cta: {
    title: "Let's make it happen",
    description: 'Ready to bring your next project to life? Let\'s connect and create something amazing together.',
  },
  socials: {
    github: 'https://github.com/JeffGuo-06',
    linkedin: 'https://www.linkedin.com/in/jeff-guo-a87054303/',
    email: 'jeffguo.06@gmail.com',
  },
};
