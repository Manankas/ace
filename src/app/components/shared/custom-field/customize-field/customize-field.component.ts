import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CustomField} from '../../../../models/project/Project';
import {ProjectService} from '../../../../services/project.service';

@Component({
  selector: 'app-customize-field',
  templateUrl: './customize-field.component.html',
  styleUrls: ['./customize-field.component.scss'],
})
export class CustomizeFieldComponent{
  @Input()projectId: string;
  @Input()path: string;
  @Input()itemId: number;
  @Input()customFields: Array<CustomField>;
  constructor(
    private modalCtrl: ModalController,
    private projectService: ProjectService
  ) { }

  async close() {
    this.projectService.updateMap(this.projectId, this.path, {
      id: this.itemId,
      customFields: this.customFields
    })
    await this.modalCtrl.dismiss({dismissed: true});
  }
  public addField() {
    this.customFields.push({name: '', value: ''});
  }
  public removeField(index: number) {
    this.customFields.splice(index, 1);
  }
}
