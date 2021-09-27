import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Clipboard } from '@capacitor/clipboard';
import { Collaboration } from '../../../../models/chat/Collaboration';
import { CollaborationService } from '../../../../services/collaboration.service';
import { IndexeddbService } from '../../../../services/indexeddb.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-collaboration-activation',
  templateUrl: './collaboration-activation.component.html',
  styleUrls: ['./collaboration-activation.component.scss'],
})
export class CollaborationActivationComponent implements OnInit {
  @Input() projectId: string;
  public active: boolean;
  private collaboration: Collaboration;

  constructor(
    private router: Router,
    private collaborationService: CollaborationService,
    private indexDbService: IndexeddbService,
    private toast: ToastService,
    private translate: TranslateService,
  ) {}

  async ngOnInit() {
    this.collaboration = await this.collaborationService.add(
      {
        id: this.projectId,
        active: false,
        createdAt: Date.now(),
      },
      {
        userId: (await this.indexDbService.get('user')).id,
        banned: false,
        role: 3,
        active: true,
        createdAt: Date.now(),
      }
    );
    this.active = this.collaboration.active;
  }
  public async updateCollaboration() {
    await this.collaborationService.update(this.collaboration.id, this.active);
  }

  public async copyCode() {
    Clipboard.write({ string: this.projectId }).then(() => {
      this.toast.presentToast(this.translate.instant('collaboration.activation.copied'));
    });
  }
}
