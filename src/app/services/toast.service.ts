import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  public async presentToast(text: string, color = 'primary') {
    const toast = await this.toastController.create({
      message: text,
      color,
      position: 'bottom',
      duration: 2000,
    });

    await toast.present();
  }
}
