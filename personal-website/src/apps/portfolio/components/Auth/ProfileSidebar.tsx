import React from 'react';
import { IconX, IconLogout, IconUser } from '@tabler/icons-react';
import type { User } from '../../lib/supabase';
import classes from './ProfileSidebar.module.css';

interface ProfileSidebarProps {
  user: User;
  onClose: () => void;
  onLogout: () => void;
}

export function ProfileSidebar({ user, onClose, onLogout }: ProfileSidebarProps) {
  return (
    <>
      {/* Backdrop */}
      <div className={classes.backdrop} onClick={onClose} />

      {/* Sidebar */}
      <aside className={classes.sidebar}>
        <div className={classes.header}>
          <h2 className={classes.title}>Profile</h2>
          <button className={classes.closeButton} onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>

        <div className={classes.content}>
          {/* Profile Info */}
          <div className={classes.profileSection}>
            <div className={classes.profilePicture}>
              {user.profile_picture_url ? (
                <img
                  src={user.profile_picture_url}
                  alt={user.name}
                  className={classes.profileImage}
                />
              ) : (
                <div className={classes.profilePlaceholder}>
                  <IconUser size={48} />
                </div>
              )}
            </div>

            <div className={classes.profileInfo}>
              <h3 className={classes.profileName}>{user.name}</h3>
              <p className={classes.profilePhone}>{formatPhoneNumber(user.phone_number)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className={classes.actions}>
            <button className={classes.logoutButton} onClick={onLogout}>
              <IconLogout size={20} />
              Log Out
            </button>
          </div>

          {/* Placeholder for future content */}
          <div className={classes.placeholder}>
            <p>More features coming soon...</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function formatPhoneNumber(phone: string): string {
  // Format: +1XXXXXXXXXX -> (XXX) XXX-XXXX
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}
