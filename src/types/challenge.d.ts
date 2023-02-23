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
  size: number;
}

interface ChallengeHistoryGetResponse {
  message: string;
  code: number;
  data: {
    historyNumber: number;
    challengeHistories: {
      challengeId: number;
      challengeCategory: string;
      challengeName: string;
      startDate: string;
      endDate: string;
    }[];
  };
}
interface ChallengeCurrentGetRequest {
  size: number;
}

interface ChallengeCurrentGetResponse {
  message: string;
  code: number;
  data: {
    challengeId: number;
    challengeCategory: string;
    challengeIntroduction: string;
    challengeName: string;
    insightCount: string;
  }[];
}
