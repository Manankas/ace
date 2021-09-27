import {Component, Input, OnInit} from '@angular/core';
import {CustomField} from '../../../../models/project/Project';

@Component({
  selector: 'app-custom-field-list',
  templateUrl: './custom-field-list.component.html',
  styleUrls: ['./custom-field-list.component.scss'],
})
export class CustomFieldListComponent implements OnInit {
  @Input()customFields: CustomField[]
  constructor() { }

  ngOnInit() {}

}
