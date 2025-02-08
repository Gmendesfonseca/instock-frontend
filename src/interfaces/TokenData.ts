import { IUser } from './User';

export interface TokenData {
  sub: string;
  user: IUser;
  exp: number;
}
