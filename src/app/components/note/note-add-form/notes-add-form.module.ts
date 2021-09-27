import { MaterialModule } from '../../../material.module';
import { NoteAddFormComponent } from './note-add-form.component';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [NoteAddFormComponent],
    imports: [CommonModule, IonicModule, FormsModule, MaterialModule, TranslateModule],
  exports: [NoteAddFormComponent],
})
export class NotesAddFormModule {}
