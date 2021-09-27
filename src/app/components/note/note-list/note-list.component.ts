import { NoteAddFormComponent } from '../note-add-form/note-add-form.component';
import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ModalController } from '@ionic/angular';
import {NoteDetailsComponent} from '../note-details/note-details.component';
import {Note} from '../../../models/project/Note';
import {WysiwygComponent} from '../../shared/wysiwyg/wysiwyg.component';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  @Input()notes: Note[];
  @Input()selectedNote: Note;
  @Input()projectId: string;
  public isFolder = true;
  public parentId = 0;
  constructor(
    private modalController: ModalController,
    private _bottomSheet: MatBottomSheet,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    if(this.selectedNote) {
      this.isFolder = this.selectedNote?.content === undefined;
      this.parentId = this.selectedNote.id;
    }
  }

  async dismiss() {
    await this.modalController.dismiss({ dismissed: true });
  }

  public openBottomSheet(): void {
    this._bottomSheet.open(NoteAddFormComponent, {
      panelClass: 'bottom-sheet',
    });
    this._bottomSheet
      ._openedBottomSheetRef
      .afterDismissed()
      .subscribe((res) => {
        if(res?.note) {
          const { content ,...note } = new Note();
          note.parentId = this.parentId;
          note.name = res.note.name;
          if(!res.note.isFolder) Object.assign<Note, { content: string }>(note, { content });
          this.notes.unshift(note);
          this.projectService.updateMap(this.projectId, 'notes', note);
          }
      })
  }

  public async openEditor() {
    const modal = await this.modalController.create({
      component: WysiwygComponent,
      componentProps: { content: this.selectedNote.content }
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if(data?.content) {
        this.selectedNote.content = data.content;
        this.projectService.updateMap(this.projectId, 'notes', this.selectedNote);
      }
    })
    await modal.present();
  }

  async showNoteDetails(i: number) {
    const modal = await this.modalController.create({
      component: NoteDetailsComponent,
      componentProps: {
        notes: this.notes,
        selectedNote: this.notes[i],
        projectId: this.projectId
      }
    });
    await modal.present();
  }
}
