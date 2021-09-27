import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-challenge-submission',
  templateUrl: './challenge-submission.component.html',
  styleUrls: ['./challenge-submission.component.scss'],
})
export class ChallengeSubmissionComponent {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ChallengeSubmissionComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { title: string; finished: boolean },
  ) { }

  public cancel() {
    this._bottomSheetRef.dismiss();
  };
  public save() {
    this._bottomSheetRef.dismiss({ params: this.data });
  }

}
