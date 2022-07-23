import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';

interface Iprops {
	setInputValue: (input: string) => void;
	infoText: string;
	inputValue: string;
	label: string;
	placeholder: string;
}

const TextInputWithDetailInfoText = (props: Iprops) => {
	const { setInputValue, inputValue, infoText, label, placeholder } = props;
	return (
		<>
			<View>
				<Text style={styles.detailInfoText}>{infoText}</Text>
			</View>
			<TextInput
				label={label}
				value={inputValue}
				placeholder={placeholder}
				onChangeText={(inputValue) => setInputValue(inputValue)}
				underlineColor="#486006"
				activeUnderlineColor="#486006"
				style={{ margin: 10, backgroundColor: 'white' }}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	detailInfoText: {
		marginLeft: 10,
		marginTop: 0,
		fontSize: 32,
		fontWeight: 'bold',
		textAlign: 'left',
	},
});

export default TextInputWithDetailInfoText;
