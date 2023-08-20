export interface UserSpecificChallenge {
  message: string;
  code: number;
  data: Data;
}

export interface Data {
  challengeId: number;
  remain: number;
  challengeName: string;
  startDate: string;
  dayProgresses: DayProgress[];
}

export interface DayProgress {
  check: boolean;
}

export interface UserChallengeStatus {
  message: string;
  code: number;
  data: ChallengeStatusData;
}

export interface ChallengeStatusData {
  challengeName: string;
  challengeIntroduction: string;
  current: number;
  total: number;
  duration: number;
  startDate: string;
  endDate: string;
  recordedDates: string[];
}
