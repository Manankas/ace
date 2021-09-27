import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  emailToReset: string;
  resetForm: FormGroup;
  emailError = false;
  focused = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.resetForm.controls;
  }

  onReset() {
    this.emailToReset = this.resetForm.get('email').value;
    this.authService
      .resetPassword(this.emailToReset)
      .then(async () => {
        const toast = await this.toastController.create({
          message: this.translate.instant('resetPassword.verify', { email: this.emailToReset }),
          duration: 5000
        });
        toast.present();
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        console.log('error:', err);
        this.emailError = true;
      });
  }
  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }
}
