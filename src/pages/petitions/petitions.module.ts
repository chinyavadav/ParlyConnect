import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetitionsPage } from './petitions';

@NgModule({
  declarations: [
    PetitionsPage,
  ],
  imports: [
    IonicPageModule.forChild(PetitionsPage),
  ],
})
export class PetitionsPageModule {}
