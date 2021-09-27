import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ModalController } from '@ionic/angular';

import {
  MemberService,
  UserCollaborator,
} from '../../../../services/member.service';
import { MemberRoleComponent } from '../../member/member-role/member-role.component';
import { MemberComponent } from '../../member/member.component';
import {FollowComponent} from '../../../follower/follow/follow.component';
import {ChatFormComponent} from '../../../chat/chat-form/chat-form.component';

@Component({
  selector: 'app-collaboration-members',
  templateUrl: './collaboration-members.component.html',
  styleUrls: ['./collaboration-members.component.scss'],
})
export class CollaborationMembersComponent {
  @Input()projectOwnerId: string;
  @Input()currUserId: string;
  @Input()projectId: string;
  @Input()collaborators: UserCollaborator[];

  constructor(
    private memberService: MemberService,
    private _bottomSheet: MatBottomSheet,
    private modalCtrl: ModalController
  ) {}

  private async openMemberAccountModal(index: number) {
    const modal = await this.modalCtrl.create({
      component: FollowComponent,
      cssClass: 'modal-fullscreen',
      componentProps: { user: this.collaborators[index].user },
    });
    modal.onWillDismiss().then(() => this.openMemberBottomSheet(index));
    await modal.present();
  }

  private async openChatModal(index: number) {
    const modal = await this.modalCtrl.create({
      component: ChatFormComponent,
      componentProps: { recipient: this.collaborators[index].user},
    });
    modal.onWillDismiss().then(() => this.openMemberBottomSheet(index));
    await modal.present();
  }

  private openMemberRoleSheet(index: number) {
    this._bottomSheet
      .open(MemberRoleComponent, {
        panelClass: 'bottom-sheet',
        data: {
          name:
            this.collaborators[index].user.nom +
            ' ' +
            this.collaborators[index].user.prenom,
          role: this.collaborators[index].member.role
        },
      })
      .afterDismissed()
      .subscribe(async (data) => {
        if (data?.checked !== undefined) {
          this.collaborators[index].member.role = data.checked ? 2 : 1;
          await this.memberService.update(this.collaborators[index].member);
        }
        this.openMemberBottomSheet(index);
      });
  }

  public openMemberBottomSheet(index: number) {
    this._bottomSheet
      .open(MemberComponent, {
        panelClass: 'bottom-sheet',
        data: {
          name:
            this.collaborators[index].user.nom +
            ' ' +
            this.collaborators[index].user.prenom,
          role: this.collaborators[index].member.role,
          avatar: this.collaborators[index].user.avatar,
          banned: this.collaborators[index].member.banned,
          isCurrentUser: this.currUserId === this.collaborators[index].user.id,
          isOwner: this.projectOwnerId === this.currUserId
        },
      })
      .afterDismissed()
      .subscribe(async (data: { action: string }) => {
        if(data?.action) {
            switch (data.action) {
              case 'account':
                await this.openMemberAccountModal(index);
                break;
              case 'role': this.openMemberRoleSheet(index);
                break;
              case 'chat':
                await this.openChatModal(index);
                break;
              case 'ban':
                  const member = this.collaborators[index].member;
                  member.banned = !member.banned;
                  this.memberService.updateField({id: member.id, banned: member.banned });
                break;
            }
        }
      });
  }
  public updateRequest(index: number, up = true) {
    const member = this.collaborators[index].member;
    if(up) {
      member.role = 1;
      this.memberService.updateField({id: member.id, role: 1 })
    }
    else {
      this.collaborators.splice(index, 1);
      this.memberService.remove(member.id);
    }
  }
}
