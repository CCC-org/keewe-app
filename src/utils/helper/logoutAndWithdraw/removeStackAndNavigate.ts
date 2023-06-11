import { CommonActions, NavigationProp } from '@react-navigation/native';
import * as Updates from 'expo-updates';

export const reloadAndReset = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  routeName: string,
): void => {
  Updates.reloadAsync()
    .then(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routeName }],
        }),
      );
    })
    .catch((err: any) => {
      alert(err.message);
    });
};
