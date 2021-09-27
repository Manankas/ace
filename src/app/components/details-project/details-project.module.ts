import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialModule } from '../../material.module';
import { CharacterAllListCptModule } from '../characters/characters-all-list/characters-all-list.module';
import { CharactersSlideListCptModule } from '../characters/characters-slide-list/characters-slide-list.module';
import { CollaborationModule } from '../collaboration/collaboration.module';
import { GroupCptModule } from '../group/group.module';
import { ItemSkeletonCptModule } from '../item-skeleton/item-skeleton.module';
import { ItemModule } from '../item/item.module';
import { NoteModule } from '../note/note.module';
import { ProjectSettingsModule } from '../project-settings/project-settings.module.ts';
import { SessionsCptModule } from '../sessions/sesisons.module';
import { SpeciesModule } from '../species/species.module';
import { StatisticModule } from '../statistic/statistic.module';
import { TrashModule } from '../trash/trash.module';
import { WLocationModule } from '../wLocation/wLocation.module';
import { CoverCptModule } from './cover/cover.module';
import { DetailsProjectComponent } from './details-project.component';
import { TachesListCptModule } from '../taches/task-list/task-list.module';
import {ProjectResumeModule} from '../projects/project-resume/project-resume.module';
import {TimelineModule} from '../timeline/timeline.module';
import {ChaptersModule} from './chapters/chapters.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TachesListCptModule,
        ChaptersModule,
        CoverCptModule,
        CharactersSlideListCptModule,
        ProjectSettingsModule,
        WLocationModule,
        ItemModule,
        CharacterAllListCptModule,
        SessionsCptModule,
        GroupCptModule,
        SpeciesModule,
        NoteModule,
        CollaborationModule,
        MaterialModule,
        StatisticModule,
        ItemSkeletonCptModule,
        TrashModule,
        ProjectResumeModule,
        TimelineModule,
        TranslateModule,
    ],
  declarations: [DetailsProjectComponent],
  exports: [DetailsProjectComponent],
})
export class DetailsProjectComponentModule {}
