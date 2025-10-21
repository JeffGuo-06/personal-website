import React, { useState } from 'react';
import classes from './AuthModal.module.css';

interface PhoneNumberStepProps {
  onSubmit: (phoneNumber: string) => Promise<void>;
}

export function PhoneNumberStep({ onSubmit }: PhoneNumberStepProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    // Format as (XXX) XXX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Extract digits only
    const digits = phoneNumber.replace(/\D/g, '');

    if (digits.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Format as E.164 (international format)
      const formattedPhone = `+1${digits}`;
      console.log('Submitting phone number:', formattedPhone);
      await onSubmit(formattedPhone);
    } catch (err) {
      console.error('Phone submit error:', err);
      setError('Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.stepContainer}>
      <h2 className={classes.stepTitle}>Enter your phone number</h2>
      <p className={classes.stepDescription}>
        We'll send you a verification code
      </p>

      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.inputGroup}>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handleInputChange}
            placeholder="(555) 555-5555"
            className={classes.input}
            disabled={loading}
            maxLength={14}
          />
        </div>

        {error && <p className={classes.error}>{error}</p>}

        <button
          type="submit"
          className={classes.submitButton}
          disabled={loading || phoneNumber.length === 0}
        >
          {loading ? 'Sending...' : 'Send Code'}
        </button>
      </form>
    </div>
  );
}
