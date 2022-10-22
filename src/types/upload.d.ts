export interface UploadRequest {
  participation: boolean;
  drawerId: number | null;
  contents: string;
  link: string;
}

export interface IFolder {
  id: number;
  name: string;
}
