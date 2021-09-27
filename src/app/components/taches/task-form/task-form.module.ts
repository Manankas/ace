import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {TaskFormComponent} from './task-form.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        TranslateModule,
    ],
  declarations: [TaskFormComponent],
  exports: [TaskFormComponent],
})
export class TaskFormModule {

}
