import React from 'react';
import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconMailFilled,
} from '@tabler/icons-react';
import { Flex } from '@/shared/components/layout/Flex';
import { Group } from '@/shared/components/layout/Group';
import { Text } from '@/shared/components/ui/Text';
import { Title } from '@/shared/components/ui/Title';
import { portfolioContent, portfolioProjects } from '../../data/content';
import classes from './Portfolio.module.css';

// Simple Card Component - no 3D effects
const FloatingCard: React.FC<{
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
}> = ({ children, href, target, rel, className }) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ textDecoration: 'none' }}
    >
      {children}
    </a>
  );
};

export function Portfolio() {
  return (
    <div className={classes.snapContainer}>
      {/* Section 1: Intro + Skills */}
      <div className={classes.snapSection}>
        <div className={classes.sectionContent}>
          {/* Glass Card */}
          <div className={classes.glassCard}>
            {/* Header */}
            <Flex gap="md" justify="flex-start" align="center" wrap="wrap">
              <Title className={classes.title}>
                {portfolioContent.intro.name} <span className={classes.divider}>|</span> <span className={classes.role}>{portfolioContent.intro.role}</span>
              </Title>
              <div className={classes.locationTag}>
                {portfolioContent.intro.location}
              </div>
            </Flex>

            {/* Description */}
            <Text className={classes.description}>
              {portfolioContent.intro.description}
            </Text>

            {/* Contact Icons */}
            <Group gap="sm" className={classes.contactIcons}>
              <a
                href={portfolioContent.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.glassIcon}
              >
                <IconBrandGithubFilled size={20} />
              </a>
              <a
                href={portfolioContent.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.glassIcon}
              >
                <IconBrandLinkedinFilled size={20} />
              </a>
              <a
                href={`mailto:${portfolioContent.socials.email}`}
                className={classes.glassIcon}
              >
                <IconMailFilled size={20} />
              </a>
            </Group>
          </div>
        </div>
      </div>

      {/* Section 2: Projects Header */}
      <div className={classes.snapSection}>
        <div className={classes.sectionContent}>
          <div className={classes.projectsHeader}>
            <div className={classes.projectsHeaderContent}>
              <Title order={3} className={classes.sectionTitle}>{portfolioContent.sections.projects.title}</Title>
              <Text className={classes.projectsBlurb}>
                {portfolioContent.sections.projects.subtitle}
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      {portfolioProjects.map((project) => (
        <div key={project.title} className={classes.snapSection}>
          <div className={classes.sectionContent}>
            <div className={classes.project}>
              <div className={classes.projectLeft}>
                <Title order={4} className={classes.projectTitle}>{project.title}</Title>
                <Group gap="xs" className={classes.projectTech}>
                  {project.tech.map((tech, i) => (
                    <span key={i} className={classes.techTag}>{tech}</span>
                  ))}
                </Group>
                <Text className={classes.projectDescription}>
                  {project.description}
                </Text>
                {project.codeLink && (
                  <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className={classes.codeLink}>
                    Code
                  </a>
                )}
              </div>
              <div className={classes.projectRight}>
                <FloatingCard
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.projectImageLink}
                >
                  {project.imageType === 'iphone' ? (
                    <div className={classes.iphoneProjectImage}>
                      <img src={project.imageSrc} alt={`${project.title} Screenshot`} />
                    </div>
                  ) : (
                    <div className={classes.projectImage}>
                      <img src={project.imageSrc} alt={`${project.title} Screenshot`} />
                    </div>
                  )}
                </FloatingCard>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Section 3: Final CTA */}
      <div className={classes.snapSection}>
        <div className={classes.sectionContent}>
          <div className={classes.ctaSection}>
            <Title order={2} className={classes.ctaTitle}>{portfolioContent.cta.title}</Title>
            <Text className={classes.ctaDescription}>
              {portfolioContent.cta.description}
            </Text>
            <div className={classes.ctaButtons}>
              <a href={`mailto:${portfolioContent.socials.email}`} className={classes.primaryCta}>
                Get in touch
              </a>
              <a href={portfolioContent.socials.linkedin} target="_blank" rel="noopener noreferrer" className={classes.secondaryCta}>
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
