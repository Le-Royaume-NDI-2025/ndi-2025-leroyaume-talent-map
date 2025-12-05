import { apiRequest } from './client';
import {
    TalentSummaryDto,
    TalentDetailDto,
    MyTalentProfileDto,
    UpsertTalentProfileRequest,
} from './types';

export interface TalentSearchParams {
    city?: string;
    skill?: string;
    verified?: boolean;
}

export const talentsApi = {
    searchTalents: (params: TalentSearchParams) => {
        const queryParams = new URLSearchParams();
        if (params?.city) queryParams.set('city', params.city);
        if (params?.skill) queryParams.set('skill', params.skill);
        if (params?.verified !== undefined) queryParams.set('verified', params.verified.toString());

        const query = queryParams.toString();
        return apiRequest<TalentSummaryDto[]>(`/api/public/talents${query ? `?${query}` : ''}`);
    },

    getTalentById: (id: string) =>
        apiRequest<TalentDetailDto>(`/api/public/talents/${id}`),

    getMyProfile: () =>
        apiRequest<MyTalentProfileDto>('/api/me/talent'),

    createProfile: (data: UpsertTalentProfileRequest) =>
        apiRequest<MyTalentProfileDto>('/api/me/talent', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateProfile: (data: UpsertTalentProfileRequest) =>
        apiRequest<MyTalentProfileDto>('/api/me/talent', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    uploadProfilePicture: async (file: File): Promise<{ url: string }> => {
        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('jwt_token');
        if (!token) {
            throw new Error('Not authenticated');
        }

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api/me/talent/picture`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            let errorMessage = 'Upload failed';
            try {
                const error = await response.json();
                errorMessage = error.error || errorMessage;
            } catch {
                errorMessage = `Upload failed with status ${response.status}`;
            }
            throw new Error(errorMessage);
        }

        const text = await response.text();
        if (!text) {
            throw new Error('Empty response from server');
        }

        try {
            return JSON.parse(text);
        } catch (e) {
            throw new Error('Invalid JSON response from server');
        }
    },
};
