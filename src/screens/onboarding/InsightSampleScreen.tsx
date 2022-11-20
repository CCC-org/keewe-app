/* eslint-disable quotes */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Pressable, Text, View, StyleSheet, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useTheme } from 'react-native-paper';
import HeaderText from '../../components/texts/HeaderText';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import chevron_right from '../../constants/Icons/Chevrons/ChevronRightSmallXml';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import BezierAnimatedPopupView from '../../components/views/BezierAnimatedPopupView';
import { REACTIONS } from './constant';
import TestIconButton from '../../components/emoticons/TestIconButton';
import BottomFixButton from '../../components/buttons/BottomFixButton';

const InsightText =
  '우리는 어떤 커뮤니티를 만드는가? 서비스는 잘 된 UI를 맹목적으로 따라 하는 것이 아닌 서비스 성격에 맞는 UX/UI가 필요합니다. 이 글은 네이버 카페, 오늘의집, 당근마켓 등을 예로 들어 ‘커뮤니티’ UX/UI를 분석하고 있어요. 크게 게시판 리스트 뷰(네이버 카페), 사진 중심 2열 피드(오늘의집), 본문 중심 1열 피드(당근마켓)로 나누었다 우리는 어떤 커뮤니티를 만드는가? 서비스는 잘 된 UI를 맹목적으로 따라 하는 것이 아닌 서비스 성격에 맞는 UX/UI가 필요합니다. 이 글은 네이버 카페, 오늘의집, 당근마켓 등을 예로 들어 ‘커뮤니티’ UX/UI를 분석하고 있어요. 크게 게시판 리스트 뷰(네이버 카페), 사진 중심 2열 피드(오늘의집), 본문 중심 1열 피드(당근마켓)로 나누었다우리는 어떤 커뮤니티를 만드는가? 서비스는 잘 된 UI를 맹목적으로 따라 하는 것이 아닌 서비스 성격에 맞는 UX/UI가 필요합니다. 이 글은 네이버 카페, 오늘의집, 당근마켓 등을 예로 들어 ‘커뮤니티’ UX/UI를 분석하고 있어요. 크게 게시판 리스트 뷰(네이버 카페), 사진 중심 2열 피드(오늘의집), 본문 중심 1열 피드(당근마켓)로 나누었다우리는 어떤 커뮤니티를 만드는가? 서비스는 잘 된 UI를 맹목적으로 따라 하는 것이 아닌 서비스 성격에 맞는 UX/UI가 필요합니다. 이 글은 네이버 카페, 오늘의집, 당근마켓 등을 예로 들어 ‘커뮤니티’ UX/UI를 분석하고 있어요. 크게 게시판 리스트 뷰(네이버 카페), 사진 중심 2열 피드(오늘의집), 본문 중심 1열 피드(당근마켓)로 나누었다우리는 어떤 커뮤니티를 만드는가? 서비스는 잘 된 UI를 맹목적으로 따라 하는 것이 아닌 서비스 성격에 맞는 UX/UI가 필요합니다. 이 글은 네이버 카페, 오늘의집, 당근마켓 등을 예로 들어 ‘커뮤니티’ UX/UI를 분석하고 있어요. 크게 게시판 리스트 뷰(네이버 카페), 사진 중심 2열 피드(오늘의집), 본문 중심 1열 피드(당근마켓)로 나누었다우리는 어떤 커뮤니티를 만드는가? 서비스는 잘 된 UI를 맹목적으로 따라 하는 것이 아닌 서비스 성격에 맞는 UX/UI가 필요합니다. 이 글은 네이버 카페, 오늘의집, 당근마켓 등을 예로 들어 ‘커뮤니티’ UX/UI를 분석하고 있어요. 크게 게시판 리스트 뷰(네이버 카페), 사진 중심 2열 피드(오늘의집), 본문 중심 1열 피드(당근마켓)로 나누었다우리는 어떤 커뮤니티를 만드는가? 서비스는 잘 된 UI를 맹목적으로 따라 하는 것이 아닌 서비스 성격에 맞는 UX/UI가 필요합니다. 이 글은 네이버 카페, 오늘의집, 당근마켓 등을 예로 들어 ‘커뮤니티’ UX/UI를 분석하고 있어요. 크게 게시판 리스트 뷰(네이버 카페), 사진 중심 2열 피드(오늘의집), 본문 중심 1열 피드(당근마켓)로 나누었다';

