import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Component, EventEmitter, Input, NgZone, Output, ViewChild} from '@angular/core';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-autogrow-textarea',
  templateUrl: './autogrow-textarea.component.html',
  styleUrls: ['./autogrow-textarea.component.scss'],
})
export class AutogrowTextareaComponent {
  @Input()label = '';
  @Input()modelValue = '';
  @Output()modelValueChange = new EventEmitter<string>();
  constructor(private _ngZone: NgZone) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
