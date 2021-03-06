import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { WebsocketService } from '../websocket/websocket';

const WS_URL = 'ws://192.168.0.191:8000/ws/chat/test/';

export interface Message {
	cmd?: string,
}

@Injectable()
export class ChatService {
	public messages: Subject<any>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<any>>wsService
			.connect(WS_URL)
			.map((response: MessageEvent): any => {
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
