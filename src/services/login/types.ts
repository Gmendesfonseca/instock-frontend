export type LoginParams = {
  email: string;
  password: string;
};

export type LoginError = {
  message: string;
  sucess: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export type LoginSucess = {
  message: string;
  sucess: boolean;
};

export type LoginResponse = LoginSucess | LoginError;