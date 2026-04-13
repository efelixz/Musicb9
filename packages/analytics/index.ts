import { api } from '../api/client';

export const analytics = {
  trackEvent: (eventName: string, metadata: any = {}) => {
    console.log(`[Analytics] ${eventName}`, metadata);
    // Em produção, enviaria para o endpoint de analytics
    // api.post('/analytics/track', { event: eventName, ...metadata });
  },
  trackPageView: (pageName: string) => {
    console.log(`[Analytics] PageView: ${pageName}`);
  },
  // KPIs de Produto (Seção 5.4)
  trackOnboardingConclusion: (userId: string, timeTakenMs: number) => {
    analytics.trackEvent('ONBOARDING_CONCLUDED', { userId, duration: timeTakenMs });
  },
  trackProjectCreation: (userId: string, genre: string) => {
    analytics.trackEvent('PROJECT_CREATED', { userId, genre });
  },
  trackConversion: (userId: string, planId: string) => {
    analytics.trackEvent('SUBSCRIPTION_CONVERTED', { userId, planId });
  },
  // KPIs Técnicos
  trackInferenceLatency: (jobId: string, engine: string, latencyMs: number) => {
    analytics.trackEvent('TECH_INFERENCE_LATENCY', { jobId, engine, latencyMs });
  }
};
