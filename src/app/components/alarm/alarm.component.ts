import { Component, Input, OnInit, ViewChild } from '@angular/core';

import * as moment from 'moment';
import { AlarmService } from 'src/app/services/alarm.service';

import {
  AlertController,
  IonDatetime,
  ModalController,
  ToastController,
} from '@ionic/angular';

import { Alarm } from '../../models/Alarm';
import {
  LocalNotifications,
  LocalNotificationSchema,
  PendingLocalNotificationSchema,
  Schedule,
} from '../../utils/local-notifications';
import {TranslateService} from '@ngx-translate/core';
import {IndexeddbService} from '../../services/indexeddb.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss'],
})
export class AlarmComponent implements OnInit {
  @ViewChild(IonDatetime) picker: IonDatetime;
  @Input() alarms: Alarm[];
  @Input() userId = '';
  @Input() start: moment.Moment;
  private appOpened = true;
  public currentDate = new Date().toISOString();
  private selectedAlarmIndex = -1;
  private changeTime = -1;

  constructor(
    private alertCtrl: AlertController,
    private toast: ToastController,
    private indexDbService: IndexeddbService,
    private modalCtrl: ModalController,
    private alarmService: AlarmService,
    private translate: TranslateService,
  ) {}

  notifications: PendingLocalNotificationSchema[];

