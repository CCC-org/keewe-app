import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { getAccessToken } from '../utils/hooks/asyncStorage/Login';

export function RootScreen() {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState<any>('');
  const theme = useTheme();

  useEffect(() => {
    getAccessToken().then((token) => {
      setAccessToken(token);
    });
  }, []);

  return (
    // [HOW TO]
    // 새로운 링크는 임시적으로 Pressable을 그대로 따라하시고, onPress함수에 navigate 전달인자로 App.tsx의 Stack.Screen.name을 넘겨주시면 됨.
    <ScrollView>
      <Pressable
        style={{ borderWidth: 1, backgroundColor: 'grey', width: 300, height: 50 }}
        onPress={() => getAccessToken().then((res) => console.log(res))}
      >
        <Text style={theme.fonts.text.display}>Get Token</Text>
      </Pressable>

      <Text style={theme.fonts.text.body1.regular}>{accessToken}</Text>
      <ScrollView>
        <Pressable onPress={() => navigation.navigate('DetailedPost')}>
          <View
            style={{
              backgroundColor: 'lightgreen',
              width: 150,
              height: 100,
            }}
          >
            <Text style={theme.fonts.text.body1.regular}> DetailedPostScreen.tsx</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Share')}>
          <View
            style={{
              backgroundColor: 'red',
              width: 150,
              height: 100,
            }}
          >
            <Text style={theme.fonts.text.body1.regular}> ShareScreen.tsx</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <View
            style={{
              backgroundColor: 'skyblue',
              width: 150,
              height: 100,
            }}
          >
            <Text style={theme.fonts.text.body1.bold}> HomeScreen.tsx</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <View
            style={{
              backgroundColor: 'tomato',
              width: 150,
              height: 100,
            }}
          >
            <Text style={theme.fonts.text.body1.bold}> SignUpScreen.tsx</Text>
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
            <Text style={theme.fonts.text.body1.bold}> CategorySelectScreen.tsx</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Upload')}>
          <View
            style={{
              backgroundColor: 'pink',
              width: 150,
              height: 100,
            }}
          >
            <Text style={theme.fonts.text.body1.bold}> UploadScreen.tsx</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <View
            style={{
              backgroundColor: 'tomato',
              width: 150,
              height: 100,
            }}
          >
            <Text style={theme.fonts.text.body1.bold}> SignUpScreen.tsx</Text>
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
            <Text style={theme.fonts.text.body1.bold}> CategorySelectScreen.tsx</Text>
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
            <Text style={theme.fonts.text.body1.bold}> NicknameCreation.tsx</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('InterestChoose')}>
          <View
            style={{
              backgroundColor: 'skyblue',
              height: 100,
              width: 150,
            }}
          >
            <Text style={theme.fonts.text.body1.bold}> InterestChooseScreen.tsx</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ServiceIntroOne')}>
          <View
            style={{
              backgroundColor: 'skyblue',
              height: 100,
              width: 150,
            }}
          >
            <Text style={theme.fonts.text.body1.bold}> ServiceIntroOneScreen.tsx</Text>
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
            <Text style={theme.fonts.text.body1.regular}> ServiceIntroOneScreen.tsx</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Comments')}>
          <View
            style={{
              backgroundColor: 'pink',
              height: 100,
              width: 150,
            }}
          >
            <Text> CommentsScreen.tsx</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Insight')}>
          <View
            style={{
              backgroundColor: 'grey',
              height: 100,
              width: 150,
            }}
          >
            <Text> InsightScreen.tsx</Text>
          </View>
        </Pressable>
      </ScrollView>
      {/*
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
        */}
    </ScrollView>
  );
}
