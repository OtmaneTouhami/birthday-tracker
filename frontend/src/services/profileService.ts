import api from './api';
import type { ProfileResponse, ProfileRequest, ChangePasswordRequest } from '@/types/profile.types';

export const profileService = {
  async getProfile(): Promise<ProfileResponse> {
    const response = await api.get<ProfileResponse>('/api/me');
    return response.data;
  },

  async updateProfile(data: ProfileRequest): Promise<ProfileResponse> {
    const response = await api.put<ProfileResponse>('/api/me', data);
    return response.data;
  },

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await api.patch('/api/me/password', data);
  },

  async deleteProfile(): Promise<void> {
    await api.delete('/api/me');
  },
};
