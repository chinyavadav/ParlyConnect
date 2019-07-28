import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject, FileUploadOptions } from  '@ionic-native/file-transfer';
import { HomePage } from '../home/home';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the AddParliamentarianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-apartment',
  templateUrl: 'add-apartment.html',
})
export class AddParliamentarianPage {
	@ViewChild('signupSlider') signupSlider;
  myphoto:any;
  defaultPhotoPath:string="assets/imgs/placeholder_home.jpg";
  imgPath=this.defaultPhotoPath;
	public slideOneForm: FormGroup;
	public slideTwoForm: FormGroup;
  public districts=['Beitbridge','Bikita','Bindura','Binga','Bubi','Buhera','Bulawayo','Bulilima','Centenary','Chegutu','Chikomba','Chimanimani','Chinhoyi','Chipinge','Chiredzi','Chirumhanzu','Chivi','Gokwe North','Gokwe South','Goromonzi','Guruve','Gutu','Gwanda','Gweru','Harare','Hurungwe','Hwange','Insiza','Kariba','Kwekwe','Lupane','Makonde','Makoni','Mangwe','Marondera','Masvingo','Matobo','Mazowe','Mberengwa','Mbire','Mhondoro-Ngezi','Mount Darwin','Mudzi','Murehwa','Mutare','Mutasa','Mutoko','Muzarabani','Mwenezi','Nkayi','Nyanga','Rushinga','Sanyati','Seke','Shamva','Shurugwi','Tsholotsho','Umguza','UMP (Uzumba-Maramba-Pfungwe)','Umzingwane','Wedza (Hwedza)','Zaka','Zvimba','Zvishavane'];
  public costranges=['<$100','$100-$199','$200-$499','$500-$999','$1000-$2000','>$2000'];
	public submitAttempt: boolean = false;
	constructor(public transfare: FileTransfer, public camera:Camera, public http:Http, public alertCtrl:AlertController ,public global:GlobalProvider ,public loadingCtrl:LoadingController , public toastCtrl: ToastController, public formBuilder:FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
        var validators={
          "township":[Validators.required,Validators.minLength(3),Validators.maxLength(50)],
          "address":[Validators.required,Validators.minLength(5),Validators.maxLength(200)],
          "roomCount": [Validators.required,Validators.min(0),Validators.max(100)]
        };
        this.slideOneForm=this.formBuilder.group({
          address: ['',validators.address],      
          township: ['',validators.township],
          district: ['',Validators.maxLength(200)],
        });
        this.slideTwoForm=this.formBuilder.group({
          apartmenttype: [''],
          rooms: ['',validators.roomCount],
          bedrooms: ['',validators.roomCount],
          bathrooms: ['',validators.roomCount],      
          kitchens: ['',validators.roomCount],
          lounges: ['',validators.roomCount],          
          comment: [''],
          costrange: [''],
        });
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddParliamentarianPage');
	}

  next(){
      if(this.slideOneForm.valid){
          this.signupSlider.slideNext();
      }else{
        let toast = this.toastCtrl.create({
          message: 'Properly fill in all details!',
          duration: 3000,
          position: 'bottom',
          cssClass: 'dark-trans',
          closeButtonText: 'OK',
          showCloseButton: true
        });
        toast.present();
      }
  }

  prev(){
      this.signupSlider.slidePrev();
  }

  returnHome(){
      this.navCtrl.setRoot(HomePage);
  }

  addApartment() {
    if(this.slideTwoForm.valid && this.slideOneForm.valid){
      let loader = this.loadingCtrl.create({
        content: "Adding Apartment...",
        spinner:"bubbles"
      });
      loader.present();
      let postData={
        "landlord":this.global.session.fldaccountno,
        "slideOneForm":this.slideOneForm.value,
        "slideTwoForm":this.slideTwoForm.value
      };
      this.http.post(this.global.serverAddress+"api/addapartment.php", JSON.stringify(postData))
        .subscribe(data => {
          console.log(data["_body"]);
          let response = JSON.parse(data["_body"]);
          if(response.response=="success"){
            loader.dismiss();
            this.uploadImage(response.apartmentid);
            let alert = this.alertCtrl.create({
              title: 'Add Apartment',
              subTitle: 'Apartment successfully created!',
              buttons: ['OK']
            });
            alert.present();
            this.returnHome();
          }else{
            loader.dismiss();
            let alert = this.alertCtrl.create({
                title: 'Add Apartment',
                subTitle: 'Apartment could not be added!',
                buttons: ['OK']
            });
            alert.present();
         }
        }, error => {
          loader.dismiss();
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
    }else{
      let toast = this.toastCtrl.create({
        message: 'Properly fill in all details!',
        duration: 3000,
        position: 'bottom',
        cssClass: 'dark-trans',
        closeButtonText: 'OK',
        showCloseButton: true
      });
      toast.present();
    }
  }

  //destinationType: this.camera.DestinationType.FILE_URI,
  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: false,
      targetWidth:  640,
      targetHeight: 480
    }

    this.camera.getPicture(options).then((imageData) => {
     this.myphoto = 'data:image/jpeg;base64,' + imageData;
     this.imgPath=this.myphoto;
    }, (err) => {
      this.imgPath=this.defaultPhotoPath;
      let toast = this.toastCtrl.create({
        message: 'Could not access camera!',
        duration: 3000,
        position: 'bottom',
        cssClass: 'dark-trans',
        closeButtonText: 'OK',
        showCloseButton: true
      });
      toast.present();
    });
  }

  uploadImage(apartmentid){
    //show loading
    let loader = this.loadingCtrl.create({
      content: "Uploading Image..."
    });
    loader.present();
    //create file transfare object
    if(this.myphoto!=this.defaultPhotoPath){
      const fileTransfare: FileTransferObject=this.transfare.create();
      //option transfare
      let options: FileUploadOptions={
        fileKey: 'photo',
        fileName: apartmentid+".jpg",
        chunkedMode: false,
        httpMethod: "post",
        mimeType: "image/jpeg",
        headers: {}
      }
      fileTransfare.upload(this.myphoto, this.global.serverAddress+"api/upload.php", options)
        .then((data) =>{
          loader.dismiss();       
        }, (err)=> {
          loader.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Could not upload image!',
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
          message: 'No image to upload seleted!',
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
     this.myphoto = 'data:image/jpeg;base64,' + imageData;
     this.imgPath=this.myphoto;
    }, (err) => {
        this.imgPath=this.defaultPhotoPath;
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
}
