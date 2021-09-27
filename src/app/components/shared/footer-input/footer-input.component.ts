import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-footer-input',
  templateUrl: './footer-input.component.html',
  styleUrls: ['./footer-input.component.scss'],
})
export class FooterInputComponent {
  @Input()placeholder = '';
  @Input()modelValue = '';
  @Output()modelValueChange = new EventEmitter<string>();
  @Output()send = new EventEmitter<string>();
  constructor() { }
}
