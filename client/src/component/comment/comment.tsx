import styled from 'styled-components';
import { FC, useState } from 'react';
import { CommentList } from './comment.list';
import { useComment } from '../hoc/comment.provider';
import { CommentForm } from './comment.form';
import { IconBtn } from '../styled/atom/IconBtn';
import {
  FaAngleUp,
  FaAngleDown,
  FaEdit,
  FaHeart,
  FaRegHeart,
  FaReply,
  FaTrash,
} from 'react-icons/fa';

import * as React from 'react';
import { IComment } from '../../types/redux/redux.type';
import HTMLTagRenderer from '../styled/molecules/HtmlRender';

export const Center = styled.div`
  text-align: center;
`;
export const ColorText = styled.div`
  color: ${(props) => props.theme.buttonColor};
`;

export const TextOne = styled.div`
  color: ${(props) => props.theme.color};
`;

const CardContainer = styled.section`
  border: solid 2px;
  border-radius: 2rem;
  border-color: ${(props) => props.theme.buttonColor};
  padding: 0.5rem 2rem;
`;
const Container = styled.div`
  margin: 1rem 3rem;
`;
const ChildContainer = styled.section`
  border-left: solid 2px;
  border-color: ${(props) => props.theme.buttonColor};
`;

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'short',
  timeStyle: 'short',
});
const Comment: FC<IComment> = ({
  user,
  message,
  createdAt,
  id,
  likeCount,
  children,
  likedByMe,
}) => {
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    post,
    getReplies,
    commentRemove,
    commentUpdate,
    commentAdd,
    commentToggleLike,
    userId,
    getComment,
  } = useComment();
  const childComments = getReplies(id);

  function onCommentReply(message: string) {
    return commentAdd({ id: post.id, message, parentId: id });
  }

  function onCommentUpdate(message: string) {
    return commentUpdate({ id, message });
  }

  function onCommentDelete() {
    return commentRemove(id);
  }

  function onToggleCommentLike() {
    return commentToggleLike(id);
  }

  function getChildrenComment() {
    setAreChildrenHidden(true);
    getComment(children);
  }

  return (
    <Container>
      <CardContainer>
        <ColorText>
          {user.name} ({user.email})
        </ColorText>
        {dateFormatter.format(Date.parse(createdAt))}
        {isEditing ? (
          <CommentForm
            initialValue={message}
            onSubmit={onCommentUpdate}
            setIsEditing={setIsEditing}
          />
        ) : (
          <HTMLTagRenderer allowedTags={['a', 'code', 'strong', 'i']} string={message} />
        )}

        <IconBtn onClick={onToggleCommentLike} Icon={likedByMe ? FaHeart : FaRegHeart}>
          {likeCount}
        </IconBtn>
        <IconBtn onClick={() => setIsReplying(!isReplying)} Icon={FaReply} />

        {user.id === userId && (
          <>
            <IconBtn onClick={() => setIsEditing((prev) => !prev)} Icon={FaEdit} />
            <IconBtn onClick={onCommentDelete} Icon={FaTrash} />
          </>
        )}
        {isReplying && <CommentForm onSubmit={onCommentReply} setIsEditing={setIsReplying} />}
      </CardContainer>
      {(children?.length > 0 || childComments?.length > 0) && (
        <>
          {areChildrenHidden ? (
            <div>
              <IconBtn
                onClick={() => {
                  setAreChildrenHidden(!areChildrenHidden);
                  getComment(children);
                }}
                Icon={FaAngleDown}
              ></IconBtn>
              <ChildContainer>
                <CommentList comments={childComments} />
              </ChildContainer>
            </div>
          ) : (
            <div>
              <IconBtn onClick={getChildrenComment} Icon={FaAngleUp}></IconBtn>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Comment;
