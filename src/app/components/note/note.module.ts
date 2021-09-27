import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {NoteComponent} from './note.component';
import {AllNoteModule} from './all-note/all-note.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        AllNoteModule,
        TranslateModule
    ],
  declarations: [NoteComponent],
  exports: [NoteComponent],
})
export class NoteModule {

}
