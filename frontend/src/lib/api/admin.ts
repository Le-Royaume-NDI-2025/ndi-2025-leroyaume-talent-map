import { apiRequest } from './client';
import { TalentSummaryDto } from './types';

export const adminApi = {
    getPendingTalents: () =>
        apiRequest<TalentSummaryDto[]>('/api/admin/talents/pending'),

    verifyTalent: (id: string) =>
        apiRequest<void>(`/api/admin/talents/${id}/verify`, {
            method: 'POST',
        }),
};
