import { NgModule } from '@angular/core';
import {NoteListModule} from '../note-list/note-list.module';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {EditNoteComponent} from './edit-note.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [EditNoteComponent],
    imports: [
        CommonModule,
        IonicModule,
        NoteListModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        TranslateModule
    ],
  exports: [EditNoteComponent],
})
export class EditNoteModule {}
