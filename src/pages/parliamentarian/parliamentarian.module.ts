import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParliamentarianPage } from './parliamentarian';

@NgModule({
  declarations: [
    ParliamentarianPage,
  ],
  imports: [
    IonicPageModule.forChild(ParliamentarianPage),
  ],
})
export class ParliamentarianPageModule {}
