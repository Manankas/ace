import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../../../models/project/Character';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {
  @Input()characters: Character[];
  public selected: string[] = [];
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async select() {
    await this.modalCtrl.dismiss({ selected: this.selected});
  }
  async close() {
    await this.modalCtrl.dismiss({ selected: [] });
  }
}
