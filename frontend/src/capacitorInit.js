import { Capacitor } from '@capacitor/core';

/**
 * Initialize Capacitor native plugins.
 * All calls guard on isNativePlatform() so the web build is unaffected.
 */
export async function initCapacitor() {
  if (!Capacitor.isNativePlatform()) return;

  const { StatusBar, Style } = await import('@capacitor/status-bar');
  const { Keyboard } = await import('@capacitor/keyboard');

  // Set initial status bar based on saved theme
  const savedTheme = localStorage.getItem('qv-theme') || 'light';
  try {
    await StatusBar.setStyle({
      style: savedTheme === 'dark' ? Style.Dark : Style.Light,
    });
    if (Capacitor.getPlatform() === 'android') {
      await StatusBar.setBackgroundColor({
        color: savedTheme === 'dark' ? '#171b26' : '#f5f0e8',
      });
    }
  } catch (_) {}

  // Configure keyboard behavior
  try {
    Keyboard.setResizeMode({ mode: 'body' });
    Keyboard.setScroll({ isDisabled: false });
  } catch (_) {}
}

/**
 * Hide the splash screen after React has rendered.
 */
export async function hideSplashScreen() {
  if (!Capacitor.isNativePlatform()) return;

  const { SplashScreen } = await import('@capacitor/splash-screen');
  try {
    await SplashScreen.hide({ fadeOutDuration: 300 });
  } catch (_) {}
}

/**
 * Keep the status bar in sync when toggling dark/light mode.
 */
export async function syncStatusBarWithTheme(theme) {
  if (!Capacitor.isNativePlatform()) return;

  const { StatusBar, Style } = await import('@capacitor/status-bar');
  try {
    await StatusBar.setStyle({
      style: theme === 'dark' ? Style.Dark : Style.Light,
    });
    if (Capacitor.getPlatform() === 'android') {
      await StatusBar.setBackgroundColor({
        color: theme === 'dark' ? '#171b26' : '#f5f0e8',
      });
    }
  } catch (_) {}
}

/**
 * Fire a light haptic impact.
 */
export async function hapticLight() {
  if (!Capacitor.isNativePlatform()) return;

  const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch (_) {}
}

/**
 * Fire a success notification haptic.
 */
export async function hapticSuccess() {
  if (!Capacitor.isNativePlatform()) return;

  const { Haptics, NotificationType } = await import('@capacitor/haptics');
  try {
    await Haptics.notification({ type: NotificationType.Success });
  } catch (_) {}
}
