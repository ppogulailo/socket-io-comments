import { usePost } from '../hoc/post.provider';
import { PostList } from './post.list';
import { PostForm } from './post.form';
import { Pagination } from '../styled/organism/Pagination';
import React from 'react';
import { IPost } from '../../types/post/post.type';

export const Post = (): JSX.Element => {
  const { post, postCreate, postFetch, isLoading, count } = usePost();
  return (
    <>
      <PostForm onSubmit={postCreate} />
      <Pagination root={post} count={count} onPaginate={postFetch}>
        {(post: IPost[]) => <PostList post={post} isLoading={isLoading} />}
      </Pagination>
    </>
  );
};
