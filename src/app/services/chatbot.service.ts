import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ChatMessage {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  // Portfolio data that the chatbot can use to answer questions
  private portfolioData = {
    name: 'Patrick Baxter',
    title: 'Angular Engineer & Web Developer',
    location: 'New York',
    email: 'baxterp159@gmail.com',
    experience: '15+ years',
    skills: {
      frontend: ['Angular', 'TypeScript', 'JavaScript', 'HTML5/CSS3/SCSS', 'RxJS', 'Responsive Design'],
      backend: ['Node.js', 'Drupal', 'WordPress', 'PHP', 'RESTful APIs', 'MySQL/MongoDB'],
      advanced: ['AI Integration', 'Git/Version Control', 'Testing (Unit/E2E)', 'CI/CD', 'Accessibility (WCAG)', 'Agile Methodologies'],
      tools: ['VS Code', 'JIRA', 'Figma', 'Docker', 'Linux/Unix']
    },
    certifications: [
      'Angular Developer Certification (2021)',
      'Certified Drupal Developer (2018)',
      'Accessibility Compliance Training (WCAG 2.1)'
    ],
    workHistory: [
      {
        company: 'Intellishift',
        role: 'Software Developer',
        period: 'October 2019 - Present',
        description: 'Lead Angular development for fleet management dashboards; implemented AI-powered predictive analytics features.'
      },
      {
        company: 'DOOR3 Business Applications, Inc.',
        role: 'Software Engineer',
        period: 'September 2018 - October 2019',
        description: 'Developed Angular workflow applications for NYC government; maintained Drupal websites for financial clients.'
      },
      {
        company: 'National Event Connection',
        role: 'Web Developer',
        period: 'January 2017 - September 2018',
        description: 'Created ticketing and event management solutions; implemented responsive design principles.'
      }
    ],
    projects: [
      {
        title: 'AI-Powered Task Management App',
        description: 'Angular application with OpenAI integration for intelligent task organization.'
      },
      {
        title: 'Fleet Management Dashboard',
        description: 'Interactive data visualization dashboard with real-time updates and AI insights.'
      },
      {
        title: 'E-commerce Platform',
        description: 'Custom platform with payment processing, inventory management, and responsive design.'
      }
    ],
    education: 'Associate Degree in Computer Science'
  };

  constructor() { }
  // Method to process user messages and return appropriate responses
  processMessage(message: string): Observable<ChatMessage> {
    const response = this.generateResponse(message.toLowerCase());

    // Simulate AI processing delay
    return of({
      content: response,
      sender: 'bot' as 'user' | 'bot',
      timestamp: new Date()
    }).pipe(
      delay(Math.random() * 1000 + 500) // Random delay between 500-1500ms
    );
  }
  // Generate responses based on message content
  private generateResponse(message: string): string {
    // Greeting patterns
    if (this.containsAny(message, ['hello', 'hi', 'hey', 'greetings'])) {
      return `Hello! I'm ${this.portfolioData.name}'s virtual assistant. Feel free to ask me anything about his experience, skills, projects, or background!`;
    }

    // Questions about basic info
    if (this.containsAny(message, ['who are you', 'who is patrick', 'tell me about patrick', 'about you', 'about patrick'])) {
      return `${this.portfolioData.name} is a ${this.portfolioData.title} with ${this.portfolioData.experience} of experience, based in ${this.portfolioData.location}. He specializes in Angular development with recent focus on AI integration. He has worked on various projects including fleet management dashboards, workflow applications, and AI-powered tools.`;
    }

    // Questions about contact information
    if (this.containsAny(message, ['contact', 'email', 'reach out', 'get in touch', 'how to contact'])) {
      return `You can contact Patrick via email at ${this.portfolioData.email} or through the contact form on this website. He's based in ${this.portfolioData.location} and is open to remote work opportunities as well.`;
    }

    // Questions about experience
    if (this.containsAny(message, ['experience', 'work history', 'career', 'job', 'jobs', 'companies', 'employment'])) {
      const experienceText = this.portfolioData.workHistory.map(job =>
        `<strong>${job.company}</strong> (${job.role}, ${job.period}): ${job.description}`
      ).join('<br><br>');

      return `Patrick has ${this.portfolioData.experience} of professional experience. Here's a summary of his work history:<br><br>${experienceText}`;
    }

    // Questions about specific companies
    if (this.containsAny(message, ['intellishift'])) {
      const job = this.portfolioData.workHistory.find(job => job.company === 'Intellishift');
      return job ? `At Intellishift (${job.period}), Patrick ${job.description.toLowerCase()}` : `Patrick has worked at Intellishift.`;
    }

    if (this.containsAny(message, ['door3', 'door 3'])) {
      const job = this.portfolioData.workHistory.find(job => job.company === 'DOOR3 Business Applications, Inc.');
      return job ? `At DOOR3 (${job.period}), Patrick ${job.description.toLowerCase()}` : `Patrick has worked at DOOR3.`;
    }    // Questions about skills
    if (this.containsAny(message, ['skills', 'technologies', 'tech stack', 'what can you do', 'technologies', 'programming languages'])) {
      return `Patrick has expertise in:<br>
      <strong>Frontend:</strong> ${this.portfolioData.skills.frontend.join(', ')}<br>
      <strong>Backend:</strong> ${this.portfolioData.skills.backend.join(', ')}<br>
      <strong>Advanced:</strong> ${this.portfolioData.skills.advanced.join(', ')}<br>
      <strong>Tools:</strong> ${this.portfolioData.skills.tools.join(', ')}`;
    }

    // Questions about specific skills
    if (this.containsAny(message, ['angular', 'typescript'])) {
      return `Angular is Patrick's primary expertise. He has earned an Angular Developer Certification (2021) and has extensive experience building complex applications with Angular and TypeScript, including:<br><br>
      1. Fleet management dashboards with real-time data visualization<br>
      2. Workflow applications for NYC government agencies<br>
      3. AI-powered task management tools<br><br>
      He's proficient with RxJS, Angular Material, and state management solutions.`;
    }

    if (this.containsAny(message, ['ai', 'artificial intelligence', 'machine learning', 'ml', 'openai'])) {
      return `Patrick has recent experience with AI integration, including:<br><br>
      1. Developing an AI-powered Task Management App using OpenAI's API for intelligent task categorization<br>
      2. Implementing predictive analytics features in fleet management dashboards<br>
      3. Creating this chatbot interface to showcase AI capabilities<br><br>
      He's particularly interested in practical AI applications that enhance user experience and productivity.`;
    }    // Questions about projects
    if (this.containsAny(message, ['projects', 'portfolio', 'work', 'apps', 'applications', 'showcase'])) {
      const projectText = this.portfolioData.projects.map(p =>
        `<strong>${p.title}</strong>: ${p.description}`
      ).join('<br><br>');

      return `Patrick has worked on various innovative projects. Here are some highlights:<br><br>${projectText}<br><br>You can view more details and screenshots in the Projects section of this portfolio.`;
    }

    // Questions about education and certifications
    if (this.containsAny(message, ['education', 'degree', 'study', 'college', 'university', 'academic'])) {
      return `Patrick has an ${this.portfolioData.education}. He also continuously updates his skills through professional certifications and self-directed learning in emerging technologies, particularly in Angular and AI.`;
    }

    if (this.containsAny(message, ['certifications', 'certified', 'qualifications', 'certificates', 'credentials'])) {
      const certList = this.portfolioData.certifications.map(cert => `• ${cert}`).join('<br>');
      return `Patrick holds the following professional certifications:<br><br>${certList}<br><br>These certifications demonstrate his commitment to maintaining up-to-date technical knowledge and best practices.`;
    }    // Resume request
    if (this.containsAny(message, ['resume', 'cv', 'download resume', 'get resume'])) {
      return `You can download Patrick's detailed resume using the "Download Resume" button in the About section. The resume contains his complete work history, education, skills, and project details in a printer-friendly format.`;
    }

    // Questions about availability
    if (this.containsAny(message, ['available', 'hire', 'hiring', 'job opportunity', 'looking for work', 'freelance', 'contract', 'opportunity'])) {
      return `Patrick is open to discussing new opportunities in Angular development, particularly those involving AI integration or complex frontend challenges. Please reach out through the contact form with details about your project or position.`;
    }

    // Fun questions about hobbies/interests
    if (this.containsAny(message, ['hobbies', 'interests', 'fun', 'free time', 'outside of work', 'personal'])) {
      return `Outside of coding, Patrick enjoys staying current with new technologies, experimenting with AI tools, and contributing to open-source projects. He's also interested in UX design principles and accessibility standards.`;
    }

    // Thank you responses
    if (this.containsAny(message, ['thank', 'thanks', 'appreciate', 'helpful'])) {
      return `You're welcome! I'm happy to help answer any other questions you might have about Patrick's skills, experience, or projects.`;
    }

    // Fallback response with suggestion buttons
    return `I'm not sure I understand that question, but I'd be happy to tell you about Patrick's:<br><br>
    • Experience and work history<br>
    • Angular and AI development skills<br>
    • Projects and portfolio work<br>
    • Education and certifications<br>
    • Contact information<br><br>
    What would you like to know more about?`;
  }

  // Helper method to check if a message contains any of the keywords
  private containsAny(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.includes(keyword));
  }
}
