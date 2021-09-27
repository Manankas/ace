import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Project } from '../models/project/Project';
import {UploadService} from './upload.service';
import firebase from 'firebase/app';
import FieldValue = firebase.firestore.FieldValue;

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectCollections: AngularFirestoreCollection<Project>;

  constructor(
    private firestore: AngularFirestore,
    private uploadService: UploadService,
  ) {
    this.projectCollections = this.firestore.collection<Project>('projects');
  }

  async add(project: Project): Promise<Project> {
    let avatarUrl = '';
    if(project.avatar) {
      const avatarName = Date.now().toString();
      avatarUrl = await this.uploadService.uploadFile(project.userId, avatarName, project.avatar);
      project.avatar = avatarName;
    }
    const query = await this.projectCollections.add(project);
    project.id = query.id;
    project.avatar = avatarUrl;

    return project;
  }
  public async updateField(id: string, field: any): Promise<void> {
    await this.projectCollections.doc(id).update({
      ...field,
      updatedAt: Date.now()
    });
  }
  public async findById(id: string): Promise<Project> {
    return new Promise((resolve, reject) => {
      this.projectCollections
        .ref.where(firebase.firestore.FieldPath.documentId(), '==', id)
        .where('archived', '==', false)
        .get().then(async query => {
          if(!query.docs.length) reject(undefined);
          const project = query.docs[0].data();
          project.id = query.docs[0].id;
          resolve(project)
      }).catch(() => reject(undefined))
    })
  }
  public async findByIds(ids: string[]): Promise<Project[]> {
    if(!ids.length)return [];
    const docs = (await this.projectCollections
      .ref.where(firebase.firestore.FieldPath.documentId(), 'in', ids)
      .where('archived', '==', false)
      .get()).docs;
    return Promise.all(docs.map(async (doc) => {
        const project = doc.data();
        project.id = doc.id;
        if(project.avatar)
          project.avatar = await this.uploadService.getFileUrl(project.userId, project.avatar);
        return project;
      })
    );
  }
  public async findByUserId(userId: string, findAvatar = true): Promise<Project[]> {
    const querySnapshot = await this.projectCollections
      .ref.where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(15)
      .get();

    return Promise.all(querySnapshot.docs.map(async (doc) => {
      const project = doc.data();
      project.id = doc.id;
      if(project.avatar && findAvatar)
        project.avatar = await this.uploadService.getFileUrl(project.userId, project.avatar);
      return project;
    })
    );
  }
  /**any items**/
  public async updateMap(projectId: string, path: string, data: any): Promise<void> {
    const { id, ...res} = data;
    await this.firestore.collection('projects')
      .doc(projectId)
      .set({[path]: {[id]: res}}, {merge: true});
  };
  public async deleteFromMap(projectId: string, path: string): Promise<void> {
    await this.firestore.collection('projects')
      .doc(projectId)
      .update({[path]: FieldValue.delete()});
  };
}
