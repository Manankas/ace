import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-skeleton',
  templateUrl: './item-skeleton.component.html',
  styleUrls: ['./item-skeleton.component.scss'],
})
export class ItemSkeletonComponent implements OnInit {
  @Input() iconType: 'square' | 'circle' = 'square';

  @Input() iconSize = '40px';

  constructor() {}

  ngOnInit() {}
}
