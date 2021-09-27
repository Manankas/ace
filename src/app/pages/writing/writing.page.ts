import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AlarmComponent } from 'src/app/components/alarm/alarm.component';
import {
  LocalNotifications,
  LocalNotificationSchema,
  Schedule,
} from 'src/app/utils/local-notifications/dist/esm';
import { Alarm } from '../../models/Alarm';
import { AlarmService } from '../../services/alarm.service';
import { IndexeddbService } from '../../services/indexeddb.service';

@Component({
  selector: 'app-writing',
  templateUrl: './writing.page.html',
  styleUrls: ['./writing.page.scss'],
})
export class WritingPage implements OnInit {
  private alarms: Alarm[] = [];
  private userId = '';
  selected = new FormControl(0);
  private currentLanguage: 'fr' | 'en';
  constructor(
    private modalCtrl: ModalController,
    private alarmService: AlarmService,
    private indexDbService: IndexeddbService,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private idbService: IndexeddbService
  ) {}

  async ngOnInit() {
    this.indexDbService.get('user').then((user) => {
      this.userId = user.id;
      this.indexDbService.get('alarms').then(async (localAlarms: Alarm[]) => {
        if (!localAlarms) {
          this.alarmService.alarms(user.id).then(async (alarms) => {
            if (alarms) {
              this.alarms = alarms;

              this.indexDbService.set('alarms', this.alarms);

              for (const alarm of this.alarms) {
                await this.enableAlarmAfterLoadfromServer(alarm.id);
              }
              this.saveAlarm();
            }
          });
        } else {
          this.alarms = localAlarms;
          for (const alarm of this.alarms) {
            await this.enableAlarm(alarm.id);
          }
          this.saveAlarm();
        }
      });
    });
    this.idbService
      .get('language')
      .then((language) => (this.currentLanguage = language));
  }

  async openAlarmConfig() {
    const modal = await this.modalCtrl.create({
      component: AlarmComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        alarms: this.alarms,
        userId: this.userId,
        start: moment(),
      },
    });
    await modal.present();
  }

  async enableAlarm(iAlarm: number) {
    const time = this.splitTime(iAlarm);
    const alarm = this.alarms[this.alarmIndex(iAlarm)];
    const at = this.setAt(iAlarm).hour(time[0]).minute(time[1]);

    if (
      at.isBefore(moment(Date.now())) &&
      !(alarm.repeat && alarm.days.includes(true))
    ) {
      const pending = await this.getPendingByAlarm(iAlarm);
      if (!pending.length) alarm.active = false;
      return;
    }
  }

  async enableAlarmAfterLoadfromServer(iAlarm: number) {
    const time = this.splitTime(iAlarm);
    const alarm = this.alarms[this.alarmIndex(iAlarm)];
    let at = this.setAt(iAlarm).hour(time[0]).minute(time[1]);

    if (
      at.isBefore(moment(Date.now())) &&
      !(alarm.repeat && alarm.days.includes(true))
    ) {
      const pending = await this.getPendingByAlarm(iAlarm);
      if (!pending.length) alarm.active = false;
      return;
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
      sound: 'beep.wav',
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
        const find = notifs.find((n) => n.extra.day === this.setDayIndex(iDay));
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

          if (!nextAlarm || (day && at.diff(nextAlarm) <= 0)) {
            nextAlarm = at;
          }
        }

        iDay++;
      }

      alarm.active = true;
      return;
    }

    await this.setNotification(notification);
    alarm.active = true;
  }

  private alarmIndex(iAlarm: number) {
    return this.alarms.findIndex((a) => a.id === iAlarm);
  }

  private splitTime(iAlarm: number) {
    return this.alarms[this.alarmIndex(iAlarm)].hour
      .split(':')
      .map((t) => Number(t));
  }

  private setAt(iAlarm: number) {
    const date = new Date();
    let nextAlarm = date.getFullYear() + '-';
    nextAlarm += moment(date).format('MM') + '-';
    nextAlarm += moment(date).format('DD');
    nextAlarm += 'T' + this.alarms[this.alarmIndex(iAlarm)].hour + ':00';
    return moment(nextAlarm);
  }

  private async getNotificationId(lastpending = -1): Promise<number> {
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

  private async getPendingByAlarm(alarmId: any) {
    return (await LocalNotifications.getPending()).notifications.filter(
      (n) => n.extra.alarmId === alarmId
    );
  }

  private setDayIndex(index: number) {
    let newDyaIndex = 0;
    //Dimanche => 1, lundi => 2,... , Samedi => 7
    switch (index) {
      case 6:
        newDyaIndex = 1;
        break;
      default:
        newDyaIndex = index + 2;
    }

    return newDyaIndex;
  }

  private async setNotification(notification: LocalNotificationSchema) {
    const notifs = await LocalNotifications.schedule({
      notifications: [notification],
    });

    return notifs.notifications;
  }
  private saveAlarm() {
    this.indexDbService.set('alarms', this.alarms);
    this.alarmService.set(this.alarms, this.userId, this.alarms.length === 0);
  }

  public onChangeLanguage() {
    this.alertCtrl
      .create({
        header: 'Select language',
        // message: this.translate.instant('login.logout'),
        inputs: [
          {
            name: 'fr',
            type: 'radio',
            label: this.translate.instant('french'),
            value: 'fr',
            checked: this.currentLanguage === 'fr' ? true : false,
            handler: () => {
              this.currentLanguage = 'fr';
            },
          },
          {
            name: 'en',
            type: 'radio',
            label: this.translate.instant('english'),
            value: 'en',
            checked: this.currentLanguage === 'en' ? true : false,
            handler: () => {
              this.currentLanguage = 'en';
            },
          },
        ],
        buttons: [
          {
            text: this.translate.instant('buttons.cancel'),
            role: 'cancel',
          },
          {
            text: this.translate.instant('buttons.confirm')[0],
            handler: () => {
              if (this.currentLanguage) {
                this.idbService.set('language', this.currentLanguage);
                this.translate.use(this.currentLanguage);
              }
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }
}
