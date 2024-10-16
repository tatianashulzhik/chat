import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
@WebSocketGateway(3002)
export class AppWebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private readonly authService: AuthService) { }

    async handleConnection(client: Socket) {
        const { authorization } = client.handshake.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            client.disconnect();
            client.emit('error', 'JWT token not found or invalid in headers');
            throw new UnauthorizedException('JWT token not found or invalid in headers');
        }

        const token = authorization.split(' ')[1];

        try {
            await this.authService.validateToken(token);
            client.emit('tokenValidation', { status: 'success', token });
        } catch {
            client.disconnect();
            client.emit('error', 'Invalid token');
            throw new UnauthorizedException('Invalid token');
        }

        client.data.token = token;
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected');
    }
}
