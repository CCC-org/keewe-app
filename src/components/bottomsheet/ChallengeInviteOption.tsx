import React, { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import ShareOptions from './ShareOptions';
import { useTheme } from 'react-native-paper';
import FollowersAndFollowings from './FollowersAndFollowings';
import { useQuery } from '@tanstack/react-query';
import {
  FollowersFollowingsApi,
  FollowersFollowingsKeys,
} from '../../utils/api/followList/followersFollowings';
import { debounce } from 'lodash';

interface ChallengeInviteOptionProps {
  challengeId: number;
  challengeName: string;
  onSearch: () => void;
  onCancel: () => void;
}

const ChallengeInviteOption = ({
  challengeId,
  challengeName,
  onSearch,
  onCancel,
}: ChallengeInviteOptionProps) => {
  const theme = useTheme();
  const [Search, setSearch] = useState<boolean>(false);
  //   const [searchValue, setSearchValue] = useState<string>('');
  //   const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  //   useEffect(() => {
  //     if (searchValue.length > 0) setIsButtonEnabled(true);
  //     else setIsButtonEnabled(false);
  //   }, [searchValue]);

  const inputValueRef = useRef<string>('');

  const { data: invitationData, refetch } = useQuery({
    queryKey: FollowersFollowingsKeys.FollowersFollowingsKeys(),
    queryFn: () => FollowersFollowingsApi.getFollowersFollowings(inputValueRef.current),
  });

  const handleGoSearch = () => {
    onSearch();
    setSearch(true);
  };

  const handleSearchCancel = () => {
    onCancel();
  };

  const handleChangeText = useCallback(
    debounce((inputValue: string) => {
      inputValueRef.current = inputValue;
      refetch();
    }, 1000),
    [],
  );

  return (
    <BottomSheetScrollView>
      {Search ? null : (
        <ShareOptions
          type={'challenge'}
          id={challengeId}
          message={`'${challengeName}' 챌린지 같이 기록해요. 당신과 함께 발자국을 남기고 싶어요`}
        />
      )}
      <View style={{ marginHorizontal: 16 }}>
        {Search ? (
          <View style={styles.onSearchHeader}>
            <TextInput
              autoFocus={true}
              onChangeText={handleChangeText}
              style={{ ...styles.searchBox, borderColor: `${theme.colors.graphic.black}1a` }}
              textContentType="none"
            ></TextInput>
            <Pressable onPress={handleSearchCancel}>
              <Text
                style={{
                  ...theme.fonts.text.body1.bold,
                  color: `${theme.colors.graphic.black}80`,
                }}
              >
                취소
              </Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={handleGoSearch}
            style={{ ...styles.search, borderColor: `${theme.colors.graphic.black}1a` }}
          >
            <Text
              style={{
                ...theme.fonts.text.body1.regular,
                color: `${theme.colors.graphic.black}80`,
              }}
            >
              팔로잉/팔로워 검색
            </Text>
          </Pressable>
        )}
        <FollowersAndFollowings users={invitationData?.invitees} challengeId={challengeId} />
      </View>
    </BottomSheetScrollView>
  );
};

export default ChallengeInviteOption;

const styles = StyleSheet.create({
  search: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
  },
  onSearchHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBox: {
    width: '85%',
    height: 44,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
