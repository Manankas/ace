import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Share } from '@capacitor/share';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { IndexeddbService } from 'src/app/services/indexeddb.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { FollowersComponent } from '../../components/follower/followers/followers.component';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit, OnDestroy {
  user: User;
  srcAvatar: string;
  avatarLoaded = false;
  bannerLoaded = false;
  srcBanner: string = null;
  achievements = { participated: false, cProject: false, pProject: false };
  onLine = window.navigator.onLine;
  private sub: Subscription = new Subscription();
  @ViewChild('profil') img: HTMLImageElement;

  constructor(
    private idbService: IndexeddbService,
    private loadingService: LoadingService,
    private userService: UserService,
    private uploadService: UploadService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.idbService.get('achievements').then((achievements) => {
      if (achievements) Object.assign(this.achievements, achievements);
    });
    this.user = await this.idbService.get('user');
    this.loadAvatar();
    this.loadBanner();
    this.sub.add(
      this.userService.updated$.subscribe(async (updated) => {
        if (updated) {
          await this.idbService.get('user').then((user) => (this.user = user));
        }
      })
    );

    this.sub.add(
      this.uploadService.newAvatar$.subscribe((avatarUpdated) => {
        if (avatarUpdated) {
          this.avatarLoaded = false;
          this.loadAvatar();
        }
      })
    );
    this.sub.add(
      this.uploadService.newBanner$.subscribe((bannerUpdated) => {
        if (bannerUpdated) {
          this.bannerLoaded = false;
          this.loadBanner();
        }
      })
    );
  }

  private loadAvatar() {
    firebase.default
      .storage()
      .refFromURL(
        `${environment.urlStorage}/${environment.firebase.storageBucket}/o/${this.user.id}%2Favatar%2Favatar.jpeg`
      )
      .getDownloadURL()
      .then((url) => {
        this.srcAvatar = this.loadingService.preloadImage(url).src;
        this.avatarLoaded = true;
      })
      .catch(() => {
        this.srcAvatar = '../../../assets/male_user.svg';
        this.avatarLoaded = true;
      });
  }

  loadBanner() {
    firebase.default
      .storage()
      .refFromURL(
        `${environment.urlStorage}/${environment.firebase.storageBucket}/o/${this.user.id}%2Fbanner%2Fbanner.jpeg`
      )
      .getDownloadURL()
      .then((url) => {
        this.srcBanner = this.loadingService.preloadImage(url).src;
        this.bannerLoaded = true;
      })
      .catch(() => {
        this.srcBanner = 'https://unsplash.it/975/300';
        this.bannerLoaded = true;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  /****/
  public getUser(): User {
    return { ...this.user, avatar: this.srcAvatar, banner: this.srcBanner };
  }
  public followersModal() {
    this.modalCtrl
      .create({
        component: FollowersComponent,
        cssClass: 'modal-fullscreen',
        componentProps: { user: this.getUser() },
      })
      .then((modal) => modal.present());
  }

  /*private async getBase64ImageFromUrl(imageUrl): Promise<string | ArrayBuffer> {
    const res = await fetch(imageUrl);
    const blob = await res.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          let res = reader.result;
          res = res
            .toString()
            .replace('data:text/html;base64', 'data:image/svg;base64');
          resolve(res);
        },
        false
      );

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }*/

  public async shareChallenge() {
    await Share.share({
      title: this.translate.instant('profil.share.title'),
      text:
        this.user.nom + ' ' + this.user.prenom + ' alias ' + this.user.pseudo,
      dialogTitle: this.translate.instant('profil.share.dialogTitle'),
    });
  }
  public achievementMsg(title: string, val: boolean): string {
    return (
      title + ' : ' + this.translate.instant('buttons.confirm')[val ? 0 : 1]
    );
  }

  public logout() {
    this.alertCtrl
      .create({
        message: this.translate.instant('login.logout'),
        buttons: [
          {
            text: this.translate.instant('buttons.cancel'),
            role: 'cancel',
          },
          {
            text: this.translate.instant('buttons.confirm')[0],
            handler: () => {
              this.authService.logOut();
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }
}
