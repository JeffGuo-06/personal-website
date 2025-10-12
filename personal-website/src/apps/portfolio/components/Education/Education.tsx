import React from 'react';
import { Group } from '@/shared/components/layout/Group';
import { Space } from '@/shared/components/layout/Space';
import { Image } from '@/shared/components/ui/Image';
import { Text } from '@/shared/components/ui/Text';
import { Title } from '@/shared/components/ui/Title';
import classes from '../styles/Title.module.css';

export function Education() {
  return (
    <div>
      <Title className={classes.title}> Education</Title>
      <Space h="xl" />
      <Group style={{ gap: 'var(--theme-spacing-lg)', alignItems: 'center', flexWrap: 'wrap' }}>
        <Text style={{ flex: 1, minWidth: '250px' }}>
          I'm an Honours Mathematics student at University of Waterloo, and have a strong interest
          towards Computer Science and Data Science{' '}
        </Text>
        <Image src="./assets/waterloo.png" w="300px" />
      </Group>
    </div>
  );
}
