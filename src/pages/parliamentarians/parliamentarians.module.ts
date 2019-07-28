import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParliamentariansPage } from './parliamentarians';

@NgModule({
  declarations: [
    ParliamentariansPage,
  ],
  imports: [
    IonicPageModule.forChild(ParliamentariansPage),
  ],
})
export class ParliamentariansPageModule {}
