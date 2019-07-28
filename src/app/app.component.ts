import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { GlobalProvider } from "../providers/global/global";
import { BillsPage } from '../pages/bills/bills';
import { PetitionsPage } from '../pages/petitions/petitions';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MyApartmentsPage } from '../pages/my-apartments/my-apartments';
import { ProspectivePage } from '../pages/prospective/prospective';
import { RegisterPage } from '../pages/register/register';
import { SettingsPage } from '../pages/settings/settings';
import { TenantsPage } from '../pages/tenants/tenants';
import { ProfilePage } from '../pages/profile/profile';
import { CommitteesPage } from '../pages/committees/committees';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public global: GlobalProvider, public storage: Storage, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.statusBar.styleDefault();
    this.splashScreen.hide();

    // used for an example of ngFor and navigation
    this.pages = [   
      { title: 'Login', component: LoginPage },
      { title: 'Register', component: RegisterPage },
      { title: 'Home', component: HomePage },
    ];

  }

  initializeApp() {   
    this.platform.ready().then(() => {
      this.storage.ready().then(()=> {
        this.storage.get('serverAddress').then((val) =>{
          this.setServerAddress(val);
        });
        this.storage.get('session').then((val) =>{
          this.setAccount(val);
        });
      });
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });
  }

  setAccount(val){
    this.global.session=val;
    if(this.global.session==null){
      this.rootPage = LoginPage;         
    }else{
      if(this.global.session.fldaccountno!=""){
        this.global.accessLevel="PARLIAMENTARIAN";
      }else{
        this.global.accessLevel="CITIZEN";
      }
      this.rootPage = HomePage;
    }
  }

  setServerAddress(val){
    this.global.serverAddress=val;
    console.log(val);
  }

  logout(){
    this.storage.remove("session");    
    this.global.session=null;
    this.global.accessLevel=null;
    this.nav.setRoot(LoginPage);
  }

  openPage(index) {
    var pages=[BillsPage,PetitionsPage,ProfilePage,CommitteesPage,SettingsPage,TenantsPage];
    this.nav.push(pages[index]);
  }
}
