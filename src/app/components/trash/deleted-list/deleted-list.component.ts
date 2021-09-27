import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-deleted-list',
  templateUrl: './deleted-list.component.html',
  styleUrls: ['./deleted-list.component.scss'],
})
export class DeletedListComponent implements OnInit {
  @Input()projectId: string;
  @Input()data: any[];
  @Input()path: string;
  @Input()title: string;
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private projectService: ProjectService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    if(!this.title) {
      this.title = this.translate.instant('trash.title',
        {entity: this.translate.instant('entities.' + this.path)}
      )
    }
  }

  async close() {
    await this.modalCtrl.dismiss();
  }
  public async alertConfirm(index: number) {
    const selectedItem = this.data[index];
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('trash.restore.header'),
      message: this.translate.instant('trash.restore.message'),
      buttons: [
        {
          text: this.translate.instant('trash.buttons.deleteForever'),
          cssClass: 'secondary',
          handler: async () => {
            /**delete all children**/
            if(selectedItem?.parentId !== undefined) {
              for (const item of this.data) {
                if(item.parentId === selectedItem.id) {
                  await this.projectService.deleteFromMap(this.projectId, this.path + '.' + item.id);
                  this.data.splice(this.data.indexOf(item), 1);
                }
              }
            }
            /**delete itself**/
             this.data.splice(this.data.indexOf(selectedItem), 1);
             this.projectService.deleteFromMap(this.projectId, this.path + '.' + selectedItem.id);
          }
        }, {
          text: this.translate.instant('trash.buttons.restore'),
          handler: async () => {
            Object.assign(selectedItem, { archived: false });
            await this.projectService.updateMap(
              this.projectId, this.path, {id: selectedItem.id, archived: false}
              );
          }
        }
      ]
    });
    await alert.present();
  }
}
