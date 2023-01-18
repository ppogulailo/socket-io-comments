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
  connect() {
    connectToSocket();
    socket.connect();
  },
  disconnect() {
    socket.removeAllListeners();
    socket.disconnect();
  },
  onError(callback: any) {
    socket.on('error', callback);
  },
  sendComment(comment: ICommentCreate) {
    socket.emit('add', comment);
  },
  updateComment(comment: ICommentUpdate) {
    socket.emit('update', comment);
  },
  deleteComment(id: string) {
    socket.emit('remove', id);
  },
  findComment(comment: ICommentFind) {
    socket.emit('find', comment);
  },
  likeComment(id: string) {
    socket.emit('toggleLike', id);
  },
  getChildrenComment(id: any[]) {
    socket.emit('getChildren', id);
  },
  onGetChildrenComment(callback: CallBackValue<IComment[]>) {
    socket.on('onGetChildren', callback);
  },
  onSendComment(callback: CallBackValue<IComment>) {
    socket.on('onAdd', callback);
    socket.on('Error', (err: any) => console.log(err));
    socket.on('connect_error', (err: any) => console.log(err));
    socket.on('connect_failed', (err: any) => console.log(err));
    socket.on('Exception', (err: any) => console.log(err));
  },
  onUpdateComment(callback: CallBackValue<ICommentUpdate>) {
    socket.on('onUpdate', callback);
  },
  onDeleteComment(callback: CallBackValue<{ id: string }>) {
    socket.on('onRemove', callback);
  },
  onFindComment(callback: CallBackValue<IComment[]>) {
    socket.on('onFind', callback);
  },
  onLikeComment(callback: CallBackValue<{ addLike: boolean; id: string }>) {
    socket.on('onToggleLike', callback);
  },
};
