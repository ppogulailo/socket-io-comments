import { usePost } from '../hoc/post.provider';
import { PostList } from './post.list';
import { PostForm } from './post.form';
import React from 'react';
import { IPost } from '../../types/post/post.type';

export const Post = () => {
  const { post, postCreate, postFetch, isLoading, count } = usePost();
  return (
    <>
      <PostForm onSubmit={postCreate} />
        {(post: IPost[]) => <PostList post={post} isLoading={isLoading} />}
    </>
  );
};
