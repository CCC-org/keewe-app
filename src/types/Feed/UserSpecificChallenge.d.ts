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
