import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Challenge} from '../../../models/challenge/Challenge';

@Component({
  selector: 'app-challenge-info',
  templateUrl: './challenge-info.component.html',
  styleUrls: ['./challenge-info.component.scss'],
})
export class ChallengeInfoComponent {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ChallengeInfoComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { challenge: Challenge },
  ) { }

  public close() {
    this._bottomSheetRef.dismiss();
  };

}
