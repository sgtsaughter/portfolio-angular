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
        { name: 'HTML/CSS', level: 95, color: 'primary' },
        { name: 'JavaScript', level: 90, color: 'primary' },
        { name: 'jQuery', level: 90, color: 'primary' },
        { name: 'Angular JS', level: 85, color: 'primary' },
        { name: 'AJAX', level: 85, color: 'primary' }
      ]
    },
    {
      name: 'Backend & CMS',
      skills: [
        { name: 'Drupal', level: 95, color: 'primary' },
        { name: 'PHP', level: 90, color: 'primary' },
        { name: 'Drupal 8', level: 90, color: 'primary' },
        { name: 'Drupal 7', level: 95, color: 'primary' },
        { name: 'Drupal 6', level: 95, color: 'primary' }
      ]
    },
    {      name: 'Tools & Other',
      skills: [
        { name: 'Git', level: 95, color: 'primary' },
        { name: 'Microsoft Office', level: 95, color: 'primary' },
        { name: 'Photoshop', level: 75, color: 'accent' }
      ]
    }
  ];

  frameworks: string[] = ['Drupal 8', 'Drupal 7', 'Drupal 6', 'Angular JS'];
  tools: string[] = ['Git', 'Photoshop', 'Microsoft Office', 'Content Management Systems'];
  databases: string[] = ['MySQL', 'MariaDB'];
}
