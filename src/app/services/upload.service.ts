import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { Image } from '../components/image-modal/image-modal.component';
import { User } from '../models/User';
import { IndexeddbService } from './indexeddb.service';
//import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  public isLoad$ = new BehaviorSubject<boolean>(false);
  public newAvatar$ = new BehaviorSubject<boolean>(false);
  public newBanner$ = new BehaviorSubject<boolean>(false);

  constructor(
    private idbService: IndexeddbService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) // private userService: UserService
  {}

  public renameFile() {
    const extension = 'jpeg';

    return this.randomString(10) + '.' + extension;
  }

  public randomString(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public saveImageToIdb(file: string, options?: any): Promise<string> {
    if (!options) {
      options = {
        fileKey: 'file',
        chunkedMode: false,
      };
    }
    return new Promise<string>((resolve) => {
      const filename = this.renameFile();

      this.idbService.set(filename, file).then(() => {
        resolve(filename);
      });
    });
  }

  /**
   * upload the avatar in firebase storage
   *
   * @param file avatar in base64
   * @param userId the user id
   * @param options fiel upload option
   */
  public uploadProfile(
    type: string,
    file: string,
    userId: string,
    user?: User,
    options?: any
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!options) {
        options = {
          fileKey: 'file',
          chunkedMode: false,
        };
      }
      const targetPath = file;
      //save base64
      if (type === 'avatar') {
        user.avatar = targetPath;
      } else if (type === 'banner') {
        user.banner = targetPath;
      }
      // this.userService.updateUser(user);
      const bucket =
        type === 'avatar'
          ? firebase.default
              .storage()
              .refFromURL(`gs://simo-c74c6.appspot.com/${userId}/avatar`)
          : firebase.default
              .storage()
              .refFromURL(`gs://simo-c74c6.appspot.com/${userId}/banner`);

      const bucketFile =
        type === 'avatar'
          ? bucket.child('avatar.jpeg')
          : bucket.child('banner.jpeg');
      bucketFile
        .putString(targetPath, 'data_url')
        .then(
          () => {
            resolve('okok');
          },
          (err) => {
            reject(console.log(err));
          }
        )
        .then(() => {
          if (type === 'avatar') {
            this.afs.firestore
              .collection('users')
              .doc(userId)
              .update({ avatar: true });
          } else if (type === 'banner') {
            this.afs.firestore
              .collection('users')
              .doc(userId)
              .update({ banner: true });
          }
        });
    });
  }
  public async uploadFile(
    path: string,
    imageId: string,
    file: unknown
  ): Promise<string> {
    /**
     * path: firebase folder
     * imageId: uniq name
     * */
    if (typeof file === 'string')
      /*for base64**/
      await this.storage
        .ref(path)
        .child(imageId)
        .putString(file, 'base64', { contentType: 'image/png' });
    else await this.storage.ref(path).child(imageId).put(file);

    return this.storage.ref(`${path}/${imageId}`).getDownloadURL().toPromise();
  }

  public async getFileUrl(userId: string, name: any): Promise<string> {
    if (!name) return '';
    try {
      return await this.storage
        .ref(userId + '/' + name)
        .getDownloadURL()
        .toPromise();
    } catch {
      return '';
    }
  }
  public async getAllImages(path: string): Promise<Image[]> {
    const urls: Image[] = [];
    this.storage.storage
      .ref(path)
      .listAll()
      .then(async (res) => {
        for (const item of res.items) {
          urls.push({
            name: item.name,
            url: await item.getDownloadURL(),
          });
        }
      });
    return urls;
  }
}
