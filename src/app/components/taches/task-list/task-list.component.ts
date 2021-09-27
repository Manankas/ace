import {
  Component,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

import {
  ModalController,
  Platform,
} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { Task } from '../../../models/project/Task';
import { ToastService } from '../../../services/toast.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-taches',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() projectId: string;
  @Input()tasks: Task[];

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private projectService: ProjectService,
    private toast: ToastService,
    private translate: TranslateService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: TaskFormComponent,
      cssClass: 'bg-dark-transparent',
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data?.task) {
        this.tasks.unshift(data.task);
        this.projectService.updateMap(this.projectId, 'tasks', data.task)
          .then(() => {
          this.toast.presentToast(this.translate.instant('add.success'));
        });
      }
    });
    await modal.present();
  }

  public dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  public removeTask(id: number){
    setTimeout(() => {
     this.tasks.splice(this.tasks.findIndex(t => t.id === id), 1);
     this.tasks[0].id = id;/**recupération id*/
    }, 1000);
  }

  public onChangeStatusBtn(element: any, newStatus: number, it: number) {
    this.renderer.removeClass(element.parentElement, 'add-item');
    this.renderer.addClass(element.parentElement, 'remove-item');

    // Update status
    const newTask = new Task();
    newTask.status = newStatus;
    const {id, status, ...res} = this.tasks[it];
    Object.assign(newTask, res);
    //this.tasks[it].status = newStatus
    this.tasks.unshift(newTask)
    setTimeout(() => {
      this.tasks.splice(this.tasks.findIndex(t => t.id === id), 1);
      this.tasks[0].id = id;/**recupération id*/
    }, 1000);

    this.projectService.updateMap(
      this.projectId, 'tasks',
      {id, status: newStatus, updatedAt: Date.now()
      }).then(() => this.toast.presentToast(this.translate.instant('update.success')));
  }

  public onDeleteItem(element: any, it: number){
    this.renderer.removeClass(element.parentElement, 'add-item');
    this.renderer.addClass(element.parentElement, 'remove-item');
    this.projectService.updateMap(
      this.projectId, 'tasks',
    {id: this.tasks[it].id, archived: true, updatedAt: Date.now() }
    ).then(this.translate.instant('delete.success'));
    setTimeout(() => { this.tasks[it].archived = true;}, 1000);
  }
  public async updateTaskModal(iT: number) {
    const modal = await this.modalController.create({
      component: TaskFormComponent,
      componentProps: {task: {...this.tasks[iT]}},
      cssClass: 'bg-dark-transparent',
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data?.task) {
        Object.assign<Task, Task>(this.tasks[iT], data.task);
        this.projectService.updateMap(this.projectId, 'tasks', data.task)
          .then(() => {
            this.toast.presentToast(this.translate.instant('update.success'));
        });
      }
    });
    await modal.present();
  }
}
