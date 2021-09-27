import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';

import {Comment, Participation} from '../../models/challenge/Participation';
import firebase from 'firebase/app';
import FieldValue = firebase.firestore.FieldValue;

@Injectable({
  providedIn: 'root',
})
export class ParticipationService {
  private participationCollections: AngularFirestoreCollection<Participation>;

  constructor(private firestore: AngularFirestore) {
    this.participationCollections =
      this.firestore.collection<Participation>('participations');
  }

  async add(participation: Participation): Promise<Participation> {
    const { id, ...res } = participation;
    const query = await this.participationCollections.add(res);
    participation.id = query.id;
    return participation;
  }

  public async update(participation: Participation): Promise<void> {
    const { id, like,...res } = participation;
    await this.participationCollections.doc(id).update(res);
  }
  public async remove(id: string): Promise<void> {
    await this.participationCollections.doc(id).delete();
  }
  /**pagination de mes challenges*/
  public async findFirst(
    id: string,
    limit: number,
    field: 'userId'|'challengeId' = 'userId'
  ): Promise<Array<QueryDocumentSnapshot<Participation>>> {
    return (
      await this.participationCollections.ref
        .where('finished', 'in', field === 'userId' ? [true, false] : [true])
        .where(field, '==', id)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get()
    ).docs;
  }

  public async findNext(
    id: string,
    limit: number,
    lastCreationDate: number,
    field: 'userId'|'challengeId' = 'userId',
  ): Promise<Array<QueryDocumentSnapshot<Participation>>> {
    return (
      await this.participationCollections.ref
        .where('finished', 'in', field === 'userId' ? [true, false] : [true])
        .where(field, '==', id)
        .orderBy('createdAt', 'desc')
        .startAfter(lastCreationDate)
        .limit(limit)
        .get()
    ).docs;
  }
  /**Like**/
  public async like(pId: string, uId): Promise<void> {
    await this.firestore.collection('participations').doc(pId)
      .update({
        like: firebase.firestore.FieldValue.arrayUnion(uId)
      })
  }
  public async unlike(pId: string, uId): Promise<void> {
    await this.firestore.collection('participations').doc(pId)
      .update({
        like: firebase.firestore.FieldValue.arrayRemove(uId)
      })
  }
  //comments
  /**any items**/
  public async updateComments(pId: string, data: Comment): Promise<void> {
    const {id, ...comment} = data;
    await this.firestore.collection('participations')
      .doc(pId)
      .set({comments: {[id]: comment}}, {merge: true});
  };
  public async deleteComment(pId: string, cId: number): Promise<void> {
    await this.firestore.collection('participations')
      .doc(pId)
      .update({['comments.' + cId]: FieldValue.delete()});
  };
}
