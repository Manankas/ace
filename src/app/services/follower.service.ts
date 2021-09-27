import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot} from '@angular/fire/firestore';
import { Follower } from '../models/Follower';

@Injectable({
  providedIn: 'root',
})
export class FollowerService {
  private followerCollections: AngularFirestoreCollection<Follower>;

  constructor(private firestore: AngularFirestore){
    this.followerCollections = this.firestore.collection<Follower>('followers');
  }

  async add(follower: Follower): Promise<Follower> {
    const { id, ...res } = follower;
    const query = await this.followerCollections.add(res);
    follower.id = query.id;
    return follower;
  }
  public async cancel(id: string): Promise<void> {
    await this.followerCollections.doc(id).delete();
  }
  public async update(field: any): Promise<void> {
    const { id, ...res } = field;
    await this.followerCollections.doc(id).update(res);
  }

  public async followers(userId: string): Promise<Follower[]> {
    const querySnapshot = await this.followerCollections
      .ref.where('partners', 'array-contains', userId)
      .get();
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  }
  public async follower(userId: string, followerId: string): Promise<Follower> {
    const docs = (await this.followerCollections.ref
      .where('partners', 'in', [
        [userId, followerId], [followerId, userId]
      ])
      .get()).docs;
    if(!docs.length)return undefined;
    return { ...docs[0].data(), id: docs[0].id };
  }
  public async unconfirmedRequests(userId: string): Promise<Follower[]> {
    const myFlowers: Follower[] = [];
      (await this.followerCollections.ref
        .where('partners', 'array-contains', userId)
        .where('confirmed', '==', false)
        .orderBy('createdAt', 'desc')
        .get()
    ).docs.forEach(doc => {
        if(doc.data().partners[0] === userId)
          myFlowers.push({...doc.data(), id: doc.id})
      });
    return myFlowers;
  }
  /**pagination followers for chat**/
  public async findFirst(userId: string, limit: number): Promise<QueryDocumentSnapshot<Follower>[]> {
    return (await this.followerCollections
      .ref.where('partners', 'array-contains', userId)
      .where('lastConversation', '>', 0)
      .orderBy('lastConversation', 'desc')
      .limit(limit)
      .get()).docs;
  }
  public async findNext(
    userId: string,
    limit: number,
    lastCreationDate: number
  ): Promise<QueryDocumentSnapshot<Follower>[]> {
    return (
      await this.followerCollections.ref
        .where('partners', 'array-contains', userId)
        .where('lastConversation', '>', 0)
        .orderBy('lastConversation', 'desc')
        .startAfter(lastCreationDate)
        .limit(limit)
        .get()
    ).docs;
  }

  /**pagination followers**/
  public async findMyFirst(userId: string, limit: number): Promise<QueryDocumentSnapshot<Follower>[]> {
    return (await this.followerCollections
      .ref.where('partners', 'array-contains', userId)
      .where('confirmed', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get()).docs;
  }
  public async findMyNext(
    userId: string,
    limit: number,
    lastCreationDate: number
  ): Promise<QueryDocumentSnapshot<Follower>[]> {
    return (
      await this.followerCollections.ref
        .where('partners', 'array-contains', userId)
        .where('confirmed', '==', true)
        .orderBy('createdAt', 'desc')
        .startAfter(lastCreationDate)
        .limit(limit)
        .get()
    ).docs;
  }
}
