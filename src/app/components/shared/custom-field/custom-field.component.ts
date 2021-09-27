import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CustomizeFieldComponent} from './customize-field/customize-field.component';
import {CustomField} from '../../../models/project/Project';

@Component({
  selector: 'app-custom-field',
  templateUrl: './custom-field.component.html',
  styleUrls: ['./custom-field.component.scss'],
})
export class CustomFieldComponent implements OnInit {
  @Input()itemId: number;
  @Input()projectId: string;
  @Input()path: string;
  @Input()customFields: CustomField[] = [];
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async openCustomizeFieldModal() {
    const modal = await this.modalCtrl.create({
      component: CustomizeFieldComponent,
      componentProps: {
        projectId: this.projectId,
        path: this.path,
        customFields: this.customFields,
        itemId: this.itemId
      },
      cssClass: 'modal-fullscreen'
    });
    await modal.present();
  }
}
