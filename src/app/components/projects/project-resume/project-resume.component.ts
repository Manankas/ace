import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {Project} from '../../../models/project/Project';
import {ToastService} from '../../../services/toast.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-project-resume',
  templateUrl: './project-resume.component.html',
  styleUrls: ['./project-resume.component.scss'],
})
export class ProjectResumeComponent implements OnInit {
  @Input()project: Project;
  public resume: string;
  constructor(
    private projectService: ProjectService,
    private toast: ToastService,
    private translator: TranslateService
  ) { }

  ngOnInit() { this.resume = this.project.resume; }
  save() {
    this.project.resume = this.resume;
    this.projectService
      .updateField(this.project.id, { resume: this.resume })
      .then(async () => {
        await this.toast.presentToast(this.translator.instant('update.success'));
    })
  }
  cancel() { this.resume = this.project.resume; }
}
