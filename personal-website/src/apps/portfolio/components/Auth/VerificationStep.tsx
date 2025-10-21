import React, { useState, useRef, useEffect } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import classes from './AuthModal.module.css';

interface VerificationStepProps {
  phoneNumber: string;
  onSubmit: (code: string) => Promise<void>;
  onBack: () => void;
}

export function VerificationStep({ phoneNumber, onSubmit, onBack }: VerificationStepProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    // Focus first input on mount
    inputRefs[0].current?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;

    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (value && index === 5 && newCode.every(digit => digit !== '')) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);

    if (pastedData.length === 6) {
      const newCode = pastedData.split('');
      setCode(newCode);
      inputRefs[5].current?.focus();

      // Auto-submit
      handleSubmit(pastedData);
    }
  };

  const handleSubmit = async (verificationCode: string) => {
    setLoading(true);
    setError('');

    try {
      await onSubmit(verificationCode);
    } catch (err) {
      setError('Invalid verification code. Please try again.');
      setCode(['', '', '', '', '', '']);
      inputRefs[0].current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join('');

    if (verificationCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    handleSubmit(verificationCode);
  };

  const maskPhoneNumber = (phone: string) => {
    // Format: +1XXXXXXXXXX -> (XXX) XXX-XX56
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 11) {
      return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-XX${digits.slice(-2)}`;
    }
    return phone;
  };

  return (
    <div className={classes.stepContainer}>
      <button className={classes.backButton} onClick={onBack}>
        <IconArrowLeft size={20} />
      </button>

      <h2 className={classes.stepTitle}>Enter verification code</h2>
      <p className={classes.stepDescription}>
        We sent a 6-digit code to {maskPhoneNumber(phoneNumber)}
      </p>

      <form onSubmit={handleManualSubmit} className={classes.form}>
        <div className={classes.codeInputContainer}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={classes.codeInput}
              disabled={loading}
              maxLength={1}
            />
          ))}
        </div>

        {error && <p className={classes.error}>{error}</p>}

        <button
          type="submit"
          className={classes.submitButton}
          disabled={loading || code.some(digit => !digit)}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
}
