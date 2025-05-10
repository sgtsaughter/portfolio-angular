import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  textToSpeech: boolean;
  keyboardFocus: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private readonly STORAGE_KEY = 'patrick-portfolio-accessibility';
  private defaultSettings: AccessibilitySettings = {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    textToSpeech: false,
    keyboardFocus: true
  };

  private settingsSubject: BehaviorSubject<AccessibilitySettings>;
  public settings$: Observable<AccessibilitySettings>;

  constructor() {
    // Initialize from localStorage or use defaults
    const savedSettings = this.loadSettings();
    this.settingsSubject = new BehaviorSubject<AccessibilitySettings>(savedSettings || this.defaultSettings);
    this.settings$ = this.settingsSubject.asObservable();

    // Apply initial settings
    this.applySettings(this.settingsSubject.value);
  }

  private loadSettings(): AccessibilitySettings | null {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load accessibility settings:', error);
      return null;
    }
  }

  private saveSettings(settings: AccessibilitySettings): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save accessibility settings:', error);
    }
  }

  updateSettings(settings: Partial<AccessibilitySettings>): void {
    const newSettings = {
      ...this.settingsSubject.value,
      ...settings
    };

    this.settingsSubject.next(newSettings);
    this.saveSettings(newSettings);
    this.applySettings(newSettings);
  }

  toggleSetting(key: keyof AccessibilitySettings): void {
    const currentSettings = this.settingsSubject.value;
    const newSettings = {
      ...currentSettings,
      [key]: !currentSettings[key]
    };

    this.settingsSubject.next(newSettings);
    this.saveSettings(newSettings);
    this.applySettings(newSettings);
  }

  private applySettings(settings: AccessibilitySettings): void {
    const bodyClasses = document.body.classList;

    // High contrast mode
    settings.highContrast
      ? bodyClasses.add('high-contrast-mode')
      : bodyClasses.remove('high-contrast-mode');

    // Large text
    settings.largeText
      ? bodyClasses.add('large-text-mode')
      : bodyClasses.remove('large-text-mode');

    // Reduced motion
    settings.reducedMotion
      ? bodyClasses.add('reduced-motion-mode')
      : bodyClasses.remove('reduced-motion-mode');

    // Focus indicators
    settings.keyboardFocus
      ? bodyClasses.add('keyboard-focus-mode')
      : bodyClasses.remove('keyboard-focus-mode');
  }

  // Text-to-speech functionality
  speak(text: string): void {
    if (!this.settingsSubject.value.textToSpeech) return;

    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      window.speechSynthesis.speak(utterance);
    }
  }

  stopSpeaking(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Get current settings
  getSettings(): AccessibilitySettings {
    return this.settingsSubject.value;
  }

  // Reset to defaults
  resetSettings(): void {
    this.updateSettings(this.defaultSettings);
  }
}
