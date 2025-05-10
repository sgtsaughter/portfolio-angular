import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf, NgStyle, CommonModule } from '@angular/common';

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  highlights?: string[];
  logoUrl?: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, NgFor, NgIf, NgStyle, CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  showAISection = true;

  aiExperience = {
    title: 'AI Development Experience',
    description: 'Working with AI technologies both professionally and on personal projects',
    projects: [
      {
        name: 'AI Integration in Enterprise Applications',
        period: '2023 - Present',
        description: 'Implemented AI-powered solutions to enhance fleet management analytics at Intellishift',
        technologies: ['Angular', 'Machine Learning APIs', 'Data Visualization']
      },
      {
        name: 'Personal AI Projects',
        period: '2022 - Present',
        description: 'Developed side projects exploring various AI technologies and frameworks',
        technologies: ['OpenAI API', 'Angular', 'Node.js']
      }
    ]
  };  experiences: Experience[] = [
    {
      company: 'Intellishift',
      role: 'Software Developer',
      period: 'October 2019 - Present',
      location: 'Commack, New York',
      description: [
        'Developing and maintaining software solutions for fleet management systems',
        'Working with modern JavaScript frameworks including Angular',
        'Building responsive and user-friendly interfaces',
        'Implementing AI-powered analytics features for fleet data',
        'Collaborating with cross-functional teams to deliver high-quality solutions'
      ],      technologies: ['Angular', 'TypeScript', 'JavaScript', 'HTML/CSS', 'AI Integration', 'Git'],
      highlights: ['Angular development', 'AI integration', 'Full-stack development'],
      logoUrl: './assets/files/_intellishift_logo.jpg'
    },{
      company: 'DOOR3 Business Applications, Inc.',
      role: 'Senior Web Developer',
      period: 'April 2012 - September 2019',
      location: 'Manhattan, New York',
      description: [
        'Led development of enterprise-level web applications',
        'Architected and implemented complex front-end solutions',
        'Specialized in Drupal content management system development',
        'Created responsive and accessible web interfaces',
        'Collaborated with clients to gather requirements and implement solutions'      ],
      technologies: ['Drupal', 'PHP', 'JavaScript', 'jQuery', 'AJAX', 'HTML/CSS', 'Git'],
      logoUrl: './assets/files/door3_logo.jpg'
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
        'Compiled and maintained sales leads spreadsheets'      ],      technologies: ['Drupal', 'PHP', 'HTML/CSS', 'JavaScript', 'Microsoft Office', 'Photoshop'],
      logoUrl: './assets/files/nationaleventconnection_logo.jpg'
    }
  ];
}
