import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import person from '../../constants/Icons/Avatar/personXml';

interface MypageProfileProps {
  nickname: string;
  title: string;
  image: string | undefined;
  follower: number;
  following: number;
}

const MypageProfile = ({ nickname, title, image, follower, following }: MypageProfileProps) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
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
      <View style={{ marginLeft: 12 }}>
        <Text style={{ ...theme.fonts.text.headline1, color: `${theme.colors.graphic.black}cc` }}>
          {nickname}
        </Text>
        <Text
          style={{
            ...theme.fonts.text.body2.bold,
            color: `${theme.colors.graphic.black}80`,
            marginTop: 4,
          }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <Text
            style={{ ...theme.fonts.text.body1.regular, color: `${theme.colors.graphic.black}cc` }}
          >
            팔로워
          </Text>
          <Text style={{ ...theme.fonts.text.body1.bold, color: theme.colors.graphic.black }}>
            {' '}
            {follower}{' '}
          </Text>
          <Text
            style={{ ...theme.fonts.text.body1.regular, color: `${theme.colors.graphic.black}cc` }}
          >
            {' '}
            팔로잉{' '}
          </Text>
          <Text style={{ ...theme.fonts.text.body1.bold, color: theme.colors.graphic.black }}>
            {following}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MypageProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flexDirection: 'row',
    width: 84,
    height: 84,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
