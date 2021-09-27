import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CharactersAllListComponent } from './characters-all-list.component';
import {CharacterListCptModule} from '../character-list/characters-list.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [CharactersAllListComponent],
    imports: [CommonModule, IonicModule, CharacterListCptModule, TranslateModule],
  exports: [CharactersAllListComponent],
})
export class CharacterAllListCptModule {}
