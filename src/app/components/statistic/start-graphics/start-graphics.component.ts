import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import * as moment from 'moment';
import { Color, Label } from 'ng2-charts';
import { ModalController } from '@ionic/angular';
import { Chapter } from '../../../models/project/Chapter';
import { Project } from '../../../models/project/Project';
import { Session } from '../../../models/project/Session';
import { toDate } from '../../../utils/date';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-start-graphics',
  templateUrl: './start-graphics.component.html',
  styleUrls: ['./start-graphics.component.scss'],
})
export class StartGraphicsComponent implements OnInit {
  @Input() project: Project;
  public toDate = toDate;
  public sessions: Session[] = [];
  public chapters: Chapter[] = [];

  public chartType: ChartType = 'line';
  public chartPlugins = [];
  public chartLegend = false;
  public chartOptions = {
    responsive: true,
    title: {
      text: '',
      display: true,
    },
  };
  public chartLabels: Label[] = [];
  public chartData: ChartDataSets[] = [{ data: [] }];

  public countFinished = 0;
  public businessDays = 0;
  public bestSeance = { day: '', wordCount: 0 };
  public estimatedDuration = 0;
  public today = Date.now();

  public lineChart: Color[] = [
    {
      backgroundColor: '#ffc40959',
      borderColor: '#9b714d',
      pointBackgroundColor: '#9b714d',
      pointBorderColor: '#9b714d',
      pointHoverBackgroundColor: '#9b714d',
      pointHoverBorderColor: '#9b714d',
    },
  ];

  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService,
  ) {

  }

  async ngOnInit() {
    this.chartOptions.title = this.translate.instant('statistic.progress');
    this.chapters = this.project.chapters as Array<Chapter>;
    this.sessions = this.chapters.reduce(
      (cum: Session[], curr) => cum.concat(curr.sessions),
      []
    );
    /**sort in descending order*/
    this.sessions.sort((a, b) => b.id - a.id);
    if (this.sessions.length) this.buildChartData();
    this.countFinished = this.chapters.reduce(
      (sum, chap) => (sum += chap.wordCount),
      0
    );
    this.estimatedDuration = this.diffDates(
      this.project.endAt,
      this.project.startAt
    );
  }

  private month(date: number) {
    return moment(date).format('YYYY-MM');
  }
  private day(date: number): string {
    return moment(date).format('DD');
  }
  private prefix0(i: number): string {
    return i < 10 ? '0' + i : i + '';
  }
  private diffDates(end: number, start: number) {
    return moment(end).diff(start, 'days') + 1;
  }
  public calcMean(effectif: number, total: number) {
    if (!(effectif && total)) return 0;
    return Math.ceil(effectif / total);
  }
  private buildChartData() {
    const lastMonth = this.month(this.sessions[0].id);
    this.businessDays = this.diffDates(
      this.sessions[0].id,
      this.sessions[this.sessions.length - 1].id
    );
    /***labels are the days of latest date, index 0*/
    this.chartLabels = Array.from(
      Array(moment(this.sessions[0].id).daysInMonth()),
      (_, i) => this.prefix0(i + 1)
    );
    const latestSeances: Session[] = []; /**sessions of latest date*/
    let previousMonthsWordCount = 0; /**total of all previous sessions wordCount **/

    this.sessions.forEach((session) => {
      if (this.month(session.id) !== lastMonth)
        previousMonthsWordCount += session.wordCount;
      else latestSeances.push(session);
      if (session.wordCount > this.bestSeance.wordCount) {
        this.bestSeance.wordCount = session.wordCount;
        this.bestSeance.day = toDate(session.id);
      }
    });
    /**Loop labels to get corresponding wordCount**/
    this.bestSeance.wordCount = 0;
    this.chartLabels.forEach((day, index) => {
      let cumSum = 0;
      latestSeances.forEach((session, iS) => {
        if (this.day(session.id) === day) cumSum += session.wordCount;
        if (index === 0) {
          /**execute once time only*/
          if (this.bestSeance.day === toDate(session.id))
            this.bestSeance.wordCount += session.wordCount;
        }
      });
      /**ascending cum sum**/
      cumSum +=
        index > 0
          ? Number(this.chartData[0].data[index - 1])
          : previousMonthsWordCount;
      this.chartData[0].data.push(cumSum);
    });
  }

  public async close() {
    await this.modalCtrl.dismiss();
  }
  public sliderLabel = () =>
    ((this.countFinished * 100) / this.project.size).toFixed(2) + '%';
}
