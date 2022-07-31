import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem('accessToken');
  } catch (e) {
    alert('토큰 불러오기 실패');
  }
};

export const setAccessToken = async (value: string) => {
  try {
    await AsyncStorage.setItem('accessToken', value);
  } catch (e) {
    alert('토큰 저장 실패');
  }
};
