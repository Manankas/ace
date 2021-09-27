import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { IndexeddbService } from 'src/app/services/indexeddb.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

enum ErrorTypes {
  userNotFound,
  wrongPassword,
  emailNotVerifierd,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public isEntered = false;
  public loginForm: FormGroup;
  public isError = false;
  public showPassword = false;
  public errorType: ErrorTypes = ErrorTypes.emailNotVerifierd;
  public errorTypes: typeof ErrorTypes = ErrorTypes;
  public errorCode = {
    userNotFound: 'auth/user-not-found',
    wrongPassword: 'auth/wrong-password',
  };
  public sub: Subscription = new Subscription();

  public slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 0,
    centredSlides: false,
    slidesPerView: 1,
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private indexeddbService: IndexeddbService,
    private userService: UserService,
    private loadingController: LoadingController,
    private toastService: ToastService,
    private translate: TranslateService
  ) {
    this.initForm();
  }

  ngOnInit() {}

  private initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public async onSignIn() {
    const loading = await this.loadingController.create({
      message: this.translate.instant('login.connexion'),
    });
    loading.present();
    const login: {
      email: string;
      password: string;
    } = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    this.authService
      .signIn(login)
      .then(async (_response) => {
        // if (response.user.emailVerified) {
        let usr: User;
        //get user info
        await this.userService
          .getUserByEmail(login.email)
          .then((resp) => {
            usr = resp;
          })
          .catch((e) => console.log(e));
        //save user to idb
        await this.indexeddbService
          .set('user', usr)
          .catch((e) => console.log(e));
        //redirect
        await this.toastService.presentToast(
          this.translate.instant('login.success'),
          'success'
        );
        await this.userService.checkIsNewUser(usr.id).then((status) => {
          this.router.navigateByUrl('/');
        });

        this.isError = false;
        this.loginForm.get('password').setValue('');
        // } else {
        //   this.isError = true;
        //   this.errorType = this.errorTypes.emailNotVerifierd;
        //   this.loginForm.get('password').setValue('');
        // }
        loading.dismiss();
      })
      .catch((error: any) => {
        this.isError = true;
        loading.dismiss();
        if (error.code === this.errorCode.userNotFound) {
          this.errorType = this.errorTypes.userNotFound;
        } else if (error.code === this.errorCode.wrongPassword) {
          this.errorType = this.errorTypes.wrongPassword;
        } else {
        }
      });
  }
  public showPasswordFunction() {
    this.showPassword = !this.showPassword;
  }

  public get f() {
    return this.loginForm.controls;
  }

  ionViewWillEnter() {
    this.isEntered = true;
  }
}
