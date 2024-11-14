export type ProjectItem = {
  id: number;
  name: string;
  status: 'ACTIVE' | 'CANCELED' | 'FINISHED';
  end_date: string;
  progress: number;
  description: string;
  client_name?: string;
};

export type NewProject = {
  name: string;
  company_id: string;
  start_date: string;
  status: 'ACTIVE' | 'CANCELED' | 'FINISHED';
  end_date: string;
  progress: number;
  description: string;
  client_name?: string;
};

export type NewItens = {
  product_id: string;
  amount: number;
};

export type Payload = {
  data: NewProject;
  items: NewItens[];
};
