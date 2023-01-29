import React, { FC, useContext, useEffect, useMemo } from 'react';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import styled from 'styled-components';
import {
  createComment,
  deleteComment,
  findComment,
  getCommentChildren,
  likeComment,
  startCommentListen,
  stopCommentListen,
  updateComment,
} from '../../redux/thunk/comment.thunk';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  ICommentContext,
  ICommentCreate,
  ICommentFind,
  ICommentUpdate,
} from '../../types/comment/comment.type';
import { useAppDispatch } from '../../redux/store';
import Load from '../styled/organism/Load';
import { downloadTxtPost } from '../../redux/thunk/post.thunk';
import { ReactChildren } from '../../types/post/post.type';
export const ContainerGrid = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  justify-content: flex-start;
  //height: 100px;
`;

const Comment = React.createContext<ICommentContext | null>(null);

export function useComment() {
  const commentContext = useContext(Comment);
  if (!commentContext) throw new Error('');
  return commentContext;
}

export const CommentProvider: FC<ReactChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { comments, post, isLoading, count } = useTypeSelector((state) => state.comment);
  const { id: userId } = useTypeSelector((state) => state.auth);
  const commentsByParentId = useMemo(() => {
    const group = {} as any;
    comments.forEach((comment: any) => {
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });
    return group;
  }, [comments]);

  function getReplies(parentId: string) {
    return commentsByParentId[parentId];
  }

  useEffect(() => {
    dispatch(startCommentListen());
    commentFind({
      email: searchParams.get('email') || '',
      name: searchParams.get('name') || '',
      message: searchParams.get('message') || '',
      page: searchParams.get('page') || '0',
      data: searchParams.get('data') || false,
    });
    return () => {
      dispatch(stopCommentListen());
    };
  }, []);
  const commentFind = ({ email, name, message, data = false, page = '0' }: ICommentFind) => {
    if (id) {
      dispatch(
        findComment({ email, name, message, data: Boolean(data), id, page: Number(page) * 25 })
      );
    }
  };

  const commentAdd = ({ id, message, parentId }: ICommentCreate) => {
    dispatch(createComment({ message, parentId, id }));
  };
  const commentRemove = (id: string) => {
    dispatch(deleteComment(id));
  };
  const commentUpdate = ({ id, message }: ICommentUpdate) => {
    dispatch(updateComment({ message, id }));
  };
  const commentToggleLike = (id: string) => {
    dispatch(likeComment(id));
  };
  const downloadTxt = async (id: string) => {
    dispatch(downloadTxtPost(id));
  };
  const getComment = async (id: any[]) => {
    dispatch(getCommentChildren(id));
  };
  return (
    <Comment.Provider
      value={{
        post: { id, ...post },
        rootComments: commentsByParentId['null'],
        getReplies,
        commentAdd,
        commentRemove,
        commentUpdate,
        commentToggleLike,
        commentFind,
        downloadTxt,
        getComment,
        userId,
        count,
      }}
    >
      {isLoading ? <Load /> : children}
    </Comment.Provider>
  );
};
