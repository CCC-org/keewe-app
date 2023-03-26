/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  NicknameCreation: undefined;
  SignUp: undefined;
  GetToken: undefined;
  Login: undefined;
  CategorySelect: undefined;
  CategoryCreate: undefined;
  ChallengeIntro: undefined;
  ChallengeCreationApproved: undefined;
  ChallengeInfo: undefined;
  ChallengeSubjectCreation: undefined;
  ChallengeGoalSetting: undefined;
  ChallengeJoin: undefined;
  ChallengeJoinApproved: undefined;
  ChallengeDetail: undefined;
  ChallengeCurrent: undefined;
  ChallengeHistory: undefined;
  ChallengeParticipation: undefined;
  ServiceIntroOne: undefined;
  ServiceIntroTwo: undefined;
  ServiceIntroThree: undefined;
  InterestChoose: undefined;
  BottomSheetExperimental: undefined;
  InsightSample: undefined;
  Upload: undefined;
  Tabs: undefined;
  DetailedPost: undefined;
  Share: undefined;
  Insight: undefined;
  Comments: undefined;
  Mypage: undefined;
  ProfileEdit: undefined;
  NicknameEditing: undefined;
  interestEditing: undefined;
  Profile: undefined;
  Title: undefined;
  UserFollowers: undefined;
  IntroductionEditing: undefined;
  InterestEditing: undefined;
  TempSheet: undefined;
  FollowTopTabs: {
    userId: number;
    nickname: string;
    follower: number;
    following: number;
  };
  Settings: undefined;
  PushNotificationSetting: undefined;
  Block: undefined;
  FolderEdit: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
