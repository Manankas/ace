import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyYourEmailPage } from './verify-your-email.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyYourEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyYourEmailPageRoutingModule {}
