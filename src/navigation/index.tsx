import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getAccessToken } from '../utils/hooks/asyncStorage/Login';

export function RootScreen() {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState<any>('');
  useEffect(() => {
    getAccessToken().then((token) => {
      setAccessToken(token);
    });
  }, []);

  return (
    // [HOW TO]
    // 새로운 링크는 임시적으로 Pressable을 그대로 따라하시고, onPress함수에 navigate 전달인자로 App.tsx의 Stack.Screen.name을 넘겨주시면 됨.
    <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
      <Text>Token Must Be Valid Whilst Testing : {accessToken.slice(0, 20)}</Text>
      <View style={{ width: '100%', height: 'auto', borderWidth: 2, flexDirection: 'column' }}>
        <Text>주요 전달사항:</Text>
        <View>
          <Text>22.09.19 ServiceIntro occuring bugs with relatively wider screen fixed</Text>
        </View>
      </View>
      <Pressable onPress={() => navigation.navigate('SignUp')}>
        <View
          style={{
            backgroundColor: 'tomato',
            width: 150,
            height: 100,
          }}
        >
          <Text> SignUpScreen.tsx</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('CategorySelect')}>
        <View
          style={{
            backgroundColor: 'teal',
            width: 150,
            height: 100,
          }}
        >
          <Text> CategorySelectScreen.tsx</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('NicknameCreation')}>
        <View
          style={{
            backgroundColor: 'green',
            height: 100,
            width: 150,
          }}
        >
          <Text> NicknameCreation.tsx</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('InterestChooseTemp')}>
        <View
          style={{
            backgroundColor: 'skyblue',
            height: 100,
            width: 150,
          }}
        >
          <Text> InterestChooseTempScreen.tsx</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('ServiceIntroOne')}>
        <View
          style={{
            backgroundColor: 'purple',
            height: 100,
            width: 150,
          }}
        >
          <Text> ServiceIntroOneScreen.tsx</Text>
        </View>
      </Pressable>
    </View>
    /*
    <Pressable onPress={() => navigation.navigate('Stack.screen.name String')}>
      <View
        style={{
          backgroundColor: 'Color of any',
          width: 150,
          height: 100,
        }}
      >
        <Text> Component name</Text>
      </View>
    </Pressable>
    */
  );
}
