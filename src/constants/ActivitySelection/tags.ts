import theme from '../../theme/light';

export interface ActivityGroupInterface {
  practical: ActivityTagGroupsInterface;
  investment: ActivityTagGroupsInterface;
  language: ActivityTagGroupsInterface;
  culture: ActivityTagGroupsInterface;
  music: ActivityTagGroupsInterface;
  sport: ActivityTagGroupsInterface;
  food: ActivityTagGroupsInterface;
  beauty: ActivityTagGroupsInterface;
}

export interface ActivityTagGroupsInterface {
  groupName: string;
  groupColor: string;
  groupTags: ActivityTagInterface[];
}

export interface ActivityTagInterface {
  id: number;
  name: string;
  isChecked: boolean;
}

export const ActivityTags: ActivityGroupInterface = {
  practical: {
    groupName: 'Practical',
    groupColor: theme.colors.graphic.green,
    groupTags: [
      { id: 1, name: '마케팅', isChecked: false },
      {
        id: 2,
        name: '기획',
        isChecked: false,
      },
      {
        id: 3,
        name: '디자인',
        isChecked: false,
      },
      {
        id: 4,
        name: '개발',
        isChecked: false,
      },
      {
        id: 5,
        name: '자격증',
        isChecked: false,
      },
      {
        id: 6,
        name: '취업',
        isChecked: false,
      },
      {
        id: 7,
        name: '창업',
        isChecked: false,
      },
      {
        id: 8,
        name: '기타 실무',
        isChecked: false,
      },
    ],
  },
  investment: {
    groupName: 'Investment',
    groupColor: theme.colors.graphic.orange,
    groupTags: [
      { id: 1, name: '부동산', isChecked: false },
      { id: 2, name: '가상자산', isChecked: false },
      { id: 3, name: '금융지식', isChecked: false },
      { id: 4, name: '주식', isChecked: false },
      { id: 4, name: '부업', isChecked: false },
    ],
  },
  language: {
    groupName: 'Language',
    groupColor: theme.colors.graphic.purple,
    groupTags: [
      { id: 1, name: '영어', isChecked: false },
      { id: 2, name: '일본어', isChecked: false },
      { id: 3, name: '중국어', isChecked: false },
      { id: 4, name: '기타외국어', isChecked: false },
    ],
  },
  culture: {
    groupName: 'Culture',
    groupColor: theme.colors.graphic.yellow,
    groupTags: [
      { id: 1, name: '전시', isChecked: false },
      { id: 2, name: '영화', isChecked: false },
      { id: 3, name: '공연', isChecked: false },
      { id: 4, name: '독서', isChecked: false },
      { id: 5, name: '미술', isChecked: false },
      { id: 6, name: '사진', isChecked: false },
      { id: 7, name: '출판', isChecked: false },
      { id: 8, name: '글쓰기', isChecked: false },
      { id: 9, name: '연기', isChecked: false },
      { id: 10, name: '댄스', isChecked: false },
      { id: 11, name: '악기 연주', isChecked: false },
      { id: 12, name: '보컬', isChecked: false },
      { id: 13, name: '프로듀싱', isChecked: false },
    ],
  },
  music: {
    groupName: 'Music',
    groupColor: theme.colors.graphic.blue,
    groupTags: [
      { id: 1, name: 'KPOP', isChecked: false },
      { id: 2, name: '인디', isChecked: false },
      { id: 3, name: '힙합', isChecked: false },
      { id: 4, name: '해외팝', isChecked: false },
      { id: 5, name: '기타 음악', isChecked: false },
    ],
  },
  sport: {
    groupName: 'Sport',
    groupColor: theme.colors.graphic.violet,
    groupTags: [
      { id: 1, name: '등산', isChecked: false },
      { id: 2, name: '헬스', isChecked: false },
      { id: 3, name: '요가', isChecked: false },
      { id: 4, name: '필라테스', isChecked: false },
      { id: 5, name: '클라이밍', isChecked: false },
      { id: 6, name: '자전거', isChecked: false },
      { id: 7, name: '서핑', isChecked: false },
      { id: 8, name: '스키', isChecked: false },
      { id: 9, name: '보드', isChecked: false },
      { id: 10, name: '배드민턴', isChecked: false },
      { id: 11, name: '테니스', isChecked: false },
      { id: 12, name: '다이어트', isChecked: false },
    ],
  },
  food: {
    groupName: 'Food',
    groupColor: theme.colors.graphic.coral,
    groupTags: [
      { id: 1, name: '맛집', isChecked: false },
      { id: 2, name: '요리', isChecked: false },
      { id: 3, name: '베이킹', isChecked: false },
      { id: 4, name: '커피', isChecked: false },
      { id: 5, name: '차', isChecked: false },
      { id: 6, name: '술', isChecked: false },
    ],
  },
  beauty: {
    groupName: 'Beauty',
    groupColor: theme.colors.graphic.coral,
    groupTags: [
      { id: 1, name: '뷰티', isChecked: false },
      { id: 2, name: '향수', isChecked: false },
      { id: 3, name: '네일', isChecked: false },
      { id: 4, name: '패션', isChecked: false },
    ],
  },
};
