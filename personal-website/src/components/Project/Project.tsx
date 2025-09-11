import React, { useEffect, useState } from 'react';
import { useHover } from '../../hooks';
import { Group } from '../layout/Group';
import { Button } from '../ui/Button';
import { Card, CardSection } from '../ui/Card';
import { Image } from '../ui/Image';
import { Text } from '../ui/Text';

export function Project({ title = '', image = '', gif = '', desc = '', link = '' }) {
  const { hovered, ref } = useHover<HTMLDivElement>();
  const [displayContent, setDisplayContent] = useState(image);
  useEffect(() => {
    if (hovered && gif != '') {
      setDisplayContent(gif);
    } else {
      setDisplayContent(image);
    }
  }, [hovered, gif, image]);
  return (
    <div ref={ref}>
      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '250px',
          height: '375px',
        }}
      >
        {/* Top Content */}
        <div>
          <CardSection>
            <Image src={displayContent} h={160} />
          </CardSection>

          <Group justify="space-between">
            <Text fw={500}>{title}</Text>
          </Group>

          <Text size="sm" c="dimmed">
            {desc}
          </Text>
        </div>

        {/* Button at the Bottom */}
        <Button href={link} style={{ marginTop: 'var(--theme-spacing-md)' }}>
          Open
        </Button>
      </Card>
    </div>
  );
}
