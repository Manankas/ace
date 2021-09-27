import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-member-role',
  templateUrl: './member-role.component.html',
  styleUrls: ['./member-role.component.scss'],
})
export class MemberRoleComponent implements OnInit{
  public checked: boolean;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<MemberRoleComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { name: string; role: number },
  ) { }

  public cancel() {
    this._bottomSheetRef.dismiss();
  };
  public save() {
    this._bottomSheetRef.dismiss({ checked: this.checked });
  }

  ngOnInit(): void {
    this.checked = this.data.role === 2;
  }
}
