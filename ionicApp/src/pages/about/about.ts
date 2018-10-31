import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatService } from '../../providers/chat/chat';

import * as pako from 'pako';

@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {
	constructor(public navCtrl: NavController, private ws: ChatService) {
		this.ws.messages.subscribe((msg) => {
			if (msg instanceof Blob) {
				var blob = msg;
				var arrayBuffer;

				var fileReader = new FileReader();
				fileReader.onload = function() {
					arrayBuffer = this.result;
					try {
						let result: any = pako.ungzip(new Uint8Array(arrayBuffer), { to: 'string' });
						let obj = JSON.parse(result);
						console.log('Decompressed JSON', obj);
					} catch (err) {
						console.log('Error ' + err);
					}
				};
				fileReader.readAsArrayBuffer(blob);
				return;
			} else {
				console.log('JSON', msg);
			}
		});
	}

	public getJson() {
		this.ws.messages.next({ cmd: 'getJson' });
	}

	public getCompressedJson() {
		this.ws.messages.next({ cmd: 'getCompressedJson' });
	}
}
