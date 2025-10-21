import React, { useState } from 'react';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import classes from './About.module.css';

interface AboutProps {
  image: string;
  ranking: string;
  name: string;
  verified: boolean;
  stats: string;
  bio: string;
  isFollowing: boolean;
  onFollowToggle?: () => void;
}

export const About: React.FC<AboutProps> = ({
  image,
  ranking,
  name,
  verified,
  stats,
  bio,
  isFollowing: initialFollowing,
  onFollowToggle,
}) => {
  const [showFullBio, setShowFullBio] = useState(false);

  const handleFollowClick = () => {
    onFollowToggle?.();
  };

  const truncatedBio = bio.length > 150 ? bio.slice(0, 150) + '...' : bio;

  return (
    <div className={classes.aboutContainer}>
      <div className={classes.heroImage}>
        <img src={image} alt={name} />
      </div>

      <div className={classes.content}>
        <div className={classes.ranking}>{ranking}</div>

        <div className={classes.nameContainer}>
          <h1 className={classes.name}>{name}</h1>
          {verified && (
            <IconCircleCheckFilled className={classes.verifiedIcon} size={28} />
          )}
        </div>

        <div className={classes.stats}>{stats}</div>

        <button
          className={classes.followButton}
          onClick={handleFollowClick}
        >
          Follow
        </button>

        <div className={classes.bio}>
          <p className={classes.bioText}>
            {showFullBio ? bio : truncatedBio}
            {bio.length > 150 && (
              <button
                className={classes.seeMoreButton}
                onClick={() => setShowFullBio(!showFullBio)}
              >
                {showFullBio ? ' see less' : ' see more'}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
