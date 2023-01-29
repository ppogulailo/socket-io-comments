import { PostMessage } from './post.message';
import styled from 'styled-components';
import { FC } from 'react';
import { PostListProp } from '../../types/post/post.type';

const PostCover = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding-bottom: 2rem;

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const PostList: FC<PostListProp> = ({ post, isLoading }) => {
  return (
    <PostCover>
      {isLoading ? (
        <></>
      ) : (
        post?.map((el) => {
          return <PostMessage {...el} key={el.id} />;
        })
      )}
    </PostCover>
  );
};
