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
<<<<<<< HEAD
          // TODO: image needs default value, or error occurs
          source={require('../../../assets/images/챌린지/챌린지생성.png')}
=======
          source={{ uri: image }}
>>>>>>> 1365db4ae25777675514cf1b245e21ba185572ad
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
