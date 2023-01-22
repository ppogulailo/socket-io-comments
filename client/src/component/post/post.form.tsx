import { FileInput, TextField } from '../styled/atom/Input';
import { Button } from '../styled/atom/Button';
import { FC } from 'react';
import { ErrorMessage } from '../styled/atom/Error';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as React from 'react';
import { fileValidation, requireString } from '../../config/customValidation/validation';
import { Form } from '../../page/auth.page';
import { IPostCreate, IPostForm } from '../../types/post/post.type';
import { dispatchAction } from '../../types/auth/auth.type';

const PostFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  max-width: 500px;
  justify-content: flex-start;
`;

export const PostForm: FC<{ onSubmit: dispatchAction<IPostCreate> }> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IPostForm>();
  const CreatePost = async ({ body, title, file }: IPostForm) => {
    onSubmit({ body, title, file: file[0] });
  };
  return (
    <Form onSubmit={handleSubmit(CreatePost)}>
      <Container>
        <TextField validation={register('title', requireString)} placeholder="Enter your title" />
        {errors.title?.message && <ErrorMessage error={errors.title.message} />}
        <TextField validation={register('body', requireString)} placeholder="Enter your body" />
        {errors.body?.message && <ErrorMessage error={errors.body.message} />}
        <FileInput {...register('file', fileValidation)} type="file" />
        {errors.file?.message && <ErrorMessage error={errors.file.message} />}
        <PostFlex>
          <Button type="submit" disabled={!isDirty || !isValid}>
            Send
          </Button>
        </PostFlex>
      </Container>
    </Form>
  );
};
