import { ImageSliderCptModule } from './../../image-slider/image-slider.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { GroupAddFormCptModule } from '../group-add-form/group-add-form.module';
import { GroupDetailsComponent } from './group-details.component';
import { CardSliderCptModule } from '../../card-slider/card-slider.module';
import { CardAvatarCptModule } from '../../card-avatar/card-avatar.module';
import { MaterialModule } from 'src/app/material.module';
import { GroupUpdateFormCptModule } from '../group-update-form/group-update-form.module';
import {TranslateModule} from '@ngx-translate/core';
import {MatListModule} from '@angular/material/list';
import {AvatarModule} from 'ngx-avatar';
import {MatButtonModule} from '@angular/material/button';
import {CharacterListCptModule} from '../../characters/character-list/characters-list.module';
import {SharedTreeModule} from '../../shared/shared-tree/shared-tree.module';
import {CustomFieldListModule} from '../../shared/custom-field/custom-field-list/custom-field-list.module';

@NgModule({
  declarations: [GroupDetailsComponent],
    imports: [
        CommonModule,
        IonicModule,
        MatIconModule,
        GroupAddFormCptModule,
        CardSliderCptModule,
        CardAvatarCptModule,
        MaterialModule,
        ImageSliderCptModule,
        GroupUpdateFormCptModule,
        TranslateModule,
        MatListModule,
        AvatarModule,
        CharacterListCptModule,
        MatButtonModule,
        SharedTreeModule,
        CustomFieldListModule
    ],
  exports: [GroupDetailsComponent],
})
export class GroupDetailsModule {}
