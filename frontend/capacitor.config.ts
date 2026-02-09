import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.quietverse.app',
  appName: 'Quiet Verse',
  webDir: 'build',
  android: {
    scheme: 'https',
  },
  plugins: {
    StatusBar: {
      backgroundColor: '#f5f0e8',
      style: 'DARK',
    },
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: false,
      backgroundColor: '#f5f0e8',
      showSpinner: false,
    },
    Keyboard: {
      resize: 'body',
      scrollAssist: true,
    },
  },
};

export default config;
