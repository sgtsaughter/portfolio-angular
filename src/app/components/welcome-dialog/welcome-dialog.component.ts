import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-welcome-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './welcome-dialog.component.html',
  styleUrl: './welcome-dialog.component.scss'
})
export class WelcomeDialogComponent {
  constructor(public dialogRef: MatDialogRef<WelcomeDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
