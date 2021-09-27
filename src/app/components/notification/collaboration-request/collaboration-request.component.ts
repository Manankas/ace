import {Component, Input, OnInit} from '@angular/core';

import { ModalController } from '@ionic/angular';
import {MemberNotification} from '../../../pages/notification/notification.page';
import {MemberService} from '../../../services/member.service';

@Component({
  selector: 'app-collaboration-request',
  templateUrl: './collaboration-request.component.html',
  styleUrls: ['./collaboration-request.component.scss'],
})
export class CollaborationRequestComponent implements OnInit {
  @Input()members: MemberNotification[];
  constructor(
    private modalCtrl: ModalController,
    private memberService: MemberService
  ) {}

  ngOnInit() {}

  async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }
  public updateRequest(id: string, up = true) {
    this.members.splice(this.members.findIndex(f => f.id === id), 1);
    if(up) this.memberService.updateField({id, role: 1 });
    else this.memberService.remove(id);
  }
}
