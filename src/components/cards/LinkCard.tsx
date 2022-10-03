/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { LinkPreview, LinkPreviewProps } from '@flyerhq/react-native-link-preview';

const LinkCard: React.FC<LinkPreviewProps> = (props: LinkPreviewProps) => {
  console.log('props', props);

  const styles = createStyles(props);

  return (
    //  <LinkPreview
    //    containerStyle={{ ...styles.container }}
    //    metadataContainerStyle={styles.metaDataContainerStyle}
    //    metadataTextContainerStyle={styles.metadataTextContainerStyle}
    //    renderDescription={(description) => <Text>{description}</Text>}
    //    renderHeader={(title) => <Text>{title}</Text>}
    //    renderTitle={(title) => <Text style={styles.title}>{title}</Text>}
    //    renderMinimizedImage={(image) => (
    //      <Image
    //        source={{
    //          uri: image.url,
    //          height: 50,
    //          width: 50,
    //        }}
    //        defaultSource={require('../../../assets/images/챌린지/챌린지생성.png')}
    //      />
    //    )}
    //    textContainerStyle={styles.textContainerStyle}
    //    renderLinkPreview={(pre) => <View style={styles.container}></View>}
    //    {...props}
    //  />
    <LinkPreview
      renderLinkPreview={(pre) => {
        console.log('pre', pre);
        const title = pre.previewData?.title;
        const description = pre.previewData?.description || pre.previewData?.link;
        const url = pre.previewData?.image?.url;
        return (
          <View style={styles.container}>
            <View style={styles.metadataTextContainerStyle}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>
                {description ? description!.slice(0, 40) + '...' : 'Nothing do render...'}
              </Text>
            </View>
            <Image
              style={styles.imageContainer}
              source={{
                uri: url,
              }}
            />
          </View>
        );
      }}
      {...props}
    />
  );
};

export default LinkCard;

function createStyles(props) {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#12131420',
      borderRadius: 8,
      height: 80,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 12,
      fontFamily: 'pretendard',
      fontWeight: 'bold',
      marginBottom: 2,
      color: '#12131480',
    },
    description: {
      fontFamily: 'pretendard',
      fontWeight: '500',
      fontSize: 12,
      color: '#12131450',
    },
    //  metaDataContainerStyle: {
    //    backgroundColor: 'black',
    //    marginTop: 8,
    //  },
    metadataTextContainerStyle: {
      paddingVertical: 12,
      paddingHorizontal: 18,
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
    //  textContainerStyle: {
    //    borderWidth: 2,
    //    borderColor: 'green',
    //    padding: 8,
    //    paddingTop: 0,
    //    marginHorizontal: 0,
    //    marginVertical: 0,
    //    backgroundColor: 'red',
    //  },
  });

  return styles;
}
