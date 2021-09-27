import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {ProjectsComponent} from './projects.component';
import { MyProjectCptModule } from './my-projects/my-projects.module';
import { FormAddProjectModule } from './form-add/form-add.module';
import { RequestCodeModule } from '../collaboration/request-code/request-code.module';
import {ProjectArchiveModule} from './project-archive/project-archive.module';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        FormAddProjectModule,
        MyProjectCptModule,
        RequestCodeModule,
        ProjectArchiveModule,
        TranslateModule
    ],
  declarations: [ProjectsComponent],
  exports: [ProjectsComponent]
})
export class ProjectsComponentModule {}
