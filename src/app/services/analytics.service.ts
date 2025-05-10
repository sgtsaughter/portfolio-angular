import { Injectable } from '@angular/core';
import { ChatMessage } from './chatbot.service';

export interface ChatAnalytics {
  totalInteractions: number;
  popularTopics: { [key: string]: number };
  averageResponseTime: number;
  sessionDuration: number;
  messageHistory: {
    userMessage: string;
    botResponse: string;
    timestamp: Date;
    responseTime: number;
  }[];
  startTime: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly STORAGE_KEY = 'patrick-portfolio-chat-analytics';
  private analytics: ChatAnalytics;

  constructor() {
    this.analytics = this.loadAnalytics() || this.initializeAnalytics();
  }

  private initializeAnalytics(): ChatAnalytics {
    return {
      totalInteractions: 0,
      popularTopics: {},
      averageResponseTime: 0,
      sessionDuration: 0,
      messageHistory: [],
      startTime: new Date()
    };
  }

  private loadAnalytics(): ChatAnalytics | null {
    try {
      const savedAnalytics = localStorage.getItem(this.STORAGE_KEY);
      if (savedAnalytics) {
        const parsedAnalytics = JSON.parse(savedAnalytics);

        // Convert string dates back to Date objects
        parsedAnalytics.startTime = new Date(parsedAnalytics.startTime);
        parsedAnalytics.messageHistory = parsedAnalytics.messageHistory.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));

        return parsedAnalytics;
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
    return null;
  }

  private saveAnalytics(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.analytics));
    } catch (error) {
      console.error('Failed to save analytics:', error);
    }
  }

  trackInteraction(userMessage: ChatMessage, botResponse: ChatMessage, responseTime: number): void {
    this.analytics.totalInteractions++;

    // Track message history
    this.analytics.messageHistory.push({
      userMessage: userMessage.content,
      botResponse: botResponse.content,
      timestamp: new Date(),
      responseTime
    });

    // Update average response time
    const totalResponseTime = this.analytics.averageResponseTime * (this.analytics.totalInteractions - 1) + responseTime;
    this.analytics.averageResponseTime = totalResponseTime / this.analytics.totalInteractions;

    // Update popular topics
    this.updatePopularTopics(userMessage.content);

    // Calculate session duration
    this.analytics.sessionDuration = (new Date().getTime() - this.analytics.startTime.getTime()) / 1000; // in seconds

    this.saveAnalytics();
  }

  private updatePopularTopics(message: string): void {
    const topics = this.identifyTopics(message.toLowerCase());

    topics.forEach(topic => {
      if (this.analytics.popularTopics[topic]) {
        this.analytics.popularTopics[topic]++;
      } else {
        this.analytics.popularTopics[topic] = 1;
      }
    });
  }

  private identifyTopics(message: string): string[] {
    const topicKeywords: { [key: string]: string[] } = {
      'experience': ['experience', 'work', 'career', 'job', 'history', 'company', 'worked at'],
      'skills': ['skills', 'technologies', 'tech stack', 'language', 'framework', 'programming'],
      'projects': ['projects', 'portfolio', 'built', 'created', 'developed', 'made'],
      'education': ['education', 'degree', 'university', 'college', 'study', 'academic'],
      'contact': ['contact', 'email', 'reach', 'touch', 'hire', 'connect'],
      'personal': ['hobbies', 'interests', 'free time', 'outside of work', 'personal'],
      'angular': ['angular', 'typescript', 'frontend', 'front-end', 'web development'],
      'ai': ['ai', 'artificial intelligence', 'machine learning', 'chatbot', 'assistant'],
    };

    const identifiedTopics: string[] = [];

    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        identifiedTopics.push(topic);
      }
    }

    return identifiedTopics.length > 0 ? identifiedTopics : ['general'];
  }

  getAnalytics(): ChatAnalytics {
    return {...this.analytics};
  }

  getMostPopularTopics(limit: number = 3): {topic: string, count: number}[] {
    return Object.entries(this.analytics.popularTopics)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  clearAnalytics(): void {
    this.analytics = this.initializeAnalytics();
    this.saveAnalytics();
  }
}
