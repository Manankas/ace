import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-session-finish-form',
  templateUrl: './session-finish-form.component.html',
  styleUrls: ['./session-finish-form.component.scss'],
})
export class SessionFinishFormComponent implements OnInit {
  finishSessionFormGroup: FormGroup;
  constructor(private popover: PopoverController) {}
  @Input() session: any;

  ngOnInit() {
    this.finishSessionFormGroup = new FormGroup({
      nbWordsCtrl: new FormControl(this.session.wordCount, [
        Validators.required,
        Validators.min(1),
        Validators.maxLength(6),
      ]),
    });
  }

  async cancel() {
    await this.popover.dismiss();
  }
  async finish() {
    await this.popover.dismiss({
      wordCount: this.finishSessionFormGroup.get('nbWordsCtrl').value,
    });
  }
}
