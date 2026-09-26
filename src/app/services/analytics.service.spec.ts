import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  const storageKey = 'patrick-portfolio-chat-analytics';

  beforeEach(() => localStorage.removeItem(storageKey));
  afterEach(() => localStorage.removeItem(storageKey));

  it('migrates legacy prompt and response history to aggregate-only storage', () => {
    localStorage.setItem(storageKey, JSON.stringify({
      totalInteractions: 1,
      popularTopics: { skills: 1 },
      averageResponseTime: 240,
      sessionDuration: 30,
      startTime: new Date().toISOString(),
      messageHistory: [{ userMessage: 'private question', botResponse: 'private answer' }]
    }));

    const analytics = new AnalyticsService();
    const savedAnalytics = localStorage.getItem(storageKey) || '';

    expect(analytics.getAnalytics().totalInteractions).toBe(1);
    expect(savedAnalytics).not.toContain('private question');
    expect(savedAnalytics).not.toContain('private answer');
    expect(JSON.parse(savedAnalytics).messageHistory).toBeUndefined();
  });

  it('stores aggregate interaction data without storing message text', () => {
    const analytics = new AnalyticsService();
    analytics.trackInteraction('Angular experience', 125);

    const savedAnalytics = localStorage.getItem(storageKey) || '';
    expect(analytics.getAnalytics().totalInteractions).toBe(1);
    expect(analytics.getMostPopularTopics()).toContain({ topic: 'experience', count: 1 });
    expect(savedAnalytics).not.toContain('Angular experience');
  });
});
