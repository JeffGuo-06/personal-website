import React, { useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { supabase } from '../../lib/supabase';
import { PhoneNumberStep } from './PhoneNumberStep';
import { VerificationStep } from './VerificationStep';
import { ProfileSetupStep } from './ProfileSetupStep';
import classes from './AuthModal.module.css';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (userId: string) => void;
}

type AuthStep = 'phone' | 'verification' | 'profile-setup';

export function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [step, setStep] = useState<AuthStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sessionToken, setSessionToken] = useState('');

  const handlePhoneSubmit = async (phone: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      });

      if (error) throw error;

      setPhoneNumber(phone);
      setStep('verification');
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };

  const handleVerificationSubmit = async (code: string) => {
    console.log('Verifying OTP for phone:', phoneNumber, 'code:', code);
    try {
      console.log('Calling supabase.auth.verifyOtp...');

      // Add timeout to prevent infinite hanging
      const verifyPromise = supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: code,
        type: 'sms',
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Verification timeout - please check your Supabase Twilio configuration')), 15000)
      );

      const result = await Promise.race([verifyPromise, timeoutPromise]) as any;

      console.log('Raw verifyOtp result:', result);
      const { data, error } = result;

      console.log('Verify OTP response:', { data, error });

      if (error) {
        console.error('OTP verification error:', error);
        throw error;
      }

      if (data.session) {
        console.log('Session created successfully');
        setSessionToken(data.session.access_token);

        // Check if user profile already exists
        console.log('Checking for existing user with phone:', phoneNumber);
        const { data: existingUser, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('phone_number', phoneNumber)
          .single();

        console.log('Existing user check:', { existingUser, userError });

        if (existingUser) {
          // User already has a profile, log them in
          console.log('Existing user found, logging in');
          onSuccess(existingUser.id);
        } else {
          // New user, go to profile setup
          console.log('New user, going to profile setup');
          setStep('profile-setup');
        }
      } else {
        console.error('No session in response');
        throw new Error('No session created');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  };

  const handleProfileSetup = async (name: string, profilePictureUrl?: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            phone_number: phoneNumber,
            name,
            profile_picture_url: profilePictureUrl,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      onSuccess(data.id);
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  };

  return (
    <div className={classes.modalOverlay} onClick={onClose}>
      <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={classes.closeButton} onClick={onClose}>
          <IconX size={24} />
        </button>

        <div className={classes.modalBody}>
          {step === 'phone' && (
            <PhoneNumberStep onSubmit={handlePhoneSubmit} />
          )}
          {step === 'verification' && (
            <VerificationStep
              phoneNumber={phoneNumber}
              onSubmit={handleVerificationSubmit}
              onBack={() => setStep('phone')}
            />
          )}
          {step === 'profile-setup' && (
            <ProfileSetupStep onSubmit={handleProfileSetup} />
          )}
        </div>
      </div>
    </div>
  );
}
