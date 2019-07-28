import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddParliamentarianPage } from './add-apartment';

@NgModule({
  declarations: [
    AddParliamentarianPage,
  ],
  imports: [
    IonicPageModule.forChild(AddParliamentarianPage),
  ],
})
export class AddParliamentarianPageModule {}
