import { PostProvider } from '../component/hoc/post.provider';
import { Post } from '../component/post/post';

export const PostPage = (): JSX.Element => {
  return (
    <PostProvider>
      <Post />
    </PostProvider>
  );
};
