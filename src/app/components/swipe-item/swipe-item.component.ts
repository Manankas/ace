import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-swipe-item',
  templateUrl: './swipe-item.component.html',
  styleUrls: ['./swipe-item.component.scss'],
})
export class SwipeItemComponent implements OnInit {
  @ViewChild('ionItemSliding') ionItemSliding: IonItemSliding;
  @Input() label = '';

  @Input() color = 'primary';

  @Input() disabled = false;

  @Output() clickEdit: EventEmitter<string> = new EventEmitter<string>();

  @Output() clickFinish: EventEmitter<string> = new EventEmitter<string>();

  @Output() clickDelete: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public clickButtonEdit() {
    this.ionItemSliding.close();
    this.clickEdit.emit();
  }

  public clickButtonFinish() {
    this.ionItemSliding.close();
    this.clickFinish.emit();
  }

  public clickDeleteButton() {
    this.ionItemSliding.close();
    this.clickDelete.emit();
  }
}
