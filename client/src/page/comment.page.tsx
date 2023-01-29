import { CommentProvider } from '../component/hoc/comment.provider';
import { CommentWithPost } from '../component/comment/comment-with-post';

export const CommentPage = (): JSX.Element => {
  return (
    <CommentProvider>
      <CommentWithPost />
    </CommentProvider>
  );
};
