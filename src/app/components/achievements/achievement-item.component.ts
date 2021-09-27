import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-achievement-item',
  templateUrl: './achievement-item.component.html',
  styleUrls: ['./achievement-item.component.scss'],
})
export class AchievementItemComponent implements OnInit {
  @Input() active = false;

  @Output() showItem: EventEmitter<any> = new EventEmitter<any>();

  @Input() tooltipMsg = 'Tooltip';

  public tooltipEvent: 'click' | 'press' = 'click';
  public showArrow = true;
  public duration = 6000;

  constructor() {}

  ngOnInit() {}

  onShowItem() {
    this.showItem.emit();
  }
}
