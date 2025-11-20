import api from './api';
import type { FriendRequest, FriendResponse } from '@/types/friend.types';

export const friendService = {
  async getAllFriends(): Promise<FriendResponse[]> {
    const response = await api.get<FriendResponse[]>('/api/friends');
    return response.data;
  },

  async getUpcomingBirthdays(): Promise<FriendResponse[]> {
    const response = await api.get<FriendResponse[]>('/api/friends/upcoming');
    return response.data;
  },

  async createFriend(data: FriendRequest): Promise<FriendResponse> {
    const response = await api.post<FriendResponse>('/api/friends', data);
    return response.data;
  },

  async updateFriend(id: string, data: FriendRequest): Promise<FriendResponse> {
    const response = await api.put<FriendResponse>(`/api/friends/${id}`, data);
    return response.data;
  },

  async deleteFriend(id: string): Promise<void> {
    await api.delete(`/api/friends/${id}`);
  },
};
