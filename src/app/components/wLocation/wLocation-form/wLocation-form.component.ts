import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WLocation} from '../../../models/project/WLocation';
import {LoadingService} from '../../../services/loading.service';
import {ToastService} from '../../../services/toast.service';
import {ProjectService} from '../../../services/project.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-wlocation-form',
  templateUrl: './wLocation-form.component.html',
  styleUrls: ['./wLocation-form.component.scss'],
})
export class WLocationFormComponent implements OnInit {
  @Input()parentId = 0;
  @Input()projectId: string;
  public formGroup: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private loadingService: LoadingService,
    private $toast: ToastService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      nameCtrl: ['', [Validators.required, Validators.maxLength(30)]],
      descriptionCtrl: ['', [Validators.maxLength(300)]],
    });
  }
  async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }
  async save() {
    await this.loadingService.start(this.translate.instant('wLocation.add.loading'));
    const wLocation = new WLocation();
    wLocation.general.name = this.formGroup.get('nameCtrl').value;
    wLocation.general.description = this.formGroup.get('descriptionCtrl').value;
    wLocation.parentId = this.parentId;
    this.projectService
      .updateMap(this.projectId, 'wLocations', wLocation)
      .then(async () => {
        await this.modalCtrl.dismiss({ dismissed: true, wLocation });
      }).catch(async () => {
      await this.$toast.presentToast(this.translate.instant('wLocation.add.failure'), 'warning');
    })
      .finally(async () => { await this.loadingService.stop();});
  }
}
