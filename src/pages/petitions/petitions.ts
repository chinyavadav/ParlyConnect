import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App} from 'ionic-angular';
import { Http } from '@angular/http';
//import { BillPage } from '../bill/bill';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the ApartmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-petitions',
  templateUrl: 'petitions.html',
})
export class PetitionsPage {
  petitions=[];
  total:number;
  productsURL:string;
  baseURL:string;
  constructor(public app: App, public navCtrl: NavController,public global:GlobalProvider, public http:Http, public navParams: NavParams) {
  	
  }

  ionViewDidEnter() {
    this.initializepetitions();
    console.log('ionViewDidLoad petitionsPage');
  }

  filterpetitions(ev: any) {
    this.http.get(this.baseURL)
      .subscribe(data => {
        console.log(data["_body"]);
        this.petitions=JSON.parse(data["_body"]);
        let val = ev.target.value;
        if (val && val.trim() !== '') {
          this.petitions = this.petitions.filter((bill) => {
            return ((bill.fldname.toLowerCase().indexOf(val.toLowerCase()) > -1));
          })
        }
      }, error => {
        console.log("failed");
      }
    );
  }

  initializepetitions() {
    console.log(this.global.session);
    this.baseURL=this.global.serverAddress+"api/petitions.php";
    if(this.global.accessLevel=='petitions'){
      this.baseURL=this.baseURL+"&petitions";
    }
    this.http.get(this.baseURL)
      .subscribe(data => {
        console.log(data);
        this.petitions=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }

  pushbill(bill){
  	//this.navCtrl.push(BillPage, {'bill':bill});
  }

}
