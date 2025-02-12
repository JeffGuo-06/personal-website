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
        <Text>awdqdwqdqwd</Text>
        <Image src="src/assets/waterloo.png" w="300px"></Image>
      </Group>
    </div>
  );
}
