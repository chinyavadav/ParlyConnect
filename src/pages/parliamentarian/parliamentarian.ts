import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { Http } from '@angular/http';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the ParliamentarianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parliamentarian',
  templateUrl: 'parliamentarian.html',
})
export class ParliamentarianPage {
	public parliamentarian:any;
	public imgPath:string;
	constructor(public http:Http, public loadingCtrl:LoadingController, public toastCtrl:ToastController, public alertCtrl: AlertController ,public global:GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
	  this.parliamentarian=navParams.get('parliamentarian');
	  this.imgPath=this.global.serverAddress+'/account/avatars/'+this.parliamentarian.fldapartmentid+'.jpg';

	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParliamentarianPage');
  }

  viewProfile(accountno){
    this.navCtrl.push(ProfilePage,{'accountno':accountno });
  }

  bookApartment() {
	  let alert = this.alertCtrl.create({
	    title: 'Book Apartment',
	    inputs: [
	      {
	        name: 'comment',
	        placeholder: 'Specify any other details!',
	        type: 'text'
	      }
	    ],
	    buttons: [
	      {
	        text: 'Cancel',
	        role: 'cancel',
	        handler: data => {
	          console.log('Cancel clicked');
	        }
	      },
	      {
	        text: 'Book',
	        handler: data => {
	        	this.post(data.comment);
	        }
	      }
	    ]
	  });
	  alert.present();
	}

  deleteApartment() {
    let alert = this.alertCtrl.create({
      title: 'Delete Apartment',
      message: 'Are you sure you want to delete apartment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Delete Cancelled!");            
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deletePost();
          }
        }
      ]
    });
    alert.present();
  }

  deletePost(){
      let loader = this.loadingCtrl.create({
        content: "Deleting Apartment...",
        spinner:"bubbles"
      });
      loader.present();
      let postData={
        "apartmentid":this.parliamentarian.fldapartmentid,
      };
      console.log(postData);
      this.http.post(this.global.serverAddress+"api/deleteapartment.php", JSON.stringify(postData))
        .subscribe(data => {
          console.log(data["_body"]);
          let response = JSON.parse(data["_body"]);
          if(response.response=="success"){
            let alert = this.alertCtrl.create({
              title: 'Delete Apartment',
              subTitle: 'Apartment successfully deleted!',
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.popToRoot();
          }else{
            let alert = this.alertCtrl.create({
                title: 'Delete Apartment',
                subTitle: 'Apartment could not be deleted!',
                buttons: ['OK']
            });
            alert.present();
         }
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
        }
      );
      loader.dismiss();
  }

	post(comment) {
      let loader = this.loadingCtrl.create({
        content: "Booking Apartment...",
        spinner:"bubbles"
      });
      loader.present();
      let postData={
        "apartmentid":this.parliamentarian.fldapartmentid,
        "accountno":this.global.session.fldaccountno,
        "comment":comment
      };
      console.log(postData);
      this.http.post(this.global.serverAddress+"api/bookapartment.php", JSON.stringify(postData))
        .subscribe(data => {
          console.log(data["_body"]);
          let response = JSON.parse(data["_body"]);
          if(response.response=="success"){
            let alert = this.alertCtrl.create({
              title: 'Book Apartment',
              subTitle: 'Apartment successfully booked!',
              buttons: ['OK']
            });
            alert.present();
          }else{
            let alert;
            if(response.error=="duplication"){
              alert = this.alertCtrl.create({
                  title: 'Book Apartment',
                  subTitle: 'You have already booked the apartment!',
                  buttons: ['OK']
              });
            }else{
              alert = this.alertCtrl.create({
                  title: 'Book Apartment',
                  subTitle: 'Apartment could not be booked!',
                  buttons: ['OK']
              });
            }
            alert.present();
         }
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
        }
      );
      loader.dismiss();
  }

}
