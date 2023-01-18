import { CommentProvider } from '../component/hoc/comment.provider';
import { CommentWithPost } from '../component/comment/comment-with-post';

export const CommentPage = () => {
  return (
    <CommentProvider>
      <CommentWithPost />
    </CommentProvider>
  );
};
