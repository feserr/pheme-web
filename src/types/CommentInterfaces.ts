export interface IComment {
  id: number;
  postId?: number;
  user: number;
  avatar: string;
  username: string;
  content: string;
  createdAt?: Date;
}

export interface CommentsDataProps {
  data?: IComment[];
}

export interface CommentDataObj extends CommentsDataProps {
  id: number;
  content: string;
}
