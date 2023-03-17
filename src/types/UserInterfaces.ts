import { IPost } from "../types/PostInterfaces";

export interface IUser {
  id: number;
  username: string;
  email: string;
  avatar: string;
  password: string;
  accessToken: string;
  followers: Array<number>;
  following: Array<number>;
  posts: Array<IPost>;
}
export interface LoginProps {
  email: string;
  password: string;
}

export interface AuthProps {
  username?: string;
  password: string;
  email: string;
  avatar?: string;
}
