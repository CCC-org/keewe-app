import {
	View,
	Text,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import React, { useEffect } from 'react';
import { IconButton } from 'react-native-paper';

interface Iprops {
	isGreater: boolean;
}

const NicknameNextButton = (props: Iprops) => {
	const { isGreater } = props;

	const handlePress = () => {
		alert('handlePress');
	};

	return (
		<View
			style={{
				...styles.nextButtonContainer,
				backgroundColor: isGreater ? 'black' : 'grey',
			}}
		>
			<IconButton
				icon="arrow-right"
				color="white"
				size={24}
				onPress={handlePress}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	nextButtonContainer: {
		position: 'absolute',
		bottom: 20,
		right: 20,
		width: 64,
		height: 64,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 12,
	},
});

export default NicknameNextButton;
