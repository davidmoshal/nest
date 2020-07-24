import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Server, Socket} from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  @SubscribeMessage('dave')
  async dave(@MessageBody() data: number,
             @ConnectedSocket() client: Socket,
  ): Promise<number> {
    console.log('dave()',{data})
    client.send({ event: 'events', data: Date.now().toString() })
   // client.emit("events", 2)
    return data;
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log("connection")
  }
}
