import React from 'react';
import { ScrollView, View, StyleSheet, useWindowDimensions } from 'react-native';
import ChallengeTitle from '../../../components/header/ChallengeTitle';
import ChallengeReaction from './ChallengeReaction';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: '#ff4081' }} />;

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const ChallengeDetailScreen = ({ navigation, route }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);
  return (
    <ScrollView style={styles.container}>
      <ChallengeTitle
        title={'챌린지 이름'}
        category={'카테고리'}
        startDate={'2023.01.01'}
        challengeIntroduction={'첼린지 상세'}
      />
      <ChallengeReaction challengeId={0} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width, height: 100 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default ChallengeDetailScreen;