  async ngOnInit() {
    const chanel = await LocalNotifications.listChannels();
    const vibratationChanel = chanel.channels.findIndex(
      (c) => c.id === 'default'
    );
    if (!vibratationChanel) {
      const newChanel = { ...chanel.channels[0] };
      newChanel.id = 'vibrate';
      newChanel.description = 'Vibrate';
      newChanel.name = 'Vibrate';
      newChanel.vibration = true;
      await LocalNotifications.createChannel(newChanel);
    }

    await LocalNotifications.addListener(
      'localNotificationReceived',
      (notif) => {
        if (notif.schedule.at) {
          this.alarms[this.alarmIndex(notif.extra?.alarmId)].active = false;
          this.saveAlarm();
        }
      }
    );
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.appOpened = false;
    }, 400);
  }

  public async close() {
    await this.modalCtrl.dismiss({ dismissed: true });
  }

  async showListChannels() {
    this.notifications = (await LocalNotifications.getPending()).notifications;
  }

  private async getPendingByAlarm(alarmId) {
    return (await LocalNotifications.getPending()).notifications.filter(
      (n) => n.extra?.alarmId === alarmId
    );
  }

  public async openPickerForUpdate(iAlarm: number) {
    this.selectedAlarmIndex = iAlarm;
    this.changeTime = 0; /**Before picker detect change,
     it will keep update operation later since,
     since after opened changeTime+=1 => 1, after click on ok => 2 **/
    this.picker.value =
      moment(this.picker.value).format('YYYY-MM-DD') +
      ' ' +
      this.alarms[this.alarmIndex(iAlarm)].hour;
    this.picker.open();
  }

  public openForAdd() {
    this.reset();
    this.picker.open();
  }

  public reset() {
    this.selectedAlarmIndex = -1;
    this.changeTime = -1;
  }

  private saveAlarm() {
    this.indexDbService.set('alarms', this.alarms);
    this.alarmService.set(this.alarms, this.userId, this.alarms.length === 0);
  }

  public async removeAlarm(index: number) {
    this.alarms.splice(index, 1);
    this.saveAlarm();
    await this.cancelAlarm(index);
  }

  public async onChangeTime() {
    this.changeTime += 1;

    switch (this.changeTime) {
      case 0:
        this.addAlarm();
        break;
      case 2:
        const newHour = this.getHour();
        const exist = this.hourExist(newHour);
        if (!exist) {
          this.alarms[this.selectedAlarmIndex].hour = newHour;

          if (!this.appOpened)
            await this.alarmChange(
              this.alarms[this.selectedAlarmIndex].id
            ); /**alarm time modified*/
        } else {
          if (
            this.alarms.findIndex((r) => r.hour === newHour) !==
            this.selectedAlarmIndex
          )
            this.alertCtrl
              .create({
                buttons: ['ok'],
                message: this.translate.instant('alarm.same'),
              })
              .then((alert) => alert.present());
        }
        this.reset(); /*always reset after update**/
        break;
    }

    this.saveAlarm();
  }

  /**Cancel alarms**/
  private async cancelAlarm(iAlrm: number) {
    const pending = await this.getPendingByAlarm(iAlrm);

    return new Promise((resolve) => {
      pending.forEach((p, i) => {
        LocalNotifications.cancel({ notifications: [{ id: p.id }] });
        if (i + 1 === pending.length) resolve(true);
      });
    });
  }
  /***Events*/
  public async onClickActivate(iAlarm: number) {
    if (this.alarms[this.alarmIndex(iAlarm)].active && !this.appOpened) {
      await this.enableAlarm(iAlarm);
      await this.enableAlarm(iAlarm, true);
    } else this.disableAlarm(iAlarm);
    this.saveAlarm();
  }

  public async onClickDay(iAlarm: number, dayIndex: number) {
    this.alarms[this.alarmIndex(iAlarm)].days[dayIndex] =
      !this.alarms[this.alarmIndex(iAlarm)].days[dayIndex];
    await this.alarmChange(iAlarm);
    this.saveAlarm();
  }

  public async onClickRepeat(iAlarm: number) {
    if (!this.appOpened) await this.alarmChange(iAlarm);
    this.saveAlarm();
  }

  private getHour() {
    return moment(this.picker.value).format('HH:mm');
  }

  private hourExist(hour: string) {
    return this.alarms.find((r) => r.hour === hour);
  }

  async updateLabel(index: number) {
    const alert = await this.alertCtrl.create({
      subHeader: this.translate.instant('alarm.label'),
      inputs: [
        { type: 'text', name: 'label', value: this.alarms[index].label },
      ],
      buttons: [
        {
          text: this.translate.instant('buttons.cancel'),
          cssClass: 'secondary',
        },
        {
          text: 'OK',
          cssClass: '',
          handler: async (data: { label: string }) => {
            this.alarms[index].label = data.label;

            await this.alarmChange(index);
            this.saveAlarm();
          },
        },
      ],
    });

    await alert.present();
  }

  private getAlarmId(): number {
    let newId = 0;
    for (let i = 0; i <= this.alarms.length; i++) {
      const id = this.alarms.findIndex((a) => a.id === i);
      if (id < 0) {
        newId = i;
        break;
      }
    }
    return newId;
  }

  async getNotificationId(lastpending = -1): Promise<number> {
    const pending = (await LocalNotifications.getPending()).notifications;
    let newId = 0;
    if (lastpending === 0) newId = 1;
    // return await new Promise((resolve) => {
    for (let i = 0; i <= pending.length; i++) {
      const find = pending.findIndex((a) => a.id === i);
      if (find < 0 && i !== lastpending) {
        newId = i;
        break;
      }
    }
    return newId;
  }

  async setNotification(notification: LocalNotificationSchema) {
    const notifs = await LocalNotifications.schedule({
      notifications: [notification],
    });

    return notifs.notifications;
  }

  private splitTime(iAlarm: number) {
    return this.alarms[this.alarmIndex(iAlarm)].hour
      .split(':')
      .map((t) => Number(t));
  }

  stringify(obj) {
    return JSON.stringify(obj);
  }

  private setAt(iAlarm: number) {
    const date = new Date();
    let nextAlarm = date.getFullYear() + '-';
    nextAlarm += moment(date).format('MM') + '-';
    nextAlarm += moment(date).format('DD');
    nextAlarm += 'T' + this.alarms[this.alarmIndex(iAlarm)].hour + ':00';
    return moment(nextAlarm);
  }

  private differenceDate(date) {
    const dateofvisit = moment(date);
    const today = moment();
    return moment.duration(dateofvisit.diff(today, 'milliseconds'));
  }

  private async toastNextAlarm(duration: moment.Duration) {
    const days = duration.days();
    const hour = duration.hours();
    const minute = duration.minutes();
    const second = duration.seconds();

    let nextAlarm = hour
      + this.translate.instant('alarm.hour') + (hour > 1 ? 's ' : ' ')
      + minute
      + this.translate.instant('alarm.minute') + (minute > 1 ? 's ' : ' ')
      + second
      + this.translate.instant('alarm.second') + (second > 1 ? 's' : '');

    if (days > 0) nextAlarm = days
      + this.translate.instant('alarm.day') + (days > 1 ? 's' : '')
      + nextAlarm;

    const toast = await this.toast.create({
      header: this.translate.instant('alarm.next'),
      message: nextAlarm,
      position: 'bottom',
      duration: 5000,
      translucent: true,
    });

    await toast.present();
  }

  async enableAlarm(iAlarm: number, early = false) {
    const time = this.splitTime(iAlarm);
    const alarm = this.alarms[this.alarmIndex(iAlarm)];
    let at = this.setAt(iAlarm).hour(time[0]).minute(time[1]);

    if (at.isBefore(moment(Date.now()))) {
      at = at.add(1, 'day');
    }

    if (early) {
      at = at.subtract(5, 'minutes');
      if (this.differenceDate(at).asSeconds() < 10) return;
    }

    let schedule: Schedule = {
      repeats: false,
      allowWhileIdle: false, // mode sommeil
      at: at.toDate(),
    };

    const notification: LocalNotificationSchema = {
      title: 'A.C.E',
      body: this.alarms[this.alarmIndex(iAlarm)].label,
      id: await this.getNotificationId(),
      schedule,
      extra: {
        alarmId: iAlarm,
        day: -1,
      },
      channelId: alarm.vibrate ? 'vibrate' : 'default',
    };
    if (alarm.repeat && alarm.days.includes(true)) {
      let iDay = 0;
      let nextAlarm;

      for (const day of this.alarms[this.alarmIndex(iAlarm)].days) {
        const notifs = await this.getPendingByAlarm(iAlarm);
        const find = notifs.find(
          (n) => n.extra?.day === this.setDayIndex(iDay)
        );
        if (day && !find) {
          schedule = {
            repeats: false,
            allowWhileIdle: false, // mode sommeil
            on: {
              day: this.setDayIndex(iDay),
              hour: time[0],
              minute: time[1],
              second: 0,
            },
          };

          notification.id = await this.getNotificationId();
          notification.schedule = schedule;

          notification.extra = {
            alarmId: iAlarm,
            day: this.setDayIndex(iDay),
          };
          await this.setNotification(notification);

          //prochain alarm
          at = this.setAt(iAlarm)
            .day(this.setDayIndex(iDay) - 1)
            .hour(notification.schedule.on.hour)
            .minute(notification.schedule.on.minute);

          if (at.isBefore(moment(Date.now()))) {
            at = at.add(1, 'week');
          }

          if (early) at = at.subtract(5, 'minutes');

          if (!nextAlarm || (day && at.diff(nextAlarm) <= 0)) {
            nextAlarm = at;
          }
        }

        iDay++;
      }

      if (!early) this.toastNextAlarm(this.differenceDate(nextAlarm));

      alarm.active = true;
      return;
    }

    await this.setNotification(notification);

    if (!early) this.toastNextAlarm(this.differenceDate(at));
    alarm.active = true;
  }

  disableAlarm(iAlrm: number) {
    this.cancelAlarm(iAlrm);
  }

  async alarmChange(iAlarm: number) {
    const alarm = this.alarms[this.alarmIndex(iAlarm)];
    if (alarm.active) {
      const pending = await this.getPendingByAlarm(iAlarm);
      if (pending.length)
        await LocalNotifications.cancel({ notifications: pending });

      await this.enableAlarm(iAlarm);
      await this.enableAlarm(iAlarm, true);
    }
  }

  addAlarm() {
    if (this.selectedAlarmIndex === -1) {
      const newHour = this.getHour();
      if (!this.hourExist(newHour)) {
        const rem = new Alarm();
        rem.id = this.getAlarmId();
        rem.hour = newHour;
        rem.label = this.translate.instant('alarm.defaultLabel');
        this.alarms.push({ ...rem });
      }
      this.changeTime = -1; /**supposed never been changed**/
    }
  }

  public setDayIndex(index: number) {
    let newDyaIndex = 0;
    //Dimanche => 0, lundi => 1,... , Samedi => 6
    switch (index) {
      case 6:
        newDyaIndex = 0;
        break;
      default:
        newDyaIndex = index + 1;
    }

    return newDyaIndex;
  }

  public onClickVibrate(iAlarm: number) {
    this.alarmChange(iAlarm);
  }

  private alarmIndex(iAlarm: number) {
    return this.alarms.findIndex((a) => a.id === iAlarm);
  }
}
