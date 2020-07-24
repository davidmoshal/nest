import {Controller, Get} from '@nestjs/common';
import {EventsGateway} from './events.gateway';

@Controller('api/events')
export class EventsController {
    constructor(
        private readonly eventsGateway: EventsGateway
    ) {}

    @Get('/')
    async broadcastToClients() {
        console.log("broadcastToClients")
        // this.chatGateway.server.emit('triggerRest', null);
        // return 2;
    }
}
