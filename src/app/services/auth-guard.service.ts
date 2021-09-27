import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(public router: Router, public afAuth: AngularFireAuth) {}

  public canActivate(): Promise<boolean> {
    return this.checkLogin();
  }

  public canActivateChild(): Promise<boolean> {
    return this.checkLogin();
  }

  public checkLogin(): Promise<boolean> {
    return new Promise((resolve) => {
      this.afAuth.onAuthStateChanged((user: firebase.default.User) => {
        if (user) {
          //autres traitements à faire avant de rediriger l'user vers la page d'accueil
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          console.log('user not found or email not verified');
          resolve(false);
        }
      });
    });
  }
}
