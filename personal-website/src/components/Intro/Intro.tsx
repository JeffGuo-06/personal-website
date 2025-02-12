import {
  IconBrandGithubFilled,
  IconBrandInstagramFilled,
  IconBrandLinkedinFilled,
  IconMailFilled,
} from '@tabler/icons-react';
import { ActionIcon, Box, Button, Container, Flex, Group, Space, Text, Title } from '@mantine/core';
import classes from './Intro.module.css';

export function Intro() {
  return (
    <Box my={100} mt={200}>
      <Flex gap="md" justify="flex-end" align="flex-start" direction="column" wrap="wrap">
        <Title className={classes.title}>Hi, I'm Jeff!</Title>
        <Text>
          A passionate Developer, having experience in building applications <br />
          using Java, Python, Unity, C# and other frameworks.
        </Text>
        <Space h="xl"></Space>
        <Group>
          <ActionIcon
            radius="xl"
            size="xl"
            component="a"
            href="https://github.com/JeffGuo-06"
            color="black"
          >
            <IconBrandGithubFilled
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
              color="var(--mantine-color-white)"
            />
          </ActionIcon>
          <ActionIcon
            radius="xl"
            size="xl"
            component="a"
            href="https://www.linkedin.com/in/jeff-guo-a87054303/"
          >
            <IconBrandLinkedinFilled
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
              color="var(--mantine-color-white)"
            />
          </ActionIcon>
          <ActionIcon
            radius="xl"
            size="xl"
            component="a"
            href="https://www.instagram.com/jeff.gwoah/"
            color="pink"
          >
            <IconBrandInstagramFilled
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
              color="var(--mantine-color-white)"
            />
          </ActionIcon>
          <ActionIcon
            radius="xl"
            size="xl"
            component="a"
            href="mailto:jeffguo.06@gmail.com"
            color="orange"
          >
            <IconMailFilled
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
              color="var(--mantine-color-white)"
            />
          </ActionIcon>
        </Group>
      </Flex>
    </Box>
  );
}
