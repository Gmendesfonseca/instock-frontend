export type Project = {
  id: number;
  name: string;
  status: 1 | 2 | 3;
  date: string;
  progress: number;
  amount: number;
  unit_value: number;
  description: string;
};
