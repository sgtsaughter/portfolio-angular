import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { ChatbotService } from './chatbot.service';

describe('ChatbotService', () => {
  let service: ChatbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('answers an unlisted Python experience question without model generation', async () => {
    const response = await firstValueFrom(service.processMessage('Does Patrick have any Python experience?'));

    expect(response.content).toContain('does not list Python');
    expect(response.content).toContain('can\'t confirm experience');
  });

  it('uses earlier bot messages to answer an anything-else follow-up', async () => {
    const response = await firstValueFrom(service.processMessage('anything else?', [
      { content: 'Profile: Patrick Baxter is a developer.', sender: 'bot', timestamp: new Date() }
    ]));

    expect(response.content).not.toContain('Profile:');
    expect(response.content).toContain('Intellishift experience:');
  });

  it('answers a named project existence question briefly and directly', async () => {
    const response = await firstValueFrom(service.processMessage('Was there an Attune insurance app Patrick worked on?'));

    expect(response.content).toContain('Yes.');
    expect(response.content).toContain('Attune Insurance Services');
    expect(response.content).not.toContain('AIG Insurance Application');
  });
});
