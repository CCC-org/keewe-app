import theme from '../../theme/light';

export interface ActivityGroupInterface {
  practical: ActivityTagGroupsInterface;
  investment: ActivityTagGroupsInterface;
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
        name: '웹',
        isChecked: false,
      },
      {
        id: 5,
        name: '앱',
        isChecked: false,
      },
      {
        id: 6,
        name: '서버',
        isChecked: false,
      },
      {
        id: 7,
        name: '기타',
        isChecked: false,
      },
    ],
  },
  investment: {
    groupName: 'Investment',
    groupColor: theme.colors.graphic.orange,
    groupTags: [
      { id: 1, name: '제품', isChecked: false },
      { id: 2, name: '서비스', isChecked: false },
      { id: 3, name: '엔터테인먼트', isChecked: false },
      { id: 4, name: '기타', isChecked: false },
    ],
  },
};
