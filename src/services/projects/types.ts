export type ProjectItem = {
  id: number;
  name: string;
  status: 1 | 2 | 3;
  date: string;
  progress: number;
  amount: number;
  description: string;
};

export type NewProject = {
  name: string;
  status: 1 | 2 | 3;
  date: string;
  progress: number;
  amount: number;
  description: string;
};
