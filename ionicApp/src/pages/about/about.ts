import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatService } from '../../providers/chat/chat';

import * as pako from 'pako';

@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {
	startTime: number;
	endTime: number;
	constructor(public navCtrl: NavController, private ws: ChatService) {

		this.ws.messages.subscribe((msg) => {
			if (msg instanceof Blob) {
        var blob = msg;
 				var arrayBuffer;

				var fileReader: FileReader = new FileReader();

				fileReader.onload = function() {
					arrayBuffer = this.result;
					try {
						const startTime = new Date().getTime();
						let result: any = pako.ungzip(new Uint8Array(arrayBuffer), { to: 'string' });
						console.log('res');
						const endTime = new Date().getTime();
            document.getElementById('time').innerHTML = (endTime - startTime).toString()

						let obj = JSON.parse(result);
            console.log('Decompressed JSON', obj);

					} catch (err) {
						console.log('Error ' + err);
					}
        };

				fileReader.readAsArrayBuffer(blob);

				console.log('file', fileReader.result);

				return;
			} else {
				console.log('JSON', msg);
        this.endTime = Date.now();
        document.getElementById('time').innerHTML = (this.endTime - this.startTime).toString()
			}
		});
	}

	public getJson() {
		this.startTime = new Date().getTime();
		this.ws.messages.next({ cmd: 'getJson' });
	}

	public getCompressedJson() {
		this.startTime = new Date().getTime();

		this.ws.messages.next({ cmd: 'getCompressedJson' });
	}
}
