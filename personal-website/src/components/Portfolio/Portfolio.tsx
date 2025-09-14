import React, { useRef, useState } from 'react';
import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconMailFilled,
  IconBrandReact,
  IconBrandGit,
  IconBrandTypescript,
  IconDatabase,
  IconBrandSwift,
  IconCloudCode,
  IconBrandPython,
  IconBrandJavascript,
  IconBrandNextjs
} from '@tabler/icons-react';
import { Box } from '../layout/Box';
import { Flex } from '../layout/Flex';
import { Group } from '../layout/Group';
import { Space } from '../layout/Space';
import { Stack } from '../layout/Stack';
import { ActionIcon } from '../ui/ActionIcon';
import { Text } from '../ui/Text';
import { Title } from '../ui/Title';
import classes from './Portfolio.module.css';

const skills = [
  { name: 'Git', icon: IconBrandGit },
  { name: 'React Native', icon: IconBrandReact },
  { name: 'Expo', icon: IconCloudCode },
  { name: 'Swift', icon: IconBrandSwift },
  { name: 'Supabase', icon: IconDatabase },
  { name: 'SQL', icon: IconDatabase },
  { name: 'Vercel', icon: IconCloudCode },
  { name: 'TypeScript', icon: IconBrandTypescript },
  { name: 'CSS', icon: IconCloudCode },
  { name: 'Python', icon: IconBrandPython },
  { name: 'Java', icon: IconCloudCode },
  { name: 'JavaScript', icon: IconBrandJavascript },
  { name: 'React', icon: IconBrandReact },
  { name: 'Next.js', icon: IconBrandNextjs },
  // Duplicate for seamless loop
  { name: 'Git', icon: IconBrandGit },
  { name: 'React Native', icon: IconBrandReact },
  { name: 'Expo', icon: IconCloudCode },
  { name: 'Swift', icon: IconBrandSwift },
  { name: 'Supabase', icon: IconDatabase },
  { name: 'Python', icon: IconBrandPython },
  { name: 'Java', icon: IconCloudCode },
  { name: 'JavaScript', icon: IconBrandJavascript },
];

