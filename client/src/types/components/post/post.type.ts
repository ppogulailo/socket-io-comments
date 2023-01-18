import { ReactNode } from 'react';
import { dispatchAction } from '../auth/auth.type';

export interface IPostCreate {
  body: string;
  title: string;
  file: File;
}

export interface PostListProp {
  post: IPost[];
  isLoading: boolean | null;
}

export interface ReactChildren {
  children: ReactNode;
}
export interface IPost {
  body: string;
  title: string;
  id: string;
  file: string;
  user: {
    email: string;
    name: string;
    id: string;
  };
  createdAt: string;
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