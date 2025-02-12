import { Box, Container, Flex, Space, Title } from '@mantine/core';
import { Project } from '../Project/Project';
import classes from '../styles/Title.module.css';

export function Projects() {
  const projects = [
    {
      id: 1,
      title: 'I Understand It Now TikTok Filter',

      //gif: './src/assets/tiktokfilter.gif',

      image: './src/assets/tiktokfilter.png',
      desc: 'TikTok Effect inspired by the I Understand It Now trend.',
      link: 'https://github.com/JeffGuo-06/tiktok-filter-i-understand-it-now',
    },
    {
      id: 2,
      title: 'Axe Guy',
      image: './src/assets/tiktokfilter.png',
      //gif: './src/assets/test-gif.gif',
      desc: 'temp',
      link: 'https://github.com/JeffGuo-06/axe-guy',
    },
    {
      title: 'I Understand It Now TikTok Filter',
      image: './src/assets/tiktokfilter.png',
      gif: './src/assets/test-gif.gif',
      desc: 'temp',
      link: 'https://github.com/JeffGuo-06/tiktok-filter-i-understand-it-now',
    },
    {
      title: 'I Understand It Now TikTok Filter',
      image: './src/assets/tiktokfilter.png',
      gif: './src/assets/test-gif.gif',
      desc: 'temp',
      link: 'https://github.com/JeffGuo-06/tiktok-filter-i-understand-it-now',
    },
    {
      title: 'I Understand It Now TikTok Filter',
      image: './src/assets/tiktokfilter.png',
      gif: './src/assets/test-gif.gif',
      desc: 'temp',
      link: 'https://github.com/JeffGuo-06/tiktok-filter-i-understand-it-now',
    },
    {
      title: 'I Understand It Now TikTok Filter',
      image: './src/assets/tiktokfilter.png',
      gif: './src/assets/test-gif.gif',
      desc: 'temp',
      link: 'https://github.com/JeffGuo-06/tiktok-filter-i-understand-it-now',
    },
  ];

  return (
    <>
      <Box my={100} mt={100}>
        <Title order={1} className={classes.title}>
          Projects
        </Title>
        <Space h="xl"></Space>
        <Container fluid>
          <Flex justify="space-around" align="center" direction="row" wrap="wrap" gap="lg">
            {projects.map((proj) => (
              <Project
                title={proj.title}
                image={proj.image}
                gif={proj.gif}
                desc={proj.desc}
                link={proj.link}
              ></Project>
            ))}
          </Flex>
        </Container>
      </Box>
    </>
  );
}
