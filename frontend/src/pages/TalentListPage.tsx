import { useState, useEffect } from 'react';
import { talentsApi, TalentSearchParams } from '../lib/api/talents';
import { TalentSummaryDto } from '../lib/api/types';
import { TalentCard } from '../components/talents/TalentCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

export function TalentListPage() {
    const [talents, setTalents] = useState<TalentSummaryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [filters, setFilters] = useState<TalentSearchParams>({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadTalents();
    }, []);

    const loadTalents = async (params?: TalentSearchParams) => {
        try {
            setLoading(true);
            setError(null);
            const data = await talentsApi.searchTalents(params || {});
            setTalents(data);
        } catch (err) {
            setError('Failed to load talents');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        const params: TalentSearchParams = {
            ...filters,
            ...(searchTerm && { skill: searchTerm }),
        };
        loadTalents(params);
    };

    const handleReset = () => {
        setFilters({});
        setSearchTerm('');
        loadTalents();
    };

    return (
        <div className="container mx-auto px-3 py-6 sm:px-4 sm:py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Explore Talents</h1>

            <div className="bg-card rounded-lg border p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input
                        placeholder="Search by skill..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="sm:col-span-2"
                    />
                    <Input
                        placeholder="City..."
                        value={filters.city || ''}
                        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                    />
                    <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
                        <Checkbox
                            id="verified"
                            checked={filters.verified || false}
                            onCheckedChange={(checked) =>
                                setFilters({ ...filters, verified: checked as boolean })
                            }
                        />
                        <Label htmlFor="verified">Verified only</Label>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button onClick={handleSearch} className="w-full sm:w-auto">Search</Button>
                    <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
                        Reset
                    </Button>
                </div>
            </div>

            {loading && <div className="text-center py-12">Loading talents...</div>}

            {error && (
                <div className="text-center py-12 text-destructive">{error}</div>
            )}

            {!loading && !error && (
                <>
                    <p className="text-muted-foreground mb-4">
                        Found {talents.length} talent{talents.length !== 1 ? 's' : ''}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {talents.map((talent) => (
                            <TalentCard key={talent.id} talent={talent} />
                        ))}
                    </div>
                    {talents.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            No talents found. Try adjusting your filters.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
