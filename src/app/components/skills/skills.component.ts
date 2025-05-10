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
        { name: 'HTML/CSS', level: 90, color: 'primary' },
        { name: 'JavaScript/TypeScript', level: 90, color: 'primary' },
        { name: 'RxJS', level: 85, color: 'primary' },
        { name: 'Responsive Design', level: 90, color: 'primary' }
      ]
    },
    {
      name: 'Backend & CMS',
      skills: [
        { name: 'Node.js', level: 85, color: 'primary' },
        { name: 'Drupal', level: 90, color: 'primary' },
        { name: 'PHP', level: 85, color: 'primary' },
        { name: 'RESTful APIs', level: 90, color: 'primary' },
        { name: 'SQL/NoSQL Databases', level: 80, color: 'primary' }
      ]
    },
    {      name: 'Advanced & Emerging',
      skills: [
        { name: 'AI Integration', level: 80, color: 'primary' },
        { name: 'Git/Version Control', level: 95, color: 'primary' },
        { name: 'Testing (Unit/E2E)', level: 85, color: 'primary' },
        { name: 'CI/CD', level: 80, color: 'primary' },
        { name: 'Agile Methodologies', level: 90, color: 'primary' }
      ]
    }
  ];

  frameworks: string[] = ['Drupal 8', 'Drupal 7', 'Drupal 6', 'Angular JS'];
  tools: string[] = ['Git', 'Photoshop', 'Microsoft Office', 'Content Management Systems'];
  databases: string[] = ['MySQL', 'MariaDB'];
}
