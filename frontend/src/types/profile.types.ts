export interface ProfileResponse {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

export interface ProfileRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
