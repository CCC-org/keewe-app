import React from 'react';
import { Avatar, useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import { View } from 'react-native';
import person from '../../constants/Icons/Avatar/personXml';
import { ViewProps } from '../Themed';

interface ProfileAvatarProps extends ViewProps {
  image?: string;
  size?: number;
}

const ProfileAvatar = (props: ProfileAvatarProps) => {
  const { image, size = 40 } = props;
  const theme = useTheme();
  return (
    <>
      {image ? (
        <Avatar.Image
          size={size}
          source={{ uri: image }}
          style={[
            {
              backgroundColor: theme.colors.brand.surface.container,
            },
            props.style,
          ]}
        />
      ) : (
        <View
          style={{
            width: size,
            height: size,
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
