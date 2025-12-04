import { apiRequest } from './client';
import { LoginRequest, LoginResponse, RegisterRequest } from './types';

export const authApi = {
    login: (data: LoginRequest) =>
        apiRequest<LoginResponse>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    register: (data: RegisterRequest) =>
        apiRequest<LoginResponse>('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
};
