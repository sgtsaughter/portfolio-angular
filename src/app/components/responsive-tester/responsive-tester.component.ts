import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

interface DevicePreset {
  name: string;
  width: number;
  height: number;
  icon: string;
}

@Component({
  selector: 'app-responsive-tester',
  standalone: true,  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule,
    SafeUrlPipe
  ],
  templateUrl: './responsive-tester.component.html',
  styleUrl: './responsive-tester.component.scss'
})
export class ResponsiveTesterComponent {
  currentUrl = window.location.href;
  devicePresets: DevicePreset[] = [
    { name: 'Mobile Small', width: 320, height: 568, icon: 'smartphone' },
    { name: 'Mobile Medium', width: 375, height: 667, icon: 'smartphone' },
    { name: 'Mobile Large', width: 425, height: 812, icon: 'smartphone' },
    { name: 'Tablet', width: 768, height: 1024, icon: 'tablet' },
    { name: 'Laptop', width: 1024, height: 768, icon: 'laptop' },
    { name: 'Desktop', width: 1440, height: 900, icon: 'desktop_windows' }
  ];

  selectedDevice: DevicePreset = this.devicePresets[0];
  currentOrientation: 'portrait' | 'landscape' = 'portrait';

  constructor(public dialogRef: MatDialogRef<ResponsiveTesterComponent>) {}

  setDevice(device: DevicePreset) {
    this.selectedDevice = device;
    // Reset to portrait when changing device
    this.currentOrientation = 'portrait';
  }

  toggleOrientation() {
    this.currentOrientation = this.currentOrientation === 'portrait' ? 'landscape' : 'portrait';
  }

  get frameWidth(): number {
    return this.currentOrientation === 'portrait' ? this.selectedDevice.width : this.selectedDevice.height;
  }

  get frameHeight(): number {
    return this.currentOrientation === 'portrait' ? this.selectedDevice.height : this.selectedDevice.width;
  }

  get isMobile(): boolean {
    return this.selectedDevice.name.includes('Mobile');
  }

  close() {
    this.dialogRef.close();
  }
}
