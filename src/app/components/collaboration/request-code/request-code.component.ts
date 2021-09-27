import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-project-code',
  templateUrl: './request-code.component.html',
  styleUrls: ['./request-code.component.scss'],
})
export class RequestCodeComponent implements OnInit {
  public code = '';
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }
  async dismiss() {
    await this.modalCtrl.dismiss({ dismissed: true, code: this.code });
  }
}
