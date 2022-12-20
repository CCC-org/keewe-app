import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import Stepper from '../../components/stepper/Stepper';
import ChallengeGoalSettingSection from './ChallengeGoalSettingSection';
import ConditionalButton from '../../components/buttons/ConditionalButton';
import { Modal, Portal, useTheme } from 'react-native-paper';
import { white } from 'react-native-paper/lib/typescript/styles/colors';

const UNSELECTED = 1;

const ChallengeJoinScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const hideModal = () => setModalVisible(false);
  const [recordPerWeek, setRecordPerWeek] = useState<number | number[]>([2]);
  const [participationPerWeek, setParticipationPerWeek] = useState<number | number[]>([2]);
  const [step, setStep] = useState<number>(UNSELECTED);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isNext = useMemo(() => {
    return step !== 2;
  }, [step]);

  const handleNextClick = () => {
    setIsExpanded(!isExpanded);
    if (isNext) {
      setStep(step + 1);
      return;
    }
    navigation.navigate('ChallengeSubjectCreation', {
      form: { recordPerWeek, participationPerWeek, purpose: 'join' },
    });
  };
  return (
    <>
      <View style={{ margin: 10 }}>
        <Portal>
          <Modal
            dismissable={false}
            visible={modalVisible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <Text>Example Modal. Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={theme.fonts.text.display}>나만의 목표를 세우세요</Text>
        </View>
        <View style={{ marginHorizontal: 6 }}>
          <Stepper totalStep={2} currentStep={1} />
        </View>
        <ChallengeGoalSettingSection
          step={step}
          recordPerWeek={recordPerWeek}
          setRecordPerWeek={setRecordPerWeek}
          participationPerWeek={participationPerWeek}
          setParticipationPerWeek={setParticipationPerWeek}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
        <View style={{ marginTop: 24 }}>
          <ConditionalButton
            isActive={true}
            text={isNext ? '다음' : '완료'}
            color={isNext ? theme.colors.brand.primary.container : theme.colors.graphic.black}
            textColor={isNext ? theme.colors.graphic.black : theme.colors.graphic.white}
            width={150}
            onPress={handleNextClick}
          />
        </View>
      </View>
    </>
  );
};

export default ChallengeJoinScreen;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 28,
    marginHorizontal: 16,
    borderRadius: 16,
  },
});
