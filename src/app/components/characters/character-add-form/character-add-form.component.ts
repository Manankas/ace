import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Character } from '../../../models/project/Character';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';
import {ProjectService} from '../../../services/project.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-character-add-form',
  templateUrl: './character-add-form.component.html',
  styleUrls: ['./character-add-form.component.scss'],
})
export class CharacterAddFormComponent implements OnInit {
  @Input() projectId: string;
  public addFormGroup: FormGroup;
  public date: Date;
  constructor(
    private modalController: ModalController,
    private projectService: ProjectService,
    private toast: ToastService,
    private loading: LoadingService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.date = new Date();

    this.addFormGroup = new FormGroup({
      nameCtrl: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
      ]),
      descriptionCtrl: new FormControl('', [Validators.maxLength(800)]),
    });
  }

  async close() {
    await this.modalController.dismiss({ dismissed: true });
  }
  async save() {
    await this.loading.start(this.translate.instant('character.addForm.loading'));
    const character = new Character();
    character.general.name = this.addFormGroup.get('nameCtrl').value;
    character.general.description = this.addFormGroup.get('descriptionCtrl').value;
    this.projectService
      .updateMap(this.projectId, 'characters', character)
      .then(async () => {
        await this.toast.presentToast(this.translate.instant('character.addForm.success'));
        await this.modalController.dismiss({ dismissed: true, character });
      })
      .catch(async () => {
        await this.toast.presentToast(
          this.translate.instant('character.addForm.failed'),
          'warning'
        );
      })
      .finally(async () => {
        await this.loading.stop();
      });
  }
}
