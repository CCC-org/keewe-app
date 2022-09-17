import React from 'react';
import { RootScreen } from '../src/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NicknameCreationScreen from '../src/screens/onboarding/NicknameCreationScreen';
import SignUpScreen from '../src/screens/onboarding/SignUpScreen';
import LoginScreen from '../src/screens/login/LoginScreen';
import CategorySelectScreen from '../src/screens/challenge/CategorySelectScreen';
import CategoryCreateScreen from '../src/screens/challenge/CategoryCreateScreen';
import ChallengeCreationApprovedScreen from '../src/screens/challenge/ChallengeCreationApprovedScreen';
import ChallengeGoalSettingScreen from '../src/screens/challenge/ChallengeGoalSettingScreen';
import ChallengeInfoScreen from '../src/screens/challenge/ChallengeInfoScreen';
import ChallengeSubjectCreationScreen from '../src/screens/challenge/ChallengeSubjectCreationScreen';

interface ChallengeProps {
  headerOptions: any;
}

const Challenges = ({ headerOptions }: ChallengeProps) => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Screen name="Root" component={RootScreen} options={{ title: 'Root' }} />
      <Stack.Screen
        name="NicknameCreation"
        component={NicknameCreationScreen}
        options={headerOptions}
      />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={headerOptions} />
      <Stack.Screen name="Login" component={LoginScreen} options={headerOptions} />
      <Stack.Screen
        name="CategorySelect"
        component={CategorySelectScreen}
        options={headerOptions}
      />
      <Stack.Screen
        name="CategoryCreate"
        component={CategoryCreateScreen}
        options={headerOptions}
      />
      <Stack.Screen name="ChallengeInfo" component={ChallengeInfoScreen} options={headerOptions} />
      <Stack.Screen name="ChallengeCreationApproved" component={ChallengeCreationApprovedScreen} />
      <Stack.Screen name="ChallengeSubjectCreation" component={ChallengeSubjectCreationScreen} />
      <Stack.Screen
        name="ChallengeGoalSetting"
        component={ChallengeGoalSettingScreen}
        options={headerOptions}
      />
    </>
  );
};

export default Challenges;
