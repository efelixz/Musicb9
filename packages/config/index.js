module.exports = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
  auth: {
    tokenKey: 'voicify_token',
  },
  constants: {
    MAX_UPLOAD_SIZE_MB: 50,
    SUPPORTED_AUDIO_FORMATS: ['audio/mpeg', 'audio/wav', 'audio/x-wav'],
  }
};
