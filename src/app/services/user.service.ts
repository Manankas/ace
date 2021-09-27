import { Injectable } from '@angular/core';
import {AngularFirestore, QueryDocumentSnapshot} from '@angular/fire/firestore';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
import {UploadService} from './upload.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public updated$ = new BehaviorSubject<boolean>(false);
  constructor(
    private firestore: AngularFirestore,
    private uploadService: UploadService
  ) {}

  public getUserById(idUser: string): Promise<User> {
    return new Promise((resolve) => {
      this.firestore.firestore
        .collection('users')
        .doc(idUser)
        .get()
        .then((data) => {
          resolve({ id: data.id, ...(<User>data.data()) });
        });
    });
  }

  public getUserByEmail(email: string) {
    return new Promise((resolve) => {
      this.firestore.firestore
        .collection('users')
        .where('email', '==', email)
        .get()
        .then((datas) => {
          datas.forEach((data) => {
            resolve({ id: data.id, ...(<User>data.data()) });
          });
        });
    });
  }

  public setUser(user: User) {
    return this.firestore.collection('users').add(user);
  }

  public updateUser(user: User) {
    return this.firestore.collection('users').doc(user.id).update(user);
  }

  public removeUser(idUser: string) {
    return this.firestore.collection('users').doc(idUser).delete();
  }

  public checkIsNewUser(idUser: string) {
    return new Promise((resolve) => {
      this.firestore.firestore
        .collection('users')
        .doc(idUser)
        .get()
        .then((user) => {
          if ((<User>user.data()).isNewUser) {
            this.firestore
              .collection('users')
              .doc(idUser)
              .update({ isNewUser: false });
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  private async mapper(docs: QueryDocumentSnapshot<User>[]): Promise<User[]> {
    return Promise.all(
      docs.map(async (doc) => {
        const data = doc.data();
        data.id = doc.id;
        data.banner = data.banner? await this.uploadService.getFileUrl(doc.id + '/banner/', 'banner.jpeg') : '';
        data.avatar = data.avatar ? await this.uploadService.getFileUrl(doc.id + '/avatar/', 'avatar.jpeg') : '';
        return data;
      })
    );
  }
  public async findUsers(pseudo: string): Promise<User[]> {
    const snapshots = await this.firestore
      .collection<User>('users').ref
      .where('isPrivate', '==', false)
      .orderBy('pseudo', 'asc')
      .startAt(pseudo)
      .endAt(pseudo + '\uf8ff')
      .limit(10)
      .get();
    return this.mapper(snapshots.docs);
  }
  public async findByUid(uid: string): Promise<User> {
    const doc = await this.firestore
      .collection<User>('users')
      .doc(uid)
      .get()
      .toPromise();
    return {
      ...doc.data(),
      id: doc.id,
    };
  }
  public async findUserByIds(ids: string[]): Promise<User[]> {
    if(!ids.length)return [];
    const snapshots = await this.firestore
      .collection<User>('users')
      .ref.where(firebase.firestore.FieldPath.documentId(), 'in', ids)
      .get();
    return this.mapper(snapshots.docs);
  }
}
