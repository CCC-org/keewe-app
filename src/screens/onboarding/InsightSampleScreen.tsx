/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useTheme } from 'react-native-paper';
import HeaderText from '../../components/texts/HeaderText';
import HeaderRightButton from '../../components/header/HeaderRightButton';
import chevron_right from '../../constants/Icons/Chevrons/ChevronRightSmallXml';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import BezierAnimatedView from '../../components/views/BezierAnimatedView';
import { REACTIONS } from './constant';
import ReactIconButton from './ReactIconButton';

const InsightText =
  '우리는 어떤 커뮤니티를 만드는가? 서비스는 잘 된 UI를 맹목적으로 따라 하는 것이 아닌 서비스 성격에 맞는 UX/UI가 필요합니다. 이 글은 네이버 카페, 오늘의집, 당근마켓 등을 예로 들어 ‘커뮤니티’ UX/UI를 분석하고 있어요. 크게 게시판 리스트 뷰(네이버 카페), 사진 중심 2열 피드(오늘의집), 본문 중심 1열 피드(당근마켓)로 나누었다';

const LinkTitle = '나의 친구 농사';
const Link = 'careerly.co.kr';

const InsightSampleScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [reaction, setReaction] = useState<boolean>(false);

  const handleSkipPress = () => {
    //skip
  };

  const handlePressLink = () => {
    //pressedLink
  };

  const handleCompletePress = () => {
    //pressComplete
    navigation.navigate('ServiceIntroOne');
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerShadowVisible: false,
      headerRight: () => (
        <HeaderRightButton
          text="건너뛰기"
          backGroundColor="white"
          textColor="black"
          borderLine={true}
          disabled={false}
          handlePress={handleSkipPress}
          width={64}
        />
      ),
    });
  }, []);

  return (
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
      <View
        style={{
          backgroundColor: theme.colors.brand.surface.container,
          height: 300,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 30,
          borderRadius: 10,
        }}
      >
        <View style={styles.Insight}>
          <Text style={theme.fonts.text.body1.regular} numberOfLines={7} ellipsizeMode="tail">
            {InsightText}
          </Text>
          <Pressable onPress={handlePressLink}>
            <View style={styles.LinkTitle}>
              <Text
                style={{ color: `${theme.colors.graphic.black}50`, ...theme.fonts.text.caption1 }}
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
      </View>
      {reaction ? (
        <>
          <View style={styles.React}>
            <View style={{ backgroundColor: theme.colors.graphic.white, ...styles.ReactionBar }}>
              {REACTIONS.map((data) => (
                <BezierAnimatedView
                  key={data.xml}
                  startMargin={100}
                  endMargin={0}
                  duration={700}
                  bezier={data.bezier}
                >
                  <ReactIconButton
                    xml={data.xml}
                    backgroundColor={data.color}
                    onClick={() => {
                      return;
                    }}
                  />
                </BezierAnimatedView>
              ))}
            </View>
          </View>
          <BezierAnimatedView
            startMargin={100}
            endMargin={0}
            duration={700}
            bezier={[0.5, 0, 0.5, 1.3]}
          >
            <ConditionalButton
              isActive={true}
              textColor={theme.colors.graphic.black}
              color={theme.colors.brand.primary.main}
              text={'완료'}
              width={343}
              onPress={handleCompletePress}
            />
          </BezierAnimatedView>
        </>
      ) : (
        <ConditionalButton
          isActive={true}
          text="반응남기기"
          color={theme.colors.brand.primary.container}
          textColor={theme.colors.graphic.black}
          width={150}
          onPress={() => setReaction(true)}
        />
      )}
    </View>
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
    overflow: 'visible',
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
    height: 200,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default InsightSampleScreen;
