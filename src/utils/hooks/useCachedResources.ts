import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          pretendard: require('../../../assets/fonts/PretendardVariable.ttf'),
          pretendardMedium: require('../../../assets/fonts/Pretendard-Medium.otf'),
          pretendardSemiBold: require('../../../assets/fonts/Pretendard-SemiBold.otf'),
          pretendardBold: require('../../../assets/fonts/Pretendard-Bold.otf'),
          pretendardExtraBold: require('../../../assets/fonts/Pretendard-ExtraBold.otf'),
          pretendardBlack: require('../../../assets/fonts/Pretendard-Black.otf'),
          ridiBatang: require('../../../assets/fonts/RIDIBatang.otf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
