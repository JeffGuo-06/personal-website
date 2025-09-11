import {
  IconBrandGithubFilled,
  IconBrandInstagramFilled,
  IconBrandLinkedinFilled,
  IconMailFilled,
} from '@tabler/icons-react';
import { Box } from '../layout/Box';
import { Flex } from '../layout/Flex';
import { Group } from '../layout/Group';
import { Space } from '../layout/Space';
import { ActionIcon } from '../ui/ActionIcon';
import { Text } from '../ui/Text';
import { Title } from '../ui/Title';
import classes from './Intro.module.css';

export function Intro() {
  return (
    <Box style={{ margin: '100px 0', marginTop: '200px' }}>
      <Flex gap="md" justify="flex-end" align="flex-start" direction="column" wrap="wrap">
        <Title className={`${classes.title} ${classes.animateTitle}`}>Hi, I'm Jeff!</Title>
        <Text className={classes.animateDescription}>
          I'm a full stack developer, right now, I'm focusing on developing mobile apps.
        </Text>
        <Space h="xl" />
        <Group>
          <ActionIcon 
            component="a" 
            href="https://github.com/JeffGuo-06" 
            target="_blank"
            rel="noopener noreferrer"
            color="gray" 
            className={classes.animateIcon}
          >
            <IconBrandGithubFilled
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
              color="white"
            />
          </ActionIcon>
          <ActionIcon 
            component="a"
            href="https://www.linkedin.com/in/jeff-guo-a87054303/" 
            target="_blank"
            rel="noopener noreferrer"
            color="gray"
            className={classes.animateIcon}
          >
            <IconBrandLinkedinFilled
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
              color="white"
            />
          </ActionIcon>
          <ActionIcon 
            component="a"
            href="https://www.instagram.com/jeff.gwoah/" 
            target="_blank"
            rel="noopener noreferrer"
            color="gray" 
            className={classes.animateIcon}
          >
            <IconBrandInstagramFilled
              style={{ width: '70%', height: '70%' }}
              stroke={1.5}
              color="white"
            />
          </ActionIcon>
          <ActionIcon 
            component="a"
            href="mailto:jeffguo.06@gmail.com" 
            color="gray" 
            className={classes.animateIcon}
          >
            <IconMailFilled style={{ width: '70%', height: '70%' }} stroke={1.5} color="white" />
          </ActionIcon>
        </Group>
      </Flex>
    </Box>
  );
}
