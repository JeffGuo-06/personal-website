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

export interface EducationItem {
  school: string;
  program: string;
  gpa?: string;
  location: string;
  dateRange: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  companyLink?: string;
  location?: string;
  dateRange: string;
  bullets: string[];
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
    subtitle: 'Shared leaderboard iOS app — 100+ users on the App Store',
    tech: ['React Native', 'Expo', 'Supabase'],
    description: 'Real-time leaderboards and push notifications for friend group competitions.',
    codeLink: 'https://github.com/JeffGuo-06/the-boards',
    demoLink: 'https://theboards.app',
    imageType: 'iphone',
    imageSrc: '/assets/boards-demo.png',
  },
  {
    title: 'Insu',
    subtitle: 'Automated insulin management iOS app',
    tech: ['Swift', 'CoreBluetooth', 'RileyLink'],
    description: 'Led a team of 4 to build an iOS app integrating with glucose monitors and insulin pumps over Bluetooth.',
    codeLink: 'https://github.com/liyuxiao2/INSU',
    demoLink: 'https://devpost.com/software/insu',
    imageType: 'standard',
    imageSrc: '/assets/insu-demo.jpg',
  },
  {
    title: 'IMitate',
    subtitle: 'Medical patient simulator — 200+ unique patients',
    tech: ['Next.js', 'Supabase', 'Gemini API'],
    description: 'Free patient simulation and diagnostic assessment platform for medical students.',
    codeLink: 'https://github.com/liyuxiao2/IMitate',
    demoLink: 'https://imitate-medical-sim.vercel.app/',
    imageType: 'standard',
    imageSrc: '/assets/imitate-demo.jpg',
  },
  {
    title: 'SHOUT',
    subtitle: 'AI voice removal for concert videos — 50+ waitlist signups',
    tech: ['Swift', 'AudioShake', 'Vercel'],
    description: 'iOS app that removes your voice from concert videos using AI stem separation.',
    demoLink: 'https://guojeff.com/shout',
    imageType: 'iphone',
    imageSrc: '/assets/shout-demo.png',
  },
];

// Education Data
export const educationItems: EducationItem[] = [
  {
    school: 'University of Waterloo',
    program: 'Computational Mathematics',
    gpa: '3.93',
    location: 'Waterloo, ON',
    dateRange: 'Sep 2024 - Jan 2029',
  },
];

// Experience Data
export const experienceItems: ExperienceItem[] = [
  {
    role: 'Software Engineering Intern',
    company: 'Inductive Solution',
    location: 'Boston, MA',
    dateRange: 'Jan 2026 - Apr 2026',
    bullets: [
      'Shipped Stripe billing across Node/Prisma backend and web/iOS/Android UI: webhook handler with TOCTOU race fix, credit-based pricing, and Flyway migration.',
      'Rebuilt mobile push notifications: migrated iOS from NSE rich notifications to Expo Push Service, hardened the Sygnal gateway with timeouts and 5xx retry.',
      'Eliminated a shared Matrix admin token shipped in client bundles by architecting a server-side login proxy with per-user credentials across mobile, web, Node/Prisma backend.',
    ],
  },
  {
    role: 'Tech Content Creator',
    company: '@jeffguo.md',
    companyLink: 'https://www.instagram.com/jeffguo.md',
    dateRange: 'Oct 2025 - Present',
    bullets: [
      'Scaled tech song parodies to 4.6M+ views and 200k+ shares on Instagram.',
      'Grew to 2,000+ followers in 30 days by systematically testing hooks, formats, and posting strategies.',
    ],
  },
  {
    role: 'Digital Marketing & SEO Intern',
    company: 'Opusense (YC X25)',
    location: 'Toronto, ON',
    dateRange: 'May 2025 - Aug 2025',
    bullets: [
      'Built SEO/GEO content strategy improving click-through rate by 50%, and QA\'d mobile builds with the dev team.',
    ],
  },
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
    imageSrc: '/assets/imitate-demo.jpg',
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

// Skills Data
export const skillsData = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Swift', 'SQL', 'Bash'] },
  { category: 'Frontend & Mobile', items: ['React', 'Next.js', 'React Native', 'Expo', 'SwiftUI', 'Tailwind CSS'] },
  { category: 'Backend & Data', items: ['Node.js', 'Express', 'FastAPI', 'Prisma', 'PostgreSQL', 'Supabase', 'Firebase'] },
  { category: 'Cloud & Tools', items: ['Docker', 'AWS', 'Vercel', 'Git', 'CI/CD', 'Stripe', 'OpenAI'] },
];

// Page Content
export const pageContent = {
  intro: {
    name: 'JEFFGUO.md',
    role: 'CS @ Waterloo',
    location: 'Toronto, ON',
    description: `Let's make coding cool again. (it never was)`,
    bio: 'CS student at Waterloo. I build mobile apps, ship to production, and make tech content on the side.',
  },
  about: {
    image: '/assets/jeff-about.jpg',
    ranking: '#1 Techrot Rapper Songwriter',
    name: 'JEFFGUO.md',
    verified: true,
    stats: 'Full Slack Developer',
    bio: `Hey I'm Jeff! You probably know me from my prompting reel, I hope you liked it

These days, I just wanna create whatever I want, build whatever I want and not think about making money or padding my resume. 
Thank you all for letting me do that.`,
    isFollowing: false,
  },
  sections: {
    experience: {
      title: 'Experience',
      subtitle: 'Where I\'ve been building.',
    },
    games: {
      title: 'Games',
      subtitle: "This is fun stuff I've built for friends, you're my friend now.",
    },
    content: {
      title: 'Content',
      subtitle: 'Creative stuff.',
    },
    music: {
      title: 'Music',
      subtitle: 'A developer that also makes music?\n Are we deadass.',
    },
    other: {
      title: 'Projects',
      subtitle: 'More stuff I\'ve been working on.',
    },
  },
  cta: {
    title: "Let's work together",
    description: 'Got an idea or an opportunity? I\'d love to hear about it.',
  },
  socials: {
    instagram: 'https://www.instagram.com/jeffguo.md',
    github: 'https://github.com/JEFFGUOmd',
    linkedin: 'https://www.linkedin.com/in/guo-jeff',
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
    linkedin: 'https://www.linkedin.com/in/guo-jeff/',
    email: 'jeffguo.06@gmail.com',
  },
};
