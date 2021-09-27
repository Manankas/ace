import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {Collaboration} from '../models/chat/Collaboration';
import {MemberService} from './member.service';
import {Member} from '../models/chat/Member';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollaborationService {
  private collaborationCollections: AngularFirestoreCollection<Collaboration>;
  constructor(
    private firestore: AngularFirestore,
    private memberService: MemberService
  ) {
    this.collaborationCollections = this.firestore.collection<Collaboration>('collaborations');
  }

  async add(collaboration: Collaboration, member: Omit<Member, 'collaborationId'>, isOwner = true):
    Promise<Collaboration> {
    return new Promise(async (resolve, reject) => {
      let col = await this.findById(collaboration.id);
      if(!col) {
        const {id,...res} = collaboration;
        await this.collaborationCollections
          .doc(id)
          .set(res);
        col = collaboration;
      }
      if(col) {
        const isMember = await this.memberService.isMember(member.userId, col.id);
        if(!isMember) {
          await this.memberService.add({...member, collaborationId: col.id });
        }
        else if(isMember && !isOwner) reject(isMember);
      }
      return resolve(col);
    })
  }

  async findById(id: string): Promise<Collaboration> {
    const doc = await this.collaborationCollections.doc(id).get().toPromise();
    return doc.data() ? { ...doc.data(), id: doc.id } : undefined
  }

  public async update(path: string, active: boolean) {
     await this.collaborationCollections
       .doc(path)
       .update({ active });
   };

  public findCollaborationProjects(userId: string): Observable<DocumentChangeAction<Member>[]> {
    return this.firestore
      .collection<Member>('members', ref =>
        ref.where('role', 'in', [1,2])
          .where('userId', '==', userId)
          .where('banned', '==', false)
          .orderBy('createdAt', 'desc')
          .limit(15)
      ).snapshotChanges(['added', 'removed']);
  }
}
