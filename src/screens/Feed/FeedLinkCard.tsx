import { StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import FeedBookMarkIcon from './FeedBookMarkIcon';
import { Entypo } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
interface FeedLinkCard {
  text: string;
  onBookmarkPress: () => void;
  isBookMarked?: boolean;
}

const FeedLinkWithBookMark = ({
  text,
  onBookmarkPress,
  isBookMarked = false,
  ...props
}: FeedLinkCard) => {
  const styles = createStyles();
  const theme = useTheme();
  const handleOnPress = () => {
    onBookmarkPress();
  };
  const [cachedTitle, setCachedTitle] = React.useState('');

  React.useEffect(() => {
    // Reset the cached title when the text prop changes
    setCachedTitle('');

    // Optionally, you can fetch the title here if it's not provided
    // by the LinkPreview component, or if you want to implement your own
    // fetching logic.
  }, [text]);

  return (
    <View style={styles.FeedLinkCardContainer}>
      <LinkPreview
        text={text}
        renderLinkPreview={(pre) => {
          const title = pre.previewData?.title;
          // make the link only to contain the domain name
          if (title && title !== cachedTitle) {
            setCachedTitle(title);
          }

          const description =
            pre.previewData?.link?.replace(/(^\w+:|^)\/\//, '').split('/')[0] ||
            pre.previewData?.description;
          return (
            <View style={[styles.container]}>
              <View>
                <Text style={{ ...styles.title, color: `${theme.colors.graphic.black}80` }}>
                  {cachedTitle
                    ? cachedTitle.slice(0, 20) + (cachedTitle.length > 20 ? '...' : '')
                    : 'No title'}
                  <Entypo
                    name="chevron-right"
                    size={12}
                    color={`${theme.colors.graphic.black}80`}
                  />
                </Text>

                <Text style={{ ...styles.description, color: `${theme.colors.graphic.black}80` }}>
                  {description}
                </Text>
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
      justifyContent: 'center',
    },
    title: {
      fontSize: 12,
      fontFamily: 'pretendard',
      fontWeight: '500',
      marginBottom: 2,
      lineHeight: 16,
    },
    description: {
      fontSize: 12,
      fontFamily: 'pretendard',
      fontWeight: '500',
      lineHeight: 16,
    },
  });

  return styles;
}
