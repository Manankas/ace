import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { QuillModule } from 'ngx-quill';
import Quill from 'quill';
import Wordcounter from 'quill-wordcounter';

import { IonicModule } from '@ionic/angular';

import { WysiwygComponent } from './wysiwyg.component';
import {TranslateModule} from '@ngx-translate/core';

Quill.register('modules/counter', Wordcounter);

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        MatIconModule,
        ReactiveFormsModule,
        QuillModule.forRoot({
            readOnly: false,
            theme: 'snow',
        }),
        TranslateModule,
    ],
  declarations: [WysiwygComponent],
  exports: [WysiwygComponent],
})
export class WysiwygCptModule {}
