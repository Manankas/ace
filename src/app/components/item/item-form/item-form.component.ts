import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Item} from '../../../models/project/Item';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  public formGroup: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      nameCtrl: ['', [Validators.required, Validators.maxLength(60)]],
      descriptionCtrl: ['', [Validators.maxLength(300)]],
    });
  }

  async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

  public async save() {
    const item: Item = new Item();
    item.general.name =  this.formGroup.get('nameCtrl').value;
    item.general.description =  this.formGroup.get('descriptionCtrl').value;
    await this.modalCtrl.dismiss({
      dismissed: true,
      item
    });
  }
}
