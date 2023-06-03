import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    alert('스토리지 비우기 실패');
  }
};
