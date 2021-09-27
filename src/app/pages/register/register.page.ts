import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { MustMatch } from 'src/app/Validators/check-password';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;
  public showPassword = false;
  public showPasswordConfirm = false;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private loadingController: LoadingController,
    private toastService: ToastService,
    private translate: TranslateService
  ) {
    this.initForm();
  }

  ngOnInit() {}
  public initForm() {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        pseudo: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        nom: ['', Validators.required],
        prenom: [''],
        tel: [''],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }
  public async onSinUp() {
    const loading = await this.loadingController.create({
      message: this.translate.instant('loading'),
    });
    loading.present();
    const user: User = {
      nom: this.registerForm.value.nom,
      prenom: this.registerForm.value.prenom,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      pseudo: this.registerForm.value.pseudo,
      dateCreate: Date.now(),
      dateUpdate: Date.now(),
      telephone: [
        ...this.registerForm.value.tel
          .split(',')
          .filter((num: string) => num.length >= 10),
      ],
      isNewUser: true,
    };
    this.authService
      .signUp(user)
      .then((response) => {
        loading.dismiss();
        if (response) {
          switch (response.code) {
            case 'auth/email-already-in-use':
              this.toastService.presentToast(
                this.translate.instant('register.usedEmail'),
                'danger'
              );
              break;
            case 'auth/id-token-expired':
              this.toastService.presentToast(
                this.translate.instant('register.expired'),
                'danger'
              );
              break;
            case 'auth/id-token-revoked':
              this.toastService.presentToast(
                this.translate.instant('register.revoked'),
                'danger'
              );
              break;
            case 'auth/internal-error':
              this.toastService.presentToast(
                this.translate.instant('register.externalError'),
                'danger'
              );
              break;
            case 'auth/invalid-email':
              this.toastService.presentToast(
                this.translate.instant('register.invalidEmail'),
                'danger'
              );
              break;
            default: {
              this.router.navigateByUrl('/verify-your-email');
            }
          }
        }
      })
      .catch((error: any) => {
        loading.dismiss();
      });
  }
  public showPasswordFunction() {
    this.showPassword = !this.showPassword;
  }

  public showPasswordFunctionConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }

  public get f() {
    return this.registerForm.controls;
  }
}
