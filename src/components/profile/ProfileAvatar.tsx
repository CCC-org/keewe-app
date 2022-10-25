import React from 'react';
import { Avatar, useTheme } from 'react-native-paper';

interface ProfileAvatarProps {
  image?: string;
}

const ProfileAvatar = ({ image }: ProfileAvatarProps) => {
  const theme = useTheme();
  return (
    <Avatar.Image
      size={40}
      source={image ?? require('../../constants/Icons/Avatar/person1.png')}
      style={{
        backgroundColor: theme.colors.brand.surface.container,
      }}
    />
  );
};

export default ProfileAvatar;
