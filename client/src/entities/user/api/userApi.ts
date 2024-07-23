import axios, { AxiosError } from 'axios';
import { AuthDto, AuthResponse } from './types';
import { handleApiError } from '../../../shared/api/handleAPIErrors';
import { ApiResponse } from '../../../shared/api/types';

export const userApi = {
  register: async (registerDto: AuthDto): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await axios.post<AuthResponse>(`api/auth/register`, registerDto);
      return { data: response.data, error: null };
    } catch (error) {
      if (error instanceof AxiosError) {
        return handleApiError<AuthResponse>(error);
      }
      throw error;
    }
  },
  login: async (loginDto: AuthDto) : Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await axios.post<AuthResponse>(`api/auth/login`, loginDto);
      return { data: response.data, error: null };
    } catch (error) {
      if (error instanceof AxiosError) {
        return handleApiError<AuthResponse>(error);
      }
      throw error;
    }
  },
};