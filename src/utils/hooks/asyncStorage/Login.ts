import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem('accessToken');
  } catch (e) {
    alert('토큰 불러오기 실패');
  }
};

export const getExpoToken = async () => {
  try {
    return await AsyncStorage.getItem('expoToken');
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

export const setExpoToken = async (value: string) => {
  try {
    await AsyncStorage.setItem('expoToken', value);
  } catch (e) {
    alert('토큰 저장 실패');
  }
};

export const setUserId = async (userId: number) => {
  try {
    await AsyncStorage.setItem('userId', String(userId));
  } catch (e) {
    alert('ID 저장 실패');
  }
};

export const getUserId = async () => {
  try {
    return await AsyncStorage.getItem('userId');
  } catch (e) {
    alert('ID 불러오기 실패');
  }
};
