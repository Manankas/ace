import {Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';
import {Group} from '../../../models/project/Group';
import {ProjectService} from '../../../services/project.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-group-add-form',
  templateUrl: './group-add-form.component.html',
  styleUrls: ['./group-add-form.component.scss'],
})
export class GroupAddFormComponent implements OnInit {
  @Input()projectId: string;
  @Input()parentId = 0;
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
        Validators.maxLength(70),
      ]),
      descriptionCtrl: new FormControl('', [Validators.maxLength(800)]),
    });
  }

  async close() {
    await this.modalController.dismiss({ dismissed: true });
  }
  async save() {
    await this.loading.start(this.translate.instant('group.add.loading'));
    const group = new Group();
    group.general.name = this.addFormGroup.get('nameCtrl').value;
    group.general.description = this.addFormGroup.get('descriptionCtrl').value;
    group.parentId = this.parentId;
    this.projectService
      .updateMap(this.projectId, 'groups', group)
      .then(async () => {
        await this.toast.presentToast(this.translate.instant('group.add.success'));
        await this.modalController.dismiss({ dismissed: true, group });
      })
      .catch(async (e) => {
        await this.toast.presentToast(this.translate.instant('group.add.failure'), 'warning');
      })
    await this.loading.stop();
  }
}
