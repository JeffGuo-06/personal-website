import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Text } from './Text';
import { Title } from './Title';
import { Stack } from '../layout/Stack';
import { Group } from '../layout/Group';
import classes from './WaitlistModal.module.css';

interface WaitlistModalProps {
  opened: boolean;
  onClose: () => void;
}

export function WaitlistModal({ opened, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [isLoadingCount, setIsLoadingCount] = useState(false);

  // Fetch waitlist count when modal opens
  useEffect(() => {
    if (opened && waitlistCount === null) {
      fetchWaitlistCount();
    }
  }, [opened]);

  const fetchWaitlistCount = async () => {
    setIsLoadingCount(true);
    try {
      const response = await fetch('/api/mailchimp-count');
      const data = await response.json();
      
      if (response.ok && data.success) {
        setWaitlistCount(data.count);
      } else {
        // Fallback count if API fails
        setWaitlistCount(1200);
      }
    } catch (error) {
      console.error('Failed to fetch waitlist count:', error);
      // Fallback count if API fails
      setWaitlistCount(1200);
    } finally {
      setIsLoadingCount(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/mailchimp-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        // Increment the count locally for immediate feedback
        if (waitlistCount !== null) {
          setWaitlistCount(waitlistCount + 1);
        }
      } else {
        // Handle error - you could add error state here if needed
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  const displayCount = isLoadingCount ? '...' : (waitlistCount?.toLocaleString() || '...');

  if (isSubmitted) {
    return (
      <Modal opened={opened} onClose={handleClose} centered>
        <div className={classes.modal}>
          <Stack align="center" gap="lg">
            <Title order={2} className={classes.title}>
              🎉 You're in!
            </Title>
            <Text className={classes.description}>
              Thanks for joining the waitlist! We'll notify you as soon as SHOUT is ready.
            </Text>
            <Text className={classes.count}>
              You're #{waitlistCount !== null ? (waitlistCount).toLocaleString() : '...'} in line
            </Text>
            <Button className={classes.closeButton} onClick={handleClose}>
              Close
            </Button>
          </Stack>
        </div>
      </Modal>
    );
  }

  return (
    <Modal opened={opened} onClose={handleClose} centered>
      <div className={classes.modal}>
        <Stack align="center" gap="lg">
          <Title order={2} className={classes.title}>
            Join the Waitlist
          </Title>
          <Text className={classes.description}>
            Be the first to know when SHOUT launches
          </Text>
          <Text className={classes.count}>
            {displayCount} people already waitlisted
          </Text>
          
          <form onSubmit={handleSubmit} className={classes.form}>
            <Stack gap="md">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={classes.input}
              />
              <Group gap="sm" justify="space-between">
                <Button 
                  type="button" 
                  className={classes.cancelButton}
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className={classes.submitButton}
                  disabled={isSubmitting || !email}
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </div>
    </Modal>
  );
}