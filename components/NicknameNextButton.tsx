import {
	View,
	Text,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import React, { useEffect } from 'react';
import { Button } from 'react-native-paper';

interface Iprops {
	isGreater: boolean;
}

const NicknameNextButton = (props: Iprops) => {
	const { isGreater } = props;
	console.log(isGreater);
	return (
		<View
			style={{
				...styles.nextButtonContainer,
				backgroundColor: isGreater ? 'black' : 'grey',
			}}
		>
			<Button>NicknameNextButton</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	nextButtonContainer: {
		position: 'absolute',
		bottom: 100,
		right: 0,
	},
});

export default NicknameNextButton;
