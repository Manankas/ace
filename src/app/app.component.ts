import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { SplashScreen } from '@capacitor/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { IndexeddbService } from './services/indexeddb.service';
import { UploadService } from './services/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isLoad = false;

  constructor(
    public uploadService: UploadService,
    private translate: TranslateService,
    private idbService: IndexeddbService
  ) {
    this.initializeApp();
    this.uploadService.isLoad$.subscribe((data: boolean) => {
      this.isLoad = data;
    });
  }

  initializeApp() {
    this.getLanguage();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }

  /**
   * Get language and countryCode from capacitor
   * Set in the local storage
   */
  private getLanguage() {
    Device.getLanguageCode().then((code) => {
      const [language, country] = code.value.split('-');
      console.log(language);

      this.idbService.set('language', language);
      this.idbService.set('country', country || language.toUpperCase());
      this.translate.use(language);
    });
  }
}
