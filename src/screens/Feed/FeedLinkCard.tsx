import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinkPreview, LinkPreviewProps } from '@flyerhq/react-native-link-preview';
interface FeedLinkCard {
  text: string;
}
const FeedLinkCard = ({ text, ...props }: FeedLinkCard) => {
  const styles = createStyles();

  return (
    <View>
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
                  {title ? title.slice(0, 20) + (title.length > 20 ? '...' : '') : 'No title'}
                </Text>
                <Text style={styles.description}>{description}</Text>
              </View>
              <FeedBookMarkIcon />
            </View>
          );
        }}
      />
    </View>
  );
};

export default FeedLinkCard;

function createStyles() {
  const styles = StyleSheet.create({
    container: {
      width: 300,
      height: 48,
      borderWidth: 1,
      // borderColor: '#12131420',
      justifyContent: 'center',
    },
    title: {
      fontSize: 12,
      fontFamily: 'pretendard',
      fontWeight: 'bold',
      marginBottom: 2,
      color: '#12131450',
    },
    description: {
      fontFamily: 'pretendard',
      fontWeight: '500',
      fontSize: 12,
      color: '#12131450',
    },
  });

  return styles;
}
