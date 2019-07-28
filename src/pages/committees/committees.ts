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
  selector: 'page-committees',
  templateUrl: 'committees.html',
})
export class CommitteesPage {
  Committees=[];
  total:number;
  productsURL:string;
  baseURL:string;
  constructor(public app: App, public navCtrl: NavController,public global:GlobalProvider, public http:Http, public navParams: NavParams) {
  	
  }

  ionViewDidEnter() {
    this.initializeCommittees();
    console.log('ionViewDidLoad CommitteesPage');
  }

  filterCommittees(ev: any) {
    this.http.get(this.baseURL)
      .subscribe(data => {
        console.log(data["_body"]);
        this.Committees=JSON.parse(data["_body"]);
        let val = ev.target.value;
        if (val && val.trim() !== '') {
          this.Committees = this.Committees.filter((bill) => {
            return ((bill.fldname.toLowerCase().indexOf(val.toLowerCase()) > -1));
          })
        }
      }, error => {
        console.log("failed");
      }
    );
  }

  initializeCommittees() {
    console.log(this.global.session);
    this.baseURL=this.global.serverAddress+"api/Committees.php";
    if(this.global.accessLevel=='Committees'){
      this.baseURL=this.baseURL+"&Committees";
    }
    this.http.get(this.baseURL)
      .subscribe(data => {
        console.log(data);
        this.Committees=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }

  pushbill(bill){
  	//this.navCtrl.push(BillPage, {'bill':bill});
  }

}
