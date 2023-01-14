import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { titleInfo } from '../../types/title/title';
import { useTitles } from '../../utils/hooks/title/useTitles';
import TitleSticker from './TitleSticker';
import ProfileImage from '../Main/mypage/ProfileImage';
import { useTheme } from 'react-native-paper';

const TitleScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const [userTitles] = useTitles(userId);
  console.log('🚀 ~ file: TitleScreen.tsx:12 ~ TitleScreen ~ userTitles', userTitles);
  const theme = useTheme();

  return (
    <ScrollView style={styles.mainContainer}>
      {Object.values(titleMap).map((titleContainer) => {
        const filteredTitle = titleMetaArr.filter(
          (titleMeta) => titleMeta.category_kor === titleContainer.name,
        );
        return (
          <View key={titleContainer.name} style={styles.achievementContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[theme.fonts.text.headline2]}>{titleContainer.name}</Text>
              <Text style={[theme.fonts.text.headline2, { marginLeft: 6, color: '#18192030' }]}>
                {filteredTitle.length}
              </Text>
            </View>
            <View style={styles.titlesContainer}>
              {filteredTitle.map((titleMeta) => {
                return (
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  <TitleSticker key={titleMeta.id} userTitles={userTitles!} titleMeta={titleMeta} />
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};
// return <TitleSticker key={titleMeta.id} userTitles={userTitles!} titleMeta={titleMeta} />;

export default TitleScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    paddingTop: 20,
  },
  achievementContainer: {
    borderWidth: 1,
    borderColor: 'red',
  },
  titlesContainer: {
    borderWidth: 1,
    borderColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const titleMap = {
  SIGNUP: {
    name: '회원가입',
    reached: false,
  },
  INSIGHT: {
    name: '인사이트',
    reached: false,
  },
  FOLLOW: {
    name: '팔로우',
    reached: false,
  },
  REACTION: {
    name: '반응',
    reached: false,
  },
  CHALLENGE: {
    name: '챌린지',
    reached: false,
  },
  SHARE: {
    name: '공유',
    reached: false,
  },
  BOOKMARK: {
    name: '북마크',
    reached: false,
  },
  FRIEND_INVITATION: {
    name: '친구 초대',
    reached: false,
  },
  KEEWE_TITLE: {
    name: '키위 타이틀',
    reached: false,
  },
};

const titleMetaArr = [
  {
    id: 1000,
    category: 'SINGUP',
    category_kor: '회원가입',
    name: '시작이 반',
    introduction: '회원가입 시',
  },
  {
    id: 2000,
    category: 'INSIGHT',
    category_kor: '인사이트',
    name: '위대한 첫 도약',
    introduction: '첫 인사이트 업로드',
  },
  {
    id: 2001,
    category: 'INSIGHT',
    category_kor: '인사이트',
    name: '초보 기록가',
    introduction: '인사이트 5개',
  },
  {
    id: 2002,
    category: 'INSIGHT',
    category_kor: '인사이트',

    name: '중급 기록가',
    introduction: '인사이트 10개',
  },
  {
    id: 2003,
    category: 'INSIGHT',
    category_kor: '인사이트',

    name: '고급 기록가',
    introduction: '인사이트 50개',
  },
  {
    id: 2004,
    category: 'INSIGHT',
    category_kor: '인사이트',

    name: '인사이트의 신',
    introduction: '인사이트 100개',
  },
  {
    id: 2005,
    category: 'INSIGHT',
    category_kor: '인사이트',

    name: '혼자서도 잘 해요',
    introduction: '챌린지가 아닌 인사이트 3개',
  },
  {
    id: 3000,
    category: 'FOLLOW',
    category_kor: '팔로우',

    name: '두근두근 첫만남',
    introduction: '첫 팔로워',
  },
  {
    id: 3001,
    category: 'FOLLOW',

    category_kor: '팔로우',

    name: '자타공인 인기인',
    introduction: '팔로워 10명',
  },
  {
    id: 3002,
    category: 'FOLLOW',
    category_kor: '팔로우',

    name: '피리부는 사나이',
    introduction: '팔로워 100명',
  },
  {
    id: 3003,
    category: 'FOLLOW',
    name: '정이 많은',
    category_kor: '팔로우',

    introduction: '팔로잉 40명',
  },
  {
    id: 4000,
    category: 'REACTION',
    category_kor: '반응',
    name: '참 잘했어요',
    introduction: '첫 반응',
  },
  {
    id: 4001,
    category: 'REACTION',
    category_kor: '반응',

    name: '아낌없이 주는 나무',
    introduction: '게시글 50개에 반응 누를 시',
  },
  {
    id: 4002,
    category: 'REACTION',
    category_kor: '반응',

    name: '키위새들의 픽',
    introduction: '한 게시물에서 10명에 반응 얻을 시',
  },
  {
    id: 5000,
    category: 'CHALLENGE',
    category_kor: '챌린지',
    name: '챌린지 메이커',
    introduction: '첫 챌린지 생성',
  },
  {
    id: 5001,
    category: 'CHALLENGE',
    category_kor: '챌린지',

    name: '실패는 성공의 어머니',
    introduction: '첫 챌린지 실패',
  },
  {
    id: 5002,
    category: 'CHALLENGE',
    category_kor: '챌린지',

    name: '첫번째 완주',
    introduction: '첫 챌린지 성공',
  },
  {
    id: 5003,
    category: 'CHALLENGE',
    category_kor: '챌린지',

    name: '쉬지않고 도전하는',
    introduction: '두번째 챌린지',
  },
  {
    id: 6000,
    category: 'SHARE',
    category_kor: '공유',

    name: '혼자 보기 아까운',
    introduction: '누적 공유 10번',
  },
  {
    id: 7000,
    category: 'BOOKMARK',
    category_kor: '북마크',
    name: '인사이트 수집가',

    introduction: '첫 북마크 저장',
  },
  {
    id: 7001,
    category: 'BOOKMARK',
    category_kor: '북마크',

    name: '간직하고 싶은 인사이트',
    introduction: '타인이 내 인사이트를 첫 북마크',
  },
  {
    id: 8000,
    category: 'FRIEND_INVITATION',
    category_kor: '친구초대',
    name: '함께하는 즐거움',
    introduction: '첫 친구 초대',
  },
  {
    id: 8001,
    category: 'FRIEND_INVITATION',
    category_kor: '친구 초대',
    name: '마당발',
    introduction: '친구 10명 초대',
  },
  {
    id: 9000,
    category: 'KEEWE_TITLE',
    category_kor: '키위 타이틀',
    name: 'Shall We Keewe?',
    introduction: '모든 타이틀 달성',
  },
];
