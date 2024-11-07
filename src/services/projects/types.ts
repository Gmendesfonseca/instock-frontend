export type ProjectItem = {
  id: number;
  name: string;
  status: 'ACTIVE' | 'CANCELED' | 'FINISHED';
  date: string;
  progress: number;
  amount: number;
  description: string;
};

export type NewProject = {
  name: string;
  status: 'ACTIVE' | 'CANCELED' | 'FINISHED';
  date: string;
  progress: number;
  amount: number;
  description: string;
};
