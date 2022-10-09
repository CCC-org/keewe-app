export interface UploadRequest {
  participation: boolean;
  drawerId: number;
  contents: string;
  link: string;
}

export interface IFolder {
  id: number;
  name: string;
}
