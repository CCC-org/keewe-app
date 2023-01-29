import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import FeedBookMarkIcon from './FeedBookMarkIcon';
import { Entypo } from '@expo/vector-icons';
interface FeedLinkCard {
  text: string;
  onBookmarkPress: () => void;
  isBookMarked?: boolean;
  // bookMarkIsLoading: boolean;
}

const FeedLinkWithBookMark = ({
  text,
  onBookmarkPress,
  isBookMarked = false,
  ...props
}: FeedLinkCard) => {
  const styles = createStyles();

  // useE]);

  const handleOnPress = () => {
    onBookmarkPress();
  };

  return (
    <View style={styles.FeedLinkCardContainer}>
      <LinkPreview
        text={text}
        renderLinkPreview={(pre) => {
          const title = pre.previewData?.title;
          // make the link only to contain the domain name

          const description =
            pre.previewData?.link?.replace(/(^\w+:|^)\/\//, '').split('/')[0] ||
            pre.previewData?.description;
          return (
            <View style={[styles.container]}>
              <View>
                <Text style={styles.title}>
                  {title ? title.slice(0, 20) + (title.length > 20 ? '... >' : '') : 'No title'}
                  <Entypo name="chevron-right" size={12} color="#12131450" />
                </Text>

                <Text style={styles.description}>{description}</Text>
              </View>
            </View>
          );
        }}
      />
      <FeedBookMarkIcon onPress={handleOnPress} isMarked={isBookMarked} />
    </View>
  );
};

export default FeedLinkWithBookMark;

function createStyles() {
  const styles = StyleSheet.create({
    loadingSpinner: {
      transform: [{ rotate: '90deg' }],
    },
    FeedLinkCardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    container: {
      height: 48,
      justifyContent: 'center',
    },
    title: {
      fontSize: 12,
      fontFamily: 'pretendardSemiBold',
      marginBottom: 2,
      color: '#12131450',
    },
    description: {
      fontFamily: 'pretendardSemiBold',
      fontWeight: '500',
      fontSize: 12,
      color: '#12131450',
    },
  });

  return styles;
}
