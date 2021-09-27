import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { IndexeddbService } from 'src/app/services/indexeddb.service';
import { ToastService } from 'src/app/services/toast.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  public passForm: FormGroup;
  public showPassword = false;
  public showPasswordConfirm = false;
  public showOldPassword = false;
  private user: User;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private afAuth: AngularFireAuth,
    private idbService: IndexeddbService,
    private authService: AuthService,
    private location: Location,
    private loadingController: LoadingController,
    private translate: TranslateService
  ) {
    this.initForm();
  }

  async ngOnInit() {
    await this.idbService.get('user').then((user) => (this.user = user));
  }

  private initForm() {
    this.passForm = this.formBuilder.group({
      old: ['', [Validators.required, Validators.minLength(6)]],
      new: ['', [Validators.required, Validators.minLength(6)]],
      confirmNew: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onUpdatePassword() {
    if (this.passForm.get('old').value === this.passForm.get('new').value) {
      this.toastService.presentToast(
        this.translate.instant('changePassword.equals'),
        'danger'
      );
      return;
    } else {
      const loading = await this.loadingController.create({
        message: this.translate.instant('loading'),
      });
      loading.present();
      await this.authService
        .signIn({
          email: this.user.email,
          password: this.passForm.get('old').value,
        })
        .then(async (accepted) => {
          if (accepted) {
            const currentUser = this.afAuth.currentUser;
            (await currentUser).updatePassword(this.passForm.get('new').value);
            this.toastService.presentToast(this.translate.instant('changePassword.success'), 'success');
            this.passForm.reset();
            this.location.back();
            loading.dismiss();
          }
        })
        .catch((_e) => {
          loading.dismiss();
          this.toastService.presentToast(this.translate.instant('changePassword.incorrect'), 'danger');
        });
    }
  }
}
