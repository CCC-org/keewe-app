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

interface ChallengeJoinRequest {
  duration: number;
  challengeId: number;
  insightPerWeek: number;
  myTopic: string;
}

interface ChallengeJoinResponse {
  message: string;
  code: number;
  data: {
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
    interest: string;
    startDate: string;
  };
}

interface ChallengeParticipationGetResponse {
  message: string;
  code: number;
  data: {
    participation: boolean;
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
  data: {
    name: string;
    current: number;
    total: number;
    todayRecorded: boolean;
    weekCompleted: boolean;
  };
}

interface ChallengeDetailGetRequest {
  challengeId: number;
}

interface ChallengeDetailGetResponse {
  message: string;
  code: number;
  data: {
    challengeName: string;
    challengeIntroduction: string;
    insightCount: number;
    createdAt: string;
  };
}

interface ChallengeMyDetailGetResponse {
  message: string;
  code: number;
  data: {
    challengeName: string;
    challengeCategory: string;
    challengeIntroduction: string;
    createdAt: string;
  };
}

interface ChallengeFriendsGetRequest {
  challengeId: number;
  page?: number;
  size: number;
}

interface ChallengeFriendsGetResponse {
  message: string;
  code: number;
  data: {
    userId: number;
    nickname: string;
    imageURL: string;
    currentRecord: number;
    goalRecord: number;
    following: boolean;
  }[];
}

interface ChallengeFriendsCountGetRequest {
  challengeId: number;
}

interface ChallengeFriendsCountGetResponse {
  message: string;
  code: number;
  data: { challengerCount: number };
}

interface ChallengeStatisticsGetResponse {
  message: string;
  code: number;
  data: {
    viewCount: number;
    reactionCount: number;
    commentCount: number;
    bookmarkCount: number;
    shareCount: number;
  };
}

interface ChallengeInsightCountGetRequest {
  writerId?: string;
}

interface ChallengeInsightCountGetResponse {
  message: string;
  code: number;
  data: {
    insightNumber: number;
  };
}
