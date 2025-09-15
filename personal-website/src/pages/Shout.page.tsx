import React, { useState, useEffect, useRef } from 'react';
import { 
  IconWaveSine,
  IconVideo,
  IconShield,
  IconMicrophone
} from '@tabler/icons-react';
import { Container } from '../components/layout/Container';
import { Stack } from '../components/layout/Stack';
import { Flex } from '../components/layout/Flex';
import { Group } from '../components/layout/Group';
import { Center } from '../components/layout/Center';
import { Box } from '../components/layout/Box';
import { Button } from '../components/ui/Button';
import { Text } from '../components/ui/Text';
import { Title } from '../components/ui/Title';
import { Card } from '../components/ui/Card';
import { WaitlistModal } from '../components/ui/WaitlistModal';
import classes from './Shout.module.css';

export function ShoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const featuresRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleShout = () => {
    setModalOpened(true);
  };

  return (
    <div className={classes.shoutPage}>
      {/* Hero Section */}
      <section className={classes.hero}>
        <Container size="lg">
          <Center style={{ minHeight: '90vh', flexDirection: 'column' }}>
            <Stack align="center" gap="xl">
              {/* SHOUT Logo */}
              <Title className={classes.logo}>SHOUT</Title>
              
              {/* Tagline */}
              <Text className={classes.tagline}>your heart out.</Text>
              
              {/* Description */}
              <Text className={classes.description}>
                Remove your voice from concert videos
              </Text>
              
              {/* Main CTA */}
              <Button 
                className={classes.primaryCta}
                onClick={handleShout}
                disabled={isProcessing}
                size="xl"
              >
                Join Waitlist
              </Button>
              
            </Stack>
          </Center>
        </Container>
      </section>

      {/* Features Section */}
      <section className={classes.features} ref={featuresRef}>
        <Container size="lg">
          <Stack gap="xl" align="center">
            <Title order={2} className={`${classes.sectionTitle} ${isVisible ? classes.animateTitle : ''}`}>
              Make that story post with confidence
            </Title>
            <Text className={`${classes.featureDescription} ${isVisible ? classes.animateDescription : ''}`} style={{ fontSize: '1.1rem', color: '#B0B0B0', marginBottom: '2rem' }}>
              Professional-grade audio separation powered by AI
            </Text>
            <Flex justify="space-around" align="flex-start" wrap="wrap" gap="lg">
              <Card className={`${classes.featureCard} ${isVisible ? classes.animateCard : ''}`}>
                <Stack align="center" gap="md">
                  <div className={classes.featureIcon}>
                    <IconWaveSine size={48} stroke={1.5} color="#FFD60A" />
                  </div>
                  <Title order={3} className={classes.featureTitle}>
                    AI Voice Separation
                  </Title>
                  <Text className={classes.featureDescription}>
                    Advanced AI removes your voice while preserving the original audio quality
                  </Text>
                </Stack>
              </Card>

              <Card className={`${classes.featureCard} ${isVisible ? classes.animateCard : ''}`}>
                <Stack align="center" gap="md">
                  <div className={classes.featureIcon}>
                    <IconVideo size={48} stroke={1.5} color="#FFD60A" />
                  </div>
                  <Title order={3} className={classes.featureTitle}>
                    Original Quality
                  </Title>
                  <Text className={classes.featureDescription}>
                    No quality loss - get professional results every time
                  </Text>
                </Stack>
              </Card>

              <Card className={`${classes.featureCard} ${isVisible ? classes.animateCard : ''}`}>
                <Stack align="center" gap="md">
                  <div className={classes.featureIcon}>
                    <IconShield size={48} stroke={1.5} color="#FFD60A" />
                  </div>
                  <Title order={3} className={classes.featureTitle}>
                    Private & Local
                  </Title>
                  <Text className={classes.featureDescription}>
                    Your videos stay safe - all processing happens locally
                  </Text>
                </Stack>
              </Card>
            </Flex>
          </Stack>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className={classes.howItWorks}>
        <Container size="lg">
          <Stack gap="xl" align="center">
            <Title order={2} className={classes.sectionTitle}>
              How It Works
            </Title>
            
            <Flex justify="space-between" align="flex-start" wrap="wrap" gap="lg">
              <Box className={classes.step}>
                <Stack align="center" gap="md">
                  <div className={classes.stepNumber}>1</div>
                  <Title order={4} className={classes.stepTitle}>Upload Video</Title>
                  <Text className={classes.stepDescription}>
                    Choose from Photos or Files
                  </Text>
                </Stack>
              </Box>

              <Box className={classes.step}>
                <Stack align="center" gap="md">
                  <div className={classes.stepNumber}>2</div>
                  <Title order={4} className={classes.stepTitle}>AI Processing</Title>
                  <Text className={classes.stepDescription}>
                    AudioShake separation technology
                  </Text>
                </Stack>
              </Box>

              <Box className={classes.step}>
                <Stack align="center" gap="md">
                  <div className={classes.stepNumber}>3</div>
                  <Title order={4} className={classes.stepTitle}>Adjust Levels</Title>
                  <Text className={classes.stepDescription}>
                    Fine-tune vocal and instrument levels
                  </Text>
                </Stack>
              </Box>

              <Box className={classes.step}>
                <Stack align="center" gap="md">
                  <div className={classes.stepNumber}>4</div>
                  <Title order={4} className={classes.stepTitle}>Download Result</Title>
                  <Text className={classes.stepDescription}>
                    Get your clean concert video
                  </Text>
                </Stack>
              </Box>
            </Flex>
          </Stack>
        </Container>
      </section>

      {/* CTA Section */}
      <section className={classes.ctaSection}>
        <Container size="md">
          <Center>
            <Stack align="center" gap="lg">
              <Title order={2} className={classes.ctaTitle}>
                Ready to SHOUT your heart out?
              </Title>
              <Text className={classes.ctaDescription}>
                Coming soon to IOS or ANDROID
              </Text>
              <Group gap="md">
                <Button className={classes.secondaryButton} size="lg">
                  Follow me
                </Button>
              </Group>
            </Stack>
          </Center>
        </Container>
      </section>
      
      <WaitlistModal 
        opened={modalOpened} 
        onClose={() => setModalOpened(false)} 
      />
    </div>
  );
}