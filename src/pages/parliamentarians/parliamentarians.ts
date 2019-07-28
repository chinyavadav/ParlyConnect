import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App} from 'ionic-angular';
import { Http } from '@angular/http';
import { ParliamentarianPage } from '../parliamentarian/parliamentarian';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the ApartmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parliamentarians',
  templateUrl: 'parliamentarians.html',
})
export class ParliamentariansPage {
  parliamentarians=[];
  total:number;
  productsURL:string;
  baseURL:string;
  constructor(public app: App, public navCtrl: NavController,public global:GlobalProvider, public http:Http, public navParams: NavParams) {
  	
  }

  ionViewDidEnter() {
    this.initializeParliamentarians();
    console.log('ionViewDidLoad ParliamentariansPage');
  }

  filterParliamentarians(ev: any) {
    this.http.get(this.baseURL)
      .subscribe(data => {
        console.log(data["_body"]);
        this.parliamentarians=JSON.parse(data["_body"]);
        let val = ev.target.value;
        if (val && val.trim() !== '') {
          this.parliamentarians = this.parliamentarians.filter((parliamentarian) => {
            return ((parliamentarian.fldname.toLowerCase().indexOf(val.toLowerCase()) > -1));
          })
        }
      }, error => {
        console.log("failed");
      }
    );
  }

  initializeParliamentarians() {
    console.log(this.global.session);
    this.baseURL=this.global.serverAddress+"api/parliamentarians.php"+"?id="+this.global.session.fldaccountno;
    if(this.global.accessLevel=='PARLIAMENTARIANS'){
      this.baseURL=this.baseURL+"&parliamentarians";
    }
    this.http.get(this.baseURL)
      .subscribe(data => {
        console.log(data);
        this.parliamentarians=JSON.parse(data["_body"]);
      }, error => {
        console.log("failed");
      }
    );
  }

  pushParliamentarian(parliamentarian){
  	this.navCtrl.push(ParliamentarianPage, {'parliamentarian':parliamentarian});
  }

}
