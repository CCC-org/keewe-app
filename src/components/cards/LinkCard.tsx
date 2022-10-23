/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { LinkPreview, LinkPreviewProps } from '@flyerhq/react-native-link-preview';
interface customProps extends LinkPreviewProps {
  width?: number | string;
}
const LinkCard: React.FC<customProps> = (props) => {
  const styles = createStyles(props);
  return (
    <LinkPreview
      {...props}
      renderLinkPreview={(pre) => {
        const title = pre.previewData?.title;
        const description =
          pre.previewData?.link?.replace(/(^\w+:|^)\/\//, '').split('/')[0] ||
          pre.previewData?.description;
        const url = pre.previewData?.image?.url;
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
      width: props.width,
      borderWidth: 1,
      borderColor: '#12131420',
      borderRadius: 8,
      height: 68,
      flexDirection: 'row',
    },
    title: {
      fontSize: 12,
      fontFamily: 'pretendard',
      fontWeight: 'bold',
      marginBottom: 2,
      color: '#12131480',
    },
    description: { fontFamily: 'pretendard', fontWeight: '500', fontSize: 12, color: '#12131450' },
    metadataTextContainerStyle: { paddingVertical: 12, paddingHorizontal: 18, width: '70%' },
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
