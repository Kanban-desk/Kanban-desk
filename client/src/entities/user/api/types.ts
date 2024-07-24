export interface AuthDto {
  email: string;
  password: string;
}

export interface User {
  user_id?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_path?: string;
}

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  avatar_path?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface UserUpdateResponse {
  updatedUser: User;
}

// declare module "jwt-decode" {
//   export interface JwtPayload {
//     name?: string;
//   }
// }
