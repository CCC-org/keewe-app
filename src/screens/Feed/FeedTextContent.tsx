import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface FeedTextContent {
  contents: string;
  insightId: number;
  bookmark?: boolean;
}

const FeedTextContent = ({ contents, insightId }: FeedTextContent) => {
  const theme = useTheme();
  const modifiedContents = contents.length > 200 ? contents.slice(0, 200) + '...' : contents;
  const navigation = useNavigation();
  const handleNavigateToInsight = () => {
    navigation.push('DetailedPost', {
      screen: 'DetailedPost',
      insightId,
      initialInsight: contents,
    });
  };

  return (
    <Pressable onPress={handleNavigateToInsight}>
      <Text
        style={[
          theme.fonts.text.body1.regular,
          {
            paddingBottom: modifiedContents.length < 100 ? 20 : 16,
            color: `${theme.colors.graphic.black}cc`,
          },
        ]}
      >
        {modifiedContents}
        {modifiedContents.length >= 99 ? (
          <Text
            style={[theme.fonts.text.body1.regular, { color: `${theme.colors.graphic.black}80` }]}
          >
            ... 더보기
          </Text>
        ) : null}
      </Text>
    </Pressable>
  );
};

export default FeedTextContent;

const styles = StyleSheet.create({});
