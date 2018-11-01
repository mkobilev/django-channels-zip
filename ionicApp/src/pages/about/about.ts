import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatService } from '../../providers/chat/chat';

import * as pako from 'pako';
import { Subject } from 'rxjs';

@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {
	startTime: number;
	endTime: number;
	pakoResult: any;

	socketStat = new Subject<object>();

	constructor(public navCtrl: NavController, private ws: ChatService) {
		this.socketStat.subscribe((state) => {
			console.log('new socket state', state);
		});

		this.ws.messages.subscribe((response) => {
			if (response instanceof Blob) {
				var fileReader: FileReader = new FileReader();
				fileReader.onload = (event: any) => {
					var binaryString = event.target.result;
					try {
						var result = pako.ungzip(new Uint8Array(binaryString), { to: 'string' });
						this.profile();

						let obj = JSON.parse(result);
						this.socketStat.next(obj);
					} catch (err) {
						console.log('Error ' + err);
					}
				};

				fileReader.readAsArrayBuffer(response);

				return;
			} else {
				console.log('JSON', response);
				this.profile();
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

	private profile() {
		this.endTime = new Date().getTime();
		document.getElementById('time').innerHTML = (this.endTime - this.startTime).toString();
	}
}
