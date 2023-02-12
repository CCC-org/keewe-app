import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import person from '../../../constants/Icons/Avatar/personXml';
import smallCameraXml from '../../../constants/Icons/Avatar/smallCameraXml';

interface ProfileImageProps {
  image: string;
  onPress?: () => void;
}

const ProfileImage = ({ image, onPress }: ProfileImageProps) => {
  const theme = useTheme();
  return (
    <View style={styles.svg}>
      <Pressable onPress={onPress}>
        {image !== '' ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View
            style={{
              ...styles.image,
              backgroundColor: theme.colors.brand.surface.container2,
            }}
          >
            <SvgXml xml={person} height={60} width={60} />
          </View>
        )}
      </Pressable>
      <View
        style={{
          ...styles.camera,
          borderColor: `${theme.colors.graphic.black}1a`,
          backgroundColor: theme.colors.graphic.white,
        }}
      >
        <Pressable onPress={onPress}>
          <SvgXml xml={smallCameraXml} height={14} width={14} />
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  svg: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flexDirection: 'row',
    width: 84,
    height: 84,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  camera: {
    position: 'absolute',
    bottom: 24,
    right: '38%',
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
