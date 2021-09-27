import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Alarm} from '../models/Alarm';

@Injectable({
  providedIn: 'root',
})
export class AlarmService {
  private alarmCollection: AngularFirestoreCollection<{list: Alarm[]}>;
  constructor(private firestore: AngularFirestore) {
    this.alarmCollection = this.firestore.collection<{list: Alarm[]}>('alarms');
  }

  async set(alarms: Alarm[], userId: string, merge: boolean): Promise<void> {
    await this.alarmCollection.doc(userId).set({list: alarms}, {merge});
  }
 public async alarms(userId: string): Promise<Alarm[]> {
    return (await this.alarmCollection.doc(userId).get().toPromise()).data()?.list||[];
 }

}
