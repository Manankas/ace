import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { GroupListComponent } from './group-list.component';
import { GroupAddFormCptModule } from '../group-add-form/group-add-form.module';
import { GroupDetailsModule } from '../group-details/group-details.module';
import { ImageSliderCptModule } from '../../image-slider/image-slider.module';
import { AvatarModule } from 'ngx-avatar';
import {MatButtonModule} from '@angular/material/button';
import {SharedTreeModule} from '../../shared/shared-tree/shared-tree.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [GroupListComponent],
    imports: [
        CommonModule,
        IonicModule,
        MatIconModule,
        GroupDetailsModule,
        GroupAddFormCptModule,
        ImageSliderCptModule,
        AvatarModule,
        MatButtonModule,
        SharedTreeModule,
        TranslateModule
    ],
  exports: [GroupListComponent],
})
export class GroupListCptModule {}
