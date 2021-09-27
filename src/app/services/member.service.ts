import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Member} from '../models/chat/Member';
import {UserService} from './user.service';
import {User} from '../models/User';

export type UserCollaborator = {
  user:  User;
  member: Member;
};

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private memberCollection: AngularFirestoreCollection<Member>;
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {
    this.memberCollection = this.firestore.collection<Member>('members');
  }

  async add(member: Member): Promise<Member> {
    const query = await this.memberCollection.add(member);
    return { ...member, id: query.id };
  }
  async update(member: Omit<Member, 'userId'|'collaborationId'>): Promise<void> {
    const { id, ...res } = member;
    await this.memberCollection.doc(id).update(res);
  }
  async updateField(field: any): Promise<void> {
    const { id, ...res } = field;
    await this.memberCollection.doc(id).update(res);
  }
  public async remove(id: string): Promise<void> {
    await this.memberCollection.doc(id).delete();
  }
  async isMember(userId: string, collaborationId: string): Promise<Member> {
    const querySnapshot = await this.memberCollection
      .ref
      .where('userId', '==', userId)
      .where('collaborationId', '==', collaborationId)
      .get();
    if(!querySnapshot.docs.length)return null;
    return {...querySnapshot.docs[0].data(), id: querySnapshot.docs[0].id }
  }

  public async findMembers(collaboId: string): Promise<UserCollaborator[]> {
    const docs = (await this.memberCollection
      .ref.where('collaborationId', '==', collaboId)
      .get()).docs;
      const users = await this.userService.findUserByIds(docs.map(d => d.data().userId));
      return users.map(user => {
        const doc = docs.find(d => d.data().userId === user.id);
        const member = doc.data();
        member.id = doc.id;
        return {user, member}
      })
  }

  public async findNewRequests(collaborationIds: string[]): Promise<UserCollaborator[]> {
    if(!collaborationIds.length)return [];
    const docs = (await this.memberCollection
      .ref.where('collaborationId', 'in', collaborationIds)
      .where('role', '==', 0)
      .get()).docs;
    const users = await this.userService.findUserByIds(docs.map(doc => doc.data().userId));
    return docs.map(doc => {
      const member = doc.data();
      member.id = doc.id;
      return {
        user: users.find(u => u.id === member.userId),
        member
      }
    });
  }
}
