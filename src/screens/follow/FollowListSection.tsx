import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { FollowData } from '../../types/followerList/followers';
import ProfileImage from '../Main/mypage/ProfileImage';
import { SvgXml } from 'react-native-svg';
import person from '../../constants/Icons/Avatar/personXml';
import { useTheme } from 'react-native-paper';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import FollowListFollowButton from './FollowListFollowButton';
interface FollowListSectionProps {
  followList: InfiniteData<FollowData | undefined> | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<FollowData | undefined, unknown>>;
}

const FollowListSection = ({ followList }: FollowListSectionProps) => {
  const flattenData = followList?.pages.flatMap((page) => {
    return page?.users;
  });

  const theme = useTheme();

  const handlePressForFollow = () => {
    alert('pressed follow');
  };

  return (
    <FlatList
      data={flattenData}
      renderItem={({ item }) =>
        item ? (
          <View style={styles.container}>
            <View style={styles.profile}>
              <>
                {item?.imageURL ? (
                  <Image
                    source={{ uri: item?.imageURL }}
                    style={{ width: 50, height: 50, borderRadius: 100 }}
                  />
                ) : (
                  <SvgXml xml={person} width={48} height={48} />
                )}
                <View
                  style={{
                    marginLeft: 12,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                  }}
                >
                  <Text style={[theme.fonts.text.body1.bold]}>{item?.title || 'NO TITLE'}</Text>
                  <Text style={[theme.fonts.text.body2.regular, { color: '#12131480' }]}>
                    {item?.nickname}
                  </Text>
                </View>
              </>
            </View>
            <FollowListFollowButton onPress={handlePressForFollow} isFollowing={item.follow} />
          </View>
        ) : null
      }
      keyExtractor={(item) => item?.id.toString() as string}
    ></FlatList>
  );
};

export default FollowListSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
