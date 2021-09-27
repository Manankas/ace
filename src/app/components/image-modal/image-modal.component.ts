import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {UploadService} from '../../services/upload.service';
import {IndexeddbService} from '../../services/indexeddb.service';
import {LoadingService} from '../../services/loading.service';
import {TranslateService} from '@ngx-translate/core';

export type Image = {
  name: string;
  url: string;
}

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit {
  private userId: string;
  private image: Image = { name: '', url: '' };
  public images: Image[];
  constructor(
    private modalCtrl: ModalController,
    private uploadService: UploadService,
    private indexDbService: IndexeddbService,
    private loading: LoadingService,
    private translate: TranslateService,
  ) {}

  async ngOnInit() {
    this.userId = (await this.indexDbService.get('user')).id;
    this.images = await this.uploadService.getAllImages(this.userId);
  }
  async close() {
    await this.modalCtrl.dismiss({ dismissed: true, image: this.image });
  }
  public async selectFromGallery(image: Image) {
    this.image = image;
    await this.close();
  }
  public async upload(base64: string) {
    await this.loading.start(this.translate.instant('imageModal.loading'));
    this.image.name = Date.now().toString();
    this.uploadService
      .uploadFile(this.userId, this.image.name , base64)
      .then((url) => {
        this.image.url = url;
        this.images.unshift(this.image);
      }).finally(async () => {
        await this.loading.stop();
    })
  };
}
