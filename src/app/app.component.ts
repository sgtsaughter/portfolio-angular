import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { AccessibilityMenuComponent } from './components/accessibility-menu/accessibility-menu.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WelcomeDialogComponent } from './components/welcome-dialog/welcome-dialog.component';

@Component({
  selector: 'app-root',  standalone: true,
  imports: [
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    ChatbotComponent,
    AccessibilityMenuComponent,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Portfolio - Patrick Baxter';

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // Check if this is the first visit
    if (!localStorage.getItem('patrick-portfolio-welcomed')) {
      // Show welcome dialog after a short delay
      setTimeout(() => {
        this.dialog.open(WelcomeDialogComponent, {
          width: '90%',
          maxWidth: '600px',
          panelClass: 'welcome-dialog-container',
          disableClose: false
        }).afterClosed().subscribe(() => {
          // Set flag in localStorage to not show again
          localStorage.setItem('patrick-portfolio-welcomed', 'true');
        });
      }, 1000);
    }
  }
}
