import { useEffect, useState } from 'react';
import { Badge, Button, Card, Container, Group, Image, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';

export function Project({ title = '', image = '', gif = '', desc = '', link = '' }) {
  const { hovered, ref } = useHover();
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
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        w={250}
        h={375}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Top Content */}
        <div>
          <Card.Section>
            <Image src={displayContent} height={160} />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{title}</Text>
          </Group>

          <Text size="sm" c="dimmed">
            {desc}
          </Text>
        </div>

        {/* Button at the Bottom */}
        <Button color="blue" fullWidth mt="md" radius="md" href={link} component="a">
          Open
        </Button>
      </Card>
    </div>
  );
}
