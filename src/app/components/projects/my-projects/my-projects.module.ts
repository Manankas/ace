import { NgModule } from '@angular/core';
import { MyProjectsComponent } from './my-projects.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProjectCardCptModule } from '../project-card/project-card.module';
import {DetailsProjectComponentModule} from '../../details-project/details-project.module';

@NgModule({
  imports: [CommonModule, IonicModule, ProjectCardCptModule, DetailsProjectComponentModule],
  declarations: [MyProjectsComponent],
  exports: [MyProjectsComponent],
})
export class MyProjectCptModule {}
