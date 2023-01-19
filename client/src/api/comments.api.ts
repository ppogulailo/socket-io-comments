import { io, Socket } from 'socket.io-client';
import { SERVER_WEBSOCKET } from '../config/constant';
import { IComment } from '../types/redux/redux.type';
import { ICommentCreate, ICommentFind, ICommentUpdate } from '../types/comment/comment.type';

let socket: Socket;

function connectToSocket() {
  socket = io(SERVER_WEBSOCKET, {
    transports: ['websocket'],
    reconnection: true,
    auth: {
      token: `Bearer ${localStorage.getItem('authToken')}`,
    },
    rejectUnauthorized: true,
  });
}

interface CallBackValue<T> {
  (key: T): void;
}

export const CommentApi = {
  connect(): void {
    connectToSocket();
    socket.connect();
  },
  disconnect(): void {
    socket.removeAllListeners();
    socket.disconnect();
  },
  onError(callback: CallBackValue<Error>): void {
    socket.on('error', callback);
  },
  sendComment(comment: ICommentCreate): void {
    socket.emit('add', comment);
  },
  updateComment(comment: ICommentUpdate): void {
    socket.emit('update', comment);
  },
  deleteComment(id: string): void {
    socket.emit('remove', id);
  },
  findComment(comment: ICommentFind): void {
    socket.emit('find', comment);
  },
  likeComment(id: string): void {
    socket.emit('toggleLike', id);
  },
  getChildrenComment(id: string[]) {
    socket.emit('getChildren', id);
  },
  onGetChildrenComment(callback: CallBackValue<IComment[]>): void {
    socket.on('onGetChildren', callback);
  },
  onSendComment(callback: CallBackValue<IComment>): void {
    socket.on('onAdd', callback);
  },
  onUpdateComment(callback: CallBackValue<ICommentUpdate>): void {
    socket.on('onUpdate', callback);
  },
  onDeleteComment(callback: CallBackValue<{ id: string }>): void {
    socket.on('onRemove', callback);
  },
  onFindComment(callback: CallBackValue<IComment[]>): void {
    socket.on('onFind', callback);
  },
  onLikeComment(callback: CallBackValue<{ addLike: boolean; id: string }>): void {
    socket.on('onToggleLike', callback);
  },
};
