import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParliamentariansPage } from '../parliamentarians/parliamentarians';
import { ChatsPage } from '../chats/chats';
import { GlobalProvider } from '../../providers/global/global';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
	parliamentariansPage=ParliamentariansPage;
	chatsPage=ChatsPage;
	constructor(public global:GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
