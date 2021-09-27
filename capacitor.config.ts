import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ace.app',
  appName: 'ace',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      showSpinner: false,
    },
    LocalNotifications: {
      sound: 'ace_notification.wav',
      smallIcon: 'logo_notification',
      iconColor: '#488AFF',
    },
  },
};

export default config;
