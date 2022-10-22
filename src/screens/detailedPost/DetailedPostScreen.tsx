import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import DetailedPostSection from './DetailedPostSection';

const DetailedPostScreen = () => {
  const [insightText, setInsightText] = useState(
    '가나다라마바사아자아자자아라나마다라자아라자라자라자랴쟈라자랴쟈라잘자라자라자라잘자라아낭라망람아람아라',
  );
  const [views, sestViews] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState('내가 참여중인 챌린지');
  return (
    <View>
      <DetailedPostSection
        insightText={insightText}
        views={views}
        currentChallenge={currentChallenge}
      />
    </View>
  );
};

export default DetailedPostScreen;

const styles = StyleSheet.create({});
