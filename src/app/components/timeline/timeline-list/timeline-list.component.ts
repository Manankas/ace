import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {TimelineFormComponent} from '../timeline-form/timeline-form.component';
import {Timeline} from '../../../models/project/Timeline';
import {ProjectService} from '../../../services/project.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-timeline-list',
  templateUrl: './timeline-list.component.html',
  styleUrls: ['./timeline-list.component.scss'],
})
export class TimelineListComponent implements OnInit {
  public tI: number;
  private copiedTi = -1;
  private mI = -1;
  private eI = -1;
  private prevCut = '';
  @Input()timelines: Timeline[];
  @Input()projectId: string;
  constructor(
    private modalCtrl: ModalController,
    private _bottomSheet: MatBottomSheet,
    private projectService: ProjectService,
    private translate: TranslateService
  ) { }

  ngOnInit() { this.tI  = this.timelines.length - 1; }
  async closeModal() {
    await this.modalCtrl.dismiss({dismissed: true});
  }
  private updateProjectTimelines(tI = -1) {
    this.projectService.updateMap(
      this.projectId, 'timelines',
      this.timelines[tI > -1 ? tI : this.tI]
    );
  }
  public addTimeline() {
    this._bottomSheet.open(TimelineFormComponent, {
      panelClass: 'bottom-sheet',
      data: { title: this.translate.instant('timelines.create'), name: '', description: ''}
    })
      .afterDismissed()
      .subscribe(async (res) => {
        if(res?.data) {
          const timeline = new Timeline();
          Object.assign(timeline, res.data);
          this.timelines.push(timeline);
          this.tI = this.timelines.length - 1;
          this.updateProjectTimelines();
        }
      })
  }
  public updateTimeline() {
    const timeline = this.timelines[this.tI];
    const activePaste = this.copiedTi > -1 && this.copiedTi !== this.tI && this.mI > -1 && this.eI === - 1;
    const isCurrentCopy = this.copiedTi === this.tI && this.mI > -1;
    this._bottomSheet.open(TimelineFormComponent, {
      panelClass: 'bottom-sheet',
      data: {
        title: this.translate.instant('timelines.update'),
        name: timeline.name,
        description: timeline.description,
        mode: 'update',
        type: 'timeline',
        isCurrentCopy,
        activePaste: !isCurrentCopy && activePaste && this.prevCut === 'moment'/**A moment is copyable into a timeline*/
      }
    }).afterDismissed()
      .subscribe(async (res) => {
        if(res?.mode) {
          switch (res.mode) {
            case 'update':
              Object.assign(timeline, res.data);
              this.updateProjectTimelines();
            break;
            case 'delete':
              Object.assign(timeline, {archived: true});
              this.tI = this.timelines.findIndex(t => t.id !== timeline.id);
              this.updateProjectTimelines();
              break;
            case 'paste':
              if(activePaste) {
                timeline.moments.push(this.timelines[this.copiedTi].moments[this.mI]);
                this.timelines[this.copiedTi].moments.splice(this.mI, 1);
                this.mI = -1;
                this.updateProjectTimelines();
                this.updateProjectTimelines(this.copiedTi);
                this.prevCut = '';
              }
              /**cancel copy*/
              else if(isCurrentCopy) { this.mI = -1; this.prevCut = ''; }
              break;
          }
        }
      })
  }
  public addMoment() {
    this._bottomSheet.open(TimelineFormComponent, {
      panelClass: 'bottom-sheet',
      data: { title: this.translate.instant('timelines.moment.create'), name: ''},
    })
      .afterDismissed()
      .subscribe(async (res) => {
        if(res?.data) {
          this.timelines[this.tI].moments.push({ name: res.data.name, events: [] });
          await this.updateProjectTimelines();
        }
      })
  }
  public updateMoment(index: number) {
    const activePaste = this.tI > -1 && this.eI > -1;
    const isCurrentCopy = this.copiedTi === this.tI && this.mI === index;
    this._bottomSheet.open(TimelineFormComponent, {
      panelClass: 'bottom-sheet',
      data: {
        title: this.translate.instant('timelines.moment.update'),
        name: this.timelines[this.tI].moments[index].name,
        mode: 'update',
        type: 'moment',
        isCurrentCopy,
        activePaste: !isCurrentCopy && activePaste && this.prevCut === 'event'/**An event is copyable into a timeline*/
      },
    })
      .afterDismissed()
      .subscribe(async (res) => {
        if(res?.mode) {
          if(res.mode === 'cut'){
            this.mI = index;
            this.eI = -1;
            this.prevCut = 'moment';
            this.copiedTi = this.tI;
          }
          else {
            switch (res.mode) {
              case 'update':
                Object.assign(this.timelines[this.tI].moments[index], res.data);
                this.updateProjectTimelines();
                break;
              case 'delete':
                this.timelines[this.tI].moments.splice(index, 1);
                this.updateProjectTimelines();
                break;
              case 'paste':
                if(activePaste) {
                  const tIndex = this.copiedTi > -1 ? this.copiedTi : this.tI;
                  this.timelines[this.tI].moments[index].events.push(this.timelines[tIndex].moments[this.mI].events[this.eI]);
                  this.timelines[tIndex].moments[this.mI].events.splice(this.eI, 1);
                  this.updateProjectTimelines();
                  this.updateProjectTimelines(this.copiedTi);
                  this.eI = -1;
                  this.mI = -1;
                  this.prevCut = '';
                }
                break;
            }
          }
        }
      })
  }
  public addEvent(momentIndex: number) {
    this._bottomSheet.open(TimelineFormComponent, {
      panelClass: 'bottom-sheet',
      data: { title: this.translate.instant('timelines.event.create'), name: '', description: ''},
    })
      .afterDismissed()
      .subscribe(async (res) => {
        if(res?.data) {
          this.timelines[this.tI].moments[momentIndex].events.push(res.data);
          this.updateProjectTimelines();
        }
      })
  }
  public updateEvent(mI: number, eI: number) {
    const event = this.timelines[this.tI].moments[mI].events[eI];
    this._bottomSheet.open(TimelineFormComponent, {
      panelClass: 'bottom-sheet',
      data: {
        title: this.translate.instant('timelines.event.update'),
        description: event.description,
        name: event.name,
        mode: 'update',
        type: 'event',
        isCurrentCopy: this.copiedTi === this.tI && this.mI === mI && this.eI === eI
      },
    })
      .afterDismissed()
      .subscribe(async (res) => {
        if(res?.mode) {
          if(res.mode === 'cut') {
            this.mI = mI;
            this.eI = eI;
            this.prevCut = 'event';
            this.copiedTi = this.tI;
          }
          else {
            if(res.mode === 'update')Object.assign(event, res.data);
            else this.timelines[this.tI].moments[mI].events.splice(eI, 1);
            this.updateProjectTimelines();
          }
        }
      })
  }
}
