import { FC } from 'react';
import Comment from './comment';
import { CommentListProp } from '../../types/comment/comment.type';
export const CommentList: FC<CommentListProp> = ({ comments }) => {
  return (
    <>
      {comments?.map((el) => (
        <Comment {...el} key={el.id} />
      ))}
    </>
  );
};
