import {AlertController} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  constructor(private alertController: AlertController) {}

  async present(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
