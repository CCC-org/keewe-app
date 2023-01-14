import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Title } from '../../types/title/title';
import { TitleApiKeys, TitleApis } from '../../utils/api/TitleAPI';
import { useTitles } from '../../utils/hooks/title/useTitles';

const TitleScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const [titles] = useTitles(userId);
  console.log('🚀 ~ file: TitleScreen.tsx:11 ~ TitleScreen ~ titles', titles);
  //   const { data: feedList } = useQuery<Title>(TitleApiKeys.getTitleList(), () =>
  //     TitleApis.getTitleList(userId),
  //   );

  return (
    <View>
      <Text>TitleScreen</Text>
    </View>
  );
};

export default TitleScreen;

const styles = StyleSheet.create({});
