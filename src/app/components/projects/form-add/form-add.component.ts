import {Component, Input, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Project} from '../../../models/project/Project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {getPicture} from '../../../utils/utils';

@Component({
  selector: 'app-form-add-project',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss'],
})
export class FormAddComponent implements OnInit {
  @Input()userId: string;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  public srcUpload = '';
  public date = new Date();
  constructor(
    private modalController: ModalController,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const date = new Date();
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', [Validators.required, Validators.maxLength(30)]],
      descriptionCtrl: ['', Validators.maxLength(300)],
    });
    this.secondFormGroup = this._formBuilder.group({
      startAtCtrl: [date.toISOString(), Validators.required],
      endAtCtrl: [date.toISOString(), Validators.required],
      sizeCtrl: [0, Validators.required],
      sizeTypesCtrl: [0, Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      genderCtrl: [0, Validators.required],
    });
  }

  async close() {
    await this.modalController.dismiss({ dismissed: true });
  }
  public async getPicture() {
    this.srcUpload = await getPicture();
  }

  public async submit() {
    const {id, ...project} = new Project();
      project.userId = this.userId;
      project.sizeType = 0;
      project.name = this.firstFormGroup.get('nameCtrl').value;
      project.resume = this.firstFormGroup.get('descriptionCtrl').value;
      project.size = this.secondFormGroup.get('sizeCtrl').value;
      project.startAt = Date.parse(this.secondFormGroup.get('startAtCtrl').value);
      project.endAt = Date.parse(this.secondFormGroup.get('endAtCtrl').value);
      project.gender = this.thirdFormGroup.get('genderCtrl').value;
      project.avatar = this.srcUpload;
    await this.modalController.dismiss({dismissed: true, project});
  }

}
