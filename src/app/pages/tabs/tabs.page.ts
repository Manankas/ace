import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  public tabs = [
    {
      tab: 'writing',
      icon: 'bookmark-outline',
    },
    {
      tab: 'chats',
      icon: 'chatbubble-outline',
    },
    {
      tab: 'notifications',
      icon: 'notifications-outline',
    },
    {
      tab: 'account',
      icon: 'person-circle-outline',
    },
  ];
  public selectedTab = 'home';
  constructor() {}

  ngOnInit() {}
  onChange(event: { tab: string }) {
    this.selectedTab = event.tab;
  }
}
