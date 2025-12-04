import { useState, useEffect } from 'react';
import { adminApi } from '../lib/api/admin';
import { TalentSummaryDto } from '../lib/api/types';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function AdminTalentsPage() {
    const [talents, setTalents] = useState<TalentSummaryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadPendingTalents();
    }, []);

    const loadPendingTalents = async () => {
        try {
            setLoading(true);
            const data = await adminApi.getPendingTalents();
            setTalents(data);
        } catch (err) {
            setError('Failed to load pending talents');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (id: string) => {
        try {
            await adminApi.verifyTalent(id);
            await loadPendingTalents();
        } catch (err) {
            alert('Failed to verify talent');
        }
    };

    if (loading) return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Pending Talent Verifications</h1>

            {error && <div className="text-destructive mb-4">{error}</div>}

            {talents.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No pending verifications
                </div>
            )}

            <div className="space-y-4">
                {talents.map((talent) => (
                    <Card key={talent.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>
                                        {talent.firstName} {talent.lastName}
                                    </CardTitle>
                                    {talent.title && <p className="text-sm text-muted-foreground">{talent.title}</p>}
                                </div>
                                <Button onClick={() => handleVerify(talent.id)}>
                                    Verify Talent
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {(talent.city || talent.country) && (
                                <p className="text-sm text-muted-foreground mb-2">
                                    {talent.city}{talent.city && talent.country && ', '}{talent.country}
                                </p>
                            )}
                            {talent.skillNames && talent.skillNames.length > 0 && (
                                <div className="flex gap-1 flex-wrap">
                                    {talent.skillNames.map((skill) => (
                                        <Badge key={skill} variant="secondary">{skill}</Badge>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
