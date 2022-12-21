import { IComment } from "../types/CommentInterfaces";

export interface IPost {
  id: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  visibility: number;
  category: string;
  text: string;
  username: string;
  avatar: string;
  userId: number;
  createdBy: number;
  image?: string;
  likes?: Array<number>;
  comments?: Array<IComment>;
  post?: any;
  user?: any;
  isVerified?: boolean;
}

export interface IAddPost {
  category: string;
  visibility: number;
  text: string;
  userID: number;
}

export interface LikeProps {
  message: string;
}
