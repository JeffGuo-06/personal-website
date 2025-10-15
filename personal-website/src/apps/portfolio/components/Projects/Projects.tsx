import React from 'react';
import { Box } from '@/shared/components/layout/Box';
import { Container } from '@/shared/components/layout/Container';
import { Flex } from '@/shared/components/layout/Flex';
import { Space } from '@/shared/components/layout/Space';
import { Project } from '../Project/Project';
import { Title } from '@/shared/components/ui/Title';
import classes from '../styles/Title.module.css';

export function Projects() {
  const projects = [
    {
      title: 'I Understand It Now TikTok Filter',

      //gif: './src/assets/tiktokfilter.gif',

      image: './assets/tiktokfilter.png',
      desc: 'TikTok Effect inspired by the I Understand It Now trend. Do you understand it?',
      link: 'https://github.com/JeffGuo-06/tiktok-filter-i-understand-it-now',
    },
    {
      title: 'Axe Guy',
      image: './assets/axe-guy.png',
      //gif: './src/assets/test-gif.gif',
      desc: 'Dungeon Crawler game, featuring a guy, and this guy, he has an axe.',
      link: 'https://github.com/JeffGuo-06/axe-guy',
    },
    {
      title: 'Blocked In',
      image: './assets/blocked-in.png',
      //gif: './assets/test-gif.gif',
      desc: 'Visual habit tracker, habits add blocks to your tower, track your habits with your friends, blocking in is always more fun with friends.',
      link: 'https://github.com/tony1234567891011/geesehacks2025',
    },
    {
      title: 'Fruits vs Ants Simulation',
      image: './assets/fruits-vs-ants.png',
      //gif: './assets/test-gif.gif',
      desc: 'When the fruits roll up, the ants roll up, their sleeves, I guess.',
      link: 'https://github.com/JeffGuo-06/tiktok-filter-i-understand-it-now',
    },
    {
      title: 'MORE PROJECTS TO COME',
      image: './assets/wrench-guy.png',
      //gif: './assets/test-gif.gif',
      desc: 'Currently working on more fun stuff, stay tuned!',
      link: './working-on-it',
    },
  ];

  return (
    <>
      <Box id="projects" style={{ margin: '100px 0', marginTop: '100px' }}>
        <Title className={classes.title}>Projects</Title>
        <Space h="xl" />
        <Container>
          <Flex justify="space-around" align="center" direction="row" wrap="wrap" gap="lg">
            {projects.map((proj, index) => (
              <Project
                key={index}
                title={proj.title}
                image={proj.image}
                //mgif={proj.gif}
                desc={proj.desc}
                link={proj.link}
              />
            ))}
          </Flex>
        </Container>
      </Box>
    </>
  );
}
