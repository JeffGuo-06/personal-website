import React, { useState, useRef } from 'react';
import { IconCamera, IconPhoto, IconUser } from '@tabler/icons-react';
import { supabase } from '../../lib/supabase';
import classes from './AuthModal.module.css';

interface ProfileSetupStepProps {
  onSubmit: (name: string, profilePictureUrl?: string) => Promise<void>;
}

export function ProfileSetupStep({ onSubmit }: ProfileSetupStepProps) {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    setError('');

    try {
      // Create unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(data.path);

      setProfilePicture(urlData.publicUrl);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    handleImageUpload(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit(name.trim(), profilePicture || undefined);
    } catch (err) {
      setError('Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkipPhoto = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);
    onSubmit(name.trim()).catch(() => {
      setError('Failed to create profile. Please try again.');
      setLoading(false);
    });
  };

  return (
    <div className={classes.stepContainer}>
      <h2 className={classes.stepTitle}>Set up your profile</h2>
      <p className={classes.stepDescription}>
        Tell us a bit about yourself
      </p>

      <form onSubmit={handleSubmit} className={classes.form}>
        {/* Profile Picture */}
        <div className={classes.profilePictureSection}>
          <div className={classes.profilePicturePreview}>
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className={classes.profileImage} />
            ) : (
              <div className={classes.profilePlaceholder}>
                <IconUser size={48} />
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={classes.fileInput}
            disabled={uploadingImage || loading}
          />

          <div className={classes.uploadButtons}>
            <button
              type="button"
              className={classes.uploadButton}
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage || loading}
            >
              <IconPhoto size={20} />
              {uploadingImage ? 'Uploading...' : 'Choose Photo'}
            </button>
          </div>

          <p className={classes.optionalText}>Profile picture is optional</p>
        </div>

        {/* Name Input */}
        <div className={classes.inputGroup}>
          <label htmlFor="name" className={classes.label}>
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="Enter your name"
            className={classes.input}
            disabled={loading}
            maxLength={50}
          />
        </div>

        {error && <p className={classes.error}>{error}</p>}

        {/* Action Buttons */}
        <div className={classes.buttonGroup}>
          <button
            type="submit"
            className={classes.submitButton}
            disabled={loading || !name.trim()}
          >
            {loading ? 'Creating Profile...' : 'Complete Setup'}
          </button>

          {!profilePicture && (
            <button
              type="button"
              className={classes.skipButton}
              onClick={handleSkipPhoto}
              disabled={loading || !name.trim()}
            >
              Skip Photo
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
