import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { ParliamentarianPage } from '../parliamentarian/parliamentarian';
/**
 * Generated class for the MyApartmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-apartments',
  templateUrl: 'my-apartments.html',
})
export class MyApartmentsPage {
  apartments:any;
  total:number=0;
  constructor(public toastCtrl:ToastController, public http:Http, public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
  	
  }

    openBrowser(app,acc){
		window.open(this.global.serverAddress+"account/contracts/"+app+"-"+acc+".jpg", "_self");
	}

    delete(apartmentid){
  		this.http.get(this.global.serverAddress+"api/myapartments.php?acc="+this.global.session.fldaccountno+"&app="+apartmentid+"&delete")
		.subscribe(data => {
			let resp=JSON.parse(data["_body"]);
			if(resp.response=="success"){
				let toast = this.toastCtrl.create({
		          message: 'Apartment was successfully deleted!',
		          duration: 3000,
		          position: 'bottom',
		          cssClass: 'dark-trans',
		          closeButtonText: 'OK',
		          showCloseButton: true
		        });
		        toast.present();
			}else{
				let toast = this.toastCtrl.create({
		          message: 'Apartment could not be deleted!',
		          duration: 3000,
		          position: 'bottom',
		          cssClass: 'dark-trans',
		          closeButtonText: 'OK',
		          showCloseButton: true
		        });
		        toast.present();
			}
			this.getApartments();
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

	ionViewDidLoad() {
		this.getApartments();
		console.log('ionViewDidLoad MyApartmentsPage');
	}

	pushApartment(apartmentid){
		this.navCtrl.push(ParliamentarianPage, {'apartmentid':apartmentid});
	}

  	getApartments() {
		this.http.get(this.global.serverAddress+"api/myapartments.php?acc="+this.global.session.fldaccountno)
		.subscribe(data => {
			this.apartments=JSON.parse(data["_body"]);
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
		this.total=this.apartments.length;
	}

}
