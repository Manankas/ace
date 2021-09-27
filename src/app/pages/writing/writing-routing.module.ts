import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WritingPage } from './writing.page';

const routes: Routes = [
  {
    path: '',
    component: WritingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WritingPageRoutingModule {}
