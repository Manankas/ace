import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Project} from '../../../models/project/Project';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
  @Input()project: Project;
  public date = new Date();
  public formGroup: FormGroup

  constructor(
    private modalCtrl: ModalController,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      nameCtrl: [this.project.name, [Validators.required, Validators.maxLength(30)]],
      descriptionCtrl: [this.project.resume, [Validators.required]],
      startAtCtrl: [(new Date(this.project.startAt)).toISOString(), [Validators.required]],
      endAtCtrl: [(new Date(this.project.endAt)).toISOString(), [Validators.required]],
      genderCtrl: [this.project.gender, [Validators.required]],
      sizeCtrl: [this.project.size, [Validators.required]],
      sizeTypeCtrl: [this.project.sizeType, [Validators.required]],
    });
  }
  async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }
  async update() {
    await this.modalCtrl.dismiss({ updatedProject: {
        name: this.formGroup.get('nameCtrl').value,
        description: this.formGroup.get('descriptionCtrl').value,
        startAt: this.formGroup.get('startAtCtrl').value,
        endAt: this.formGroup.get('endAtCtrl').value,
        gender: this.formGroup.get('genderCtrl').value,
        size: this.formGroup.get('sizeCtrl').value,
        sizeType: this.formGroup.get('sizeTypeCtrl').value,
      }
    });
  }
}
