import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { ParliamentarianPage } from '../parliamentarian/parliamentarian';
import { MyApartmentsPage } from '../my-apartments/my-apartments';
/**
 * Generated class for the BookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookings',
  templateUrl: 'bookings.html',
})
export class BookingsPage {
	bookings:any;
	total:number=0;
  constructor(public toastCtrl:ToastController, public http:Http, public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
  	
  }

	ionViewDidLoad() {
		this.getBookings();
		console.log('ionViewDidLoad BookingsPage');
	}

	pushApartment(apartmentid){
  		this.navCtrl.push(ParliamentarianPage, {'apartmentid':apartmentid});
  	}

  	openBrowser(app,acc){
		window.open(this.global.serverAddress+"account/contracts/"+app+"-"+acc+".jpg", "_self");
	}

  	confirm(apartmentid,account){
  		this.http.get(this.global.serverAddress+"api/confirmcontract.php?acc="+this.global.session.fldaccountno+"&app="+apartmentid)
		.subscribe(data => {
			let resp=JSON.parse(data["_body"]);
			if(resp.response=="success"){
				let toast = this.toastCtrl.create({
		          message: 'Contract was successfully confirmed!',
		          duration: 3000,
		          position: 'bottom',
		          cssClass: 'dark-trans',
		          closeButtonText: 'OK',
		          showCloseButton: true
		        });
		        toast.present();
		        this.navCtrl.popTo(MyApartmentsPage);
			}else{
				let toast = this.toastCtrl.create({
		          message: 'Contract could not be confirmed!',
		          duration: 3000,
		          position: 'bottom',
		          cssClass: 'dark-trans',
		          closeButtonText: 'OK',
		          showCloseButton: true
		        });
		        toast.present();
			}
			this.getBookings();
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

  	delete(apartmentid){
  		this.http.get(this.global.serverAddress+"api/bookings.php?acc="+this.global.session.fldaccountno+"&app="+apartmentid+"&delete")
		.subscribe(data => {
			let resp=JSON.parse(data["_body"]);
			if(resp.response=="success"){
				let toast = this.toastCtrl.create({
		          message: 'Booking was successfully terminated!',
		          duration: 3000,
		          position: 'bottom',
		          cssClass: 'dark-trans',
		          closeButtonText: 'OK',
		          showCloseButton: true
		        });
		        toast.present();
			}else{
				let toast = this.toastCtrl.create({
		          message: 'Booking could not be terminated!',
		          duration: 3000,
		          position: 'bottom',
		          cssClass: 'dark-trans',
		          closeButtonText: 'OK',
		          showCloseButton: true
		        });
		        toast.present();
			}
			this.getBookings();
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

  	getBookings() {
		this.http.get(this.global.serverAddress+"api/bookings.php?acc="+this.global.session.fldaccountno)
		.subscribe(data => {
			this.bookings=JSON.parse(data["_body"]);
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
		this.total=this.bookings.length;
	}

}
