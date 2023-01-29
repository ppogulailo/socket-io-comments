import { ContainerGrid } from '../hoc/comment.provider';
import { TextField } from '../styled/atom/Input';
import { FC, useState } from 'react';
import { ErrorMessage } from '../styled/atom/Error';
import { useForm } from 'react-hook-form';
import * as React from 'react';
import { IconBtn } from '../styled/atom/IconBtn';
import { FaCode } from 'react-icons/fa';
import styled from 'styled-components';

import { nameValidation } from '../../config/customValidation/validation';
import { ICommentFormProp } from '../../types/comment/comment.type';
import { Button } from '../styled/atom/Button';
import { Form } from '../../page/auth.page';

const Model = styled.div`
  background-color: ${(props) => props.theme.background};
  padding: 1rem;
  position: relative;
  bottom: 3rem;
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  flex-direction: column;

  & > * {
    margin: 0.2rem 0rem;
  }
`;
const CodeButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.buttonColor};
  border-radius: ${(props) => props.theme.borderRadius};

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;
const filters = ['<code></code>', '<a href=”” title=””></a>', '<strong></strong>', '<i></i>'];
type FormValues = {
  htmlInput: string;
};
export const CommentForm: FC<ICommentFormProp> = ({
  onSubmit,
  children,
  initialValue = '',
  setIsEditing,
}) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { htmlInput: initialValue },
  });
  const [open, setOpen] = useState(false);

  const onSubmitForm = async (form: { htmlInput: string }) => {
    onSubmit(form.htmlInput);
    if (setIsEditing) {
      setIsEditing(false);
    }
    setValue('htmlInput', '');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <ContainerGrid>
        <div>
          <TextField
            validation={register('htmlInput', nameValidation)}
            placeholder="Enter your comment"
          />
          {children}
          <Button type="submit" disabled={!isDirty || !isValid}>
            Send
          </Button>
          <IconBtn Icon={FaCode} onClick={() => setOpen((prev) => !prev)}></IconBtn>
          {open && (
            <Model>
              {filters.map((item, i) => (
                <CodeButton
                  key={i}
                  onClick={() => {
                    setOpen((prev) => !prev);
                    setValue('htmlInput', getValues('htmlInput') + item);
                  }}
                >
                  {item}
                </CodeButton>
              ))}
            </Model>
          )}
        </div>
      </ContainerGrid>
      {errors.htmlInput?.message && <ErrorMessage error={errors.htmlInput.message} />}
    </Form>
  );
};
