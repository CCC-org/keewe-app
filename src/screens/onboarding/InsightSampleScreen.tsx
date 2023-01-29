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
import { INSIGHT_SAMPLE, REACTIONS } from './constant';
import TestIconButton from '../../components/emoticons/TestIconButton';
import BottomFixButton from '../../components/buttons/BottomFixButton';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import { Entypo } from '@expo/vector-icons';

const InsightSampleScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [reaction, setReaction] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const [sampleData] = useState(
    INSIGHT_SAMPLE[route.params.category[0]] ??
      INSIGHT_SAMPLE[
        Object.keys(INSIGHT_SAMPLE)[Math.floor(Math.random() * Object.keys(INSIGHT_SAMPLE).length)]
      ],
  );

  const handleSkipPress = () => {
    navigation.navigate('ServiceIntroOne');
  };

  const handleCompletePress = () => {
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
              marginBottom: 32,
            }}
          >
            <HeaderText
              header={`키위새님,\n이 인사이트 어때요?`}
              subTitle={'인사이트를 읽고 반응을 눌러보세요!'}
            />
          </View>
          <View
            style={{
              backgroundColor: theme.colors.brand.surface.container1,
              marginLeft: 10,
              marginRight: 10,
              paddingHorizontal: 16,
              paddingVertical: 20,
              borderRadius: 12,
            }}
          >
            <View style={styles.Insight}>
              <View style={styles.Text}>
                <Text style={theme.fonts.text.body1.regular} numberOfLines={show ? undefined : 7}>
                  {sampleData.content}
                </Text>
                {!show && (
                  <Pressable
                    onPress={handleMoreClick}
                    style={{
                      backgroundColor: theme.colors.brand.surface.container1,
                      ...styles.MoreLink,
                    }}
                  >
                    <Text
                      style={{
                        color: `${theme.colors.graphic.black}50`,
                        ...theme.fonts.text.body1.regular,
                      }}
                    >
                      ... 더보기
                    </Text>
                  </Pressable>
                )}
              </View>
              <LinkPreview
                text={sampleData.link}
                renderLinkPreview={(pre) => {
                  const title = pre.previewData?.title;
                  const description =
                    pre.previewData?.link?.replace(/(^\w+:|^)\/\//, '').split('/')[0] ||
                    pre.previewData?.description;
                  return (
                    <View style={styles.linkContainer}>
                      <View>
                        <Text style={styles.title}>
                          {title
                            ? title.slice(0, 20) + (title.length > 20 ? '... >' : '')
                            : 'No title'}
                          <Entypo name="chevron-right" size={12} color="#12131450" />
                        </Text>

                        <Text style={styles.description}>{description}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
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
  linkContainer: { paddingTop: 16 },
  Insight: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  LinkTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
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
  title: {
    fontSize: 12,
    fontFamily: 'pretendardSemiBold',
    marginBottom: 2,
    color: '#12131450',
  },
  description: {
    fontFamily: 'pretendardSemiBold',
    fontWeight: '500',
    fontSize: 12,
    color: '#12131450',
  },
});

export default InsightSampleScreen;
