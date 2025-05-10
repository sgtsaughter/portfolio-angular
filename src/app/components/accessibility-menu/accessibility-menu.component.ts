import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { AccessibilityService, AccessibilitySettings } from '../../services/accessibility.service';

@Component({
  selector: 'app-accessibility-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTooltipModule,
    FormsModule
  ],
  templateUrl: './accessibility-menu.component.html',
  styleUrl: './accessibility-menu.component.scss'
})
export class AccessibilityMenuComponent implements OnInit {
  isMenuOpen = false;
  settings: AccessibilitySettings;

  constructor(private accessibilityService: AccessibilityService) {
    this.settings = this.accessibilityService.getSettings();
  }

  ngOnInit(): void {
    this.accessibilityService.settings$.subscribe(settings => {
      this.settings = settings;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    // Announce menu state for screen readers
    const message = this.isMenuOpen
      ? 'Accessibility menu opened'
      : 'Accessibility menu closed';

    this.announceForScreenReader(message);
  }

  toggleSetting(setting: keyof AccessibilitySettings): void {
    this.accessibilityService.toggleSetting(setting);

    // Announce change for screen readers
    const isEnabled = !this.settings[setting];
    const settingName = this.formatSettingName(setting);
    const message = `${settingName} ${isEnabled ? 'enabled' : 'disabled'}`;

    this.announceForScreenReader(message);
  }

  resetSettings(): void {
    this.accessibilityService.resetSettings();
    this.announceForScreenReader('Accessibility settings reset to defaults');
  }

  private formatSettingName(setting: string): string {
    // Convert camelCase to words with spaces
    return setting
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  }

  private announceForScreenReader(message: string): void {
    // Create a live region announcement for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('role', 'status');
    announcement.classList.add('sr-only'); // Screen reader only
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement is processed
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}
