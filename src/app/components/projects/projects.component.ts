import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor } from '@angular/common';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, NgFor],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform built with Angular and .NET Core. Includes product browsing, cart management, user authentication, and admin dashboard.',
      image: 'https://placehold.co/600x400/3f51b5/ffffff?text=E-Commerce+App',
      technologies: ['Angular', 'TypeScript', 'ASP.NET Core', 'SQL Server', 'Azure'],
      githubLink: 'https://github.com/example/project1',
      liveLink: 'https://example.com/project1'
    },
    {
      title: 'Project Management Tool',
      description: 'A collaborative project management application with task tracking, team management, and real-time updates using SignalR.',
      image: 'https://placehold.co/600x400/f50057/ffffff?text=PM+Tool',
      technologies: ['Angular', 'RxJS', 'Node.js', 'Express', 'MongoDB'],
      githubLink: 'https://github.com/example/project2'
    },
    {
      title: 'Financial Dashboard',
      description: 'Interactive dashboard for financial data visualization. Features responsive charts, data filtering, and export capabilities.',
      image: 'https://placehold.co/600x400/ff9800/ffffff?text=Financial+Dashboard',
      technologies: ['Angular', 'TypeScript', 'D3.js', 'Firebase'],
      liveLink: 'https://example.com/project3'
    },
    {
      title: 'Healthcare App',
      description: 'Mobile-friendly application for scheduling medical appointments, viewing health records, and secure messaging with healthcare providers.',
      image: 'https://placehold.co/600x400/4caf50/ffffff?text=Healthcare+App',
      technologies: ['Angular', 'Ionic', 'TypeScript', 'GraphQL', 'AWS'],
      githubLink: 'https://github.com/example/project4',
      liveLink: 'https://example.com/project4'
    }
  ];
}
