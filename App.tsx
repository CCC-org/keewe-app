import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import NicknameCreationScreen from './screens/NicknameCreationScreen';

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<NavigationContainer>
				<NicknameCreationScreen />
				<StatusBar />
			</NavigationContainer>
		);
	}
}
