import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { Button, Center, Container, Flex, Group, Overlay, Space, Stack, Text } from '@mantine/core';

export function Valentines() {
  const [page, setPage] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Set the target date (e.g., February 14, 2024, at 12:00 PM)
  const targetDate = new Date('2025-02-15T12:00:00').getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // If the countdown is over, stop the timer
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleCorrectClick = () => {
    setPage((prevPage) => prevPage + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1200);
  };

  const handleBackClick = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const renderImage = () => {
    switch (page) {
      case -2:
        return <img src="/images/valentines-sad.png" alt="Sad" />;
      case -1:
        return <img src="/images/valentines-sad.png" alt="Sad" />;
      case 1:
        return <img src="/images/valentines-1.png" alt="1" />;
      case 2:
        return <img src="/images/valentines-2.png" alt="2" />;
      case 3:
        return <img src="/images/valentines-3.png" alt="3" />;
      case 4:
        return <img src="/images/valentines-4.png" alt="4" />;
      case 5:
        return <img src="/images/valentines-5.png" alt="5" />;
      case 6:
        return <img src="/images/valentines-6.png" alt="6" />;
      case 7:
        return <img src="/images/valentines-7.png" alt="7" />;
      case 8:
        return <img src="/images/valentines-8.png" alt="8" />;
      case 9:
        return <img src="/images/valentines-9.png" alt="9" />;
      case 10:
        return <img src="/images/valentines-10.png" alt="10" />;
      default:
    }
  };

  const renderContent = () => {
    switch (page) {
      case -2:
        return (
          <>
            <Text size="xl" fw={700} c="#FF3334">
              okay.
            </Text>
            <Button variant="filled" bg="#FF8896" c="white" onClick={() => setPage(1)}>
              Back
            </Button>
          </>
        );
      case -1:
        return (
          <>
            <Text size="xl" fw={700} c="#FF3334">
              Access Denied : Sherlyn not detected.
            </Text>
            <Button variant="filled" bg="#FF3334" c="white" onClick={() => setPage(1)}>
              I'm Sherlyn trust me
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <Text size="xl" fw={700} c="#FF3334">
              Will you be my valentine?
            </Text>
            <Group>
              <Button variant="filled" bg="#FF8896" c="white" onClick={handleNextClick}>
                Yes
              </Button>
              <Button variant="filled" bg="#FF3334" c="white" onClick={() => setPage(-2)}>
                No
              </Button>
            </Group>
          </>
        );
      case 2:
        return (
          <>
            <Text size="xl" fw={700} c="#FF3334">
              Not so fast!
            </Text>
            <Text c="#FF3334">
              I can't just be letting <b>ANYONE</b> be my valentine
            </Text>
            <Group>
              <Button variant="filled" bg="#FF8896" c="white" onClick={handleNextClick}>
                Next
              </Button>
            </Group>
          </>
        );
      case 3:
        return (
          <>
            <Text size="xl" fw={700} c="#FF3334">
              Due to security concerns...
            </Text>
            <Text c="#FF3334">
              You will have to complete a trial through our state of the art{' '}
              <b> valentine detection system.</b>
            </Text>
            <Text c="#FF3334">Do you understand?</Text>
            <Group>
              <Button variant="filled" bg="#FF8896" c="white" onClick={handleNextClick}>
                Yes
              </Button>
            </Group>
          </>
        );
      case 4:
        return (
          <>
            <Text size="xl" fw={700} c="#FF3334">
              Question 1:
            </Text>
            <Text c="#FF3334">
              What are we currently watching together on <b>Netflix?</b>
            </Text>
            <Group>
              <Button variant="filled" bg="#FF8896" c="white" onClick={() => setPage(-1)}>
                Breaking Bad
              </Button>
              <Button variant="filled" bg="#FF8896" c="white" onClick={() => setPage(-1)}>
                Suits
              </Button>
              <Button variant="filled" bg="#FF8896" c="white" onClick={handleCorrectClick}>
                Alice in Borderland
              </Button>
              <Button variant="filled" bg="#FF8896" c="white" onClick={() => setPage(-1)}>
                Despicable Me
              </Button>
            </Group>
          </>
        );
      case 5:
        return (
          <>
            <Text size="xl" fw={700} c="#FF3334">
              Question 2:
            </Text>
            <Text c="#FF3334">
              When is the pullup challenge <b>deadline</b>?
            </Text>
            <Group>
              <Button variant="filled" bg="#FF8896" c="white" onClick={handleCorrectClick}>
                Dec 31st 2025 11:59 PM
              </Button>
              <Button variant="filled" bg="#FF8896" c="white" onClick={() => setPage(-1)}>
                Feb 14th 2025 11:59 PM
              </Button>
              <Button variant="filled" bg="#FF8896" c="white" onClick={() => setPage(-1)}>
                Dec 31st 2026 11:59 PM
              </Button>
              <Button variant="filled" bg="#FF8896" c="white" onClick={() => setPage(-1)}>
                Feb 14th 2026 11:59 PM
              </Button>
            </Group>
          </>
        );
      case 6:
        return (
          <>
            <Text size="xl" fw={700} c="#FF3334">
              Question 3:
            </Text>
            <Text c="#FF3334">
              What did we make at <b>cotty</b>?
            </Text>
            <Group>
              <Button variant="filled" bg="#FF8896" c="white" onClick={() => setPage(-1)}>
                Croissants
              </Button>
              <Button variant="filled" bg="#FF8896" c="white" onClick={handleCorrectClick}>
                Toast
              </Button>
              <Button variant="filled" bg="#FF8896" c="white" onClick={() => setPage(-1)}>
                Waffles
              </Button>
              <Button variant="filled" bg="#FF8896" c="white" onClick={() => setPage(-1)}>
                Pancakes
              </Button>
            </Group>
          </>
        );
      case 7:
        return (
          <>
            <Text size="xl" fw={700} c="#FF3334">
              Question 4:
            </Text>
            <Text c="#FF3334">
              Who won <b> more minigames</b> in It Takes Two?
            </Text>
            <Group>
              <Button variant="filled" bg="#FF8896" c="white" onClick={handleCorrectClick}>
                Jeff
              </Button>
              <Button variant="filled" bg="#FF8896" c="white" onClick={() => setPage(-1)}>
                Sherlyn
              </Button>
            </Group>
          </>
        );
      case 8:
        return (
          <>
            <Text size="xl" fw={700} c="#FF3334">
              Final question:
            </Text>
            <Text c="#FF3334">What's your name?</Text>
            <Group>
              <Button variant="filled" bg="#FF8896" c="white" onClick={handleCorrectClick}>
                Sherlyn
              </Button>
              <Button variant="filled" bg="#FF3334" c="white" onClick={() => setPage(-1)}>
                Not Sherlyn
              </Button>
            </Group>
          </>
        );
      case 9:
        return (
          <>
            <Text size="xl" fw={700} c="#FF3334">
              CONGRATULATIONS YOU HAVE PROVEN YOUR IDENTITY
            </Text>
            <Button variant="filled" bg="#FF8896" c="white" onClick={handleNextClick}>
              Proceed to checkout
            </Button>
          </>
        );
      case 10:
        return (
          <>
            <Text size="xl" fw={700} c="#FF3334">
              Your Valentine is on his way!
            </Text>
            <Space></Space>
            <Text size="l" fw={100} c="#FF3334">
              Order arrives in:{' '}
            </Text>
            <Text size="xl" fw={700} c="#FF3334">
              <b>
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s{' '}
              </b>
            </Text>
            <Space></Space>

            <Text size="sm" fw={100} c="#FF3334">
              (If it doesn't, please contact customer service at{' '}
              <b>
                <a href="tel:6476178898">647-617-8898</a>
              </b>
              )
            </Text>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <Center
        bg="#FFDEE3" // Light pink background
      >
        <Flex
          justify="left"
          align="center"
          w="50vw"
          h="100vh"
          p="xl" // Padding for spacing
          style={{
            backgroundImage: `url('/images/valentines-background.png')`, // Path to your image
            backgroundSize: 'cover', // Ensure the image covers the entire container
            backgroundPosition: 'center', // Center the image
            backgroundRepeat: 'no-repeat', // Prevent repeating the image
          }}
        >
          <Stack>
            {renderImage()}
            {showConfetti && (
              <ReactConfetti
                numberOfPieces={500}
                gravity={1}
                wind={0}
                colors={['#FF3334', '#FF6F77', '#FFBBC1']}
                tweenDuration={750}
                recycle={false}
              />
            )}
            {renderContent()}
          </Stack>
        </Flex>
      </Center>
    </>
  );
}
