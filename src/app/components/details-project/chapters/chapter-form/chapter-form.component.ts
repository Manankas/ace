import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import {Chapter} from '../../../../models/project/Chapter';

@Component({
  selector: 'app-chapter-add-form',
  templateUrl: './chapter-form.component.html',
  styleUrls: ['./chapter-form.component.scss'],
})
export class ChapterFormComponent implements OnInit {
  chapitreFormGroup: FormGroup;
  public mode = 'update';
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ChapterFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { title: string; chapter: Chapter }
  ) {}

  ngOnInit() {
    if(!this.data.chapter) {
      this.data.chapter = new Chapter();
      this.mode = 'add';
    }
    this.chapitreFormGroup = new FormGroup({
      titleCtrl: new FormControl(this.data.chapter.title, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      numChapitreCtrl: new FormControl(this.data.chapter.num, [
        Validators.required,
        Validators.maxLength(15),
      ]),
      summaryCtrl: new FormControl(this.data.chapter.summary, [Validators.maxLength(8000)]),
    });
  }

  closeBottomSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  public save(){
    this.data.chapter.num = this.chapitreFormGroup.get('numChapitreCtrl').value;
    this.data.chapter.title = this.chapitreFormGroup.get('titleCtrl').value;
    this.data.chapter.summary = this.chapitreFormGroup.get('summaryCtrl').value;
    this._bottomSheetRef.dismiss(this.data.chapter);
  }
  public remove() {
    this.data.chapter.archived = true;
    this.save();
  }
}
