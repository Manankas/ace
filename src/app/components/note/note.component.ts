import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AllNoteComponent} from './all-note/all-note.component';
import {Note} from '../../models/project/Note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input()projectId: string;
  @Input()notes: Note[];
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async presentAllNotesModal() {
    const modal = await this.modalController.create({
      component: AllNoteComponent,
      componentProps: { projectId: this.projectId, notes: this.notes },
      cssClass: 'modal-fullscreen'
    });
    return await modal.present();
  }

}
