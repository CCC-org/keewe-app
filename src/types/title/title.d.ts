export interface Title {
  message: string;
  code: number;
  data: titleInfo[];
}

export interface titleInfo {
  titleId: number;
  name: string;
  introduction: string;
  achievedDate: string;
}

export interface titleMeta {
  id: number;
  category: string;
  name: string;
  introduction: string;
  url: NodeRequire;
}
