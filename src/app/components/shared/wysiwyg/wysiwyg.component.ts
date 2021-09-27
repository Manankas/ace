import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl } from '@angular/forms';

//import wordscount from 'count-words-occurance';

import { ModalController } from '@ionic/angular';

export type EditorData = {
  content: string;
  count: number;
}
@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss'],
})
export class WysiwygComponent implements OnInit {
  @Input() title = 'Editeur de texte';
  @Input() subtitle: string;
  @Input() content = '';
  @Input() dismissOnSave = true;

  contentCtrl: FormControl;

  public moduleOptions = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
    counter: {
      container: '#counter',
      unit: 'word',
    },
  };

  @Output() showInfo: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  private save: EventEmitter<EditorData> = new EventEmitter<EditorData>();

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.contentCtrl = new FormControl();
  }
  public async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

  /*public onContentChanged(e) {
    this.contentChanged.emit(e);
    this.editorModel.counts = wordscount(e.text, true);
  }*/

  public async onContentSaved() {
    const data: EditorData = {
      content: this.contentCtrl.value,
      count: Number(document.getElementById('counter').innerText.match(/\d+/g))
    }
    if(this.dismissOnSave) {
      await this.modalCtrl.dismiss({
        dismissed: true,
        ...data
      })
    }
    else { this.save.emit(data);}
  }
}
