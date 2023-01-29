import { IPost } from '../post/post.type';

export interface ICommentUpdate {
  message: string;
  id: string;
}

export interface IToggleCommentLike {
  addLike: boolean;
  id: string;
}

export interface IComment {
  createdAt: string;
  id: string;
  likeCount: number;
  likedByMe: boolean;
  message: string;
  parentId: null | string;
  user: {
    email: string;
    id: string;
    name: string;
  };
  children: IComment[];
}

export interface ICommentState {
  comments: IComment[];
  isLoading: null | boolean;
  post: IPost[] | null;
  isLoadingComment: boolean | null;
  error: null | string;
  count: null | number;
}

export interface IAuthState {
  error: string | null;
  isLoading: boolean | null;
  isAuth: boolean | null;
  id: string | null;
}

export interface IFindPost {
  post: IPost[];
  count: number;
}

export interface IPostState {
  post: IPost[] | null;
  isLoading: boolean | null;
  error: string | null;
  txtMessage: null | string;
  count: null | number;
}
