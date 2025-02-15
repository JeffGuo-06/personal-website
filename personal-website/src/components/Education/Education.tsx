import { Group, Image, Space, Text, Title } from '@mantine/core';
import classes from '../styles/Title.module.css';

export function Education() {
  return (
    <div>
      <Title order={1} className={classes.title}>
        {' '}
        Education
      </Title>
      <Space h="xl"></Space>
      <Group grow>
        <Text>
          I'm an Honours Mathematics student at University of Waterloo, and have a strong interest
          towards Computer Science and Data Science{' '}
        </Text>
        <Image src="./assets/waterloo.png" w="300px"></Image>
      </Group>
    </div>
  );
}
