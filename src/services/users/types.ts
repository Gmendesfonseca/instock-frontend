export type CreateUser = {
  email: string;
  password: string;
  username: string;
  type: string;
};

export type User = {
  id: string;
  email: string;
  username: string;
};

export type UpdateUserPassword = {
  id: string;
  password: string;
};
