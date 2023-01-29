import React from 'react';
import FeedList from './FeedList';
import { useInfiniteFeed } from '../../utils/hooks/feedInifiniteScroll/useInfiniteFeed';
import FeedScreenChallenge from '../../components/challenge/FeedScreenChallenge';
import { SvgXml } from 'react-native-svg';
import { pencil } from '../../constants/Icons/home/pencil';
import { Pressable, StyleSheet } from 'react-native';
const FeedScreen = ({ navigation }) => {
  const {
    feedList,
    feedListIsLoading,
    touchBookMark,
    bookMarkIsLoading,
    fetchNextPage,
    feedListQueryClient,
  } = useInfiniteFeed('https://api-keewe.com/api/v1/insight');

  // challenge section.

  // if (feedListIsLoading || challengeData.isLoading) {
  //   return <MainLottie />;
  // }
  // <Text style={[theme.fonts.text.display, { marginBottom: 32 }]}>홈</Text>
  const handleNavigateToUpload = () => {
    navigation.navigate('Upload');
  };
  return (
    <>
      <FeedList
        upperComponent={<FeedScreenChallenge />}
        feedList={feedList}
        feedListQueryClient={feedListQueryClient}
        fetchNextPage={fetchNextPage}
        touchBookMark={touchBookMark}
        bookMarkIsLoading={bookMarkIsLoading}
        feedListIsLoading={feedListIsLoading}
      />
      <Pressable style={styles.pencil} onPress={handleNavigateToUpload}>
        <SvgXml xml={pencil} />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  pencil: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#b0e817',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default FeedScreen;
