import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../../../models/project/Note';
import {AlertController, ModalController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent implements OnInit {
  @Input()note: Note;
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) { }

  ngOnInit() {

  }

  public async close() {
    await this.modalCtrl.dismiss();
  }
  public async dismiss() {
    await this.modalCtrl.dismiss({
      note: this.note
    });
  }
  public async deleteConfirm() {
    const alert = await this.alertCtrl.create({
      subHeader: this.translate.instant('trash.delete.header'),
      message: this.translate.instant('trash.delete.message'),
      buttons: [
        {
          text: this.translate.instant('trash.buttons.keep'),
          role: 'cancel'
        },
        {
          text: this.translate.instant('trash.buttons.softDelete'),
          handler: async () => {
            Object.assign(this.note, { archived: true });
            await this.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }
}
