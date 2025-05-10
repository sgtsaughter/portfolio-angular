import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatIconModule, NgFor],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {  experiences: Experience[] = [
    {
      company: 'Intellishift',
      role: 'Software Developer',
      period: 'October 2019 - Present',
      location: 'Commack, New York',
      description: [
        'Developing and maintaining software solutions for fleet management systems',
        'Working with modern JavaScript frameworks including Angular',
        'Building responsive and user-friendly interfaces',
        'Collaborating with cross-functional teams to deliver high-quality solutions'
      ],
      technologies: ['Angular', 'TypeScript', 'JavaScript', 'HTML/CSS', 'PHP', 'Git']
    },
    {
      company: 'DOOR3 Business Applications, Inc.',
      role: 'Senior Web Developer',
      period: 'April 2012 - September 2019',
      location: 'Manhattan, New York',
      description: [
        'Led development of enterprise-level web applications',
        'Architected and implemented complex front-end solutions',
        'Specialized in Drupal content management system development',
        'Created responsive and accessible web interfaces',
        'Collaborated with clients to gather requirements and implement solutions'
      ],
      technologies: ['Drupal', 'PHP', 'JavaScript', 'jQuery', 'AJAX', 'HTML/CSS', 'Git']
    },
    {
      company: 'National Event Connection',
      role: 'Jr. Web Developer and Content Manager',
      period: 'March 2008 - April 2012',
      location: 'Ronkonkoma, NY',
      description: [
        'Created, maintained, and analyzed performance of four company websites using Drupal CMS',
        'Built a web-based company database system using Drupal',
        'Adhered to strict project deadlines for site development and module building',
        'Responsible for theming and UI development',
        'Led beta testing and implemented user feedback',
        'Managed email blasts and social networks for companies with different target markets',
        'Compiled and maintained sales leads spreadsheets'
      ],      technologies: ['Drupal', 'PHP', 'HTML/CSS', 'JavaScript', 'Microsoft Office', 'Photoshop']
    }
  ];
}
