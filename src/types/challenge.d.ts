interface ChallengeCreateRequest {
  participate: {
    duration: number;
    insightPerWeek: number;
    myTopic: string;
  };
  interest: string;
  name: string;
  introduction: string;
}

interface ChallengeCreateResponse {
  message: string;
  code: number;
  data: {
    challengeId: number;
    challengeName: string;
    myTopic: string;
    insightPerWeek: number;
    duration: number;
    endDate: string;
  };
}

interface MyInterestsGetResponse {
  message: string;
  code: number;
  data: {
    interests: string[];
  };
}

interface ChallengeGetResponse {
  message: string;
  code: number;
  data: {
    challengeId: number;
    name: string;
    participatingUserNumber: number;
    interest: string;
    startDate: string;
  };
}

interface ChallengeHistoryGetRequest {
  cursor?: number;
  limit: number;
}

interface ChallengeHistoryGetResponse {
  message: string;
  code: number;
  data: HistoryChallenge[];
}

interface ChallengeHistoryCountGetResponse {
  message: string;
  code: number;
  data: { count: number };
}
interface HistoryChallenge {
  challengeParticipationId: number;
  challengeId: number;
  challengeCategory: string;
  challengeName: string;
  startDate: string;
  endDate: string;
}
interface ChallengeCurrentGetRequest {
  cursor?: number;
  limit: number;
}

interface ChallengeCurrentGetResponse {
  message: string;
  code: number;
  data: CurrentChallenge[];
}

interface CurrentChallenge {
  challengeId: number;
  challengeCategory: string;
  challengeIntroduction: string;
  challengeName: string;
  insightCount: string;
}
interface ChallengeProgressGetResponse {
  message: string;
  code: number;
  data: { name: string; current: number; total: number };
}
