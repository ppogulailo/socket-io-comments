import { IComment } from '../redux/redux.type';
import { ReactNode } from 'react';
import { IPost, IPostCreate } from '../post/post.type';
import { dispatchAction, setState } from '../auth/auth.type';

export interface ICommentCreate {
  id: string;
  message: string;
  parentId?: string;
}

export interface ICommentFind {
  email: string | null;
  name: string | null;
  message: string | null;
  data: string | boolean | null;
  page?: string | null | number;
  id?: string;
}

export interface ICommentUpdate {
  id: string;
  message: string;
}

export interface ICommentContext {
  post: any;
  userId: string | null;
  rootComments: IComment[];
  getReplies: (id: string) => IComment[];
  commentAdd: dispatchAction<ICommentCreate>;
  commentRemove: dispatchAction<string>;
  commentUpdate: dispatchAction<ICommentUpdate>;
  commentToggleLike: dispatchAction<string>;
  commentFind: dispatchAction<ICommentFind>;
  downloadTxt: dispatchAction<string>;
  count: number | null;
  // error:string|null
  getComment: dispatchAction<IComment[]>;
}

export interface CommentListProp {
  comments: IComment[];
}

export type EventTargetValue<T> = React.ChangeEvent<T>;

export interface ICommentFormProp {
  onSubmit: dispatchAction<string>;
  children?: ReactNode;
  initialValue?: string;
  setIsEditing?: setState<boolean>;
}

export interface ICommentFilterProp {
  onSubmit: dispatchAction<ICommentFind>;
}

export interface IPaginationProp {
  root: any;
  children: any;
  count: number | null;
  onPaginate?: any;
}
export interface IPostContext {
  post: IPost[] | null;
  postCreate: dispatchAction<IPostCreate>;
  postRemove: dispatchAction<string>;
  postFetch: dispatchAction<string>;
  id: string | null;
  count: number | null;
  isLoading: boolean | null;
}
