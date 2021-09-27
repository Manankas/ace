import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../../../models/project/Note';
import {ModalController} from '@ionic/angular';
import {cloneDeep} from 'lodash';
import {EditNoteComponent} from '../edit-note/edit-note.component';
import {LoadingService} from '../../../services/loading.service';
import {SharedTreeComponent} from '../../shared/shared-tree/shared-tree.component';
import {TranslateService} from '@ngx-translate/core';
import {AlertService} from '../../../services/alert.service';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  @Input()notes: Note[];
  @Input()selectedNote: Note;
  @Input() projectId: string;
  constructor(
    private modalCtrl: ModalController,
    private projectService: ProjectService,
    private loading: LoadingService,
    private translate: TranslateService,
    private alert: AlertService
  ) { }

  ngOnInit() {}
  async close() {
    await this.modalCtrl.dismiss();
  }
  public async openNoteEditionModal() {
    const modal = await this.modalCtrl.create({
      component: EditNoteComponent,
      componentProps: {note: cloneDeep(this.selectedNote)},
      cssClass: 'modal-fullscreen'
    });
    modal.onDidDismiss().then(async ({ data }) => {
      if(data?.note) {
        Object.assign<Note, Note>(this.selectedNote, data.note);
        await this.loading.start(this.translate.instant('note.updateLoading'));
        this.projectService.updateMap(this.projectId, 'notes', data.note)
          .then(async () => {
          if(this.selectedNote.archived)
            await this.close();
        });
        await this.loading.stop();
      }
    })
    await modal.present();
  }
  async openTreeModal() {
    const modal = await this.modalCtrl.create({
      component: SharedTreeComponent,
      componentProps: {
        data: this.notes.filter(n => n?.content === undefined),
        title: this.translate.instant('moveTo.title')
      },
      cssClass: 'modal-fullscreen'
    });
    modal.onDidDismiss().then(async ({data}) =>{
      if(data?.node) {
        if(this.selectedNote.id !== data.node.id) {
          this.selectedNote.parentId = data.node.id;
          this.projectService.updateMap(this.projectId, 'notes', this.selectedNote).
          then(async () => {
            await this.alert.present(this.selectedNote.name + ' -> ' + data.node.name);
          });
        } else {
          await this.alert.present(this.translate.instant('moveTo.errorMessage'));
        }
      }
    })
    await modal.present();
  }
}
