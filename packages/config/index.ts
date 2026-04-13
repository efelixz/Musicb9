export const CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  ENV: process.env.NODE_ENV || 'development',
  MAX_UPLOAD_SIZE: 50 * 1024 * 1024, // 50MB
  SUPPORTED_AUDIO_FORMATS: ['audio/wav', 'audio/mpeg', 'audio/x-m4a'],
};
