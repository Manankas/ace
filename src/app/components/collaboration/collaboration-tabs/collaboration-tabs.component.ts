import { Component, Input, OnInit } from '@angular/core';

import {
  MemberService,
  UserCollaborator,
} from 'src/app/services/member.service';

import { ModalController } from '@ionic/angular';

import { IndexeddbService } from '../../../services/indexeddb.service';

@Component({
  selector: 'app-collaboration-tabs',
  templateUrl: './collaboration-tabs.component.html',
  styleUrls: ['./collaboration-tabs.component.scss'],
})
export class CollaborationTabsComponent implements OnInit {
  @Input() projectId: string;
  @Input() projectOwnerId: string;
  public currUserId: string;
  public collaborators: UserCollaborator[] = [];

  constructor(
    private modalCtrl: ModalController,
    private indexedDbService: IndexeddbService,
    private memberService: MemberService
  ) {}

  async ngOnInit() {
    this.indexedDbService.get('user')
      .then(user => this.currUserId = user.id);
    this.memberService.findMembers(this.projectId)
      .then(collaborators => this.collaborators = collaborators)
    /**Vérifier s'il s'agit de projet collaboratif*/
  }

  async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }
}
