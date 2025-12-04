import { Link } from 'react-router-dom';
import { TalentSummaryDto } from '../../lib/api/types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { MapPin } from 'lucide-react';

interface TalentCardProps {
    talent: TalentSummaryDto;
}

export function TalentCard({ talent }: TalentCardProps) {
    return (
        <Link to={`/talents/${talent.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <CardTitle className="text-xl">
                            {talent.firstName} {talent.lastName}
                        </CardTitle>
                        {talent.verified && (
                            <Badge variant="default" className="ml-2">
                                ✓ Verified
                            </Badge>
                        )}
                    </div>
                    {talent.title && (
                        <p className="text-sm text-muted-foreground">{talent.title}</p>
                    )}
                </CardHeader>
                <CardContent>
                    {(talent.city || talent.country) && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4" />
                            <span>
                                {talent.city}
                                {talent.city && talent.country && ', '}
                                {talent.country}
                            </span>
                        </div>
                    )}
                    {talent.skillNames && talent.skillNames.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                            {talent.skillNames.slice(0, 4).map((skill) => (
                                <Badge key={skill} variant="secondary">
                                    {skill}
                                </Badge>
                            ))}
                            {talent.skillNames.length > 4 && (
                                <Badge variant="outline">+{talent.skillNames.length - 4}</Badge>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
