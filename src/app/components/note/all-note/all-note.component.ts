import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../../../models/project/Note';
import {ModalController} from '@ionic/angular';
import {SharedTreeComponent} from '../../shared/shared-tree/shared-tree.component';
import {NoteDetailsComponent} from '../note-details/note-details.component';

@Component({
  selector: 'app-all-note',
  templateUrl: './all-note.component.html',
  styleUrls: ['./all-note.component.scss'],
})
export class AllNoteComponent implements OnInit {
  @Input()projectId: string;
  @Input()notes: Note[];
  constructor(
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {

  }
 async close() {
    await this.modalCtrl.dismiss();
 }
 public async openNoteTreeModal() {
    const modal = await this.modalCtrl.create({
      component: SharedTreeComponent,
      componentProps: { data: this.notes },
      cssClass: 'modal-fullscreen'
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if(data?.node && data.node.id !== 0) {
        const noteModal = await this.modalCtrl.create({
          component: NoteDetailsComponent,
          componentProps: {
            notes: this.notes,
            selectedNote: this.notes.find(l => l.id === data.node.id)
          }
        });
        await noteModal.present();
      }
    })
    await modal.present();
 }
}