// Floating Card Component for 3D hover effect
const FloatingCard: React.FC<{
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
}> = ({ children, href, target, rel, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewButtonRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Create even larger circular hover area (500px radius)
    const maxDistance = 700;
    const intensity = Math.min(distance / maxDistance, 1);
    
    // Apply 3D transform with reduced intensity and circular influence
    const x = deltaX / 20;
    const y = deltaY / 20;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    containerRef.current.style.transition = 'none'; // Remove transition during movement
    
    // Update view button position with magnetic effect
    if (viewButtonRef.current && isMouseEntered) {
      const magneticStrength = 0.3; // Magnetic effect strength
      const magneticX = deltaX * magneticStrength;
      const magneticY = deltaY * magneticStrength;
      viewButtonRef.current.style.transform = `translate(calc(-50% + ${magneticX}px), calc(-50% + ${magneticY}px))`;
      viewButtonRef.current.style.transition = 'none';
    }
  };

  const handleMouseEnter = () => setIsMouseEntered(true);
  
  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    // Add bounce-back transition
    containerRef.current.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    
    // Reset view button position with bounce
    if (viewButtonRef.current) {
      viewButtonRef.current.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      viewButtonRef.current.style.transform = `translate(-50%, -50%)`;
    }
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ textDecoration: 'none' }}
    >
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={classes.floatingCardContainer}
        style={{
          padding: '150px', // Even larger hover area
          margin: '-150px', // Offset the padding to maintain visual position
        }}
      >
        <div style={{ padding: '150px', margin: '-150px', position: 'relative' }}>
          {children}
          {isMouseEntered && (
            <div 
              ref={viewButtonRef}
              className={classes.magneticViewButton}
            >
              view
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

export function Portfolio() {
  return (
    <div className={classes.snapContainer}>
      {/* Section 1: Intro + Skills */}
      <div className={classes.snapSection}>
        <div className={classes.sectionContent}>
          {/* Liquid Glass Card */}
          <div 
            className={`${classes.glassCard} ${classes.animateCard}`}
            onMouseEnter={(e) => {
              e.currentTarget.classList.add(classes.liquidActive);
            }}
            onAnimationEnd={(e) => {
              if (e.animationName === 'liquidMove') {
                e.currentTarget.classList.remove(classes.liquidActive);
              }
            }}
          >
            {/* Header */}
            <Flex gap="md" justify="flex-start" align="center" wrap="wrap">
              <Title className={classes.title}>
                Jeff Guo <span className={classes.divider}>|</span> <span className={classes.role}>Full Stack Developer</span>
              </Title>
              <div className={classes.locationTag}>
                Toronto, ON
              </div>
            </Flex>
            
            {/* Description */}
            <Text className={classes.description}>
              I'm a full stack developer specializing in creating intuitive and reliable mobile apps.
            </Text>
            
            {/* Contact Icons */}
            <Group gap="sm" className={classes.contactIcons}>
              <a 
                href="https://github.com/JeffGuo-06" 
                target="_blank"
                rel="noopener noreferrer"
                className={classes.glassIcon}
              >
                <IconBrandGithubFilled size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/jeff-guo-a87054303/" 
                target="_blank"
                rel="noopener noreferrer"
                className={classes.glassIcon}
              >
                <IconBrandLinkedinFilled size={20} />
              </a>
              <a
                href="mailto:jeffguo.06@gmail.com"
                className={classes.glassIcon}
              >
                <IconMailFilled size={20} />
              </a>
            </Group>
          </div>
          
          {/* Skills */}
          <div className={classes.skillsWrapper}>
            <Title order={3} className={classes.sectionTitle}>Skills</Title>
            <div className={classes.carouselContainer}>
              <div className={classes.carouselTrack}>
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div key={`${skill.name}-${index}`} className={classes.skillItem}>
                      <Icon size={20} />
                      <Text size="sm">{skill.name}</Text>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Projects Header */}
      <div className={classes.snapSection}>
        <div className={classes.sectionContent}>
          <div className={classes.projectsHeader}>
            <div className={classes.projectsHeaderContent}>
              <Title order={3} className={classes.sectionTitle}>Projects</Title>
              <Text className={classes.projectsBlurb}>
                Driven by the desire to build cool things for my friends to use, here are a few highlights.
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Project 1: The Boards */}
      <div className={classes.snapSection}>
        <div className={classes.sectionContent}>
          <div className={classes.project}>
            <div className={classes.projectLeft}>
              <Title order={4} className={classes.projectTitle}>The Boards</Title>
              <Group gap="xs" className={classes.projectTech}>
                <span className={classes.techTag}>React Native</span>
                <span className={classes.techTag}>Expo</span>
                <span className={classes.techTag}>Supabase</span>
              </Group>
              <Text className={classes.projectDescription}>
                A shared leaderboard IOS app designed for friend groups.
              </Text>
              <a href="https://github.com/JeffGuo-06/the-boards" target="_blank" rel="noopener noreferrer" className={classes.codeLink}>
                Code
              </a>
            </div>
            <div className={classes.projectRight}>
              <FloatingCard
                href="https://theboards.app"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.projectImageLink}
              >
                <div className={classes.iphoneProjectImage}>
                  <img src="/assets/boards-demo.png" alt="The Boards App Screenshot" />
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </div>

      {/* Project 2: IMitate */}
      <div className={classes.snapSection}>
        <div className={classes.sectionContent}>
          <div className={classes.project}>
            <div className={classes.projectLeft}>
              <Title order={4} className={classes.projectTitle}>IMitate</Title>
              <Group gap="xs" className={classes.projectTech}>
                <span className={classes.techTag}>React</span>
                <span className={classes.techTag}>Vercel</span>
                <span className={classes.techTag}>Next.js</span>
              </Group>
              <Text className={classes.projectDescription}>
                A patient simulator for health students to practice otherwise costly internal medicine (IM) diagnoses.
              </Text>
              <a href="https://github.com/liyuxiao2/IMitate" target="_blank" rel="noopener noreferrer" className={classes.codeLink}>
                Code
              </a>
            </div>
            <div className={classes.projectRight}>
              <a 
                href="https://imitate-medical-sim.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={classes.projectImageLink}
              >
                <div className={classes.projectImage}>
                  <Text>Project Image</Text>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Project 3: SHOUT */}
      <div className={classes.snapSection}>
        <div className={classes.sectionContent}>
          <div className={classes.project}>
            <div className={classes.projectLeft}>
              <Title order={4} className={classes.projectTitle}>SHOUT</Title>
              <Group gap="xs" className={classes.projectTech}>
                <span className={classes.techTag}>Swift</span>
                <span className={classes.techTag}>AudioShake</span>
              </Group>
              <Text className={classes.projectDescription}>
                An AI voice removal app, that is marketed towards concert goers who want clean concert videos.
              </Text>
            </div>
            <div className={classes.projectRight}>
              <FloatingCard
                href="https://guojeff.com/shout"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.projectImageLink}
              >
                <div className={classes.iphoneProjectImage}>
                  <img src="/assets/shout-demo.png" alt="SHOUT App Screenshot" />
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Final CTA */}
      <div className={classes.snapSection}>
        <div className={classes.sectionContent}>
          <div className={classes.ctaSection}>
            <Title order={2} className={classes.ctaTitle}>Let's make it happen</Title>
            <Text className={classes.ctaDescription}>
              Ready to bring your next project to life? Let's connect and create something amazing together.
            </Text>
            <div className={classes.ctaButtons}>
              <a href="mailto:jeffguo.06@gmail.com" className={classes.primaryCta}>
                Get in touch
              </a>
              <a href="https://www.linkedin.com/in/jeff-guo-a87054303/" target="_blank" rel="noopener noreferrer" className={classes.secondaryCta}>
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
