import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const NicknameNextButton = () => {
	return (
		<View style={styles.nextButtonContainer}>
			<Text>NicknameNextButton</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	nextButtonContainer: {
		// position the view to the bottom
		position: 'absolute',
		top: 600,
		// align the view to the center
		alignItems: 'center',
		// justify the view to center
		justifyContent: 'center',
		// set the height of the view
		height: 50,
		// set the background color of the view
		backgroundColor: '#486006',
		// set the border radius of the view
		borderRadius: 10,
		// set the border width of the view
		borderWidth: 1,
		// set the border color of the view
	},
});

export default NicknameNextButton;
