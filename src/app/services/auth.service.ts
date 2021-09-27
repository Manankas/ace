import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { IndexeddbService } from './indexeddb.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public idbService: IndexeddbService,
    public userService: UserService
  ) {}

  /**
   * envoyer un email de vérification après un register
   */
  public async sendVerificationMail() {
    return (await this.afAuth.currentUser)
      .sendEmailVerification()
      .then((response) => {
        console.log(response);
      });
  }

  /**
   * fonction qui gère le register
   * @param user les donnees de l'utilisateur
   */
  public async signUp(user: User) {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        console.log(result);
        this.afAuth.currentUser.then((data) => {
          this.idbService.set(
            'user',
            JSON.stringify({ id: data.uid, ...user })
          );
          // data.updateProfile({ displayName: 'true' });
        });
        this.sendVerificationMail()
          .then((res) => {
            user.password = ' ';
            user.isNewUser = true;
            this.saveUserToCollection(user);
            return res;
          })
          .catch((err) => {
            console.log(err);
            return err;
          });
        this.router.navigateByUrl('/verify-your-email');
      })
      .catch((error) => {
        console.log('err', error.message);
        return error;
      });
  }
  /**
   * enregistrer les données de l'user dans la base
   * @param user
   */
  public saveUserToCollection(user: User) {
    this.userService.setUser(user);
  }
  /**
   * fonction qui gère le login des utilisateurs
   * @param user
   */
  public signIn(login: { email: string; password: string }) {
    return this.afAuth.signInWithEmailAndPassword(login.email, login.password);
  }
  /**
   * mot de passe oublié: envoyer un email de vérification
   * @param email email de l'utilisateur pour envoyer le lien de réinitialisation de mot de passe
   */
  public resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
  /**
   * fonction qui gère la déconnexion des utilisateurs
   */
  public logOut() {
    // await this.db.database.goOffline();
    // this.afAuth.currentUser.then((u) => u.updatePassword())
    this.idbService.clear();
    this.afAuth.signOut();
  }
}
