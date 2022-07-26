import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface FeedTextContent {
  contents: string;
  insightId: number;
}

const FeedTextContent = ({ contents, insightId }: FeedTextContent) => {
  const theme = useTheme();
  const modifiedContents = contents.length > 200 ? contents.slice(0, 200) + '...' : contents;
  const navigation = useNavigation();
  const handleNavigateToInsight = () => {
    navigation.navigate('DetailedPost', {
      screen: 'DetailedPost',
      insightId,
    });
  };

  return (
    <Pressable onPress={handleNavigateToInsight}>
      <Text style={theme.fonts.text.body1.regular}>
        {modifiedContents}
        {modifiedContents.length >= 99 ? (
          <Text style={[theme.fonts.text.body1.regular, { color: '#12131450' }]}>
            {'  '}
            더보기
          </Text>
        ) : null}
      </Text>
    </Pressable>
  );
};

export default FeedTextContent;

const styles = StyleSheet.create({});
