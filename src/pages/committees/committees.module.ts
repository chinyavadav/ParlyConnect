import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommitteesPage } from './committees';

@NgModule({
  declarations: [
    CommitteesPage,
  ],
  imports: [
    IonicPageModule.forChild(CommitteesPage),
  ],
})
export class CommitteesPageModule {}
