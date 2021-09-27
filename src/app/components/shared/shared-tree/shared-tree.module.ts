import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SharedTreeComponent} from './shared-tree.component';
import {MatRippleModule} from '@angular/material/core';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        TranslateModule
    ],
  declarations: [SharedTreeComponent],
  exports: [SharedTreeComponent],
})
export class SharedTreeModule {

}
