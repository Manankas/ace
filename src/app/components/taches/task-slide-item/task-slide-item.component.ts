import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-tache-slide-item',
  templateUrl: './task-slide-item.component.html',
  styleUrls: ['./task-slide-item.component.scss'],
})
export class TaskSlideItemComponent  {
  public images = ['assets/icon/deadline.png','assets/icon/career.png', 'assets/icon/destination.png'];
  constructor() {}

  @Input() label: string;
  @Input()status: number;
  @Input() important = false;

  @Input() labelBtnFirst = 'Label btn first';

  @Input() labelBtnSecond = 'Label btn second';


  @Output() btnClickedFirst: EventEmitter<string> = new EventEmitter<string>();

  @Output() btnClickedSecond: EventEmitter<string> = new EventEmitter<string>();

  @Output() btnClickedDelete: EventEmitter<string> = new EventEmitter<string>();

  @Output() btnClickedEdit: EventEmitter<string> = new EventEmitter<string>();

  public clickButtonFirst(e) {
    this.btnClickedFirst.emit(
      e.target.parentElement.parentElement.parentElement.parentElement
    );
  }

  public clickButtonSecond(e) {
    this.btnClickedSecond.emit(
      e.target.parentElement.parentElement.parentElement.parentElement
    );
  }

  public clickButtonTrash(e){
    this.btnClickedDelete.emit(
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement
    );
  }

  public clickButtonEdit(){
    this.btnClickedEdit.emit();
  }
}
