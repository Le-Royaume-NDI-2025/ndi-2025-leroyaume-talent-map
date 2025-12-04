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
    getAll: (params?: TalentSearchParams) => {
        const queryParams = new URLSearchParams();
        if (params?.city) queryParams.set('city', params.city);
        if (params?.skill) queryParams.set('skill', params.skill);
        if (params?.verified !== undefined) queryParams.set('verified', params.verified.toString());

        const query = queryParams.toString();
        return apiRequest<TalentSummaryDto[]>(`/api/public/talents${query ? `?${query}` : ''}`);
    },

    getById: (id: string) =>
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
};
