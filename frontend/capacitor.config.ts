import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bites.foodjournal',
  appName: 'Bites',
  webDir: 'build',
  android: {
    scheme: 'https',
  },
  plugins: {
    StatusBar: {
      backgroundColor: '#faf7f1',
      style: 'DARK',
    },
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: false,
      backgroundColor: '#faf7f1',
      showSpinner: false,
    },
    Keyboard: {
      resize: 'body',
      scrollAssist: true,
    },
  },
};

export default config;
