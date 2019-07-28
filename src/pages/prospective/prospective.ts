import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '@angular/http';
import { ParliamentarianPage } from '../parliamentarian/parliamentarian';
import { ProfilePage } from '../profile/profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject, FileUploadOptions } from  '@ionic-native/file-transfer';
/**
 * Generated class for the ProspectivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prospective',
  templateUrl: 'prospective.html',
})
export class ProspectivePage {
	mycontract:any;
	prospective:any;
	total:number=0;
	constructor(public camera: Camera, public transfare:FileTransfer, public loadingCtrl: LoadingController, public toastCtrl:ToastController, public http:Http, public global: GlobalProvider, public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		this.getProspective();
		console.log('ionViewDidLoad ProspectivePage');
	}

	pushApartment(apartmentid){
  		this.navCtrl.push(ParliamentarianPage, {'apartmentid':apartmentid});
  	}

  	uploadContract(apartmentid,accountno){
	    //show loading
	    let loader = this.loadingCtrl.create({
	      content: "Uploading Contract..."
	    });
	    loader.present();
	    //create file transfare object
	    if(this.mycontract!=null){
	      const fileTransfare: FileTransferObject=this.transfare.create();
	      //option transfare
	      let options: FileUploadOptions={
	        fileKey: 'file',
	        fileName: apartmentid+"-"+accountno+".jpg",
	        chunkedMode: false,
	        httpMethod: "post",
	        mimeType: "image/jpeg",
	        headers: {}
	      }
	      fileTransfare.upload(this.mycontract, this.global.serverAddress+"api/uploadcontract.php", options)
	        .then((data) =>{
	          loader.dismiss();       
	        }, (err)=> {
	          loader.dismiss();
	          let toast = this.toastCtrl.create({
	            message: 'Could not upload Contract!',
	            duration: 3000,
	            position: 'bottom',
	            cssClass: 'dark-trans',
	            closeButtonText: 'OK',
	            showCloseButton: true
	          });
	          toast.present();
	      });          
	    }else{
	      loader.dismiss();
	      let toast = this.toastCtrl.create({
	          message: 'No contract to upload!',
	          duration: 3000,
	          position: 'bottom',
	          cssClass: 'dark-trans',
	          closeButtonText: 'OK',
	          showCloseButton: true
	        });
	        toast.present();
	    }
  	}

  	getPhoto(){
	    const options: CameraOptions = {
	      quality: 70,
	      destinationType: this.camera.DestinationType.DATA_URL,
	      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
	      saveToPhotoAlbum: false,
	      allowEdit: true,
	      targetWidth: 640,
	      targetHeight: 480
	    }

	    this.camera.getPicture(options).then((imageData) => {
	     this.mycontract = 'data:image/jpeg;base64,' + imageData;
	    }, (err) => {
	    	this.mycontract=null;
	        let toast = this.toastCtrl.create({
	          message: 'Could not open Gallery!',
	          duration: 3000,
	          position: 'bottom',
	          cssClass: 'dark-trans',
	          closeButtonText: 'OK',
	          showCloseButton: true
	        });
	        toast.present();
	    });
  	}

  	getProspective() {
		this.http.get(this.global.serverAddress+"api/prospective.php?acc="+this.global.session.fldaccountno)
		.subscribe(data => {
			console.log(data);
			this.prospective=JSON.parse(data["_body"]);
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
		this.total=this.prospective.length;
	}

	profile(accountno){
		this.navCtrl.push(ProfilePage,{'accountno':accountno});
	}

	decline(apartmentid,accountno){
  		this.http.get(this.global.serverAddress+"api/prospective.php?acc="+accountno+"&app="+apartmentid+"&decline")
		.subscribe(data => {
			let resp=JSON.parse(data["_body"]);
			console.log(data);
			if(resp.response=="success"){
				let toast = this.toastCtrl.create({
		          message: 'Application was successfully declined!',
		          duration: 3000,
		          position: 'bottom',
		          cssClass: 'dark-trans',
		          closeButtonText: 'OK',
		          showCloseButton: true
		        });
		        toast.present();
			}else{
				let toast = this.toastCtrl.create({
		          message: 'Application could not be declined!',
		          duration: 3000,
		          position: 'bottom',
		          cssClass: 'dark-trans',
		          closeButtonText: 'OK',
		          showCloseButton: true
		        });
		        toast.present();
			}
			this.getProspective();
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

  	approve(apartmentid,accountno){
		if(this.mycontract!=null){
	  		this.http.get(this.global.serverAddress+"api/prospective.php?acc="+accountno+"&app="+apartmentid+"&approve")
			.subscribe(data => {
				let resp=JSON.parse(data["_body"]);
				if(resp.response=="success"){
					let toast = this.toastCtrl.create({
			          message: 'Application was successfully accepted!',
			          duration: 3000,
			          position: 'bottom',
			          cssClass: 'dark-trans',
			          closeButtonText: 'OK',
			          showCloseButton: true
			        });
			        toast.present();
			        this.uploadContract(apartmentid,accountno);
				}else{
					let toast = this.toastCtrl.create({
			          message: 'Application could not be accepted!',
			          duration: 3000,
			          position: 'bottom',
			          cssClass: 'dark-trans',
			          closeButtonText: 'OK',
			          showCloseButton: true
			        });
			        toast.present();
				}
				this.getProspective();
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
		}else{
			let toast = this.toastCtrl.create({
		      message: 'Choose Contract file first!',
		      duration: 3000,
		      position: 'bottom',
		      cssClass: 'dark-trans',
		      closeButtonText: 'OK',
		      showCloseButton: true
		    });
			toast.present();
		}
  	}
}
