export interface FriendRequest {
  firstName: string;
  lastName: string;
  birthDate: string;
}

export interface FriendResponse {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  daysUntilBirthday: number;
  nextBirthday: string;
  isBirthdayToday: boolean;
}
