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
  selector: 'page-bills',
  templateUrl: 'bills.html',
})
export class BillsPage {
  bills=[];
  total:number;
  productsURL:string;
  baseURL:string;
  constructor(public app: App, public navCtrl: NavController,public global:GlobalProvider, public http:Http, public navParams: NavParams) {
  	
  }

  ionViewDidEnter() {
    this.initializeBills();
    console.log('ionViewDidLoad BillsPage');
  }

  filterBills(ev: any) {
    this.http.get(this.baseURL)
      .subscribe(data => {
        console.log(data["_body"]);
        this.bills=JSON.parse(data["_body"]);
        let val = ev.target.value;
        if (val && val.trim() !== '') {
          this.bills = this.bills.filter((bill) => {
            return ((bill.fldname.toLowerCase().indexOf(val.toLowerCase()) > -1));
          })
        }
      }, error => {
        console.log("failed");
      }
    );
  }

  initializeBills() {
    console.log(this.global.session);
    this.baseURL=this.global.serverAddress+"api/bills.php";
    if(this.global.accessLevel=='bills'){
      this.baseURL=this.baseURL+"&bills";
    }
    this.http.get(this.baseURL)
      .subscribe(data => {
        console.log(data);
        this.bills=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }

}
