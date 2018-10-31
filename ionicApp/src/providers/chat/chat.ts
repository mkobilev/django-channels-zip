import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from '../websocket/websocket';

const WS_URL = 'ws://localhost:8000/ws/chat/test/';

export interface Message {
	cmd?: string,
}

@Injectable()
export class ChatService {
	public messages: Subject<Message>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<Message>>wsService
			.connect(WS_URL)
			.map((response: MessageEvent): Message => {
        // console.log('response.data', response.data)
        try {
          let data = JSON.parse(response.data);
          return data
        } catch {
          return response.data
        }

        //
        // console.log('data', data)
				// return data
			});
	}
}
