import { NgModule } from '@angular/core';
import {NoteListComponent} from './note-list.component';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [NoteListComponent],
  imports: [
    CommonModule,
    IonicModule,
    MatIconModule
  ],
  exports: [NoteListComponent],
})
export class NoteListModule {}
