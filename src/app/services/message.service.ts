import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Message } from '../models/chat/Message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public messageCollection: AngularFirestoreCollection<Message>;

  private groupCursor = 0;
  private discussionCursor = 0;

  constructor(public angularFirestore: AngularFirestore) {
    this.messageCollection = angularFirestore.collection<Message>('messages');
  }

  async send(message: Message): Promise<Message> {
    const { id, ...res} = message;
    const query = await this.messageCollection.add(res);
    message.id = query.id;
    return message;
  }
  public async findLatestConv(convI: any[]): Promise<Message> {
    const docs = (
      await this.messageCollection.ref
        .where('convId', 'array-contains-any', convI)
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get()
    ).docs;
    return { ...docs[0].data(), id: docs[0].id };
  }

  public discussions(senderId: string, receiverId: string): Message[] {
    const messages: Message[] = [];
    this.angularFirestore
      .collection<Message>('messages', (ref) =>
        ref
          .where('convId', 'in', [[senderId, receiverId], [receiverId, senderId]])
          .orderBy('createdAt', 'desc')
          .limit(1)
      )
      .snapshotChanges(['added', 'removed'])
      .subscribe((actions) => {
        if (actions.length > 0) {
          const doc = actions[0].payload.doc;
          messages.unshift({ ...doc.data(), id: doc.id });

          if (messages.length === 1) {
            this.discussionCursor = doc.data().createdAt;
            this.moreDiscussions(senderId, receiverId, 14).then(
              (oldMessages) => {
                oldMessages.forEach((old) => {
                  messages.push(old);
                });
              }
            );
          }
        }
      });
    return messages;
  }

  public async moreDiscussions(
    senderId: string,
    receiverId: string,
    limit: number
  ): Promise<Message[]> {
    let more: Message[] = [];

    if (this.discussionCursor) {
      const docs = (
        await this.angularFirestore
          .collection<Message>('messages', (ref) =>
            ref
              .where(
                'convId',
                'in',
                [[senderId, receiverId], [receiverId, senderId]]
              )
              .orderBy('createdAt', 'desc')
              .limit(limit)
              .startAfter(this.discussionCursor)
          )
          .get()
          .toPromise()
      ).docs;

      if (docs.length > 0) {
        this.discussionCursor = docs[docs.length - 1].data().createdAt;

        more = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      } else this.discussionCursor = null;
    }

    return more;
  }

  public groupDiscussions(groupId: string, limit = 0): Message[] {
    const messages: Message[] = [];

    this.angularFirestore
      .collection<Message>('messages', (ref) =>
        ref
          .where('convId', 'array-contains', groupId)
          .orderBy('createdAt', 'desc')
          .limit(1)
      )
      .snapshotChanges(['added', 'removed'])
      .subscribe((actions) => {
        if (actions.length > 0) {
          const doc = actions[0].payload.doc;
          messages.unshift({ ...doc.data(), id: doc.id });

          if (messages.length === 1) {
            this.groupCursor = doc.data().createdAt;
            this.moreGroupDiscussions(groupId, 14).then((oldMessages) => {
              oldMessages.forEach((old) => {
                messages.push(old);
              });
            });
          }
        }
      });

    return messages;
  }

  public async moreGroupDiscussions(
    groupId: string,
    limit: number
  ): Promise<Message[]> {
    let more: Message[] = [];

    if (this.groupCursor) {
      const docs = (
        await this.angularFirestore
          .collection<Message>('messages', (ref) =>
            ref
              .where('convId', 'array-contains', groupId)
              .orderBy('createdAt', 'desc')
              .limit(limit)
              .startAfter(this.groupCursor)
          )
          .get()
          .toPromise()
      ).docs;

      if (docs.length > 0) {
        this.groupCursor = docs[docs.length - 1].data().createdAt;

        more = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      } else this.groupCursor = null;
    }

    return more;
  }
}
