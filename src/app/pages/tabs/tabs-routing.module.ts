import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'writing',
        loadChildren: () =>
          import('../../pages/writing/writing.module').then(
            (m) => m.WritingPageModule
          ),
      },
      {
        path: 'chats',
        loadChildren: () =>
          import('../../pages/chat/chat.module').then(
            (m) => m.ChatPageModule
          ),
      },
      {
        path: 'notifications',
        loadChildren: () => import('../../pages/notification/notification.module').then(
          m => m.NotificationPageModule
        )
      },
      {
        path: 'account',
        loadChildren: () => import('../../pages/profil/profil.module').then(
          m => m.ProfilPageModule
        )
      },
      {
        path: '',
        redirectTo: 'writing',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
