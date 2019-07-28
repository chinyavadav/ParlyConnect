import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyApartmentsPage } from './my-apartments';

@NgModule({
  declarations: [
    MyApartmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyApartmentsPage),
  ],
})
export class MyApartmentsPageModule {}
