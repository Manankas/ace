import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {CharacterInfoCptModule} from '../character-info/character-info.module';
import {CharacterListComponent} from './character-list.component';
import {MatListModule} from "@angular/material/list";
import {AvatarModule} from "ngx-avatar";

@NgModule({
  declarations: [CharacterListComponent],
  imports: [CommonModule, IonicModule, CharacterInfoCptModule, CharacterInfoCptModule, MatListModule, AvatarModule],
  exports: [CharacterListComponent],
})
export class CharacterListCptModule {}
