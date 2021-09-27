import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {ProjectResumeComponent} from './project-resume.component';
import {AutogrowTextareaModule} from '../../shared/autogrow-textarea/autogrow-textarea.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AutogrowTextareaModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [ProjectResumeComponent],
  exports: [ProjectResumeComponent]
})
export class ProjectResumeModule {}
