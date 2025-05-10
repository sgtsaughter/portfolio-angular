import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor } from '@angular/common';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [MatProgressBarModule, MatCardModule, MatChipsModule, NgFor],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {  skillCategories: SkillCategory[] = [
    {
      name: 'Frontend Development',
      skills: [
        { name: 'Angular', level: 95, color: 'primary' },
        { name: 'TypeScript', level: 95, color: 'primary' },
        { name: 'JavaScript', level: 90, color: 'primary' },
        { name: 'HTML5/CSS3/SCSS', level: 90, color: 'primary' },
        { name: 'RxJS', level: 85, color: 'primary' },
        { name: 'Responsive Design', level: 90, color: 'primary' }
      ]
    },
    {
      name: 'Backend & CMS',
      skills: [
        { name: 'Node.js', level: 85, color: 'primary' },
        { name: 'Drupal', level: 95, color: 'primary' },
        { name: 'WordPress', level: 80, color: 'primary' },
        { name: 'PHP', level: 85, color: 'primary' },
        { name: 'RESTful APIs', level: 90, color: 'primary' },
        { name: 'MySQL/MongoDB', level: 80, color: 'primary' }
      ]
    },
    {      name: 'Advanced & Specialized',
      skills: [
        { name: 'AI Integration', level: 80, color: 'primary' },
        { name: 'Git/Version Control', level: 95, color: 'primary' },
        { name: 'Testing (Unit/E2E)', level: 85, color: 'primary' },
        { name: 'CI/CD', level: 80, color: 'primary' },
        { name: 'Accessibility (WCAG)', level: 85, color: 'primary' },
        { name: 'Agile Methodologies', level: 90, color: 'primary' }
      ]
    },
    {
      name: 'Tools & Platforms',
      skills: [
        { name: 'VS Code', level: 95, color: 'primary' },
        { name: 'JIRA', level: 90, color: 'primary' },
        { name: 'Figma', level: 80, color: 'primary' },
        { name: 'Docker', level: 75, color: 'accent' },
        { name: 'Linux/Unix', level: 80, color: 'primary' }      ]
    }
  ];

  frameworks: string[] = ['Angular', 'Angular JS', 'Drupal 8', 'Drupal 7', 'Drupal 6', 'WordPress', 'Express.js'];
  tools: string[] = ['Git', 'VS Code', 'JIRA', 'Figma', 'Docker', 'Photoshop', 'CI/CD Pipelines'];
  databases: string[] = ['MySQL', 'MongoDB', 'MariaDB', 'PostgreSQL'];
  certifications: string[] = ['Angular Developer Certification (2021)', 'Certified Drupal Developer (2018)', 'Accessibility Compliance Training (WCAG 2.1)'];
}
