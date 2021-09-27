import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase';
import { User } from 'src/app/models/User';
import { IndexeddbService } from 'src/app/services/indexeddb.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user: User;
  srcAvatar: string;
  avatarLoaded = false;
  bannerLoaded = false;
  srcBanner: string;
  avatar64: string;
  banner64: string;
  newPwd: string;
  newEmail: string;
  userForm: FormGroup;
  isPrivate = false;

  constructor(
    private idbService: IndexeddbService,
    private loadingService: LoadingService,
    private uploadService: UploadService,
    private location: Location,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private translate: TranslateService,
    private router: Router
  ) {
    this.initForm();
  }

  async ngOnInit() {
    await this.idbService.get('user').then((user: User) => {
      this.user = user;
      this.isPrivate = user.isPrivate ? user.isPrivate : false;
      this.userForm.patchValue({
        lastName: user.nom,
        firstName: user.prenom,
        pseudo: user.pseudo,
        description: user.description ? user.description : '',
        isPrivate: this.isPrivate,
        email: user.email,
      });
    });
    this.loadAvatar();
    this.loadBanner();
  }

  private initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      pseudo: [''],
      description: [''],
    });
  }

  public loadAvatar() {
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

  public async getPicture(type: string) {
    const result = await Camera.getPhoto({
      source: CameraSource.Prompt,
      quality: 90,
      width: 500,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    if (type === 'avatar') {
      this.srcAvatar = this.avatar64 =
        'data:Image/png;base64,' + result.base64String;
    } else if (type === 'banner') {
      this.srcBanner = this.banner64 =
        'data:Image/png;base64,' + result.base64String;
    }
  }

  async saveEditProfile() {
    this.uploadService.isLoad$.next(true);
    //check if we should upload an image
    if (this.avatar64) {
      await this.uploadService.uploadProfile(
        'avatar',
        this.avatar64,
        this.user.id,
        this.user
      );
      this.uploadService.newAvatar$.next(true);
    }
    if (this.banner64) {
      await this.uploadService.uploadProfile(
        'banner',
        this.banner64,
        this.user.id,
        this.user
      );
      this.uploadService.newBanner$.next(true);
    }
    //autres traitements
    const tmpUser: User = {
      ...this.user,
      nom: this.userForm.get('lastName').value,
      prenom: this.userForm.get('firstName').value,
      pseudo: this.userForm.get('pseudo').value,
      description: this.userForm.get('description').value,
      email: this.userForm.get('email').value,
      isPrivate: this.isPrivate,
    };
    if (this.user.email !== this.newEmail) {
      const currentUser = this.afAuth.currentUser;
      (await currentUser).updateEmail(this.newEmail);
      console.log('email updated');
    }
    if (tmpUser !== this.user) {
      //update user
      await this.userService.updateUser(tmpUser);
      await this.idbService.set('user', tmpUser);
      this.userService.updated$.next(true);
    }
    this.uploadService.isLoad$.next(false);
    this.location.back();
  }

  toggleIsPrivate(event) {
    this.isPrivate = event.checked;
  }

  async goBack() {
    const tmpUser: User = {
      ...this.user,
      nom: this.userForm.get('lastName').value,
      prenom: this.userForm.get('firstName').value,
      pseudo: this.userForm.get('pseudo').value,
      description: this.userForm.get('description').value,
      email: this.userForm.get('email').value,
      isPrivate: this.isPrivate,
    };
    if (
      this.avatar64 ||
      this.banner64 ||
      this.user.email !== this.newEmail ||
      this.user.isPrivate !== this.isPrivate ||
      this.user.nom !== tmpUser.nom ||
      this.user.prenom !== tmpUser.prenom ||
      this.user.description !== tmpUser.description
    ) {
      const alert = await this.alertController.create({
        subHeader: this.translate.instant('confirmation') + '!',
        message: this.translate.instant('quit.quit'),
        buttons: [
          {
            text: this.translate.instant('quit.yes'),
            handler: () => {
              this.router.navigate(['account']);
            },
          },
          {
            text: this.translate.instant('quit.no'),
            handler: () => {
              this.saveEditProfile();
            },
          },
        ],
      });
      await alert.present();
    } else this.router.navigate(['account']);
  }
}
