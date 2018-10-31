import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import *  as pako from 'pako'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    // console.log('pako', pako)
  }

}
