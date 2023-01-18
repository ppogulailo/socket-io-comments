import { ReactNode } from 'react';

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
