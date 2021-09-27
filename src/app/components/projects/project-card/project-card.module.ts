import { ProjectCardComponent } from './project-card.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ProjectCardComponent],
  exports: [ProjectCardComponent],
})
export class ProjectCardCptModule {}
