import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { ParliamentarianPage } from '../parliamentarian/parliamentarian';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the tenantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tenants',
  templateUrl: 'tenants.html',
})
export class TenantsPage {
  tenants:any;
  total:number=0;
  constructor(public toastCtrl:ToastController, public http:Http, public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
  	
  }

	ionViewDidLoad() {
		this.getTenants();
		console.log('ionViewDidLoad TenantsPage');
	}

	pushTenant(accountno){
		this.navCtrl.push(ParliamentarianPage, {'accountno':accountno});
	}

	openBrowser(app,acc){
		window.open(this.global.serverAddress+"account/contracts/"+app+"-"+acc+".jpg", "_self");
	}

	profile(accountno){
		this.navCtrl.push(ProfilePage,{'accountno':accountno});
	}

  	getTenants() {
		this.http.get(this.global.serverAddress+"api/tenants.php?acc="+this.global.session.fldaccountno)
		.subscribe(data => {
			this.tenants=JSON.parse(data["_body"]);
			this.getTotal();
		}, error => {
	      	let toast = this.toastCtrl.create({
	          message: 'Resolve Connectivity Issue!',
	          duration: 3000,
	          position: 'bottom',
	          cssClass: 'dark-trans',
	          closeButtonText: 'OK',
	          showCloseButton: true
	        });
	    	toast.present();
		});
  	}

  	getTotal(){
		this.total=this.tenants.length;
	}

}
