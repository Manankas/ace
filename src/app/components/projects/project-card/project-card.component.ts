import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  constructor() {}
  @Input() projectName: string;

  @Input() coverSrc: string;

  @Input() add = false;

  ngOnInit() {}
}
