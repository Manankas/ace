import {Component, OnInit} from '@angular/core';
import {Species} from '../../../models/project/Species';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-species-form',
  templateUrl: './species-form.component.html',
  styleUrls: ['./species-form.component.scss'],
})
export class SpeciesFormComponent implements OnInit {
  public formGroup: FormGroup;
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
  public async close() {
    await this.modalCtrl.dismiss();
  }
  public async save() {
    const species = new Species();
    species.general.name =  this.formGroup.get('nameCtrl').value;
    species.general.description = this.formGroup.get('descriptionCtrl').value;
    await this.modalCtrl.dismiss({
      dismissed: true,
      species
    });
  }
}
