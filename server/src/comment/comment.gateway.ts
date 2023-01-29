import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  UnauthorizedException,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { CommentService } from './comment.service';
import { UsersService } from '../users/users.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FindCommentDto } from './dto/find-comment.dto';
import { HtmlValidationPipe } from '../common/pipes/html-validation.pipe';
import { MyWsExceptionFilter } from '../common/guards/webSocket.exeption';
import { ChildrenCommentDto } from './dto/children-comment.dto';

@UseInterceptors(CacheInterceptor)
@UseFilters(new MyWsExceptionFilter())
@WebSocketGateway(5000, {
  transports: ['websocket'],
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class CommentGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly commentService: CommentService,
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  async handleConnection(socket: Socket) {
    try {
      const decodedToken = await this.authService.verifyUser(
        socket.handshake.auth.token.split(' ')[1],
      );
      const user: any = await this.userService.findById(decodedToken.sub);
      if (!user) {
        return this.disconnect(socket);
      } else {
        socket.data.user = user;
        return this.server.to(socket.id).emit('success');
      }
    } catch (e) {
      return this.disconnect(socket);
    }
  }

  private disconnect(socket: Socket) {
    socket.emit('error', new UnauthorizedException());
    socket.disconnect();
  }

  @SubscribeMessage('find')
  async getById(
    @MessageBody() body: FindCommentDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const post = await this.commentService.getWithFilter(
      body.id,
      body.data,
      body.message,
      body.name,
      body.email,
      body.page,
    );
    return this.server.to(socket.id).emit('onFind', post);
  }

  @SubscribeMessage('add')
  @UsePipes(new ValidationPipe())
  async add(
    @MessageBody('message', HtmlValidationPipe) message: string,
    @MessageBody() dto: CreateCommentDto,
    @ConnectedSocket() client: Socket,
  ) {
    const add = await this.commentService.add(dto, client.data.user.id);
    return this.server.emit('onAdd', add);
  }

  @SubscribeMessage('getChildren')
  @CacheKey('child')
  @CacheTTL(30)
  @UsePipes(new ValidationPipe())
  async getChildren(@MessageBody() dto: ChildrenCommentDto[]) {
    const childrenComment = await this.commentService.getComment(dto);
    return this.server.emit('onGetChildren', childrenComment);
  }

  @SubscribeMessage('update')
  @UsePipes(new ValidationPipe())
  async update(
    @MessageBody('message', HtmlValidationPipe) message: string,
    @MessageBody() dto: CreateCommentDto,
    @ConnectedSocket() client: Socket,
  ) {
    const updatedComment = await this.commentService.update(
      dto,
      client.data.user.id,
    );
    return this.server.emit('onUpdate', updatedComment);
  }

  @SubscribeMessage('remove')
  @UsePipes(new ValidationPipe())
  async remove(@MessageBody() id: string, @ConnectedSocket() client: Socket) {
    const removeComment = await this.commentService.remove(
      id,
      client.data.user.id,
    );
    return this.server.emit('onRemove', removeComment);
  }

  @SubscribeMessage('toggleLike')
  @UsePipes(new ValidationPipe())
  async toggleLike(
    @MessageBody() id: string,
    @ConnectedSocket() client: Socket,
  ) {
    const like = await this.commentService.toggleLike(id, client.data.user.id);
    return this.server.emit('onToggleLike', like);
  }
}
