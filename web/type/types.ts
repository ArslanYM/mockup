export type ProjectType = {
  id: number;
  projectId: string;
  device: string;
  createdOn: string;
  projectName: string;
  theme: string;
  userInput: string;
  screenShot?: string;
};

export type ScreenConfigType = {
  id: number;
  screenId: string;
  screenName: string;
  purpose: string;
  screenDescription: string;
  code: string;
};
