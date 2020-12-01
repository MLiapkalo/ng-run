import { Credentials } from './Credentials';

export interface User extends UserInfo, Credentials { }

export interface UserInfo {
  id: number;
  name: {
    first: string,
    last: string
  };
}
