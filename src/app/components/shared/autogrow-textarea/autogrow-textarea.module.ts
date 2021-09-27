import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutogrowTextareaComponent} from './autogrow-textarea.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    TextFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AutogrowTextareaComponent],
  exports: [AutogrowTextareaComponent],
})
export class AutogrowTextareaModule {

}
