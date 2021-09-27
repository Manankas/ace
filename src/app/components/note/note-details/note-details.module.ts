import { NgModule } from '@angular/core';
import {NoteDetailsComponent} from './note-details.component';
import {NoteListModule} from '../note-list/note-list.module';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {EditNoteModule} from '../edit-note/edit-note.module';

@NgModule({
  declarations: [NoteDetailsComponent],
  imports: [
    CommonModule,
    IonicModule,
    NoteListModule,
    MatIconModule,
    MatButtonModule,
    EditNoteModule
  ],
  exports: [NoteDetailsComponent],
})
export class NoteDetailsModule {}
