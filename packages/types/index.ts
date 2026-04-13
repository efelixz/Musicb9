export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  email: string;
  fullName: string;
  status: UserStatus;
  createdAt: string;
}

export type VoiceProfileStatus = 'pending' | 'consented' | 'training' | 'ready' | 'failed';

export interface VoiceProfile {
  id: string;
  userId: string;
  name: string;
  status: VoiceProfileStatus;
  fidelityScore?: number;
  createdAt: string;
}

export type ProjectStatus = 'draft' | 'processing' | 'ready' | 'failed';

export interface Project {
  id: string;
  userId: string;
  title: string;
  status: ProjectStatus;
  genre: string;
  bpm: number;
  mood: string;
  createdAt: string;
}

export interface CreditBalance {
  balance: number;
}
