import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: HTMLIonLoadingElement;

  constructor(public loadingController: LoadingController) {}

  async start(message = 'Chargement ...') {
    this.loading = await this.loadingController.create({ message });
    await this.loading.present();
  }

  async stop() {
    await this.loading.dismiss();
  }

  public preloadImage(url) {
    const img = new Image();
    img.src = url;
    return img;
  }
}
