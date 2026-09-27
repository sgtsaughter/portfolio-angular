import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { ChatbotService } from './chatbot.service';

describe('ChatbotService', () => {
  let service: ChatbotService;
  let main: HTMLElement;

  beforeEach(() => {
    main = document.createElement('main');
    main.innerHTML = '<section id="projects"><h2>Projects</h2><article data-chat-content><h3>Attune Insurance Application</h3><p>At DOOR3, Patrick maintained the Attune insurance application from January to August 2017.</p></article></section>';
    document.body.appendChild(main);
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbotService);
  });

  afterEach(() => main.remove());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('refuses unrelated questions without loading the model', async () => {
    const response = await firstValueFrom(service.processMessage('How do I bake sourdough?'));

    expect(response.content).toContain('questions about information on this portfolio');
  });

  it('sends website evidence to the API and assembles streamed answer text', async () => {
    const stream = [
      'data: {"type":"token","text":"Yes. At DOOR3, Patrick maintained Attune."}\n\n',
      'data: {"type":"sources","sources":["Projects section"],"evidence":[{"title":"Attune Insurance Application","content":"At DOOR3, Patrick maintained the Attune insurance application from January to August 2017.","source":"Projects section","keywords":["attune"]}]}\n\n',
      'data: {"type":"done"}\n\n'
    ].join('');
    const fetchSpy = spyOn(window, 'fetch').and.resolveTo(new Response(stream, {
      status: 200,
      headers: { 'content-type': 'text/event-stream' }
    }));

    const response = await firstValueFrom(service.processMessage('Was there an Attune insurance app?'));
    const requestBody = JSON.parse(fetchSpy.calls.mostRecent().args[1]?.body as string);

    expect(fetchSpy).toHaveBeenCalledOnceWith('/api/chat', jasmine.objectContaining({ method: 'POST' }));
    expect(requestBody.facts[0].title).toBe('Attune Insurance Application');
    expect(response.content).toContain('Yes. At DOOR3, Patrick maintained Attune.');
    expect(response.content).toContain('Sources: Projects section');
  });

  it('bounds conversation history before sending it to the API', async () => {
    const stream = 'data: {"type":"refusal","text":"Not enough context."}\n\ndata: {"type":"done"}\n\n';
    const fetchSpy = spyOn(window, 'fetch').and.resolveTo(new Response(stream, {
      status: 200,
      headers: { 'content-type': 'text/event-stream' }
    }));
    const conversation = Array.from({ length: 8 }, (_, index) => ({
      sender: index % 2 === 0 ? 'user' as const : 'bot' as const,
      content: `Turn ${index} ${'long transcript '.repeat(100)}`,
      timestamp: new Date()
    }));

    await firstValueFrom(service.processMessage('Tell me about the Attune project.', conversation));

    const requestBody = JSON.parse(fetchSpy.calls.mostRecent().args[1]?.body as string);
    expect(requestBody.conversation.length).toBe(6);
    expect(requestBody.conversation.every((turn: any) => turn.content.length <= 500)).toBeTrue();
  });
});
