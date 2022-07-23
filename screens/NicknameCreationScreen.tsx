import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import TextInputWithDetailInfoText from '../components/TextInputWithDetailInfoText';
import NicknameNextButton from '../components/NicknameNextButton';

const NicknameCreationScreen = () => {
	const [nickname, setNickname] = useState<string>('');
	const detailInfoTextProp = `반가워요 키위새님${`\n`}닉네임이 무엇인가요?`;

	return (
		<SafeAreaView style={{ backgroundColor: 'green' }}>
			<View style={{ backgroundColor: 'orange' }}>
				<View style={styles.backArrowContainer}>
					<Text>Place where back arrow should be inserted</Text>
				</View>
				<TextInputWithDetailInfoText
					setInputValue={setNickname}
					infoText={detailInfoTextProp}
					inputValue={nickname}
					label="닉네임"
					placeholder="닉네임을 입력하세요"
				/>

				<NicknameNextButton />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	backArrowContainer: {
		fontSize: 32,
		height: 50,
		fontWeight: 'bold',
		backgroundColor: 'red',
	},
});

export default NicknameCreationScreen;
