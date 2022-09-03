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
