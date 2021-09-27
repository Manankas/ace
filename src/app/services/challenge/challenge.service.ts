import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection, QueryDocumentSnapshot,
} from '@angular/fire/firestore';

import firebase from 'firebase/app';

import { Challenge } from '../../models/challenge/Challenge';
import { UploadService } from '../upload.service';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  private challengeCollections: AngularFirestoreCollection<Challenge>;

  constructor(
    private firestore: AngularFirestore,
    private uploadService: UploadService
  ) {
    this.challengeCollections =
      this.firestore.collection<Challenge>('challenges');
  }

  async add(challenge: Challenge): Promise<Challenge> {
    const { id,avatar, ...res } = challenge;
    Object.assign(res, { avatar: !!avatar })
    const query = await this.challengeCollections.add(res);
    challenge.id = query.id;
    if(avatar) {
      challenge.avatar = await this.uploadService.uploadFile('challenges', challenge.id, avatar);
    }
    return challenge;
  }
  public async remove(id: string): Promise<void> {
    await this.challengeCollections.doc(id).delete();
  }
  public async update(challenge: Challenge): Promise<Challenge> {
    const { id, avatar, ...res } = challenge;
    if(avatar) {
      challenge.avatar = await this.uploadService.uploadFile('challenges', challenge.id, avatar);
      Object.assign(res, { avatar: true });
    }
    await this.challengeCollections.doc(id).update(res);
    return challenge;
  }

  private mapper(docs: QueryDocumentSnapshot<Challenge>[]): Promise<Array<Challenge>> {
    return Promise.all(
      docs.map(async (doc) => ({
          ...doc.data(),
          avatar: doc.data()?.avatar ? await this.uploadService.getFileUrl('challenges', doc.id) : '',
          id: doc.id
        })
      )
    )
  }
  /** start infinite scroll challenges**/
  public async findFirst(limit: number, withNotPublished: boolean): Promise<Challenge[]> {
    return this.mapper((
      await this.challengeCollections.ref
        .where('publish', 'in', withNotPublished ? [true, false] : [true])
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get()
      ).docs
    )
  }
  public async findNext(limit: number, lastDate: number, withNotPublished: boolean): Promise<Challenge[]> {
    return this.mapper((await this.challengeCollections.ref
        .where('publish', 'in', withNotPublished ? [true, false] : [true])
        .orderBy('createdAt', 'desc')
        .startAfter(lastDate)
        .limit(limit)
        .get()).docs
    )
  }
  /**end infinite scroll challenges**/
  public async findByIds(ids: string[]): Promise<Array<Challenge>> {
    if (!ids.length) return [];
    return this.mapper((await this.challengeCollections.ref
      .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
      .get()).docs
    )
  }
}
