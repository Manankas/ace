import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<MemberComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {
      name: string;
      role: number;
      avatar: string;
      banned: boolean;
      isCurrentUser: boolean;
      isOwner: boolean;
    }
  ) {}

  ngOnInit() {}

  public dismiss(action: string) {
    this._bottomSheetRef.dismiss({ action });
  }
}
