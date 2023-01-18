import { useComment } from '../hoc/comment.provider';
import { Center, ColorText, TextOne } from './comment';
import { CommentForm } from './comment.form';
import { CommentFilter } from './comment.filter';
import { CommentList } from './comment.list';
import styled from 'styled-components';
import { useState } from 'react';
import { IComment } from '../../types/redux/redux.type';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import Modal from '../styled/organism/Modal';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../styled/atom/Button';
import { Form } from '../../page/auth.page';
import { SERVER_IMAGE_DOWNLOAD } from '../../config/constant';

const GridContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const CommentWithPost = () => {
  const [searchParams] = useSearchParams();
  const { txtMessage, isLoading } = useTypeSelector((state) => state.post);
  const { post, rootComments, commentAdd, commentFind, downloadTxt, count } = useComment();

  function onCommentCreate(message: string) {
    return commentAdd({ id: post.id, message });
  }

  const [open, setOpen] = useState(false);

  const downloadAndOpen = async () => {
    await downloadTxt(post.file);
    setOpen(true);
  };

  function onCommentPaginate(page: string) {
    const email = searchParams.get('email') ? searchParams.get('email') : '';
    const name = searchParams.get('name') ? searchParams.get('name') : '';
    const message = searchParams.get('message') ? searchParams.get('message') : '';
    const data = searchParams.get('data') ? searchParams.get('data') : '';
    return commentFind({ email, name, message, data, page });
  }

  return (
    <>
      <Center>
        <ColorText>{post.title}</ColorText>
      </Center>
      <GridContainer>
        <TextOne>{post.body}</TextOne>

        {post?.file?.split('.')[1] === 'txt' ? (
          <div>
            <Button onClick={downloadAndOpen}>Open File</Button>
            <Modal isLoading={isLoading} isOpen={open} close={() => setOpen(false)}>
              <p>{txtMessage}</p>
            </Modal>
          </div>
        ) : (
          <>
            <div>
              <Button onClick={() => setOpen(true)}>Open Image</Button>
              <Modal isOpen={open} close={() => setOpen(false)}>
                <img src={`${SERVER_IMAGE_DOWNLOAD}${post.file}`} alt="" />
              </Modal>
            </div>
          </>
        )}
      </GridContainer>
      <CommentFilter onSubmit={commentFind} />
      <CommentForm onSubmit={onCommentCreate} />
      <Form></Form>
      <ColorText>Comments</ColorText>
        {(comments: IComment[]) => <CommentList comments={comments} />}
    </>
  );
};
