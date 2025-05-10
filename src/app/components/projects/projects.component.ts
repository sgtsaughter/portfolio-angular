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
  period: string;
  organization: string;
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
export class ProjectsComponent {  projects: Project[] = [
    {
      title: 'AI-Powered Task Management App',
      description: 'Developed a modern task management application using Angular that integrates with OpenAI API to provide intelligent task prioritization and categorization. The application uses natural language processing to understand user inputs and organize tasks in a meaningful way.',
      image: 'https://placehold.co/600x400/3f51b5/ffffff?text=AI+Task+Manager',
      period: '2023 - Present',
      organization: 'Personal Project',
      technologies: ['Angular', 'TypeScript', 'OpenAI API', 'RxJS', 'Angular Material'],
      githubLink: 'https://github.com/sgtsaughter/ai-task-manager'
    },
    {
      title: 'Fleet Management Dashboard',
      description: 'Created an interactive data visualization dashboard for vehicle tracking and analytics. The dashboard provides real-time updates on vehicle locations, maintenance schedules, and performance metrics with AI-powered insights for fleet optimization.',
      image: 'https://placehold.co/600x400/673ab7/ffffff?text=Fleet+Dashboard',
      period: '2022 - 2023',
      organization: 'Intellishift',
      technologies: ['Angular', 'TypeScript', 'D3.js', 'Machine Learning APIs', 'RESTful Services']
    },
    {
      title: 'E-commerce Platform',
      description: 'Built a custom e-commerce platform with integrated payment processing, inventory management, and customer management features. The platform includes a responsive frontend and a robust admin dashboard for managing products and orders.',
      image: 'https://placehold.co/600x400/2196f3/ffffff?text=E-commerce+Platform',
      period: '2021 - 2022',
      organization: 'Personal Project',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe API', 'Express.js'],
      githubLink: 'https://github.com/sgtsaughter/ecommerce-platform'
    },
    {
      title: 'NYC Department of Design and Construction Workflow Application',
      description: 'Internal Angular 7 workflow application which handled the application process for new building and infrastructure projects for the Department of Design and Construction of NYC.',
      image: 'https://placehold.co/600x400/3f51b5/ffffff?text=NYC+DDC+App',
      period: 'January 2019 - September 2019',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['Angular 7', 'TypeScript', 'HTML/CSS', 'Workflow Applications']
    },
    {
      title: 'Greenhill.com',
      description: 'Site maintenance for Drupal 7 website which included translation, right to left design implementation, mobilization, and email delivery.',
      image: 'https://placehold.co/600x400/4caf50/ffffff?text=Greenhill',
      period: 'September 2018 - January 2019',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['Drupal 7', 'PHP', 'HTML/CSS', 'JavaScript'],
      liveLink: 'https://www.greenhill.com'
    },
    {
      title: 'Peter G. Peterson Foundation',
      description: 'Site maintenance for Drupal 7 website.',
      image: 'https://placehold.co/600x400/f50057/ffffff?text=PGPF',
      period: 'September 2018 - January 2019',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['Drupal 7', 'PHP', 'HTML/CSS', 'JavaScript'],
      liveLink: 'https://www.pgpf.org'
    },
    {
      title: 'Peterson Healthcare Foundation',
      description: 'Site maintenance for Drupal 7 website which included mobilization and email delivery.',
      image: 'https://placehold.co/600x400/ff9800/ffffff?text=Peterson+Healthcare',      period: 'September 2018 - January 2019',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['Drupal 7', 'PHP', 'HTML/CSS', 'JavaScript'],
      liveLink: 'https://petersonhealthcare.org'
    },
    {
      title: 'AIG Insurance Application',
      description: 'Implemented new features and maintained existing internal insurance application for AIG.',
      image: 'https://placehold.co/600x400/3f51b5/ffffff?text=AIG+Insurance',
      period: 'November 2017 - September 2018',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['AngularJS', 'Twitter Bootstrap', 'HTML5', 'SQL']
    },
    {
      title: 'ifundwomen.com',
      description: 'Implemented new features and maintained existing Wordpress website. Estimated and Strategized Wordpress to Drupal 8 upgrade.',
      image: 'https://placehold.co/600x400/f50057/ffffff?text=iFundWomen',      period: 'January 2017 - November 2017',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['WordPress', 'Drupal 8', 'PHP', 'HTML/CSS', 'JavaScript'],
      liveLink: 'https://ifundwomen.com/'
    },
    {
      title: 'Swarovski Water School',
      description: 'Developed and maintained website for Swarovski\'s water conservation initiative.',
      image: 'https://placehold.co/600x400/03a9f4/ffffff?text=Swarovski+Water+School',
      period: 'April 2017 - October 2017',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['Drupal', 'PHP', 'HTML/CSS', 'JavaScript'],
      liveLink: 'http://www.swarovskiwaterschool.com/'
    },
    {
      title: 'Bridge To Data',
      description: 'Implemented new features and maintained Drupal 6 website. Estimated, strategized, and executed a Drupal 6 to Drupal 8 upgrade of their existing website.',
      image: 'https://placehold.co/600x400/ff9800/ffffff?text=Bridge+To+Data',      period: 'November 2016 - September 2017',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['Drupal 6', 'Drupal 8', 'PHP', 'HTML/CSS', 'JavaScript']
    },
    {
      title: 'Attune Insurance Application',
      description: 'Implemented new features and maintained existing small business insurance application for Attune Insurance Services.',
      image: 'https://placehold.co/600x400/4caf50/ffffff?text=Attune+Insurance',
      period: 'January 2017 - August 2017',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['JavaScript', 'HTML/CSS', 'Insurance Applications']
    },
    {
      title: 'Hamilton Insurance Application Redesign',
      description: 'Implemented redesign for existing internal insurance application of the Hamilton Insurance Group. Created Android and iOS versions of the application using the Ionic framework.',
      image: 'https://placehold.co/600x400/3f51b5/ffffff?text=Hamilton+Insurance',      period: 'November 2016 - February 2017',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['Ionic', 'Android', 'iOS', 'JavaScript', 'HTML/CSS']
    },
    {
      title: 'Two Sigma Graphic Novel',
      description: 'Created an online graphic novel reader for Two Sigma that served as a recruiting tool for potential employee prospects.',
      image: 'https://placehold.co/600x400/f50057/ffffff?text=Two+Sigma',
      period: 'August 2016 - November 2016',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['JavaScript', 'HTML/CSS', 'Interactive Story']
    },
    {
      title: 'Queens Library Website Redesign',
      description: 'Created prototype for website redesign of queenslibrary.org using Drupal 8.',
      image: 'https://placehold.co/600x400/ff9800/ffffff?text=Queens+Library',      period: 'June 2016 - October 2016',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['Drupal 8', 'PHP', 'HTML/CSS', 'JavaScript']
    },
    {
      title: 'WWE Slam City',
      description: 'Drupal development and maintenance for WWE Slam City website.',
      image: 'https://placehold.co/600x400/673ab7/ffffff?text=WWE+Slam+City',
      period: 'March 2014',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['Drupal', 'PHP', 'HTML/CSS', 'JavaScript'],
      liveLink: 'http://www.wweslamcity.com/'
    },
    {
      title: 'Trinity Wallstreet',
      description: 'Drupal development and maintenance for Trinity Wallstreet website.',
      image: 'https://placehold.co/600x400/009688/ffffff?text=Trinity+Wallstreet',
      period: 'August 2013',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['Drupal', 'PHP', 'HTML/CSS', 'JavaScript'],
      liveLink: 'http://www.trinitywallstreet.org/'
    },
    {
      title: 'Weill Cornell Psychiatry Specialty Center',
      description: 'Drupal development and maintenance for Weill Cornell Psychiatry Specialty Center website.',
      image: 'https://placehold.co/600x400/e91e63/ffffff?text=Weill+Cornell',      period: 'August 2013',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['Drupal', 'PHP', 'HTML/CSS', 'JavaScript'],
      liveLink: 'http://weillcornellpsychiatrycenter.org/'
    },
    {
      title: 'The NeuGroup',
      description: 'Ongoing maintenance involving implementation of new features and bug fixes.',
      image: 'https://placehold.co/600x400/607d8b/ffffff?text=NeuGroup',
      period: 'September 2012',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['Drupal', 'PHP', 'HTML/CSS', 'JavaScript'],
      liveLink: 'http://neugroup.com'
    },
    {
      title: 'WWE Community',
      description: 'Drupal development and maintenance for WWE Community website.',
      image: 'https://placehold.co/600x400/9c27b0/ffffff?text=WWE+Community',
      period: 'September 2012',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['Drupal', 'PHP', 'HTML/CSS', 'JavaScript'],
      liveLink: 'https://community.wwe.com/'
    },
    {
      title: 'Biodex',
      description: 'Drupal 7 maintenance for Biodex website.',
      image: 'https://placehold.co/600x400/2196f3/ffffff?text=Biodex',
      period: 'July 2012',
      organization: 'DOOR3 Business Applications, Inc.',
      technologies: ['Drupal 7', 'PHP', 'HTML/CSS', 'JavaScript'],
      liveLink: 'http://www.biodex.com/'
    }
  ];
}
