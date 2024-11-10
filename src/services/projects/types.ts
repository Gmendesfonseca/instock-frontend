export type ProjectItem = {
  id: number;
  name: string;
  status: 'ACTIVE' | 'CANCELED' | 'FINISHED';
  end_date: string;
  progress: number;
  amount: number;
  description: string;
};

export type NewProject = {
  name: string;
  company_id: string;
  start_date: string;
  status: 'ACTIVE' | 'CANCELED' | 'FINISHED';
  end_date: string;
  progress: number;
  amount: number;
  description: string;
};
