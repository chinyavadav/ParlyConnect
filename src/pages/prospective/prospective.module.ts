import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProspectivePage } from './prospective';

@NgModule({
  declarations: [
    ProspectivePage,
  ],
  imports: [
    IonicPageModule.forChild(ProspectivePage),
  ],
})
export class ProspectivePageModule {}
