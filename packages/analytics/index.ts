import { api } from '../api/client';

export const analytics = {
  trackEvent: (eventName: string, metadata: any = {}) => {
    console.log(`[Analytics] ${eventName}`, metadata);
    // Em produção, enviaria para o endpoint de analytics
    // api.post('/analytics/track', { event: eventName, ...metadata });
  },
  trackPageView: (pageName: string) => {
    console.log(`[Analytics] PageView: ${pageName}`);
  }
};
