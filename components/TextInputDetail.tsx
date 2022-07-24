import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';

interface TextInputDetailProps {
	setInputValue: (input: string) => void;
	infoText: string;
	inputValue: string;
	label: string;
	placeholder: string;
}

let name:string = 'jihoon'
let count:number = 1;
let isTrue:boolean = true;
const arr:number[] = [1,2,3,4]


const TextInputDetail = (props: TextInputDetailProps) => {
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

export default TextInputDetail;
