import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-note-add-form',
  templateUrl: './note-add-form.component.html',
  styleUrls: ['./note-add-form.component.scss'],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
})
export class NoteAddFormComponent implements OnInit {
  noteFormGroup: FormGroup;

  constructor(private _bottomSheet: MatBottomSheet) {}

  ngOnInit() {
    this.noteFormGroup = new FormGroup({
      labelCtrl: new FormControl('', [Validators.required, Validators.max(30)]),
      selectCtrl: new FormControl(false, [Validators.required]),
    });
  }
  async dismiss() {
    await this._bottomSheet.dismiss({
      note: {
        name: this.noteFormGroup.get('labelCtrl').value,
        isFolder: this.noteFormGroup.get('selectCtrl').value,
      }
    })
  }
}
