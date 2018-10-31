import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatService } from '../../providers/chat/chat';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    private ws: ChatService
    ) {

      this.ws.messages.subscribe(msg => {
        console.log(typeof msg)

      });



  }


  private message = {
		author: 'tutorialedge',
		message: 'this is a test message'
	}

  public getJson() {
    this.ws.messages.next({ cmd: 'getJson' });
  }

  public getCompressedJson() {
    this.ws.messages.next({ cmd: 'getCompressedJson' });
    // this.jsonSring = this.chatService.messages.
  }
}
