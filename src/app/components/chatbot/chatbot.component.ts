import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ChatbotService, ChatMessage } from '../../services/chatbot.service';
import { AnalyticsService } from '../../services/analytics.service';
import { AccessibilityService } from '../../services/accessibility.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ResponsiveTesterComponent } from '../responsive-tester/responsive-tester.component';

@Component({
  selector: 'app-chatbot',
  standalone: true,  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements OnInit {
  @ViewChild('chatMessages') chatMessagesElement!: ElementRef;

  messages: ChatMessage[] = [];
  messageInput = new FormControl('', [Validators.required]);
  isChatOpen = false;
  isProcessing = false;
  hasUnreadMessages = false;
  unreadCount = 0;  constructor(
    private chatbotService: ChatbotService,
    private analyticsService: AnalyticsService,
    private accessibilityService: AccessibilityService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Load saved messages from local storage
    this.loadChatHistory();

    // If no messages (new session), add initial greeting
    if (this.messages.length === 0) {
      // Add initial greeting message
      this.addBotMessage(`Hi there! 👋 I'm Patrick's virtual assistant, ready to answer your questions about his experience, skills, and projects.`);
        // Add suggested questions after a short delay
      setTimeout(() => {
        this.addBotMessage(`Here are some things you can ask me about:
        <div class="suggested-questions">
          <button (click)="askSuggestedQuestion('Tell me about Patrick\\'s experience', $event)">💼 Work Experience</button>
          <button (click)="askSuggestedQuestion('What Angular projects has Patrick worked on?', $event)">💻 Angular Projects</button>
          <button (click)="askSuggestedQuestion('Tell me about Patrick\\'s AI skills', $event)">🤖 AI Experience</button>
          <button (click)="askSuggestedQuestion('What certifications does Patrick have?', $event)">🏆 Certifications</button>
        </div>`);
      }, 1000);
    }
  }
  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;

    // Reset unread count when opening chat
    if (this.isChatOpen) {
      this.hasUnreadMessages = false;
      this.unreadCount = 0;

      // Announce for screen readers
      const message = 'Chat window opened';
      this.announceToScreenReader(message);
    } else {
      // Stop any ongoing speech when closing the chat
      this.accessibilityService.stopSpeaking();

      // Announce for screen readers
      const message = 'Chat window closed';
      this.announceToScreenReader(message);
    }
  }

  // Helper method for screen reader announcements
  private announceToScreenReader(message: string): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('role', 'status');
    announcement.classList.add('sr-only');
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }  askSuggestedQuestion(question: string, event?: MouseEvent): void {
    // Prevent default click behavior if event is provided
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.addUserMessage(question);

    // Set processing state
    this.isProcessing = true;

    // Get bot response
    this.chatbotService.processMessage(question).subscribe(response => {
      this.addMessage(response);
      this.isProcessing = false;
      this.scrollToBottom();
    });
  }

  sendMessage(event: Event): void {
    // Prevent form submission which would cause page reload
    event.preventDefault();

    if (this.messageInput.invalid || this.isProcessing) {
      return;
    }

    const userMessage = this.messageInput.value || '';

    // Add user message to chat
    this.addUserMessage(userMessage);

    // Clear input field
    this.messageInput.reset();

    // Set processing state
    this.isProcessing = true;

    const startTime = new Date().getTime();

    // Get bot response
    this.chatbotService.processMessage(userMessage).subscribe(response => {
      const responseTime = new Date().getTime() - startTime;
      this.addMessage(response);
      this.isProcessing = false;
      this.scrollToBottom();

      // Track interaction for analytics
      this.analyticsService.trackInteraction(
        { content: userMessage, sender: 'user', timestamp: new Date() },
        response,
        responseTime
      );

      // Mark as unread if chat is closed
      if (!this.isChatOpen) {
        this.hasUnreadMessages = true;
        this.unreadCount++;
      }

      // Save chat history
      this.saveChatHistory();
    });
  }

  private addUserMessage(content: string): void {
    this.addMessage({
      content,
      sender: 'user',
      timestamp: new Date()
    });
  }

  private addBotMessage(content: string): void {
    this.addMessage({
      content,
      sender: 'bot',
      timestamp: new Date()
    });

    // Mark as unread if chat is closed
    if (!this.isChatOpen) {
      this.hasUnreadMessages = true;
      this.unreadCount++;
    }

    // Save chat history
    this.saveChatHistory();
  }  private addMessage(message: ChatMessage): void {
    this.messages.push(message);

    // Save to local storage
    this.saveChatHistory();

    // If text-to-speech is enabled, read bot messages aloud
    if (message.sender === 'bot') {
      // Strip HTML tags for speech
      const cleanText = message.content.replace(/<[^>]*>/g, ' ');
      this.accessibilityService.speak(cleanText);
    }

    setTimeout(() => this.scrollToBottom(), 100);
  }

  private scrollToBottom(): void {
    if (this.chatMessagesElement) {
      const element = this.chatMessagesElement.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  // Save chat history to local storage
  private saveChatHistory(): void {
    try {
      const chatHistory = this.messages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp.toString() // Convert Date to string for storage
      }));
      localStorage.setItem('patrick-portfolio-chat', JSON.stringify(chatHistory));
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  }

  // Load chat history from local storage
  private loadChatHistory(): void {
    try {
      const savedChat = localStorage.getItem('patrick-portfolio-chat');
      if (savedChat) {
        const chatHistory = JSON.parse(savedChat);
        this.messages = chatHistory.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp) // Convert string back to Date
        }));

        // Schedule scroll to bottom after view is initialized
        setTimeout(() => this.scrollToBottom(), 200);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
      this.messages = [];
    }
  }

  // Clear chat history
  clearChatHistory(): void {
    this.messages = [];
    localStorage.removeItem('patrick-portfolio-chat');

    // Add initial greeting message
    this.addBotMessage(`Hi there! 👋 I've cleared our previous conversation. What would you like to know about Patrick?`);
  }

  // Open responsive design tester
  openResponsiveTester(): void {
    this.dialog.open(ResponsiveTesterComponent, {
      maxWidth: '90vw',
      maxHeight: '90vh',
      width: '90vw',
      height: '90vh',
      panelClass: 'responsive-tester-dialog',
    });
  }
}