const LinkTitle = '나의 친구 농사';
const Link = 'careerly.co.kr';

const InsightSampleScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [reaction, setReaction] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const handleSkipPress = () => {
    //skip
    navigation.navigate('ServiceIntroOne');
  };

  const handlePressLink = () => {
    //pressedLink
  };

  const handleCompletePress = () => {
    //pressComplete
    navigation.navigate('ServiceIntroOne');
  };

  const handleMoreClick = () => {
    setShow(true);
    return;
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerShadowVisible: false,
      headerRight: () => (
        <HeaderRightButton
          text="건너뛰기"
          backGroundColor="#F8F8F4"
          textColor={`${theme.colors.graphic.black}50`}
          borderColor={`${theme.colors.graphic.black}50`}
          borderLine={true}
          disabled={false}
          handlePress={handleSkipPress}
          width={64}
        />
      ),
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  });

  return (
    <>
      <ScrollView style={{ backgroundColor: '#F8F8F4' }}>
        <View style={styles.container}>
          <View
            style={{
              height: 90,
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <HeaderText
              header={`키위새님,\n이 인사이트 어때요?`}
              subTitle={'인사이트를 읽고 반응을 남겨보세요!'}
            />
          </View>
          <ScrollView
            style={{
              backgroundColor: theme.colors.brand.surface.container,
              height: 300,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 10,
            }}
          >
            <View style={styles.Insight}>
              <View style={styles.Text}>
                <Text style={theme.fonts.text.body1.regular} numberOfLines={show ? undefined : 7}>
                  {InsightText}
                </Text>
                {!show && (
                  <Pressable
                    onPress={handleMoreClick}
                    style={{
                      backgroundColor: theme.colors.brand.surface.container,
                      ...styles.MoreLink,
                    }}
                  >
                    <Text style={theme.fonts.text.body1.regular}>... 더보기</Text>
                  </Pressable>
                )}
              </View>
              <Pressable onPress={handlePressLink} style={{ marginTop: 30, marginBottom: 10 }}>
                <View style={styles.LinkTitle}>
                  <Text
                    style={{
                      color: `${theme.colors.graphic.black}50`,
                      ...theme.fonts.text.caption1,
                    }}
                  >
                    {LinkTitle}
                  </Text>
                  <SvgXml xml={chevron_right} />
                </View>
                <Text
                  style={{ color: `${theme.colors.graphic.black}50`, ...theme.fonts.text.caption1 }}
                >
                  {Link}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
          {reaction ? (
            <>
              <View style={styles.React}>
                <View
                  style={{ backgroundColor: theme.colors.graphic.white, ...styles.ReactionBar }}
                >
                  {REACTIONS.map((data) => (
                    <BezierAnimatedPopupView
                      key={data.xml}
                      startMargin={100}
                      endMargin={0}
                      duration={700}
                      bezier={data.bezier}
                    >
                      <TestIconButton xml={data.xml} />
                    </BezierAnimatedPopupView>
                  ))}
                </View>
              </View>
            </>
          ) : (
            <View style={{ marginTop: 30 }}>
              <ConditionalButton
                isActive={true}
                text="반응남기기"
                color={theme.colors.brand.primary.container}
                textColor={theme.colors.graphic.black}
                width={150}
                onPress={() => setReaction(true)}
              />
            </View>
          )}
        </View>
      </ScrollView>
      {reaction && (
        <View
          style={{
            position: 'absolute',
            height: 56,
            width: '100%',
            bottom: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BezierAnimatedPopupView
            startMargin={100}
            endMargin={0}
            duration={700}
            bezier={[0.5, 0, 0.5, 1.3]}
          >
            <BottomFixButton
              isActive={true}
              textColor={theme.colors.graphic.black}
              color={theme.colors.brand.primary.main}
              text={'완료'}
              width={343}
              onPress={handleCompletePress}
            />
          </BezierAnimatedPopupView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'column',
  },
  Insight: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 25,
  },
  LinkTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  ReactionBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 70,
    width: 'auto',
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  React: {
    display: 'flex',
    paddingTop: 30,
    marginBottom: 130,
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  Text: {
    //overflow: 'hidden',
  },
  MoreLink: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default InsightSampleScreen;
