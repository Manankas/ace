import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

import { AlarmCptModule } from 'src/app/components/alarm/alarm.module';

import { IonicModule } from '@ionic/angular';

import { ChallengeComponentModule } from '../../components/challenge/challenge.component.module';
import { ProjectsComponentModule } from '../../components/projects/projects.component.module';
import { WritingPageRoutingModule } from './writing-routing.module';
import { WritingPage } from './writing.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MatTabsModule,
        ProjectsComponentModule,
        ChallengeComponentModule,
        WritingPageRoutingModule,
        AlarmCptModule,
        TranslateModule,
    ],
  declarations: [WritingPage],
})
export class WritingPageModule {}
