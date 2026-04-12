export type UserStatus = 'active' | 'suspended' | 'deleted';

export interface User {
  id: string;
  email: string;
  fullName?: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export type VoiceStatus = 'pending' | 'processing' | 'active' | 'failed';

export interface VoiceProfile {
  id: string;
  userId: string;
  name: string;
  status: VoiceStatus;
  fidelityScore?: number;
  metadata?: Record<string, any>;
  createdAt: string;
}

export type ProjectStatus = 'draft' | 'generating' | 'ready' | 'failed';

export interface Project {
  id: string;
  userId: string;
  title: string;
  status: ProjectStatus;
  genre?: string;
  bpm?: number;
  mood?: string;
  keySignature?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lyrics {
  id: string;
  projectId: string;
  rawText: string;
  structuredJson?: {
    verses: string[];
    chorus: string[];
  };
  language?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
