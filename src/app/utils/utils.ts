import * as moment from 'moment';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LocalNotifications } from '@capacitor/local-notifications';

import { Project } from '../models/project/Project';

export const getKeys = (obj: any): string[] => Object.getOwnPropertyNames(obj);
export const parseJson = (obj: any) => JSON.parse(obj);
export const removeLastSOcc = (str: string) =>
  str.substr(0, str.lastIndexOf('s'));

export const getPicture = async (): Promise<string> => {
  if ((await (await Camera.checkPermissions()).photos) !== 'granted')
    await Camera.requestPermissions();

  const result = await Camera.getPhoto({
    source: CameraSource.Prompt,
    quality: 90,
    width: 500,
    allowEditing: false,
    resultType: CameraResultType.Base64,
  });

  return result.base64String;
};

export type ProjectNotification = {
  notif: {
    body: string;
    inboxList: string[];
  };
  remainWord: number;
};
export const makeDate = (hour: string, dayNumber = -1, checkAfter = false) => {
  const date = new Date();
  let nextAlarm = date.getFullYear() + '-';
  nextAlarm += moment(date).format('MM') + '-';
  nextAlarm += moment(date).format('DD');
  nextAlarm += 'T' + hour + ':00';
  /**Previous alarm is for next day if user chooses time smaller than actual*/
  const at = moment(nextAlarm);
  if (dayNumber > -1) at.set('date', dayNumber);
  if (checkAfter) {
    if (moment(date).isAfter(nextAlarm)) at.add(1, 'days');
  }
  return at.toDate();
};
export const scheduleProjectAlarm = (
  project: Project,
  params: ProjectNotification
) => {
  const id = parseInt(
    Math.log(project.createdAt).toFixed(4).slice(0, -1).replace('.', ''),
    10
  );
  if (project.notify && params.remainWord > 0) {
    LocalNotifications.schedule({
      notifications: [
        {
          title: project.name,
          ...params.notif,
          id,
          schedule: {
            on: {
              hour: 8,
              minute: 0,
            },
          },
        },
      ],
    });
  } else {
    LocalNotifications.cancel({ notifications: [{ id }] });
    project.notify = false;
  }
};
