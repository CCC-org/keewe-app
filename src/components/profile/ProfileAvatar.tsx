import React from 'react';
import { Avatar, useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import { View } from 'react-native';
import person from '../../constants/Icons/Avatar/personXml';

interface ProfileAvatarProps {
  image?: string;
  size?: number;
}

const ProfileAvatar = ({ image, number = 40 }: ProfileAvatarProps) => {
  const theme = useTheme();
  return (
    <>
      {image ? (
        <Avatar.Image
          size={36}
          source={{ uri: image }}
          style={{
            backgroundColor: theme.colors.brand.surface.container,
          }}
        />
      ) : (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: theme.colors.brand.surface.container,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SvgXml xml={person} height={30} width={30} />
        </View>
      )}
    </>
  );
};

export default ProfileAvatar;
