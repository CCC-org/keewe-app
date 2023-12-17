/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StyleSheet, Text, View, Image, DimensionValue } from 'react-native';
import React from 'react';
import { LinkPreview, LinkPreviewProps } from '@flyerhq/react-native-link-preview';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

interface customProps extends LinkPreviewProps {
  width?: number | string;
  setTitle?: React.Dispatch<React.SetStateAction<string>>;
  setDescription?: React.Dispatch<React.SetStateAction<string>>;
}
const LinkCard: React.FC<customProps> = (props) => {
  const { setTitle, setDescription } = props;
  const styles = createStyles(props);
  return (
    <LinkPreview
      touchableWithoutFeedbackProps={{
        onLongPress: () => {
          const link = props.text;
          if (link) {
            Clipboard.setStringAsync(link).then(() => {
              Toast.show({
                type: 'copySnackbar',
                text1: '링크를 복사했어요.',
                position: 'bottom',
              });
            });
          } else {
            Toast.show({
              type: 'copySnackbar',
              text1: '링크가 없어요.',
              position: 'bottom',
            });
          }
        },
        delayLongPress: 1000,
      }}
      {...props}
      renderLinkPreview={(pre) => {
        const title = pre.previewData?.title;
        const description =
          pre.previewData?.link?.replace(/(^\w+:|^)\/\//, '').split('/')[0] ||
          pre.previewData?.description;
        const url = pre.previewData?.image?.url;
        if (setTitle && setDescription && title && description) {
          setTitle(title);
          setDescription(description);
        }
        return (
          <View style={styles.container}>
            <View style={styles.metadataTextContainerStyle}>
              <Text style={styles.title}>
                {title ? title.slice(0, 20) + (title.length > 20 ? '...' : '') : 'No title'}
              </Text>
              <Text style={styles.description}>{description}</Text>
            </View>
            <Image style={styles.imageContainer} source={{ uri: url }} />
          </View>
        );
      }}
    />
  );
};
export default LinkCard;
function createStyles(props: customProps) {
  const styles = StyleSheet.create({
    container: {
      width: props.width as DimensionValue | undefined,
      borderRadius: 8,
      flexDirection: 'row',
    },
    title: {
      fontSize: 12,
      fontFamily: 'pretendard',
      fontWeight: 'bold',
      marginBottom: 2,
      color: '#121314CC',
    },
    description: { fontFamily: 'pretendard', fontWeight: '500', fontSize: 12, color: '#12131450' },
    metadataTextContainerStyle: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      width: '70%',
    },
    imageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
  });
  return styles;
}
