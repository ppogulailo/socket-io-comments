import { $api, API_URL } from '../config/axios';
import axios, { AxiosResponse } from 'axios';
import { AuthResponse, ILogin, IRegister } from '../types/api/api.type';

export const AuthApi = {
  register: (body: IRegister): Promise<AxiosResponse<AuthResponse>> => {
    return axios.post(
      `${API_URL}/auth/signup`,
      { ...body },
      {
        headers: {
          recaptcha: `${localStorage.getItem('authCapthca')}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
  },
  login: (body: ILogin): Promise<AxiosResponse<AuthResponse>> => {
    return axios.post(
      `${API_URL}/auth/signin`,
      { ...body },
      {
        headers: {
          recaptcha: `${localStorage.getItem('authCapthca')}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
  },
  checkAuth: (): Promise<AxiosResponse<string>> => {
    return $api.get(`/auth/refresh`, { withCredentials: true });
  },
  logOut: () => {
    return $api.get(`/auth/logout`, { withCredentials: true });
  },
};
