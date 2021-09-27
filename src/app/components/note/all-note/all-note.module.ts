import { NgModule } from '@angular/core';
import {AllNoteComponent} from './all-note.component';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {NoteDetailsModule} from '../note-details/note-details.module';
import {NotesAddFormModule} from '../note-add-form/notes-add-form.module';
import {NoteListModule} from '../note-list/note-list.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SharedTreeModule} from '../../shared/shared-tree/shared-tree.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [AllNoteComponent],
    imports: [
        CommonModule,
        IonicModule,
        NotesAddFormModule,
        NoteListModule,
        NoteDetailsModule,
        MatButtonModule,
        MatIconModule,
        SharedTreeModule,
        TranslateModule
    ],
  exports: [AllNoteComponent],
})
export class AllNoteModule {}
