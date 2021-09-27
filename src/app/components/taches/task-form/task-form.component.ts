import {Component, Input, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Task} from '../../../models/project/Task';

@Component({
  selector: 'app-taches-form-add',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  @Input()task: Task;
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if(!this.task)this.task = new Task();
  }
  public setTaskMark() {
    this.task.marked = !this.task.marked;
  }
  public async close() {
    await this.modalController.dismiss();
  }
  public async dismiss() {
    await this.modalController.dismiss({task: this.task});
  }
}
