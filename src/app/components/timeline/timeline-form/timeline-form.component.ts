import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
type TimelineData = {
  name: string;
  description?: string;
  mode?: string;
  title: string;
  type?: string;
  activePaste?: boolean;
  isCurrentCopy?: boolean;
}
@Component({
  selector: 'app-timeline-form',
  templateUrl: './timeline-form.component.html',
  styleUrls: ['./timeline-form.component.scss'],
})
export class TimelineFormComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<TimelineFormComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: TimelineData,
  ) { }
  async close() {this._bottomSheetRef.dismiss();}

  async save() {
    const { mode, title, ...data} = this.data;
    this._bottomSheetRef.dismiss({ data, mode });
  }
  async action(mode = 'delete') {this._bottomSheetRef.dismiss({mode});}
}
