import React from 'react';
import { Avatar, useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import { View } from 'react-native';
import person from '../../constants/Icons/Avatar/personXml';

interface ProfileAvatarProps {
  image?: string;
}

const ProfileAvatar = ({ image }: ProfileAvatarProps) => {
  const theme = useTheme();
  return (
    <>
      {image ? (
        <Avatar.Image
          size={40}
          // TODO: image needs default value, or error occurs
          source={require('../../../assets/images/챌린지/챌린지생성.png')}
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
          }}
        >
          <SvgXml xml={person} height={22} width={22} />
        </View>
      )}
    </>
  );
};

export default ProfileAvatar;
