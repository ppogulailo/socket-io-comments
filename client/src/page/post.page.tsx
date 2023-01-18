import { PostProvider } from '../component/hoc/post.provider';
import { Post } from '../component/post/post';

export const PostPage = () => {
  return (
    <PostProvider>
      <Post />
    </PostProvider>
  );
};
